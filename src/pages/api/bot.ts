import { NextApiRequest, NextApiResponse } from "next";
import bot from "../../bot/bot";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      console.log("Received webhook:", req.body);
      await bot.handleUpdate(req.body);
      res.status(200).json({ ok: true });
    } else {
      console.log("Received non-POST request:", req.method);
      res.status(400).json({ error: "Only POST requests are allowed" });
    }
  } catch (error) {
    console.error("Error in webhook handler:", error);
    res.status(500).json({ error: String(error) });
  }
}