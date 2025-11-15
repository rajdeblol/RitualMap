let summonings = [];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const data = req.body;
  data.id = Date.now().toString();
  data.timestamp = Date.now();
  summonings.push(data);

  res.status(200).json({ success: true, data });
}
