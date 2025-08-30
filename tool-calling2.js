import { tavily } from "@tavily/core";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

async function main() {
  const messages = [
    {
      role: "system",
      content: `You are a smart personal assitent, who can answer the asked question
            you have access for following tools:
            1. webSearch({query}: {query: string}) //search the latest information and realtime data on the internet`,
    },
    {
      role: "user",
      content: "what is current weather of bangalore?",
      //   when was Iphone 16 launched?
      //"what is current weather of bangalore?",
    },
  ];

  while (true) {
    const chatCompleteion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: messages,
      tools: [
        {
          type: "function",
          function: {
            name: "webSearch",
            description:
              "search the latest information and realtime data on the internet",
            //search the latest information and realtime data on the internet
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query to perform search on",
                },
              },
              required: ["query"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    messages.push(chatCompleteion.choices[0].message);
    const toolsCall = chatCompleteion.choices[0].message.tool_calls;

    if (!toolsCall) {
      console.log("Assistant:", chatCompleteion.choices[0].message.content);
      break;
    }

    for (const tools of toolsCall) {
      //   console.log("tools:", tools);
      const functionName = tools.function.name;
      const functionParams = tools.function.arguments;

      if (functionName === "webSearch") {
        const toosResult = await webSearch(JSON.parse(functionParams));
        // console.log("toosResult:", toosResult);
        messages.push({
          tool_call_id: tools.id,
          role: "tool",
          name: functionName,
          content: toosResult,
        });
      }
    }
  }
}

main();

async function webSearch({ query }) {
  console.log("calling web search....");
  const response = await tvly.search(query);
  return response.results.map((result) => result.content).join("\n\n");
}
