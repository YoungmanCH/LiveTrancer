from .. import text_transer
from .. import prompt


prompt = prompt.Prompt()
text_transer = text_transer.Text_Transer_GPT()

prompt_text = prompt.get_prompt("直線の通過領域問題を考えるときはファクシミリ論法も有効であるが、偏微分から包絡線を考えた方が楽であることの方が多い。", 3)
print(text_transer.process_text_with_chatgpt(prompt_text))

