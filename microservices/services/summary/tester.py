import threading
import time
import textTrancer_GPT


class Tester():
    def __init__(self) -> None:
        self.text_transer = textTrancer_GPT.Term_Transer_GPT()
        self.can_test = False
        self.transe_thread = threading.Thread(target=self.get_response) 

    def start_test(self):
        self.can_test = True
        self.transe_thread.start()

    def finish_test(self):
        self.can_test = False

    def add_message(self, message):
        self.text_transer.start_translation(message)

    def get_response(self):
        while self.can_test:
            time.sleep(1)
            # print('1 ')
            response = self.text_transer.get_translation()

            print(response, end="")

                            
