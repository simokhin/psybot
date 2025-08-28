import { Bot } from "grammy";
import { startKeyboard } from "./keyboards";
import { aiTherapistHandler } from "./callback-handlers";
import { prisma } from "./prisma";
import type { User } from "./types";
import { createUser } from "./queries";

const BOT_API = process.env.BOT_API || "";

export const bot = new Bot(BOT_API);

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

bot.on("message", (ctx) => ctx.reply("You said: " + ctx.message.text));

// callback handlers
bot.callbackQuery("ai-therapist", aiTherapistHandler);

bot.start();
