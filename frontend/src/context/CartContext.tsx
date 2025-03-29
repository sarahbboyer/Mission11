import { createContext, ReactNode, useContext, useState } from "react";
import { BookItem } from "../types/BookItem";

interface CartContextType {
  cart: BookItem[];
  addToCart: (item: BookItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<BookItem[]>([]);

  const addToCart = (item: BookItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);
      if (existingItem) {
        // If the item exists, increment the quantity
        return prevCart.map((c) =>
          c.bookID === item.bookID ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        // Otherwise, add a new item with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartProvider;
