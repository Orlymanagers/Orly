import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://growing-teal-43802.upstash.io',
  token: 'AasaAAIjcDE0MmUyY2U3ZWQ5Y2E0Nzg0YWVkMjYxNjM1ODEzNzgzYXAxMA',
});

const groups = [
  'https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47',
  'https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V',
  'https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK',
  'https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ',
  'https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC',
];

export default async function handler(req, res) {
  const key = 'clicks';
  let current = await redis.get(key);
  if (!current) current = 0;
  const index = current % groups.length;
  await redis.set(key, Number(current) + 1);
  res.writeHead(302, { Location: groups[index] });
  res.end();
}
