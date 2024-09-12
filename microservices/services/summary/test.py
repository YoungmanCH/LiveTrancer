from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
import time
import textTrancer_OpenAI
import textTrancer_llama3
import test2


# text_transer = textTrancer_OpenAI.Text_Transer_OpenAI()
# text_transer = textTrancer_llama3.Text_Transer_Llama3()
text_transer = test2.Llama2()


start = time.time()

sample_text = "Buildxを使うことで、異なるアーキテクチャ（例：linux/arm64 や linux/ppc64le など）に向けたイメージもビルド可能で、クロスプラットフォームのビルドに特化しています。"
print(text_transer.get_translation(sample_text))

end = time.time()
diff = end - start
print('')
print('Chat time is ...')
print(diff, ' second')