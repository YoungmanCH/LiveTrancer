# python
from llama_cpp import Llama
from langchain.prompts import PromptTemplate


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


    def get_translation(self, message):
        prompt_text = self.prompt.format(text=message)
        # response = self.llama.invoke(prompt_text)
        response = self.llama.create_chat_completion(
            [{"role": "user", "content": f"[INST] あなたは解説者です。\n\n{message}[/INST]"}], 
            stream=self.valid_stream
        )
        
        self.llama.close()

        # u = ""

        # for chunk in response:
        #     if not "content" in chunk["choices"][0]["delta"]:
        #         continue
        #     word = chunk["choices"][0]["delta"]["content"]
        #     if word == None:
        #         break
        #     u += word


        # return u
        return response

    def set_agent_utterance(self, agent_utterance):
        pass

