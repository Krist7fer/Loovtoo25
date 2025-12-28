import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: 'No data received' });
    }

    const key = `entry:${Date.now()}`;

    await kv.set(key, data);

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
