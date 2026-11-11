let globalMarketBar = document.querySelector(".global-market-bar")
let activeCoinsDisplay = document.querySelector(".active-coins")
let exchangesDisplay = document.querySelector(".exchanges");
let marketCapDisplay = document.querySelector(".market-cap");
let volume24hDisplay = document.querySelector(".volume-24h");
let btcDominanceDisplay = document.querySelector(".btc-dominance");
let ethDominanceDisplay = document.querySelector(".eth-dominance");

const formatCurrency = new Intl.NumberFormat("en-US" , {
style:"currency",
currency:"USD",
notation:"compact",
maximumFractionDigits:2
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