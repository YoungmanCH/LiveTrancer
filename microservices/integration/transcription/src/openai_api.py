import os
import openai
from langchain.prompts import PromptTemplate

class OpenAIProcessor:
    def __init__(self, model="gpt-4o-mini"):
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
