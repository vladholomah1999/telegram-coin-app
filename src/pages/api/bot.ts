import type { NextApiRequest, NextApiResponse } from 'next';
import bot from '../../bot/bot';

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const startTime = new Date().toISOString();
  console.log(`[${startTime}] Received ${req.method} request to /api/bot`);

  try {
    if (req.method === 'POST') {
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      await bot.handleUpdate(req.body);
      console.log(`[${startTime}] Successfully handled update`);
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'GET') {
      return res.status(200).json({
        status: 'ok',
        timestamp: startTime,
        bot: 'active'
      });
    }

    console.log(`[${startTime}] Method not allowed: ${req.method}`);
    return res.status(405).json({
      error: 'Method not allowed',
      method: req.method
    });
  } catch (error) {
    console.error(`[${startTime}] Error:`, error);
    return res.status(500).json({
      error: String(error),
      timestamp: startTime
    });
  }
}