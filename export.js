import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    const keys = await kv.keys('entry:*');
    const data = await Promise.all(keys.map(key => kv.get(key)));

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data, null, 2));
}