
function OrderCard({ order, showActions = false, onStatusChange }) {
  const items = Array.isArray(order.items) ? order.items : [];
  const status = order.status || "Placed";

  const date = order.createdAt
    ? new Date(order.createdAt)
    : null;

  const formattedDate =
    date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Date unavailable";

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div>
          <h3>Order #{order.id || "N/A"}</h3>
          <p>{order.customerName || "Customer"}</p>
        </div>

        <span className={`order-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="order-items">
        {items.length === 0 ? (
          <p>No items available.</p>
        ) : (
          items.map((item, index) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;

            return (
              <p key={item.id || index}>
                {item.name} × {quantity} — ₹
                {(price * quantity).toFixed(2)}
              </p>
            );
          })
        )}
      </div>

      <div className="order-card-footer">
        <strong>
          Total: ₹{(Number(order.totalAmount) || 0).toFixed(2)}
        </strong>

        <span>{formattedDate}</span>
      </div>

      {showActions && (
        <div className="order-actions">
          <label htmlFor={`status-${order.id}`}>
            Update Status:
          </label>

          <select
            id={`status-${order.id}`}
            value={status}
            onChange={(e) =>
              onStatusChange?.(order.id, e.target.value)
            }
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
