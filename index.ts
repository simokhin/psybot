import { Bot } from "grammy";

const BOT_API = process.env.BOT_API || "";

const bot = new Bot(BOT_API);

bot.command("start", (ctx) => ctx.reply("Hello! I am your bot."));

bot.on("message", (ctx) => ctx.reply("You said: " + ctx.message.text));

bot.start();
