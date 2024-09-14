import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import time
import intel_extension_for_pytorch as ipex

# Intel GPUを指定
device = torch.device("gpu:0")  # Intel GPUを指定

model_name = "elyza/ELYZA-japanese-Llama-2-7b-instruct"

# MKL-DNNの確認
print(torch.backends.mkldnn.is_available())

# GPUが利用可能かの確認
print(torch.cuda.is_available())  # True なら GPU が利用可能
print(torch.cuda.current_device())  # 使用中のデバイス ID
print(torch.cuda.get_device_name(torch.cuda.current_device()))  # 使用中の GPU の名前

# モデルのロード
model = AutoModelForCausalLM.from_pretrained(model_name).to(device)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# 推論処理
start = time.time()

input_text = "AIを使って、テキスト生成を行います。"
inputs = tokenizer(input_text, return_tensors="pt").to(device)
outputs = model.generate(**inputs, max_length=50)

generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(generated_text)

fin = time.time()
deff = fin - start
print(f"実行時間: {deff}秒")
