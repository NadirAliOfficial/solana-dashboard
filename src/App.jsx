import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header.jsx'
import TokenCard from './components/TokenCard.jsx'

const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=solana-ecosystem&order=volume_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h'

export default function App() {
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('volume')

  const fetchTokens = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(COINGECKO_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setTokens(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError('Failed to load token data. CoinGecko may be rate-limiting. Please try again in a moment.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTokens()
    const interval = setInterval(fetchTokens, 60000)
    return () => clearInterval(interval)
  }, [fetchTokens])

  const filtered = tokens
    .filter((t) => {
      if (!search) return true
      const q = search.toLowerCase()
      return t.name.toLowerCase().includes(q) || t.symbol.toLowerCase().includes(q)
    })
    .sort((a, b) => {
      if (sortBy === 'volume') return (b.total_volume || 0) - (a.total_volume || 0)
      if (sortBy === 'marketcap') return (b.market_cap || 0) - (a.market_cap || 0)
      if (sortBy === 'price') return (b.current_price || 0) - (a.current_price || 0)
      if (sortBy === 'change') return (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
      return 0
    })

  return (
    <div className="app">
      <Header lastUpdated={lastUpdated} onRefresh={fetchTokens} loading={loading} />

      <div className="controls">
        <div className="search-wrap">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search tokens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-group">
          <span className="sort-label">Sort by:</span>
          {[
            { key: 'volume', label: '24h Volume' },
            { key: 'marketcap', label: 'Market Cap' },
            { key: 'price', label: 'Price' },
            { key: 'change', label: '24h Change' },
          ].map((s) => (
            <button
              key={s.key}
              className={`sort-btn ${sortBy === s.key ? 'active' : ''}`}
              onClick={() => setSortBy(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <main className="main">
        {loading && tokens.length === 0 && (
          <div className="state-box">
            <div className="spinner" />
            <p>Loading Solana tokens...</p>
          </div>
        )}

        {error && (
          <div className="state-box error">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>{error}</p>
            <button className="refresh-btn" onClick={fetchTokens}>Try Again</button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="state-box">
            <p>No tokens match your search.</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="token-grid">
            {filtered.map((token, i) => (
              <TokenCard key={token.id} token={token} rank={i + 1} />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <span>Data from CoinGecko · Buy links powered by Jupiter · Auto-refreshes every 60s</span>
      </footer>
    </div>
  )
}
