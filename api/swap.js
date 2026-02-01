import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { route, userPublicKey } = req.body;

  const r = await fetch("https://quote-api.jup.ag/v6/swap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      route,
      userPublicKey,
      wrapUnwrapSOL: true
    })
  });

  const d = await r.json();
  res.json({ swapTransaction: d.swapTransaction });
}
