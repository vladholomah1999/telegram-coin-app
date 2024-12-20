import type { NextApiRequest, NextApiResponse } from 'next';
import bot from '../../bot/bot';

// Створюємо секретний токен
const secretToken = process.env.BOT_TOKEN?.split(':')[1] || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Для GET запитів повертаємо простий статус
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok' });
  }

  // Для POST запитів обробляємо вебхук
  if (req.method === 'POST') {
    try {
      console.log('Received webhook:', JSON.stringify(req.body, null, 2));
      await bot.handleUpdate(req.body);
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Webhook error:', error);
      return res.status(500).json({ error: String(error) });
    }
  }

  // Для всіх інших методів
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}