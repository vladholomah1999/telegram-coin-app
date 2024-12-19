import { NextApiRequest, NextApiResponse } from "next";
import bot from "../../bot/bot";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      await bot.handleUpdate(req.body);
      res.status(200).json({ ok: true });
    } else {
      res.status(400).json({ error: "Only POST requests are allowed" });
    }
  } catch (error) {
    console.error("Error in bot handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}