import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const links = [
  "https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47",
  "https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V",
  "https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK",
  "https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ",
  "https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC"
];

export default async function handler(req, res) {
  try {
    let clicks = await redis.get("clicks");
    clicks = clicks ? parseInt(clicks) : 0;

    const nextIndex = clicks % links.length;
    const nextLink = links[nextIndex];

    await redis.set("clicks", clicks + 1);

    res.writeHead(302, { Location: nextLink });
    res.end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
}
