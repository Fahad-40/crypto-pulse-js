# Coin Pulse

A responsive cryptocurrency dashboard built with vanilla JavaScript. Track live prices for the top 50 coins, manage a personal portfolio with real profit/loss, and view 7-day price trends, all without a framework or backend.

**[Live Demo](YOUR_LIVE_LINK)**

## Features

- **Live market data:** top 50 coins by market cap, powered by the CoinGecko API
- **Global market stats:** total market cap, 24h volume, active coins, exchanges and BTC/ETH dominance
- **24h change indicators:** green for gains, red for losses
- **Instant search:** filter by coin name or symbol without refetching data
- **Auto-refresh:** prices update every 20 seconds while your search and filters stay intact
- **Favorites:** star coins and view them in a dedicated filter; saved in the browser
- **Portfolio tracker:** add holdings (coin, quantity, buy price) and see current value and profit/loss per coin and in total
- **Smart merging:** buying the same coin again adds to the quantity and recalculates the average buy price
- **7-day price chart:** interactive line chart for any coin, built with Chart.js
- **Dark / light mode:** preference remembered across visits
- **Resilient UI:** loading spinner on first load, error state when the API fails or rate-limits, and a "No coins found" state; if a refresh fails, the last loaded data stays on screen

## Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript (ES6+): `fetch`, `async/await`, event delegation
- [CoinGecko API](https://www.coingecko.com/en/api)
- [Chart.js](https://www.chartjs.org/)
- `localStorage` for favorites, holdings and theme

## How It Works

- Market data is fetched from the CoinGecko `/coins/markets` and `/global` endpoints.
- Favorites and holdings are stored separately from API data (as coin IDs plus user inputs) and merged with the latest prices at render time, so values are always current.
- A single filter function applies search and favorites together, so the filters never conflict.

## Getting Started

No build step needed.

```bash
git clone YOUR_REPO_URL
cd YOUR_REPO_NAME
```

Open `index.html` in your browser, or use a local server such as VS Code Live Server.

## Notes

- Uses the free CoinGecko API, which is rate limited. If you see an error state, wait a minute and refresh.
- Prices are in USD.
- Portfolio data lives in your browser only; clearing site data will remove it.

## Roadmap

- Multiple currencies
- Edit existing holdings
- Search within portfolio
- Price alerts

## Author

**Fahad**, frontend developer
[LinkedIn](www.linkedin.com/in/fahad-muneer40) · [GitHub](https://github.com/Fahad-40)
