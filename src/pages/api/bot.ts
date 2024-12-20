import type { NextApiRequest, NextApiResponse } from 'next';
import bot from '../../bot/bot';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Повертаємо OK для OPTIONS запитів (CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Для POST запитів від Telegram
  if (req.method === 'POST') {
    try {
      // Логуємо тіло запиту
      console.log('Webhook request body:', req.body);

      // Передаємо оновлення боту
      await bot.handleUpdate(req.body);

      // Відповідаємо успіхом
      return res.status(200).json({ ok: true });
    } catch (error) {
      // Логуємо помилку
      console.error('Webhook error:', error);
      return res.status(200).json({ ok: true }); // Все одно відповідаємо 200 для Telegram
    }
  }

  // Для GET запитів повертаємо статус
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok' });
  }
}