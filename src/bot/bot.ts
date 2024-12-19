import { Bot, Context } from "grammy";

const bot = new Bot<Context>(process.env.BOT_TOKEN!);

// Команда /start
bot.command("start", async (ctx) => {
  const webAppUrl = "https://your-vercel-url.vercel.app"; // Замінимо на реальний URL після деплою

  await ctx.reply("Welcome! Click the button below to start:", {
    reply_markup: {
      inline_keyboard: [[
        { text: "Play Now", web_app: { url: webAppUrl } }
      ]]
    }
  });
});

export default bot;