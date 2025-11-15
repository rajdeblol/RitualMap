let summonings = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    data.id = Date.now() + Math.random().toString(36).substr(2, 5);
    summonings.push(data);
    res.status(200).json({ success: true, data }); // ← CRITICAL
  } else {
    res.status(405).end();
  }
}
