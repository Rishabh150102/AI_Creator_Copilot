from fastapi import APIRouter

from app.services.openai_service import generate_video_ideas, generate_script, generate_hooks_and_titles

router = APIRouter()

@router.get("/generate-ideas")
def get_video_ideas(niche: str):
    
    ideas = generate_video_ideas(niche)
    
    return {
        "niche": niche,
        "ideas": ideas
    }

@router.get("/generate-script")
def get_script(topic: str):

    script = generate_script(topic)

    return {
        "topic": topic,
        "script": script
    }

@router.get("/generate-hooks-titles")
def get_hooks_and_titles(topic: str):

    result = generate_hooks_and_titles(topic)

    return {
        "topic": topic,
        "result": result
    }