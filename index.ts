import { Bot } from "grammy";
import { startKeyboard } from "./keyboards";
import { aiTherapistHandler } from "./callback-handlers";

const BOT_API = process.env.BOT_API || "";

export const bot = new Bot(BOT_API);

bot.command("start", async (ctx) => {
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
