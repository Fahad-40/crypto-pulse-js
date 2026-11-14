let globalMarketBar = document.querySelector(".global-market-bar");
let activeCoinsDisplay = document.querySelector(".active-coins");
let exchangesDisplay = document.querySelector(".exchanges");
let marketCapDisplay = document.querySelector(".market-cap");
let volume24hDisplay = document.querySelector(".volume-24h");
let btcDominanceDisplay = document.querySelector(".btc-dominance");
let ethDominanceDisplay = document.querySelector(".eth-dominance");
let cryptoTable = document.querySelector(".crypto-table");
let searchInput = document.querySelector(".search-input");
let htmlTag = document.querySelector(".htmlTag");
let saveHoldingBtn = document.querySelector(".save-holding-btn");
let addHoldingForm = document.querySelector(".addHoldingForm");
let favouriteBtn = document.querySelector("#filter-favorites-btn");
let filterHoldingsBtn = document.querySelector("#filter-holdings-btn");
let AllBtn = document.querySelector("#filter-all-btn");
let loadingSpinner = document.querySelector("#loadingSpinner");
let chartModal = document.querySelector("#chart-modal");
let addHoldingModal = document.querySelector("#addHoldingModal");
let themeToggleLightIcon = document.querySelector("#theme-toggle-light-icon");
let addHoldingBtn = document.querySelector("#add-holding-btn");
let holdingsList = document.querySelector("#holdings-list");
let HoldingTableContainer = document.querySelector("#holdings-view-container");

let showOnlyFavourites;
let coinData;
let holdingsArray = JSON.parse(localStorage.getItem("holdingLS")) || [];
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
    localStorage.setItem("screenMode", screenMode);
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

setInterval(async () => {
  await getCoinsData();
  searchInputfunc();
}, 20000);

AllBtn.addEventListener("click", () => {
    showOnlyFavourites = false;
    showState(cryptoTable);
    renderCoinData(coinData);
});

function showState(elementToDisplay) {
    loadingSpinner.classList.add("hidden");
    cryptoTable.classList.add("hidden");
    HoldingTableContainer.classList.add("hidden");

    elementToDisplay.classList.remove("hidden");
    
    if (elementToDisplay === loadingSpinner) {
        loadingSpinner.classList.add("flex");
    }
}

showState(loadingSpinner);

const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2
});

async function getGlobalMarketBarData() {
    let response = await fetch("https://api.coingecko.com/api/v3/global");
    let data = await response.json();
    renderGlobalMarketBarData(data);
    console.log(data);
}
getGlobalMarketBarData();

function renderGlobalMarketBarData(data) {
    globalMarketBar.innerHTML = "";

    globalMarketBar.innerHTML += `
                <div class="max-w-6xl mx-auto flex justify-between items-center overflow-x-auto no-scrollbar whitespace-nowrap gap-6">
                    <div class="flex gap-4 sm:gap-6 shrink-0">
                        <span>Active Coins: <span class="active-coins text-[#10b981]">${data.data.active_cryptocurrencies.toFixed(2)}</span></span>
                        <span>Exchanges: <span class="exchanges text-[#10b981]">${data.data.markets}</span></span>
                        <span>Market Cap: <span class="market-cap text-[#10b981]">$${formatCurrency.format(data.data.total_market_cap.usd.toFixed(2))}</span></span>
                        <span>24h Vol: <span class="volume-24h text-[#10b981]">$${formatCurrency.format(data.data.total_volume.usd.toFixed(2))}</span></span>
                    </div>
                    <div class="flex items-center gap-4 shrink-0">
                        <span>Dominance: <span class="btc-dominance text-gray-700 dark:text-gray-300">BTC ${data.data.market_cap_percentage.btc.toFixed(2)}%</span></span>
                        <span><span class="eth-dominance text-gray-700 dark:text-gray-300">ETH ${data.data.market_cap_percentage.eth.toFixed(2)}%</span></span>
                    </div>
                </div>
            `;
}

async function getCoinsData() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1");
    coinData = await response.json();
    loadingSpinner.classList.add("hidden")
    loadingSpinner.classList.remove("flex")
    showState(cryptoTable)
    renderCoinData(coinData)
    console.log(coinData);
}

getCoinsData()



