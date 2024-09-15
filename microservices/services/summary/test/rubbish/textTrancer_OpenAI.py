from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage, SystemMessage


class Text_Transer_OpenAI():
    def __init__(self) -> None:
        _model_name = "gpt-4o-mini"
        # _model_name = "gpt-3.5-turbo" #早め。3秒前後
        # _model_name = "gpt-4" //遅い。10秒前後になります。
        self.llm = ChatOpenAI(temperature = 0.9, model_name = _model_name)
        self.prompt = PromptTemplate(
            input_variables=["text"],
            template = "「{text}」内の専門用語を高校生にも分かりやすく解説しつつ、文章を要約してください。",
        )

    def get_translation(self, message):
        prompt_text = self.prompt.format(text=message)

        response = self.llm.invoke([
            SystemMessage(content="You are a commentator of user's text."),
            HumanMessage(content=prompt_text)
        ])
        return response.content



    

    





