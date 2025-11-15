let summonings = []; // In-memory (resets on cold start, but polling + localStorage handles it)

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json(summonings);
}
