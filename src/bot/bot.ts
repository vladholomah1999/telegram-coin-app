import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN!);

// Команда /start
bot.command("start", async (ctx) => {
  const webAppUrl = "https://telegram-coin-5gvtbb7i6-vladholomahs-projects.vercel.app"; // Ваш URL з Vercel

  await ctx.reply("Welcome to Coin App! Click the button below to start:", {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "🚀 Launch App",
          web_app: { url: webAppUrl }
        }
      ]]
    }
  });
});

export default bot;