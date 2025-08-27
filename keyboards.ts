import { InlineKeyboard } from "grammy";

export const startKeyboard = new InlineKeyboard()
  .text("ИИ-психолог", "ai-therapist")
  .row()
  .text("Дневник мыслей", "diary")
  .text("ИИ-анализ мысли", "thought-analysis")
  .row()
  .text("Анализ сессии", "session-analysis")
  .row()
  .text("Анализ сновидения", "dream-analysis");
