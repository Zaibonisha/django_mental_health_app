import openai
from decouple import config
import logging

# Initialize OpenAI API key
openai.api_key = config('OPENAI_API_KEY')

# Logging configuration
logger = logging.getLogger(__name__)

def generate_cbt_session(emotional_state):
    prompt = f"""
    Create a structured CBT session for someone feeling {emotional_state}.
    The session should include:
    1. A brief introduction explaining the goals of CBT.
    2. 1-2 exercises or activities to help reframe negative thoughts.
    3. A closing reflection or self-care advice.
    """
    try:
        # Update to use ChatCompletion
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Use "gpt-4" if your account supports it
            messages=[
                {"role": "system", "content": "You are a mental health CBT assistant."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=300,
            temperature=0.7,
        )
        if response.choices:
            session_text = response['choices'][0]['message']['content'].strip()
            return {"session": session_text, "summary": "CBT session created successfully"}
        else:
            return {"error": "No content returned from OpenAI"}
    except openai.OpenAIError as e:  # Catch OpenAI-specific errors
        logger.error(f"OpenAI API error: {e}")
        return {"error": f"OpenAI error: {e}"}
    except Exception as e:  # Catch all other unexpected errors
        logger.error(f"Unexpected error: {e}")
        return {"error": "Failed to generate CBT session."}
