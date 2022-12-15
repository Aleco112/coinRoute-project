import { useEffect, useState } from "react";

export default function useCoinbase(coins) {
  const [bestBids, setBestBids] = useState({});
  const [bestAsks, setBestAsks] = useState({});
  const [bestBidVolumes, setBestBidVolumes] = useState({});
  const [bestAskVolumes, setBestAskVolumes] = useState({});
  const [bestBidHistory, setBestBidHistory] = useState({});
  const [bestAskHistory, setBestAskHistory] = useState({});
  const [ladderInfo, setLadderInfo] = useState({});

  useEffect(() => {
    const innerWs = new WebSocket("wss://ws-feed.exchange.coinbase.com");
    innerWs.onopen = () => {
      innerWs.send(
        JSON.stringify({
          type: "subscribe",
          product_ids: coins,
          channels: ["ticker"]
        })
      );
    };

    innerWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "subscriptions") return;
      setBestBids((lastBestBids) => {
        return {
          ...lastBestBids,
          [data.product_id]: data.best_bid
        };
      });
      setBestAsks((lastBestAsks) => {
        return {
          ...lastBestAsks,
          [data.product_id]: data.best_ask
        };
      });
      setBestBidVolumes((lastBestBidVolumes) => {
        return {
          ...lastBestBidVolumes,
          [data.product_id]: data.best_bid_size
        };
      });
      setBestAskVolumes((lastBestAskVolumes) => {
        return {
          ...lastBestAskVolumes,
          [data.product_id]: data.best_ask_size
        };
      });
      setBestBidHistory((lastBestBidHistory) => {
        const newHistory = [
          ...(lastBestBidHistory[data.product_id] || []),
          {
            time: data.time,
            bid: data.best_bid
          }
        ];
        return {
          ...lastBestBidHistory,
          [data.product_id]: newHistory.slice(
            Math.max(newHistory.length - 20, 0)
          )
        };
      });
      setBestAskHistory((lastBestAskHistory) => {
        const newHistory = [
          ...(lastBestAskHistory[data.product_id] || []),
          {
            time: data.time,
            ask: data.best_ask
          }
        ];
        return {
          ...lastBestAskHistory,
          [data.product_id]: newHistory.slice(
            Math.max(newHistory.length - 20, 0)
          )
        };
      });
      setLadderInfo((lastLadderInfo) => {
        /**
         * {
         *  "ETH-USD": {
         *    buy: [
         *      {
         *        price: 123,
         *        volume: 123,
         *      },
         *      ...
         *    ],
         *    sell: [
         *      {
         *        price: 123,
         *        volume: 123,
         *      },
         *      ...
         *    ],
         *  }
         * }
         */

        const existingHistory = lastLadderInfo[data.product_id] || {
          buy: [],
          sell: []
        };
        const existingHistorySide = existingHistory[data.side];
        const newHistorySide = [
          ...existingHistorySide,
          {
            price: data.price,
            volume: data.last_size
          }
        ];
        return {
          ...lastLadderInfo,
          [data.product_id]: {
            ...existingHistory,
            [data.side]: newHistorySide.slice(
              Math.max(newHistorySide.length - 50, 0)
            )
          }
        };
      });
    };
  }, [coins]);

  return {
    bestBids,
    bestAsks,
    bestBidVolumes,
    bestAskVolumes,
    bestBidHistory,
    bestAskHistory,
    ladderInfo
  };
}
