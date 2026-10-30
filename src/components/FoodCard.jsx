

function FoodCard({ food, onAddToCart }) {
  return (
    <div className="food-card">
      <img
        src={food.image || "https://placehold.co/300x180?text=Food"}
        alt={food.name}
      />

      <div className="card-content">
        <h3>{food.name}</h3>
        <p>{food.category}</p>
        <p>{food.description}</p>
        <h4>₹{food.price}</h4>

        {food.available ? (
          <button onClick={() => onAddToCart(food)}>
            Add to Cart
          </button>
        ) : (
          <p>Currently Unavailable</p>
        )}
      </div>
    </div>
  );
}

export default FoodCard;
