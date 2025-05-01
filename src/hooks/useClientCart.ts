import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";

export const useClientCart = () => {
  const cart = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? cart : {
    cartItems: [],
    cartTotal: 0,
    cartCount: 0,
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
  };
};