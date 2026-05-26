import os

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

from app.prompts.content_prompts import SCRIPT_PROMPT, HOOK_TITLE_PROMPT

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.7,
    api_key=os.getenv("OPENAI_API_KEY")
)

def generate_video_ideas(niche: str):
    prompt = prompt = f"""
Generate 5 engaging YouTube video ideas for the niche: {niche}

Rules:
- Return ONLY the video ideas
- No introduction text
- No explanations
- No markdown
- No headings

Return the response as a numbered list.
"""

    response = llm.invoke(prompt)

    return response.content


def generate_script(topic: str):
    
    prompt = SCRIPT_PROMPT.format(topic=topic)
    
    response = llm.invoke(prompt)

    return response.content



def generate_hooks_and_titles(topic: str):

    prompt = HOOK_TITLE_PROMPT.format(topic=topic)

    response = llm.invoke(prompt)

    return response.content