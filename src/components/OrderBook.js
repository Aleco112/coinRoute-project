import { useMemo } from "react";

export default function OrderBook({ ladderInfo }) {
  const { buy, sell } = ladderInfo;

  const buyInfo = useMemo(() => {
    return buy.reduce((acc, { price, volume }) => {
      const clonedAcc = [...acc];
      const matchingPriceEl = clonedAcc.find((e) => e.price === +price);
      if (matchingPriceEl) {
        matchingPriceEl.volume += +volume;
        return clonedAcc;
      }
      return [...clonedAcc, { price: +price, volume: +volume }];
    }, []);
  }, [buy]);

  const sellInfo = useMemo(() => {
    return sell.reduce((acc, { price, volume }) => {
      const clonedAcc = [...acc];
      const matchingPriceEl = clonedAcc.find((e) => e.price === +price);
      if (matchingPriceEl) {
        matchingPriceEl.volume += +volume;
        return clonedAcc;
      }
      return [...clonedAcc, { price: +price, volume: +volume }];
    }, []);
  }, [sell]);

  return (
    <div className="order-book">
      <div>
        <h1>Buy Info</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Market Size</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {buyInfo
                .sort((a, b) => a.price - b.price)
                .map(({ price, volume }) => (
                  <tr>
                    <td>{Math.floor(volume * 1000) / 1000}</td>
                    <td>{price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h1>Sell Info</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Market Size</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {sellInfo
                .sort((a, b) => a.price - b.price)
                .map(({ price, volume }) => (
                  <tr>
                    <td>{Math.floor(volume * 1000) / 1000}</td>
                    <td>{price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
