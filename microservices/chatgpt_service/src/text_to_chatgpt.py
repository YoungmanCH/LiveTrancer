import openai
# from langchain.prompts import PromptTemplate

def process_text_with_chatgpt(transcript):
    """ChatGPT 4-omniを使用して、テキストを加工する関数"""
    prompt = (
        "「{}」を、専門用語を噛み砕きつつ高校生にも分かりやすいよう言い直してください。"
        "字数はあまり変えないで。想定としては音声出力をします。"
    ).format(transcript)

    # ChatCompletion.create を使用
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150,
        temperature=0.7
    )
    
    # ChatGPTからの生成テキストを取得
    return response.choices[0].message.content.strip()

# class OpenAIProcessor:
#     def __init__(self, model="gpt-4o-mini"):
#         self.model = model

#     def process_text(self, text):
#         print('processing')
#         response = openai.Completion.create(
#             engine=self.model,
#             prompt = PromptTemplate(
#             input_variables=["text"],
#             template="「{text}」を、専門用語を噛み砕きつつ高校生にも分かりやすいよう言い直してください。字数はあまり変えないで。想定としては音声出力をします。",
#         ),
#             max_tokens=100,
#             temperature=0.7
#         )
#         return response.choices[0].text.strip()
