import { useState } from "react";
import BestContainer from "./components/BestContainer";
import Chart from "./components/Chart";
import OrderBook from "./components/OrderBook";
import useCoinbase from "./hooks/useCoinbase";

import "./styles.css";

const coinList = ["BTC-USD", "ETH-USD", "LTC-USD", "BCH-USD"];
export default function App() {
  const [coin, setCoin] = useState("");
  const {
    bestBids,
    bestAsks,
    bestBidVolumes,
    bestAskVolumes,
    bestBidHistory,
    bestAskHistory,
    ladderInfo
  } = useCoinbase(coinList);

  return (
    <div>
      <select value={coin} onChange={(e) => setCoin(e.target.value)}>
        <option value="">Please select a coin</option>
        {coinList.map((coinEntry) => (
          <option key={coinEntry}>{coinEntry}</option>
        ))}
      </select>
      {coin && (
        <>
          <div className="row full-width">
            <BestContainer
              name="Ask"
              price={bestAsks[coin]}
              size={bestAskVolumes[coin]}
            />
            <BestContainer
              name="Bid"
              price={bestBids[coin]}
              size={bestBidVolumes[coin]}
            />
          </div>
          <div>
            <Chart
              bestBidHistory={bestBidHistory[coin]}
              bestAskHistory={bestAskHistory[coin]}
            />
          </div>
          <div>
            <OrderBook ladderInfo={ladderInfo[coin]} />
          </div>
        </>
      )}
    </div>
  );
}
