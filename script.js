let globalMarketBar = document.querySelector(".global-market-bar")
let activeCoinsDisplay = document.querySelector(".active-coins")
let exchangesDisplay = document.querySelector(".exchanges");
let marketCapDisplay = document.querySelector(".market-cap");
let volume24hDisplay = document.querySelector(".volume-24h");
let btcDominanceDisplay = document.querySelector(".btc-dominance");
let ethDominanceDisplay = document.querySelector(".eth-dominance");
let cryptoTable = document.querySelector(".crypto-table");
let searchInput = document.querySelector(".search-input");
let htmlTag = document.querySelector(".htmlTag");
let favouriteBtn = document.querySelector("#filter-favorites-btn");
let AllBtn = document.querySelector("#filter-all-btn");
let loadingSpinner = document.querySelector("#loadingSpinner");
let chartModal = document.querySelector("#chart-modal");
let addHoldingModal = document.querySelector("#addHoldingModal");
let themeToggleLightIcon = document.querySelector("#theme-toggle-light-icon");

let showOnlyFavourites;

let coinData;
let screenMode = localStorage.getItem("screenMode") || "dark";

let favouriteCoinArray = JSON.parse(localStorage.getItem("starredIcons")) || [];

function applyTheme(mode) {
    if (mode === "dark") {
        htmlTag.classList.remove("dark");
        htmlTag.classList.add("light");
      
    } else {
          htmlTag.classList.remove("light");
        htmlTag.classList.add("dark");
    }
}
applyTheme(screenMode);

function screenModeLS() {
    localStorage.setItem("screenMode", screenMode)
}

themeToggleLightIcon.addEventListener("click", () => {
    if (screenMode === "dark") {
        screenMode = "light";
    } else {
        screenMode = "dark";
    }

    applyTheme(screenMode);
    localStorage.setItem("screenMode", screenMode);
});

// setInterval(async () => {
//   await getCoinsData();
//   searchInputfunc();
// }, 20000);

AllBtn.addEventListener("click", () => {
    showOnlyFavourites = false;
    renderCoinData(coinData)
})

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

// async function getCoinsData() {
//     const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1");
//     coinData = await response.json();
//     loadingSpinner.classList.add("hidden")
//     loadingSpinner.classList.remove("flex")
//     renderCoinData(coinData)
//     console.log(coinData);
// }

// getCoinsData()


