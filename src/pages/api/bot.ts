import { NextApiRequest, NextApiResponse } from "next";
import bot from "../../bot/bot";

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Дозволяємо запити від Telegram
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "POST") {
      console.log("Received update:", JSON.stringify(req.body, null, 2));
      await bot.handleUpdate(req.body);
      res.status(200).json({ ok: true });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: String(error) });
  }
}