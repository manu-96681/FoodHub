
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../services/orderApi";

// Safely read cart data from localStorage
function getCartItems() {
  try {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
}

function Checkout() {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const cart = getCartItems();

  const totalAmount = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (placingOrder) return;

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    if (!customerName.trim() || !address.trim()) {
      alert("Please enter all delivery details.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.trim())) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setPlacingOrder(true);

    // Prepare order items using the shared project structure
    const orderItems = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      image: item.image || "",
      quantity: Number(item.quantity) || 1,
    }));

    const order = {
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items: orderItems,
      totalAmount,
      status: "Placed",
      createdAt: new Date().toISOString(),
    };

    try {
      await addOrder(order);

      // Clear cart only after successful order creation
      localStorage.removeItem("cart");

      alert("Your order has been placed successfully!");
      navigate("/my-orders");
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Unable to place your order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <p>Enter your details to complete your order.</p>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty!</h2>
          <p>Add some food before proceeding to checkout.</p>

          <button onClick={() => navigate("/restaurants")}>
            Explore Restaurants
          </button>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <h2>Delivery Details</h2>

            <label htmlFor="customerName">Full Name</label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter 10-digit phone number"
              pattern="[0-9]{10}"
              maxLength={10}
              title="Enter a valid 10-digit phone number"
              required
            />

            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your complete address"
              rows={4}
              required
            />

            <button type="submit" disabled={placingOrder}>
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <div className="checkout-summary">
            <h2>Order Summary</h2>

            {cart.map((item) => {
              const price = Number(item.price) || 0;
              const quantity = Number(item.quantity) || 1;

              return (
                <div className="summary-row" key={item.id}>
                  <span>
                    {item.name} × {quantity}
                  </span>
                  <span>₹{(price * quantity).toFixed(2)}</span>
                </div>
              );
            })}

            <div className="summary-row total-row">
              <strong>Total Amount</strong>
              <strong>₹{totalAmount.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
