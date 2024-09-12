import torch
from langchain_huggingface import HuggingFacePipeline
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

print('init')

model_name = "elyza/ELYZA-japanese-Llama-2-7b-instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype="auto",      # 自動で適切なデータ型を選択
    device_map="auto"        # 自動的に最適なデバイスに配置
)

pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_length=200,
    do_sample=True,
    temperature=0.7,
    top_p=0.9,
    repetition_penalty=1.2,
    truncation=True
)

llm = HuggingFacePipeline(pipeline=pipe)

prompt = "昔々あるところに"
inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True, max_length=200)

print('try response')
response = llm.invoke(prompt)
print(response)