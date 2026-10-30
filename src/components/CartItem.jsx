
function CartItem({ item, onQuantityChange, onRemove }) {
  const price = Number(item.price) || 0;
  const quantity = Number(item.quantity) || 1;
  const subtotal = price * quantity;

  return (
    <div className="cart-item">
      <img
        src={item.image || "https://placehold.co/100x100?text=Food"}
        alt={item.name || "Food item"}
        className="cart-item-image"
      />

      <div className="cart-item-details">
        <h3>{item.name}</h3>

        <p>₹{price.toFixed(2)}</p>

        <p className="cart-item-subtotal">
          Subtotal: ₹{subtotal.toFixed(2)}
        </p>
      </div>

      <div className="quantity-controls">
        <button
          type="button"
          onClick={() => onQuantityChange(item.id, -1)}
          disabled={quantity <= 1}
          aria-label={`Decrease quantity of ${item.name}`}
        >
          −
        </button>

        <span>{quantity}</span>

        <button
          type="button"
          onClick={() => onQuantityChange(item.id, 1)}
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="remove-cart-item"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