coinData = [
    {
        "id": "bitcoin",
        "symbol": "btc",
        "name": "Bitcoin",
        "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
        "current_price": 69241,
        "market_cap": 1392117359203,
        "market_cap_rank": 1,
        "fully_diluted_valuation": 1392117359203,
        "total_volume": 45774360688,
        "high_24h": 72827,
        "low_24h": 67922,
        "price_change_24h": -3573.23016679006,
        "price_change_percentage_24h": -4.90736,
        "market_cap_change_24h": -72243440179.3298,
        "market_cap_change_percentage_24h": -4.93345,
        "circulating_supply": 20111437,
        "total_supply": 20111437,
        "max_supply": 21000000,
        "ath": 126080,
        "ath_change_percentage": -45.08204,
        "ath_date": "2025-10-06T10:57:42.000Z",
        "atl": 67.81,
        "atl_change_percentage": 102011.07764,
        "atl_date": "2013-07-05T16:00:00.000Z",
        "roi": null,
        "last_updated": "2026-11-13T12:44:58.000Z"
    },
    {
        "id": "ethereum",
        "symbol": "eth",
        "name": "Ethereum",
        "image": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        "current_price": 1959.54,
        "market_cap": 239400382389,
        "market_cap_rank": 2,
        "fully_diluted_valuation": 239400382389,
        "total_volume": 15832165538,
        "high_24h": 2023.42,
        "low_24h": 1905,
        "price_change_24h": -59.9370250709305,
        "price_change_percentage_24h": -2.96795,
        "market_cap_change_24h": -7405513007.03842,
        "market_cap_change_percentage_24h": -3.00054,
        "circulating_supply": 122215668.805792,
        "total_supply": 122215668.805792,
        "max_supply": null,
        "ath": 4946.05,
        "ath_change_percentage": -60.38166,
        "ath_date": "2025-08-24T11:21:03.000Z",
        "atl": 0.432979,
        "atl_change_percentage": 452472.22248,
        "atl_date": "2015-10-19T16:00:00.000Z",
        "roi": {
            "times": 43.3090896288635,
            "currency": "btc",
            "percentage": 4330.90896288636
        },
        "last_updated": "2026-11-13T12:44:58.000Z"
    },
    {
        "id": "tether",
        "symbol": "usdt",
        "name": "Tether",
        "image": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
        "current_price": 0.99924,
        "market_cap": 175579415900,
        "market_cap_rank": 3,
        "fully_diluted_valuation": 181042078554,
        "total_volume": 65854390203,
        "high_24h": 0.999309,
        "low_24h": 0.998905,
        "price_change_24h": 0.00026887,
        "price_change_percentage_24h": 0.02691,
        "market_cap_change_24h": -118469178.340637,
        "market_cap_change_percentage_24h": -0.06743,
        "circulating_supply": 175717172206.943,
        "total_supply": 181184120763.036,
        "max_supply": null,
        "ath": 1.32,
        "ath_change_percentage": -24.47713,
        "ath_date": "2018-07-23T16:00:00.000Z",
        "atl": 0.572521,
        "atl_change_percentage": 74.53326,
        "atl_date": "2015-03-01T16:00:00.000Z",
        "roi": null,
        "last_updated": "2026-11-13T12:44:58.000Z"
    },
    {
        "id": "binancecoin",
        "symbol": "bnb",
        "name": "BNB",
        "image": "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
        "current_price": 640.79,
        "market_cap": 84225736140,
        "market_cap_rank": 4,
        "fully_diluted_valuation": 84225736140,
        "total_volume": 1067992517,
        "high_24h": 659.46,
        "low_24h": 624.58,
        "price_change_24h": -18.6019887978114,
        "price_change_percentage_24h": -2.82108,
        "market_cap_change_24h": -2491472527.46172,
        "market_cap_change_percentage_24h": -2.8731,
        "circulating_supply": 131510694.94,
        "total_supply": 131510694.94,
        "max_supply": 200000000,
        "ath": 1369.99,
        "ath_change_percentage": -53.22668,
        "ath_date": "2025-10-13T00:41:24.000Z",
        "atl": 0.0398177,
        "atl_change_percentage": 1609210.84863,
        "atl_date": "2017-10-18T16:00:00.000Z",
        "roi": null,
        "last_updated": "2026-11-13T12:44:58.000Z"
    },
    {
        "id": "usd-coin",
        "symbol": "usdc",
        "name": "USDC",
        "image": "https://coin-images.coingecko.com/coins/images/6319/large/USDC.png?1769615602",
        "current_price": 0.999559,
        "market_cap": 69046667392,
        "market_cap_rank": 5,
        "fully_diluted_valuation": 69080095693,
        "total_volume": 17703899348,
        "high_24h": 0.999641,
        "low_24h": 0.999386,
        "price_change_24h": 0.0000746,
        "price_change_percentage_24h": 0.00746,
        "market_cap_change_24h": -351648778.657471,
        "market_cap_change_percentage_24h": -0.50671,
        "circulating_supply": 69078921680.7311,
        "total_supply": 69112365597.3617,
        "max_supply": null,
        "ath": 1.043,
        "ath_change_percentage": -4.20766,
        "ath_date": "2018-11-14T16:00:00.000Z",
        "atl": 0.877647,
        "atl_change_percentage": 13.89085,
        "atl_date": "2023-03-11T00:02:13.000Z",
        "roi": null,
        "last_updated": "2026-11-13T12:44:58.000Z"
    },
    {
        "id": "ripple",
        "symbol": "xrp",
        "name": "XRP",
        "image": "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
        "current_price": 1.021,
        "market_cap": 64847611178,
        "market_cap_rank": 6,
        "fully_diluted_valuation": 102080802764,
        "total_volume": 2095085013,
        "high_24h": 1.043,
        "low_24h": 0.999803,
        "price_change_24h": -0.0157026643810778,
        "price_change_percentage_24h": -1.51452,
        "market_cap_change_24h": -1007126087.87348,
        "market_cap_change_percentage_24h": -1.52931,
        "circulating_supply": 63516606953,
        "total_supply": 99985583260,
        "max_supply": 100000000000,
        "ath": 3.65,
        "ath_change_percentage": -71.99663,
        "ath_date": "2025-07-17T19:40:53.000Z",
        "atl": 0.00268621,
        "atl_change_percentage": 37913.03424,
        "atl_date": "2014-05-21T16:00:00.000Z",
        "roi": null,
        "last_updated": "2026-11-13T12:44:58.000Z"
    },
    {
        "id": "solana",
        "symbol": "sol",
        "name": "Solana",
        "image": "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
        "current_price": 80.74,
        "market_cap": 47734492230,
        "market_cap_rank": 7,
        "fully_diluted_valuation": 51445263621,
        "total_volume": 3456661403,
        "high_24h": 82.13,
        "low_24h": 78.1,
        "price_change_24h": -1.41682301124548,
        "price_change_percentage_24h": -1.72461,
        "market_cap_change_24h": -855742348.554527,
        "market_cap_change_percentage_24h": -1.76114,
        "circulating_supply": 591511037.441922,
        "total_supply": 637493766.759421,
        "max_supply": null,
        "ath": 293.31,
        "ath_change_percentage": -72.47412,
        "ath_date": "2025-01-19T03:15:27.000Z",
        "atl": 0.500801,
        "atl_change_percentage": 16021.50912,
        "atl_date": "2020-05-11T11:35:23.000Z",
        "roi": null,
        "last_updated": "2026-11-13T12:44:58.000Z"
    }
]

