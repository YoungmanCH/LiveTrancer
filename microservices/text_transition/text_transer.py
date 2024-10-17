import os
from dotenv import load_dotenv
import openai

# class Text_Transer_GPT_Base():
#     def __init__(self, template_) -> None:
#         load_dotenv()
#         _openai_api_key = os.getenv("OPENAI_API_KEY")
#         _model_name = "gpt-4o-mini" #turboよりちょっと早い? お気持ちレベル
#         self.llm = ChatOpenAI(
#             temperature = 0.7,
#             model_name = _model_name,
#             max_tokens = 50,
#             streaming = True,
#             callbacks = [StreamCallBackHandler.StreamCallBackHandler(self)],
#             openai_api_key = _openai_api_key
#         )

#         self.prompt = PromptTemplate(
#             input_variables = ["text", "history"],
#             template = template_
#         )

#         self.history = ''
#         self.result = []

#     def transe_text(self, text):
#         self.history = self.llm.invoke(text)

#     def start_translation(self, message):
#         prompt_text = self.prompt.format(text = message, history = self.history)
#         transer_thread = threading.Thread(target=self.transe_text(prompt_text))
#         transer_thread.start()

#     def get_translation(self):
#         if self.result is None:
#             return ''
#         text = ''
#         for chunk in self.result:
#             text += chunk
#         self.result = []
#         return text


# class Term_Transer_GPT(Text_Transer_GPT_Base):
#     def __init__(self) -> None:
#         template = "字数はあまり変えないまま、「{text}」を、専門用語を噛み砕きつつ高校生にも分かりやすいよう言い直してください。音声出力をしたいので、余計な応答や「」は不要です。なお、今回出力する文は{history}の続きの文です。違和感なく繋がるような文を生成してください。"
#         super().__init__(template)


# class Mild_Transer_GPT(Text_Transer_GPT_Base):
#     def __init__(self) -> None:
#         template = "字数や意味合いはあまり変えないまま、「{text}」を、聞き手の気分をあまり害さないように言い直してください。音声出力をしたいので、余計な応答や「」は不要です。なお、今回出力する文は{history}の続きの文です。違和感なく繋がるような文を生成してください。"
#         super().__init__(template)


class Text_Transer_GPT():
    def __init__(self):
        load_dotenv()
        _openai_api_key = os.getenv("OPENAI_API_KEY")
        self._model_name = "gpt-4o-mini" #turboよりちょっと早い? お気持ちレベル


    def process_text_with_chatgpt(self, prompt):
        response = openai.chat.completions.create(
            model=self._model_name,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        # ChatGPTからの生成テキストを取得
        return response.choices[0].message.content.strip()