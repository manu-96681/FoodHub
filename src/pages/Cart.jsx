
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      return Array.isArray(savedCart) ? savedCart : [];
    } catch {
      return [];
    }
  });

  // Keep localStorage updated whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Increase or decrease item quantity (minimum quantity is 1)
  const handleQuantityChange = (id, change) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, Number(item.quantity || 1) + change),
            }
          : item
      )
    );
  };

  // Remove an item from the cart
  const handleRemove = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  // Calculate total quantity of items
  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );

  // Calculate total price
  const totalAmount = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  return (
    <div className="cart-page">
      <div className="page-heading">
        <div>
          <h1>Your Shopping Cart</h1>
          <p>Review your selected food items</p>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty!</h2>
          <p>Add some delicious food to get started.</p>

          <button onClick={() => navigate("/restaurants")}>
            Explore Restaurants
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="summary-row total-row">
              <strong>Total Amount</strong>
              <strong>₹{totalAmount.toFixed(2)}</strong>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/restaurants")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
