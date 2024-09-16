from langchain.callbacks.base import BaseCallbackHandler
import time

class StreamCallBackHandler(BaseCallbackHandler):
    def __init__(self, text_transer)->None:
        print('Handler is initialized.')
        self.tokens = []
        self.text_transer = text_transer

    def on_chat_model_start(self, serialized, messages, **kwargs) -> None:
        self.tokens = []
        # self.start = time.time()
        # self.a = None

    def on_llm_new_token(self, token: str, **kwargs) -> None:
        self.tokens.append(token)
        # if not self.a:
        #     fin = time.time()
        #     print(f"<<time is : {fin - self.start:.3f}s>>")
        #     self.a = 1
        print(f"{token}", end="")

    # def on_llm_start(self, serialized, prompts, **kwargs) -> None:
    #     self.start = time.time()
    #     self.a = None

