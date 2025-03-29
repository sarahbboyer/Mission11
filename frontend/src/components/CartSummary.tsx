import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // ✅ Calculate total donation amount
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        background: "#28a745", // Brighter green background to stand out
        color: "white", // White text to contrast with the green background
        padding: "15px 25px", // Larger padding for a more prominent box
        borderRadius: "50px", // Rounded corners
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)", // Slightly stronger shadow
        fontSize: "18px", // Slightly larger font size
        fontWeight: "bold", // Bolder text for emphasis
        transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transition for hover
      }}
      onClick={() => navigate("/cart")}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
        e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.4)"; // Stronger shadow on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"; // Reset size after hover
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)"; // Reset shadow
      }}
    >
      🛒 <strong>{totalAmount.toFixed(2)}</strong>{" "}
      {/* Format the total amount to 2 decimal places */}
    </div>
  );
};

export default CartSummary;
