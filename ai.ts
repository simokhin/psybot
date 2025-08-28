import OpenAI from "openai";
import { getUserMessages } from "./queries";
import { therapistPrompt } from "./prompts";

export async function getResponse(userId: string, prompt: string) {
  const url = process.env.CLOUDRU_URL;
  const api = process.env.CLOUDRU_API;

  if (!url || !api) {
    throw new Error("URL and API environment variables must be defined");
  }

  const openai = new OpenAI({
    baseURL: url,
    apiKey: api,
  });

  const model = "deepseek-ai/DeepSeek-R1-Distill-Llama-70B";

  // get user messages and map them
  const messages = await getUserMessages(userId);
  const context = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const systemPrompt = therapistPrompt;

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...context,
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0]?.message?.content ?? "No response from API";
}
