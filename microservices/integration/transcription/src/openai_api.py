# openai_api.py
import openai
import os
from langchain.prompts import PromptTemplate

# OpenAIのAPIキーを環境変数から取得
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

class OpenAIProcessor:
    def __init__(self, model="gpt-4"):
        self.model = model

    def process_text(self, text):
        print('processing')
        response = openai.Completion.create(
            engine=self.model,
            prompt = PromptTemplate(
            input_variables=["text"],
            template="「{text}」を、専門用語を噛み砕きつつ高校生にも分かりやすいよう言い直してください。字数はあまり変えないで。想定としては音声出力をします。",
        ),
            max_tokens=100,
            temperature=0.7
        )
        return response.choices[0].text.strip()
