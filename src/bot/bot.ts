import { Bot } from "grammy"; // Видалили webhookCallback, бо він не використовується

const bot = new Bot(process.env.BOT_TOKEN!);

bot.command("start", async (ctx) => {
  const webAppUrl = "https://telegram-coin-hev9vjl4q-vladholomahs-projects.vercel.app";

  try {
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
    console.log("Start command processed successfully");
  } catch (error) {
    console.error("Error processing start command:", error);
  }
});

bot.catch((err) => {
  console.error("Bot error:", err);
});

export default bot;