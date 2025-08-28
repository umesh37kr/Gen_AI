import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const chatCompleteion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `You are a smart personal assitent, who can answer the asked question
            you have access for following tools:
            1. webSearch({query}: {query: string}) //search the latest information and realtime data on the internet`,
      },
      {
        role: "user",
        content: "what is current weather of bangalore?",
        //"what is current weather of bangalore?",
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "webSearch",
          description: "Get the current weather in a given location",
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
  const toolsCall = chatCompleteion.choices[0].message.tool_calls;

  if (!toolsCall) {
    console.log("\n result:\n", chatCompleteion.choices[0].message.content);
    return;
  }

  for (const tools of toolsCall) {
    console.log("tools:", tools);
    const functionName = tools.function.name;
    const functionParams = tools.function.arguments;

    if (functionName === "webSearch") {
      const toosResult = await webSearch(JSON.parse(functionParams));
      console.log("toosResult:", toosResult);
    }
  }
  // console.log(
  //   "\n result:\n",
  //   JSON.stringify(chatCompleteion.choices[0].message, null, 2)
  // );
}

main();

async function webSearch({ query }) {
  console.log("calling web search....");
  return `this is hardcoded date for launching iphone 16 and that is 2015 DEC...`;
}
