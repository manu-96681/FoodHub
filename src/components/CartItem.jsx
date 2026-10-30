
function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <div className="cart-item">
      <img
        src={item.image || "https://placehold.co/100x100?text=Food"}
        alt={item.name}
        className="cart-item-image"
      />

      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>₹{item.price}</p>
        <p className="cart-item-subtotal">
          Subtotal: ₹{item.price * item.quantity}
        </p>
      </div>

      <div className="quantity-controls">
        <button
          type="button"
          onClick={() => onQuantityChange(item.id, -1)}
          disabled={item.quantity <= 1}
        >
          −
        </button>

        <span>{item.quantity}</span>

        <button
          type="button"
          onClick={() => onQuantityChange(item.id, 1)}
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
