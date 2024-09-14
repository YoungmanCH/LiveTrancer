from llama_cpp import Llama
from langchain.prompts import PromptTemplate
import torch


class Llama2():

    def __init__(self, valid_stream=True) -> None:
        self.llama = Llama(model_path="gguf-models/elyza.gguf/ELYZA-japanese-Llama-2-7B-instruct-F16.gguf", n_gpu_layers=50)
        self.valid_stream = valid_stream
        self.prompt = PromptTemplate(
            input_variables=["text"],
            template = "「{text}」内の専門用語を高校生にも分かりやすく解説しつつ、文章を要約してください。",
        )
        print('')
        print('Success to initialize LLM.')
        print('')

        if torch.cuda.is_available():
            print("GPU is available and being used.")
        else:
            print("GPU is not available. Running on CPU.")


    def get_translation(self, message):
        prompt_text = self.prompt.format(text=message)
        # response = self.llama.invoke(prompt_text)
        response = self.llama.create_chat_completion(
            [{"role": "user", "content": f"[INST] あなたは解説者です。\n\n{message}[/INST]"}], 
            stream=self.valid_stream
        )
        
        u = ""

        for chunk in response:
            if not "content" in chunk["choices"][0]["delta"]:
                continue
            word = chunk["choices"][0]["delta"]["content"]
            if word == None:
                break
            u += word
        
        # response_list = list(response)
        # us = response_list["choices"][0]["message"]["content"]
        self.llama.close()

        return u
        # return us


    def set_agent_utterance(self, agent_utterance):
        pass

