from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage, SystemMessage
import os
import time

# OpenAI APIキーを環境変数から取得
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# LANGCHAIN_API_KEY = os.environ["LANGCHAIN_API_KEY"]

class Text_Transer_OpenAI():
    def __init__(self) -> None:
        _model_name = "gpt-4o-mini"
        self.llm = ChatOpenAI(
            temperature=0.7,
            model_name=_model_name,
            streaming=True,
            openai_api_key=OPENAI_API_KEY,
            callbacks=[]  # LangSmith関連の機能を完全に無効化
        )
        self.prompt = PromptTemplate(
            input_variables=["text"],
            template="「{text}」を、専門用語を噛み砕きつつ高校生にも分かりやすいよう言い直してください。字数はあまり変えないで。想定としては音声出力をします。",
        )

    def get_translation(self, message):
        prompt_text = self.prompt.format(text=message)
        response = self.llm.invoke([
            SystemMessage(content="You are a commentator of user's text."),
            HumanMessage(content=prompt_text)
        ])
        print(response.content)

    def get_translation_stream(self, message):
        prompt_text = self.prompt.format(text=message)
        response = self.llm.invoke([
            SystemMessage(content="You are a commentator of user's text."),
            HumanMessage(content=prompt_text)
        ])
        
        final_text = ""
        for chunk in response.content:
            final_text += chunk
            print(chunk, end="")
        
        return final_text

    # def get_translation_stream(self, message):
    #     start = time.time()
    #     prompt_text = self.prompt.format(text=message)
    #     response = self.llm.invoke([
    #         SystemMessage(content="You are a commentator of user's text."),
    #         HumanMessage(content=prompt_text)
    #     ])
    #     for chunk in response.content:
    #         if 'B' in chunk:
    #             fin = time.time()
    #             print(f"<<time is :{fin - start:.3f}s>>")
    #         print('hello')
    #         print(chunk, end="")
