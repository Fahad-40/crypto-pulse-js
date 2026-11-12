let globalMarketBar = document.querySelector(".global-market-bar")
let activeCoinsDisplay = document.querySelector(".active-coins")
let exchangesDisplay = document.querySelector(".exchanges");
let marketCapDisplay = document.querySelector(".market-cap");
let volume24hDisplay = document.querySelector(".volume-24h");
let btcDominanceDisplay = document.querySelector(".btc-dominance");
let ethDominanceDisplay = document.querySelector(".eth-dominance");
let cryptoTable = document.querySelector(".crypto-table");
let loadingSpinner = document.querySelector("#loadingSpinner");
let chartModal = document.querySelector("#chart-modal");
let addHoldingModal = document.querySelector("#addHoldingModal");

function showState(elementToDisplay) {
    loadingSpinner.classList.add("hidden");
    chartModal.classList.add("hidden");
    addHoldingModal.classList.add("hidden");

    elementToDisplay.classList.remove("hidden");
    elementToDisplay.classList.add("flex");
}

showState(loadingSpinner)

const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2
})

async function getGlobalMarketBarData() {

    let response = await fetch("https://api.coingecko.com/api/v3/global");
    let data = await response.json();
    renderGlobalMarketBarData(data)
    console.log(data);

}
getGlobalMarketBarData();


function renderGlobalMarketBarData(data) {
    globalMarketBar.innerHTML = "";

    globalMarketBar.innerHTML += `

<div class="max-w-6xl mx-auto flex justify-between items-center overflow-x-auto whitespace-nowrap gap-4">
            <div class="flex gap-6">
                <span>Active Coins: <span class="active-coins text-[#10b981]">${data.data.active_cryptocurrencies.toFixed(2)}</span></span>
                <span>Exchanges: <span class="exchanges text-[#10b981]">${data.data.markets}</span></span>
                <span>Market Cap: <span class="market-cap text-[#10b981]">$${formatCurrency.format(data.data.total_market_cap.usd.toFixed(2))}</span></span>
                <span>24h Vol: <span class="volume-24h text-[#10b981]">$${formatCurrency.format(data.data.total_volume.usd.toFixed(2))}</span></span>
            </div>
            <div class="flex items-center gap-4">
                <span>Dominance: <span class="btc-dominance text-gray-700 dark:text-gray-300">BTC ${data.data.market_cap_percentage.btc.toFixed(2)}%</span></span>
                <span><span class="eth-dominance text-gray-700 dark:text-gray-300">ETH ${data.data.market_cap_percentage.eth.toFixed(2)}%</span></span>
            </div>

        </div>

`
}

async function getCoinsData() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1");
    const data = await response.json();
    loadingSpinner.classList.add("hidden")
    loadingSpinner.classList.remove("flex")
    renderCoinData(data)
    console.log(data);
}

getCoinsData()

function renderCoinData(data) {
    cryptoTable.innerHTML = "";
  data.forEach(coin => {
      const isPositive = coin.price_change_percentage_24h >= 0;
    const changeColor = isPositive ? "text-[#10b981]" : "text-red-500";
    const changeSign = isPositive ? "+" : "";
    cryptoTable.innerHTML += `

        <div class="grid grid-cols-1 sm:grid-cols-[40px_3fr_2fr_2fr_140px] gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors items-center">
            <div class="hidden sm:flex justify-center items-center gap-1">
                <svg class="w-4 h-4 text-amber-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="text-xs text-gray-400 dark:text-gray-500 w-4 text-center">${coin.market_cap_rank}</span>
            </div>
            <div class="flex items-center gap-3">
                <img src="${coin.image}" alt="${coin.name}" class="w-8 h-8 rounded-full">
                <div>
                    <div class="font-bold text-gray-900 dark:text-white text-sm">${coin.name}</div>
                    <div class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">${coin.symbol}</div>
                </div>
            </div>
            <div class="text-right font-medium text-gray-900 dark:text-white text-sm">
                <span class="sm:hidden text-gray-500 float-left">Price</span>
                $${coin.current_price.toLocaleString()}
            </div>
            <div class="text-right font-medium ${changeColor} text-sm">
                <span class="sm:hidden text-gray-500 float-left">24h Change</span>
                ${changeSign}${coin.price_change_percentage_24h?.toFixed(2)}%
            </div>
            <div class="flex justify-end items-center h-10 w-full ml-auto">
                <button class="open-chart-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors shadow-sm backdrop-blur-sm focus:outline-none">
                    <svg class="w-3.5 h-3.5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    View Chart
                </button>
            </div>
        </div>
    `;
   });

}
