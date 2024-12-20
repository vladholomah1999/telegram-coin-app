import { Bot } from "grammy";

if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not defined");
}

const bot = new Bot(process.env.BOT_TOKEN);

// Додаємо логування всіх оновлень
bot.use(async (ctx, next) => {
  const updateTime = new Date().toISOString();
  console.log(`[${updateTime}] Received update:`, JSON.stringify(ctx.update, null, 2));
  await next();
  console.log(`[${updateTime}] Handled update`);
});

// Обробник команди /start
bot.command("start", async (ctx) => {
  console.log("Start command received from:", ctx.from);

  try {
    await ctx.reply("Testing bot response...");
    console.log("Basic reply sent successfully");

    const webAppUrl = "https://telegram-coin-app-git-master-vladholomahs-projects.vercel.app";

    await ctx.reply("Welcome to Coin App! Click the button below to start:", {
      reply_markup: {
        inline_keyboard: [[
          { text: "🚀 Launch App", web_app: { url: webAppUrl } }
        ]]
      }
    });
    console.log("Web app button sent successfully");
  } catch (error) {
    console.error("Error in start command:", error);
  }
});

// Додаємо обробник помилок
bot.catch((err) => {
  const errorTime = new Date().toISOString();
  console.error(`[${errorTime}] Bot error:`, err);
});

export default bot;