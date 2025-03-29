import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookItem } from "../types/BookItem";
import { useCart } from "../context/CartContext";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // Log cart changes for debugging
  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  // Group items by their bookId
  const groupedItems = cart.reduce((acc, item) => {
    const existingItem = acc.find((group) => group.bookID === item.bookID);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, [] as BookItem[]);

  // Calculate total price
  const totalAmount = groupedItems.reduce(
    (sum: number, item: BookItem) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {groupedItems.map((item: BookItem) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={item.bookID}
            >
              <div>
                <strong>{item.title}</strong> by {item.author} - ${item.price} x{" "}
                {item.quantity} = ${item.price * item.quantity}
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item.bookID)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h3>Total: ${totalAmount}</h3>
        <div>
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate("/")}
          >
            Continue Browsing
          </button>
          <button className="btn btn-primary">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
