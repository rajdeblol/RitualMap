import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    // Fetch all from KV (persistent list)
    const rawData = await kv.lrange('summonings', 0, -1);
    const summonings = rawData.map(item => JSON.parse(item));
    res.status(200).json(summonings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load' });
  }
}
