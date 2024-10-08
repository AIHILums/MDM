# Prediction interface for Cog ⚙️
# https://cog.run/python

from cog import BasePredictor, Input, Path
import torch
from peft import PeftModel
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import regex as re

class Predictor(BasePredictor):
    def setup(self) -> None:
        """Load the model into memory to make running multiple predictions efficient"""
        # self.model = torch.load("./weights.pth")
        self.model = AutoModelForCausalLM.from_pretrained("julycodes/gemma-assessment-plan-finetune-test")
        self.tokenizer = AutoTokenizer.from_pretrained("julycodes/gemma-assessment-plan-finetune-test")
        self.model.to("cuda")
        self.tokenizer.pad_token = self.tokenizer.eos_token
        self.tokenizer.padding_side = "right"

    def preprocess_input(self,input_text):
        prompt_template = """
          <start_of_turn>user
          Below is an instruction that describes a task. Write a response that appropriately completes the request. 
          {query}
          <end_of_turn>\n<start_of_turn>model
        """
        query = "For each problem given, generate a specific clinical plan, including lifestyle advice, medications with dosage and strength, and tests advised. here are the inputs " + input_text
        return prompt_template.format(query=query)

    def predict(
        self,
        prompt: str = Input(description="Enter the problems and their assessments"),
    ) -> Path:
        """Run a single prediction on the model"""
        # self.model.eval()
        processed_input = self.preprocess_input(prompt)
        encodeds = self.tokenizer(processed_input, return_tensors="pt", add_special_tokens=True)
        encodeds = encodeds.to("cuda")
        return self.tokenizer.decode(self.model.generate(**encodeds, do_sample=True, pad_token_id=self.tokenizer.eos_token_id, max_new_tokens=1024)[0], skip_special_tokens=True)
        # processed_input = preprocess(image)
        # output = self.model(processed_image, scale)
        # return postprocess(output)

