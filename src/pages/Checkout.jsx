
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../services/orderApi";

function Checkout() {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const totalAmount = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    setPlacingOrder(true);

    const order = {
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items: cart,
      totalAmount,
      status: "Placed",
      createdAt: new Date().toISOString(),
    };

    try {
      await addOrder(order);
      localStorage.removeItem("cart");
      alert("Your order has been placed successfully!");
      navigate("/my-orders");
    } catch (error) {
      alert("Unable to place order. Please try again.");
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
          <button onClick={() => navigate("/cart")}>
            Return to Cart
          </button>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <h2>Delivery Details</h2>

            <label>Full Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter 10-digit phone number"
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit phone number"
              required
            />

            <label>Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your complete address"
              rows="4"
              required
            />

            <button type="submit" disabled={placingOrder}>
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <div className="checkout-summary">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div className="summary-row" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

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