function renderCoinData(data) {
    cryptoTable.innerHTML = "";
    data.forEach(coin => {
        const isStarred = favouriteCoinArray.includes(coin.id);
        const starColor = isStarred ? "text-amber-500" : "text-gray-300 dark:text-gray-600 hover:text-amber-500";
        const isPositive = coin.price_change_percentage_24h >= 0;
        const changeColor = isPositive ? "text-[#10b981]" : "text-[#f43f5e]";
        const changeSign = isPositive ? "+" : "";
        const chartIconPath = isPositive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6";

        cryptoTable.innerHTML += `
                    <div class="flex flex-col md:grid md:grid-cols-[48px_3fr_2fr_2fr_140px] gap-3 md:gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors md:items-center">
                        <!-- Desktop Star & Rank -->
                        <div class="hidden md:flex justify-center items-center gap-1.5">
                            <svg data-id="${coin.id}" class="coin-star w-4 h-4 ${starColor} cursor-pointer transition-colors shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span class="text-xs text-gray-400 dark:text-gray-500 w-4 text-center">${coin.market_cap_rank}</span>
                        </div>

                        <!-- Asset Info (Includes Mobile Star & Rank) -->
                        <div class="flex items-center justify-between md:justify-start gap-3">
                            <div class="flex items-center gap-3">
                                <img src="${coin.image}" alt="${coin.name}" class="w-8 h-8 rounded-full shrink-0">
                                <div>
                                    <div class="flex items-center gap-1.5">
                                        <span class="font-bold text-gray-900 dark:text-white text-sm">${coin.name}</span>
                                        <span class="md:hidden text-[11px] font-medium px-1.5 py-0.2 rounded bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400">#${coin.market_cap_rank}</span>
                                    </div>
                                    <div class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">${coin.symbol}</div>
                                </div>
                            </div>
                            <!-- Mobile Favorite Star -->
                            <button data-id="${coin.id}" class="coin-star md:hidden p-1.5 ${starColor} focus:outline-none" title="Favorite">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Price -->
                        <div class="flex justify-between md:block md:text-right font-medium text-gray-900 dark:text-white text-sm">
                            <span class="md:hidden text-gray-500 dark:text-gray-400 font-normal">Price</span>
                            <span>$${coin.current_price.toLocaleString()}</span>
                        </div>

                        <!-- 24h Change -->
                        <div class="flex justify-between md:block md:text-right font-medium ${changeColor} text-sm">
                            <span class="md:hidden text-gray-500 dark:text-gray-400 font-normal">24h Change</span>
                            <span>${changeSign}${coin.price_change_percentage_24h?.toFixed(2)}%</span>
                        </div>

                        <!-- 7d Trend Button -->
                        <div class="flex justify-between md:justify-end items-center pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-white/5">
                            <span class="md:hidden text-xs text-gray-500 dark:text-gray-400">7d Trend</span>
                            <button class="open-chart-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors shadow-sm backdrop-blur-sm focus:outline-none">
                                <svg class="w-3.5 h-3.5 ${changeColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${chartIconPath}"></path>
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
        console.log("added to favourite");
        let star = e.target.closest(".coin-star");
        let starredID = star.dataset.id;

        if (favouriteCoinArray.includes(starredID)) {
            favouriteCoinArray = favouriteCoinArray.filter(coin => coin !== starredID);
            renderCoinData(coinData);
        } else {
            favouriteCoinArray.push(starredID);
            renderCoinData(coinData);
        }

        favouriteCoinLS();
    }

});

favouriteBtn.addEventListener("click", () => {
    let newFavArray = coinData.filter(coin => favouriteCoinArray.includes(coin.id));
    showOnlyFavourites = true;
    showState(cryptoTable);
    renderCoinData(newFavArray);
});

// ADD HOLDING MODAL
addHoldingBtn.addEventListener("click", (e) => {
  addHoldingModal.classList.remove("hidden");
    addHoldingModal.classList.add("flex");

})

addHoldingModal.addEventListener("click", (e) => {
    if (e.target === addHoldingModal) {
        console.log("model clicked!")
        addHoldingModal.classList.remove("flex")
        addHoldingModal.classList.add("hidden")
    }
    if (e.target.closest(".close-add-holding-btn")) {
        console.log("model clicked!")
        addHoldingModal.classList.remove("flex")
        addHoldingModal.classList.add("hidden")
    }

    if (e.target.closest(".cancel-add-holding-btn")) {
        console.log("model clicked!")
        addHoldingModal.classList.remove("flex")
        addHoldingModal.classList.add("hidden")
    }
})

addHoldingForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let formData = new FormData(addHoldingForm);

    let holding = {
        coin: formData.get("coin").toLowerCase(),
        quantityOfCoin: Number(formData.get("quantity")),
        buyingPrice: Number(formData.get("buyPrice")),
    }

const existing = holdingsArray.find(h => h.coin === holding.coin);

if (existing) {
    const totalQuantity = existing.quantityOfCoin + holding.quantityOfCoin;
    const totalCost = (existing.quantityOfCoin * existing.buyingPrice) + (holding.quantityOfCoin * holding.buyingPrice);
    existing.buyingPrice = totalCost / totalQuantity;
    existing.quantityOfCoin = totalQuantity;
} else {
    holdingsArray.push(holding);
}
    holdingLS()
     renderHoldings(getMergedHoldings())
     showState(HoldingTableContainer);
    addHoldingModal.classList.remove("flex")
    addHoldingModal.classList.add("hidden")
})

function holdingLS() {
    localStorage.setItem("holdingLS", JSON.stringify(holdingsArray));
}

filterHoldingsBtn.addEventListener("click", () => {
    showState(HoldingTableContainer);
    renderHoldings(getMergedHoldings())
})

 function getMergedHoldings() {
        return holdingsArray.map(holding => {
            const apiCoin = coinData.find(coin => coin.id === holding.coin || coin.symbol.toLowerCase() === holding.coin);
            if (!apiCoin) return null;
            return { ...apiCoin, ...holding }
        }).filter(item => item !== null)
    }


function renderHoldings(mergedHoldings) {

    if (mergedHoldings.length === 0) {
        holdingsList.innerHTML = `<div class="p-6 text-center text-sm text-gray-500">Abhi koi holding add nahi ki gayi.</div>`;
        return;
    }

    holdingsList.innerHTML = "";

    mergedHoldings.forEach((item) => {
        const buyValue = item.quantityOfCoin * item.buyingPrice;
        const currentValue = item.quantityOfCoin * item.current_price;
        const profit = currentValue - buyValue;
        const profitPercent = (profit / buyValue) * 100;

        holdingsList.innerHTML += `<div class="holding-item flex flex-col md:grid md:grid-cols-[2.5fr_1.5fr_1.5fr_1.5fr_2fr_48px] gap-3 md:gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors md:items-center">
                    <!-- Coin Info & Mobile Delete Button -->
                    <div class="flex items-center justify-between md:justify-start gap-3">
                        <div class="flex items-center gap-3">
                            <img src="${item.image}" alt="Bitcoin" class="holding-coin-img w-8 h-8 rounded-full shrink-0">
                            <div>
                                <div class="holding-coin-name font-bold text-gray-900 dark:text-white text-sm">${item.id}</div>
                                <div class="holding-coin-symbol text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">${item.symbol}</div>
                            </div>
                        </div>
                        <button class="delete-holding-btn md:hidden p-1.5 text-gray-400 hover:text-[#f43f5e] hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors focus:outline-none" title="Remove Holding">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Quantity -->
                    <div class="flex justify-between md:block md:text-right text-sm font-medium text-gray-900 dark:text-white">
                        <span class="md:hidden text-gray-500 dark:text-gray-400 font-normal">Quantity</span>
                        <span class="holding-quantity">${item.quantityOfCoin}</span>
                    </div>

                    <!-- Buy Price -->
                    <div class="flex justify-between md:block md:text-right text-sm font-medium text-gray-600 dark:text-gray-300">
                        <span class="md:hidden text-gray-500 dark:text-gray-400 font-normal">Buy Price</span>
                        <span class="holding-buy-price">$${item.buyingPrice}</span>
                    </div>

                    <!-- Current Value -->
                    <div class="flex justify-between md:block md:text-right text-sm font-semibold text-gray-900 dark:text-white">
                        <span class="md:hidden text-gray-500 dark:text-gray-400 font-normal">Current Value</span>
                        <span class="holding-current-value">$${currentValue.toFixed(2)}</span>
                    </div>

                    <!-- Profit / Loss -->
                    <div class="flex justify-between md:block md:text-right text-sm font-medium text-[#10b981] pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-white/5">
                        <span class="md:hidden text-gray-500 dark:text-gray-400 font-normal">Profit / Loss</span>
                        <span class="holding-pnl">+$${profit.toFixed(2)} (${profitPercent.toFixed(2)}%)</span>
                    </div>

                    <!-- Desktop Delete Button -->
                    <div class="hidden md:flex justify-center">
                        <button class="delete-holding-btn p-1.5 text-gray-400 hover:text-[#f43f5e] hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors focus:outline-none" title="Remove Holding">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>

    `;
    });
}






