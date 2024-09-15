from langchain_huggingface import HuggingFacePipeline
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage, SystemMessage


class Text_Transer_Llama3():
    def __init__(self) -> None:
        print('init')
        model_name = "elyza/ELYZA-japanese-Llama-2-7b-instruct"
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype="auto",
            device_map="auto"
        )
        print('model initialized')
        pipe = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_length=500,
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
        repetition_penalty=1.2,
        truncation=True
        )
        print('pipeline initialized')

        self.llm = HuggingFacePipeline(pipeline = pipe)
        self.prompt = PromptTemplate(
            input_variables=["text"],
            template = "「{text}」内の専門用語を高校生にも分かりやすく解説しつつ、文章を要約してください。",
        )
        print('all initialized')

    def get_translation(self, message):
        print('try get response')
        prompt_text = self.prompt.format(text=message)
        print('reshape prompt')
        try:
            response = self.llm.invoke(prompt_text)
            print('got response')
        except Exception as e:
            print(f"Error: {e}")

        return response