renderCoinData(coinData)
function renderCoinData(data) {
    cryptoTable.innerHTML = "";
    data.forEach(coin => {
        const isStarred = favouriteCoinArray.includes(coin.id);
        const starColor = isStarred ? "text-amber-500" : "text-gray-400";
        const isPositive = coin.price_change_percentage_24h >= 0;
        const changeColor = isPositive ? "text-[#10b981]" : "text-red-500";
        const changeSign = isPositive ? "+" : "";
        cryptoTable.innerHTML += `

        <div class="grid grid-cols-1 sm:grid-cols-[40px_3fr_2fr_2fr_140px] gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors items-center">
            <div class="hidden sm:flex justify-center items-center gap-1">
                <svg data-id=${coin.id} class="coin-star w-4 h-4 ${starColor} cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
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

searchInput.addEventListener("input", searchInputfunc);

function searchInputfunc() {
    let searchValue = searchInput.value.toLowerCase();
    let result = coinData;
    if (!coinData) return;
    if (showOnlyFavourites) {
        result = result.filter(coin => favouriteCoinArray.includes(coin.id));
    }

    result = result.filter(coin => {
        return coin.name.toLowerCase().includes(searchValue) || coin.symbol.toLowerCase().includes(searchValue);
    });

    renderCoinData(result);
}
function favouriteCoinLS() {
    localStorage.setItem("starredIcons", JSON.stringify(favouriteCoinArray));
}

cryptoTable.addEventListener("click", (e) => {


    if (e.target.closest(".coin-star")) {
        console.log("added to favourite")
        let star = e.target.closest(".coin-star");

        let starredID = star.dataset.id;

        if (favouriteCoinArray.includes(starredID)) {
            favouriteCoinArray = favouriteCoinArray.filter(coin => coin !== starredID);
            renderCoinData(coinData)
        }
        else {
            favouriteCoinArray.push(starredID);
            renderCoinData(coinData)
        }


        favouriteCoinLS();
    }
    console.log("Updated Favourites:", favouriteCoinArray);
})

favouriteBtn.addEventListener("click", () => {

    let newFavArray = coinData.filter(coin => favouriteCoinArray.includes(coin.id))
    showOnlyFavourites = true;
    renderCoinData(newFavArray);

})
