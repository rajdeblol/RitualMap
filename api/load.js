let summonings = []; // In-memory (use Vercel KV for prod persistence)

export default function handler(req, res) {
  res.status(200).json(summonings || []);
}
