from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage, SystemMessage
import StreamCallbackHandler
import threading
import os
from dotenv import load_dotenv

class Text_Transer_GPT_Base():
    def __init__(self, template_) -> None:
        load_dotenv()
        _openai_api_key = os.getenv("OPENAI_API_KEY")
        _model_name = "gpt-4o-mini" #turboよりちょっと早い? お気持ちレベル
        # _model_name = "gpt-3.5-turbo" #早め。3秒前後
        _handler = StreamCallbackHandler.StreamCallBackHandler(self)
        self.llm = ChatOpenAI(
            temperature = 0.7,
            model_name = _model_name,
            streaming = True,
            callbacks = [_handler],
            openai_api_key = _openai_api_key
        )

        self.prompt = PromptTemplate(
            input_variables = ["text", "history"],
            template = template_
        )

        self.history = ''

        print('GPT is initialized.')

    def transe_text(self, text):
        self.history = self.llm.invoke(text)

    def get_translation(self, message):
        prompt_text = self.prompt.format(text = message, history = self.history)
        transer_thread = threading.Thread(target=self.transe_text(prompt_text))
        transer_thread.start()


class Term_Transer_GPT(Text_Transer_GPT_Base):
    def __init__(self) -> None:
        template = "字数はあまり変えないまま、「{text}」を、専門用語を噛み砕きつつ高校生にも分かりやすいよう言い直してください。音声出力をしたいので、余計な応答や「」は不要です。なお、今回出力する文は{history}の続きの文です。違和感なく繋がるような文を生成してください。"
        super().__init__(template)



class Mild_Transer_GPT(Text_Transer_GPT_Base):
    def __init__(self) -> None:
        template = "字数や意味合いはあまり変えないまま、「{text}」を、聞き手の気分をあまり害さないように言い直してください。音声出力をしたいので、余計な応答や「」は不要です。なお、今回出力する文は{history}の続きの文です。違和感なく繋がるような文を生成してください。"
        super().__init__(template)

        

