import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel , EmailStr
from typing import List, Literal
from dotenv import load_dotenv
from openai import OpenAI
import resend

load_dotenv()

app = FastAPI()

# Enable CORS for your Next.js UI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openrouter_api_key = os.getenv("OPENROUTER_API_KEY")
if not openrouter_api_key:
    raise ValueError("OPENROUTER_API_KEY is not set in the environment variables")

# Initialize your API key from environment variables
resend.api_key = os.getenv("RESEND_API_KEY")
if not resend.api_key:
    raise ValueError("RESEND_API_KEY is not set in the environment variables")

# 1. Initialize OpenAI client pointing to OpenRouter
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=openrouter_api_key,
    default_headers={
        "X-Title": "Ahzaz Portfolio AI", 
    }
)

#contact
class ContactForm(BaseModel):
    name: str
    email: EmailStr  # Requires: pip install pydantic[email]
    message: str

@app.post("/api/contact")
async def send_portfolio_email(payload: ContactForm):
    try:
        # Construct the email layout
        html_content = f"""
        <h3>New Portfolio Inquiry</h3>
        <p><strong>Name:</strong> {payload.name}</p>
        <p><strong>Email:</strong> {payload.email}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">{payload.message}</p>
        """
        
        # Send via Resend's infrastructure
        response = resend.Emails.send({
            "from": "Portfolio Contact <onboarding@resend.dev>", # Resend provides this for sandbox testing
            "to": os.getenv("CONTACT_EMAIL"), # Your personal email address
            "subject": f"✨ New inquiry from {payload.name}",
            "html": html_content
        })
        
        return {"status": "success", "message_id": response.get("id")}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to route email: {str(e)}"
        )
        
# Define your live Vercel API tool
def query_my_api() -> dict:
    import requests
    try:
        response = requests.get("https://my-api-roan-two.vercel.app/api/me", timeout=10)
        if response.status_code == 200:
            return response.json()
        return {"error": f"API returned status code {response.status_code}"}
    except Exception as e:
        return {"error": f"Error calling API: {e}"}

# Define agent instructions
SYSTEM_INSTRUCTION = (
    "You are a chatbot that answers questions about Ahzaz Ahmed. "
    "You have access to a tool called `query_my_api` that fetches his real, live information "
    "(skills, projects, education, and contact details). If the user asks about his work, "
    "always look up the data first using this tool before answering. Be concise and use Markdown."
)

class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    history: List[ChatMessage]

@app.get("/api/ping",methods=["GET", "HEAD"])
async def ping():
    return {"status" : "ok"}

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    # Standard baseline system prompt definition
    messages = [{"role": "system", "content": SYSTEM_INSTRUCTION}]
    for msg in request.history:
        messages.append({"role": msg.role, "content": msg.content})

    tools = [{
        "type": "function",
        "function": {
            "name": "query_my_api",
            "description": "Fetches Ahzaz Ahmed's real personal information like skills, projects, and education.",
            "parameters": {"type": "object", "properties": {}}
        }
    }]

    async def event_generator():
        try:
            response = client.chat.completions.create(
                model="google/gemini-2.5-flash", 
                messages=messages,
                tools=tools,
                tool_choice="auto",
                stream=True,
                max_tokens=1000
            )

            tool_called = False
            tool_call_details = None

            for chunk in response:
                if not chunk.choices:
                    continue
                delta = chunk.choices[0].delta
                
                # Capture the tool intent properties safely as they stream in
                if delta.tool_calls:
                    tool_called = True
                    for tc in delta.tool_calls:
                        if tc.function and tc.function.name:
                            tool_call_details = {"name": tc.function.name, "id": tc.id}
                    continue

                if delta.content:
                    yield f"data: {json.dumps({'delta': delta.content})}\n\n"

            # If Gemini called the Vercel API tool, handle execution and stream the true response data
            if tool_called and tool_call_details:
                
                # Fetch your real data from Vercel
                tool_result = query_my_api()
                
                # Format the tool payload to precisely match the strict OpenRouter spec
                messages.append({
                    "role": "assistant",
                    "content": None,
                    "tool_calls": [{
                        "id": tool_call_details["id"],
                        "type": "function",
                        "function": {"name": tool_call_details["name"], "arguments": "{}"}
                    }]
                })
                
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call_details["id"],
                    "name": tool_call_details["name"],
                    "content": json.dumps(tool_result)
                })

                # Fire the second stream to generate the final descriptive answer
                final_response = client.chat.completions.create(
                    model="google/gemini-2.5-flash",
                    messages=messages,
                    stream=True,
                    max_tokens=1000
                )
                
                for final_chunk in final_response:
                    if final_chunk.choices and final_chunk.choices[0].delta.content:
                        yield f"data: {json.dumps({'delta': final_chunk.choices[0].delta.content})}\n\n"

        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    
    # Add explicit streaming headers to bypass local and cloud server buffering
    headers = {
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no"  # 🌟 CRITICAL: Stops reverse proxies (like Nginx/Vercel) from buffering
    }

    return StreamingResponse(
        event_generator(), 
        media_type="text/event-stream", 
        headers=headers
    )



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
