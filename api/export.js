import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    const keys = await kv.lrange('entries', 0, -1);

    const values = await Promise.all(
      keys.map(async (key) => ({
        key,
        value: await kv.get(key),
      }))
    );

    res.status(200).json(values);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
