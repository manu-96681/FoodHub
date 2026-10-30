
function OrderCard({ order, showActions = false, onStatusChange }) {
  return (
    <div className="order-card">
      <div className="order-card-header">
        <div>
          <h3>Order #{order.id}</h3>
          <p>{order.customerName}</p>
        </div>

        <span className={`order-status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>

      <div className="order-items">
        {order.items.map((item, index) => (
          <p key={item.id || index}>
            {item.name} × {item.quantity} — ₹
            {item.price * item.quantity}
          </p>
        ))}
      </div>

      <div className="order-card-footer">
        <strong>Total: ₹{order.totalAmount}</strong>

        <span>
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </div>

      {showActions && (
        <div className="order-actions">
          <label>Update Status:</label>

          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
          >
            <option value="Placed">Placed</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default OrderCard;
