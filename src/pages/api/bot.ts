import type { NextApiRequest, NextApiResponse } from 'next';
import bot from '../../bot/bot';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Обробляємо POST запити від Telegram
  if (req.method === 'POST') {
    try {
      console.log('Received webhook:', req.body);
      await bot.handleUpdate(req.body);
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Error in webhook handler:', error);
      return res.status(500).json({ error: String(error) });
    }
  }

  // Для всіх інших запитів повертаємо OK
  return res.status(200).json({ status: 'ok' });
}