import fetch from 'node-fetch';

const DERIV_API_URL = 'https://api.deriv.com/api/v1';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, symbol, trade_type, amount } = req.body;

  if (!token || !symbol || !trade_type || !amount) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const shouldTrade = Math.random() > 0.3;

    if (!shouldTrade) {
      return res.status(200).json({ message: 'Trade skipped based on strategy' });
    }

    // Uncomment and use real API call when ready
    /*
    const response = await fetch(`${DERIV_API_URL}/trade`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DERIV_API_TOKEN || token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symbol, trade_type, amount }),
    });
    const tradeResult = await response.json();
    */

    // Placeholder response
    const tradeResult = {
      id: `trade_${Date.now()}`,
      symbol,
      trade_type,
      amount,
      status: 'success',
      profit: Math.random() * 100 - 50,
      timestamp: Date.now(),
    };

    res.status(200).json(tradeResult);
  } catch (error) {
    res.status(500).json({ error: 'Failed to execute trade', details: error.message });
  }
}
