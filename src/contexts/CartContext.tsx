import { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [cartState, setCartState] = useState<{
    items: CartItem[];
    total: number;
    count: number;
  }>({
    items: [],
    total: 0,
    count: 0,
  });

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        if (Array.isArray(items)) {
          setCartState({
            items,
            total: calculateTotal(items),
            count: calculateCount(items),
          });
        }
      } catch (error) {
        console.error('Failed to parse cart:', error);
        localStorage.removeItem("cart");
      }
    }
    setIsInitialized(true);
  }, []);
  

  useEffect(() => {
    console.log('Saving to localStorage:', cartState.items); 
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cartState.items));
    }
  }, [cartState.items, isInitialized]);


  const calculateTotal = (items: CartItem[]) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateCount = (items: CartItem[]) =>
    items.reduce((count, item) => count + item.quantity, 0);

  // const updateCart = (items: CartItem[]) => {
  //   setCartState({
  //     items,
  //     total: calculateTotal(items),
  //     count: calculateCount(items),
  //   });
  // };

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    console.log('Adding to cart:', item, quantity);
    setCartState((prev) => {
      const existingItem = prev.items.find((cartItem) => cartItem.id === item.id);
      let newItems;
  
      if (existingItem) {
        newItems = prev.items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        newItems = [...prev.items, { ...item, quantity }];
      }
  
      console.log('New cart items:', newItems); // Debug log
      return {
        items: newItems,
        total: calculateTotal(newItems),
        count: calculateCount(newItems),
      };
    });
  };

  const removeFromCart = (id: string) => {
    setCartState((prev) => {
      const newItems = prev.items.filter((item) => item.id !== id);
      return {
        items: newItems,
        total: calculateTotal(newItems),
        count: calculateCount(newItems),
      };
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartState((prev) => {
      const newItems = prev.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
        count: calculateCount(newItems),
      };
    });
  };

  const clearCart = () => {
    setCartState({
      items: [],
      total: 0,
      count: 0,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState.items,
        cartTotal: cartState.total,
        cartCount: cartState.count,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);