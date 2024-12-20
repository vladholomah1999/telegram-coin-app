import type { NextApiRequest, NextApiResponse } from 'next';
import bot from '../../bot/bot';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Додаємо базову перевірку
  const telegramToken = req.headers['x-telegram-bot-api-secret-token'];

  if (req.method === 'POST') {
    try {
      console.log('Received webhook payload:', req.body);
      await bot.handleUpdate(req.body);
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Error in webhook handler:', error);
      return res.status(500).json({ error: String(error) });
    }
  }

  // Додаємо тестовий GET endpoint
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'Bot webhook is running' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}