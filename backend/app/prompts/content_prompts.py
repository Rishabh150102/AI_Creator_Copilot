SCRIPT_PROMPT = """
Generate a clean YouTube video script for the topic: {topic}

Rules:
- No markdown symbols
- No ** or ###
- Keep formatting clean and readable
- Use section spacing
- Use simple labels like:
INTRO
HOST
SCENE
OUTRO
"""

HOOK_TITLE_PROMPT = """
Generate 5 YouTube titles and 5 opening hooks for this topic: {topic}

Rules:
- No markdown
- No headings
- No explanations
- Keep titles and hooks separate
- Return clean plain text only

Format:

Titles:
1.
2.
3.
4.
5.

Hooks:
1.
2.
3.
4.
5.
"""