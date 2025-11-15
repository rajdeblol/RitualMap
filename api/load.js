let summonings = []; // In-memory (polling + localStorage handles resets)

export default function handler(req, res) {
  res.status(200).json(summonings);
}
