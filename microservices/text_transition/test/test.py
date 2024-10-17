from .. import text_transer
from .. import prompt


prompt = prompt.Prompt()
text_transer = text_transer.Text_Transer_GPT()

prompt_text = prompt.get_prompt("BtoBではなくBtoCの方向で考えよう", 2)
print(text_transer.process_text_with_chatgpt(prompt_text))

