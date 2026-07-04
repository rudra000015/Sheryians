import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
    model: "mistral-large-latest",
    temperature: 0
});
export async function testAi() {

  await model.invoke("where is kalyani colony located in meerut?").then((response) => {
        console.log(response.text);
    })
}

