import { useState, useEffect } from 'react'

export default function Header({ lastUpdated, onRefresh, loading }) {
  const [solPrice, setSolPrice] = useState(null)

  useEffect(() => {
    fetchSolPrice()
    const interval = setInterval(fetchSolPrice, 60000)
    return () => clearInterval(interval)
  }, [])

  async function fetchSolPrice() {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true'
      )
      const data = await res.json()
      setSolPrice(data.solana)
    } catch {
      // silent fail
    }
  }

  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--'

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <svg width="32" height="32" viewBox="0 0 397.7 311.7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <linearGradient id="sol-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9945FF"/>
              <stop offset="100%" stopColor="#14F195"/>
            </linearGradient>
            <path fill="url(#sol-grad)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm0-164.2c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zM333.1 3.8c-2.4-2.4-5.7-3.8-9.2-3.8H6.5C.7 0-2.2 7 1.9 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1L333.1 3.8z"/>
          </svg>
          <span>Solana Dashboard</span>
        </div>
        <div className="subtitle">Top 20 tokens by 24h volume</div>
      </div>
      <div className="header-right">
        {solPrice && (
          <div className="sol-price">
            <span className="sol-label">SOL</span>
            <span className="sol-value">${solPrice.usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className={`sol-change ${solPrice.usd_24h_change >= 0 ? 'positive' : 'negative'}`}>
              {solPrice.usd_24h_change >= 0 ? '+' : ''}{solPrice.usd_24h_change?.toFixed(2)}%
            </span>
          </div>
        )}
        <div className="refresh-area">
          <span className="last-updated">Updated {timeStr}</span>
          <button className="refresh-btn" onClick={onRefresh} disabled={loading}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={loading ? 'spinning' : ''}>
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>
    </header>
  )
}
