from langchain.prompts import PromptTemplate


class Prompt():
    def __init__(self):
        self.prompts = [
            '字数はあまり変えないまま、「{text}」を、専門用語を噛み砕きつつ高校生にも分かりやすいよう言い直してください。音声出力をしたいので、余計な応答や「」は不要です。',
            '字数や意味合いはあまり変えないまま、「{text}」を、聞き手の気分をあまり害さないように言い直してください。音声出力をしたいので、余計な応答や「」は不要です。',
            'ビジネス会議の最中です。字数や意味合いはあまり変えないまま、「{text}」をあまりビジネス用語の詳しくない人でもわかるように言い換えてください。音声出力をしたいので、余計な応答や「」は不要です。',
            'とある講義中です。意味合いはあまり変えないまま、「{text}」を、各用語を嚙み砕きつつ高校一年生にも分かりやすいように言い直してください。音声出力をしたいので、余計な応答や「」は不要です。',
            '友人との会話中です。字数や意味合いはあまり変えないまま、「{text}」の難しい言葉を噛み砕きつつ高校生にも分かりやすいように言い直してください、音声出力をしたいので、余計な応答や「」は不要です。'
        ]

    def get_prompt(self, transcript, number): # flag変数…。
        self.prompt = PromptTemplate(
            input_variables = ["text"],
            template = self.prompts[number]
        )
        return self.prompt.format(text = transcript)
