import type { NextApiRequest, NextApiResponse } from 'next';
import bot from '../../bot/bot';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Додаємо CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

  // Для OPTIONS запитів (CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Для всіх інших методів
  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}