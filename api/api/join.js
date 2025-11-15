let summonings = []; // Shared in-memory

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    data.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    data.timestamp = Date.now();
    summonings.push(data);
    res.status(200).json({ success: true, data });
  } else {
    res.status(405).end();
  }
}
