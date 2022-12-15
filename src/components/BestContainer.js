export default function BestContainer({ name, price, size }) {
  return (
    <div className="best-container">
      <div className="title">Best {name}</div>
      <div className="content">
        <div>
          <div className="bold">{price}</div>
          <div>{name} Price</div>
        </div>
        <div>
          <div className="bold">{size}</div>
          <div>{name} Quantity</div>
        </div>
      </div>
    </div>
  );
}
