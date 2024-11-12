import openai
from ..src.prompts.prompts_text import DEFAULT_PROMPT, COLLEGE_LECTURE_PROMPT, BUISINESS_CONFERENCE_PROMPT, MEETING_MINUTES_PROMPT

prompt = (
    "「{}」を、専門用語を使わずに簡単に説明してください。"
    "最大で3文以内にまとめてください。音声出力用に適しています。")

gpt_model = "gpt-4o-mini"
max_tokens=150
temperature=0.7

class OpenAIProcessor:
    def __init__(self):
        self.prompt = MEETING_MINUTES_PROMPT
        # self.prompt = DEFAULT_PROMPT
        
    def process_text_with_chatgpt(self, transcript):
        formatted_prompt = self._format_prompt(transcript)
        messages = self._set_messages(formatted_prompt)
        response = self._create_chat_completion(messages)
        
        return response.choices[0].message.content.strip()
    
    def _create_chat_completion(self, messages: list) -> any:
        return openai.chat.completions.create(
            model=gpt_model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature
        )

    def _format_prompt(self, transcript):
        return self.prompt.format(transcript)
    
    def _set_messages(self, content):
        return [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": content}
        ]
        