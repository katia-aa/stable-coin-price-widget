import React, { useEffect, useState, useRef } from "react";

type Prices = {
  usdc: number;
  usdt: number;
  dai: number;
  ghost: number;
  usdg: number;
};

type PriceChangeDirection = {
  usdc: "up" | "down" | "same";
  usdt: "up" | "down" | "same";
  dai: "up" | "down" | "same";
  ghost: "up" | "down" | "same";
  usdg: "up" | "down" | "same";
};

const COINGECKO_API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,tether,dai,ghost-by-mcafee,usdg&vs_currencies=usd&include_24hr_change=true";
const StablecoinPriceWidget: React.FC = () => {
  const [prices, setPrices] = useState<Prices>({
    usdc: 0,
    usdt: 0,
    dai: 0,
    ghost: 0,
    usdg: 0,
  });
  const [priceChangeDir, setPriceChangeDir] = useState<PriceChangeDirection>({
    usdc: "same",
    usdt: "same",
    dai: "same",
    ghost: "same",
    usdg: "same",
  });
  const [priceChanges24h, setPriceChanges24h] = useState<Prices>({
    usdc: 0,
    usdt: 0,
    dai: 0,
    ghost: 0,
    usdg: 0,
  });
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  // Keep track of the last prices to compare movement
  const lastPricesRef = useRef<Prices>({
    usdc: 0,
    usdt: 0,
    dai: 0,
    ghost: 0,
    usdg: 0,
  });

  const fetchData = async () => {
    try {
      setShowErrorBanner(false);
      const response = await fetch(COINGECKO_API_URL);

      const data = await response.json();

      const newPrices: Prices = {
        usdc: data["usd-coin"]?.usd ?? 0,
        usdt: data["tether"]?.usd ?? 0,
        dai: data["dai"]?.usd ?? 0,
        ghost: data["ghost-by-mcafee"]?.usd ?? 0,
        usdg: data["usdg"]?.usd ?? 0,
      };
      const new24hChanges: Prices = {
        usdc: data["usd-coin"]?.usd_24h_change ?? 0,
        usdt: data["tether"]?.usd_24h_change ?? 0,
        dai: data["dai"]?.usd_24h_change ?? 0,
        ghost: data["ghost-by-mcafee"]?.usd_24h_change ?? 0,
        usdg: data["usdg"]?.usd_24h_change ?? 0,
      };

      // Determine price movement direction
      const updatedDirection: PriceChangeDirection = {
        usdc:
          newPrices.usdc > lastPricesRef.current.usdc
            ? "up"
            : newPrices.usdc < lastPricesRef.current.usdc
            ? "down"
            : "same",
        usdt:
          newPrices.usdt > lastPricesRef.current.usdt
            ? "up"
            : newPrices.usdt < lastPricesRef.current.usdt
            ? "down"
            : "same",
        dai:
          newPrices.dai > lastPricesRef.current.dai
            ? "up"
            : newPrices.dai < lastPricesRef.current.dai
            ? "down"
            : "same",
        ghost:
          newPrices.ghost > lastPricesRef.current.ghost
            ? "up"
            : newPrices.ghost < lastPricesRef.current.ghost
            ? "down"
            : "same",
        usdg:
          newPrices.usdg > lastPricesRef.current.usdg
            ? "up"
            : newPrices.usdg < lastPricesRef.current.usdg
            ? "down"
            : "same",
      };

      setPrices(newPrices);
      setPriceChanges24h(new24hChanges);
      setPriceChangeDir(updatedDirection);

      // Update the ref for next comparison
      lastPricesRef.current = newPrices;
    } catch (error) {
      setShowErrorBanner(true);
      console.error("Error fetching prices:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Fetch every 5 minutes
    const intervalId = setInterval(fetchData, 13000);
    return () => clearInterval(intervalId);
  }, []);

  const getPriceClass = (dir: "up" | "down" | "same") => {
    if (dir === "up") return "text-green-500";
    if (dir === "down") return "text-red-500";
    return "";
  };

  const formatPrice = (price: number) => {
    // return price === 0 ? "-" : price.toFixed(4);
    return price;
  };

  const formatChange = (change: number) => {
    // e.g. show +2.45% or -1.23%
    const sign = change > 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <div className="p-4 bg-white border rounded shadow-sm max-w-md m-auto">
      {showErrorBanner && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 animate-bounce">
          <div className="font-bold">Oops! Too many requests!</div>
          <div>This could take a few minutes. 😬</div>
        </div>
      )}
      <h2 className="text-xl mb-4">Stablecoin Prices</h2>
      {/* DAI */}
      <div className="flex justify-between mb-2">
        <span className="text-red">DAI:</span>
        <span className={getPriceClass(priceChangeDir.dai)}>
          {formatPrice(prices.dai)} USD
        </span>
      </div>
      {/* 24h change (optional) */}
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>24h Change:</span>
        <span>{formatChange(priceChanges24h.dai)}</span>
      </div>
      {/* GHOST */}
      <div className="flex justify-between mb-2">
        <span>GHOST:</span>
        <span className={getPriceClass(priceChangeDir.ghost)}>
          {formatPrice(prices.ghost)} USD
        </span>
      </div>
      {/* 24h change (optional) */}
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>24h Change:</span>
        <span>{formatChange(priceChanges24h.ghost)}</span>
      </div>
      {/* USDC */}
      <div className="flex justify-between mb-2">
        <span>USDC:</span>
        <span className={getPriceClass(priceChangeDir.usdc)}>
          {formatPrice(prices.usdc)} USD
        </span>
      </div>
      {/* 24h change (optional) */}
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>24h Change:</span>
        <span>{formatChange(priceChanges24h.usdc)}</span>
      </div>
      {/* USDG */}
      <div className="flex justify-between mb-2">
        <span>USDG:</span>
        <span className={getPriceClass(priceChangeDir.usdg)}>
          {formatPrice(prices.usdg)} USD
        </span>
      </div>
      {/* 24h change (optional) */}
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>24h Change:</span>
        <span>{formatChange(priceChanges24h.usdg)}</span>
      </div>
      {/* USDT */}
      <div className="flex justify-between mb-2">
        <span>USDT:</span>
        <span className={getPriceClass(priceChangeDir.usdt)}>
          {formatPrice(prices.usdt)} USD
        </span>
      </div>
      {/* 24h change (optional) */}
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>24h Change:</span>
        <span>{formatChange(priceChanges24h.usdt)}</span>
      </div>
    </div>
  );
};

export default StablecoinPriceWidget;
