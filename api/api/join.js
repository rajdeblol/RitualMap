import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      data.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
      data.timestamp = Date.now();
      // Append to KV list (persistent)
      await kv.rpush('summonings', JSON.stringify(data));
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to join' });
    }
  } else {
    res.status(405).end();
  }
}
