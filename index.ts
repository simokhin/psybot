import { Bot } from "grammy";
import { startKeyboard } from "./keyboards";
import { aiTherapistHandler } from "./callback-handlers";
import type { User } from "./types";
import { createUser, saveMessage } from "./queries";
import { getResponse } from "./ai";
import { prisma } from "./prisma";

const BOT_API = process.env.BOT_API;
if (!BOT_API) {
  throw new Error("BOT_API is not defined");
}

export const bot = new Bot(BOT_API);

// command handlers
bot.command("start", async (ctx) => {
  const user: User = {
    telegramId: ctx.from?.id?.toString() || "",
    username: ctx.from?.username || "",
    firstName: ctx.from?.first_name || "",
    lastName: ctx.from?.last_name || "",
  };

  await createUser(user);

  await ctx.reply(
    `Привет, ${ctx.from?.first_name}! 🙂\n\nЯ твой бот-психолог.`,
    {
      reply_markup: startKeyboard,
    }
  );
});

// message handlers
bot.on("message", async (ctx) => {
  const userId = ctx.from?.id?.toString() || "";

  // save user message
  const message: string = ctx.message.text || "";
  await saveMessage(userId, "user", message);

  // get and save AI response
  const response = await getResponse(userId, message);
  await saveMessage(userId, "assistant", response);

  // reply to user with ai response
  await ctx.reply("AI: " + response);
});

// callback handlers
bot.callbackQuery("ai-therapist", aiTherapistHandler);

bot.start();
console.log("Bot started");
