import { Context } from "grammy";

export async function aiTherapistHandler(ctx: Context) {
  await ctx.answerCallbackQuery();
  await ctx.reply("Вы выбрали ИИ-психолога");
}
