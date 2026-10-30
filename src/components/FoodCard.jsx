function FoodCard({ food, onAddToCart }) {
  const fallbackImage = "https://placehold.co/400x300?text=Food";

  return (
    <div className="food-card">
      <img
        src={food.image || fallbackImage}
        alt={food.name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackImage;
        }}
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