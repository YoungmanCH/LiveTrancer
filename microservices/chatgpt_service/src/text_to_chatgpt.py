import openai

prompt = (
    "「{}」を、専門用語を噛み砕きつつ高校生にも分かりやすいよう言い直してください。"
    "字数はあまり変えないで。想定としては音声出力をします。")
gpt_model = "gpt-4o-mini"
max_tokens=150
temperature=0.7

class OpenAIProcessor:
    def process_text_with_chatgpt(self, transcript):
        formatted_prompt = self._format_prompt(transcript)
        messages = self._set_messages(formatted_prompt)

        response = openai.chat.completions.create(
            model=gpt_model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature
        )
        
        return response.choices[0].message.content.strip()

    def _format_prompt(self, transcript):
        return prompt.format(transcript)
    
    def _set_messages(self, content):
        return [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": content}
        ]
        