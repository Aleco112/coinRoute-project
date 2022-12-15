import Plot from "react-plotly.js";

export default function Chart({ bestBidHistory, bestAskHistory }) {
  return (
    <Plot
      data={[
        {
          x: bestBidHistory.map(({ time }) => time),
          y: bestBidHistory.map(({ bid }) => bid),
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
          name: "Bids"
        },
        {
          x: bestAskHistory.map(({ time }) => time),
          y: bestAskHistory.map(({ ask }) => ask),
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "orange" },
          name: "Asks"
        }
      ]}
      layout={{ width: 800, height: 600 }}
    />
  );
}
