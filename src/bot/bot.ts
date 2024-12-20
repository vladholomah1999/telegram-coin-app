import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN || "");

bot.use(async (ctx, next) => {
  console.log('Received update:', ctx.update);
  await next();
});

bot.command("start", async (ctx) => {
  console.log("Start command received");
  try {
    const webAppUrl = "https://telegram-coin-5gvtbb7i6-vladholomahs-projects.vercel.app";
    await ctx.reply("🎮 Welcome to Coin App!", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 Launch App", web_app: { url: webAppUrl } }]
        ]
      }
    });
    console.log("Reply sent successfully");
  } catch (error) {
    console.error("Error in start command:", error);
  }
});

bot.on("message", async (ctx) => {
  console.log("Received message:", ctx.message);
});

bot.catch((err) => {
  console.error("Bot error:", err);
});

export default bot;