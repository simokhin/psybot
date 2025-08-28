import OpenAI from "openai";
import { getUserMessages } from "./queries";

export async function getResponse(userId: string, prompt: string) {
  const openai = new OpenAI({
    baseURL: process.env.CLOUDRU_URL,
    apiKey: process.env.CLOUDRU_API,
  });

  const messages = await getUserMessages(userId);
  const context = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const completion = await openai.chat.completions.create({
    model: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
    messages: [
      ...context,
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices?.[0]?.message?.content ?? "No response";
}
