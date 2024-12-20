import type { NextApiRequest, NextApiResponse } from 'next';
import bot from '../../bot/bot';

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not set');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Received webhook:', req.body);
      await bot.handleUpdate(req.body);
      console.log('Update handled successfully');
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Error handling update:', error);
      return res.status(500).json({ error: String(error) });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: 'Bot webhook is active' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}