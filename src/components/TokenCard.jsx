import { TOKEN_SOCIALS, TOKEN_MINTS } from '../data/tokenData.js'

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.727-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.11 18.1.13 18.114a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

function WebsiteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

function JupiterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  )
}

function formatPrice(price) {
  if (price === null || price === undefined) return '--'
  if (price < 0.000001) return `$${price.toExponential(2)}`
  if (price < 0.01) return `$${price.toFixed(6)}`
  if (price < 1) return `$${price.toFixed(4)}`
  if (price < 100) return `$${price.toFixed(2)}`
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatLargeNum(num) {
  if (!num) return '--'
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
  return `$${num.toFixed(2)}`
}

export default function TokenCard({ token, rank }) {
  const socials = TOKEN_SOCIALS[token.id] || {}
  const mintAddress = TOKEN_MINTS[token.id]

  const change = token.price_change_percentage_24h
  const isPositive = change >= 0

  const buyUrl = mintAddress
    ? `https://jup.ag/swap/SOL-${mintAddress}`
    : `https://jup.ag/swap/SOL-${token.symbol.toUpperCase()}`

  const hasSocials = socials.twitter || socials.telegram || socials.discord || socials.website

  return (
    <div className="token-card">
      <div className="card-rank">#{rank}</div>

      <div className="card-header">
        <div className="token-identity">
          <div className="token-logo-wrap">
            <img
              src={token.image}
              alt={token.name}
              className="token-logo"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="token-logo-fallback" style={{ display: 'none' }}>
              {token.symbol.slice(0, 2).toUpperCase()}
            </div>
          </div>
          <div className="token-name-group">
            <span className="token-name">{token.name}</span>
            <span className="token-symbol">{token.symbol.toUpperCase()}</span>
          </div>
        </div>
        {change !== null && change !== undefined && (
          <div className={`change-badge ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
          </div>
        )}
      </div>

      <div className="card-stats">
        <div className="stat">
          <span className="stat-label">Price</span>
          <span className="stat-value price">{formatPrice(token.current_price)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">24h Volume</span>
          <span className="stat-value">{formatLargeNum(token.total_volume)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Market Cap</span>
          <span className="stat-value">{formatLargeNum(token.market_cap)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">24h High / Low</span>
          <span className="stat-value small">
            {formatPrice(token.high_24h)} / {formatPrice(token.low_24h)}
          </span>
        </div>
      </div>

      <div className="card-footer">
        {hasSocials && (
          <div className="socials">
            {socials.twitter && (
              <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="social-icon twitter" title="Twitter / X">
                <TwitterIcon />
              </a>
            )}
            {socials.telegram && (
              <a href={socials.telegram} target="_blank" rel="noopener noreferrer" className="social-icon telegram" title="Telegram">
                <TelegramIcon />
              </a>
            )}
            {socials.discord && (
              <a href={socials.discord} target="_blank" rel="noopener noreferrer" className="social-icon discord" title="Discord">
                <DiscordIcon />
              </a>
            )}
            {socials.website && (
              <a href={socials.website} target="_blank" rel="noopener noreferrer" className="social-icon website" title="Website">
                <WebsiteIcon />
              </a>
            )}
          </div>
        )}

        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="buy-btn"
        >
          <JupiterIcon />
          Buy on Jupiter
        </a>
      </div>
    </div>
  )
}
