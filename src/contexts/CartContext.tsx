import { createContext, useContext, useState, useEffect, useCallback } from "react";

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
  isInitialized: boolean;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
  isInitialized: false,
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

  // Memoized calculations
  const calculateTotal = useCallback((items: CartItem[]) => 
    items.reduce((total, item) => total + item.price * item.quantity, 0), []);

  const calculateCount = useCallback((items: CartItem[]) => 
    items.reduce((count, item) => count + item.quantity, 0), []);

  // Initialize cart from localStorage
  useEffect(() => {
    const initializeCart = () => {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) {
            setCartState({
              items: parsed,
              total: calculateTotal(parsed),
              count: calculateCount(parsed),
            });
          }
        }
      } catch (error) {
        console.error('Cart initialization error:', error);
        localStorage.removeItem("cart");
      } finally {
        setIsInitialized(true);
      }
    };

    initializeCart();
  }, [calculateTotal, calculateCount]);

  // Persist cart to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cartState.items));
    }
  }, [cartState.items, isInitialized]);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCartState(prev => {
      const existingIndex = prev.items.findIndex(cartItem => cartItem.id === item.id);
      let newItems;

      if (existingIndex >= 0) {
        newItems = [...prev.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity
        };
      } else {
        newItems = [...prev.items, { ...item, quantity }];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
        count: calculateCount(newItems),
      };
    });
  }, [calculateTotal, calculateCount]);

  const removeFromCart = useCallback((id: string) => {
    setCartState(prev => {
      const newItems = prev.items.filter(item => item.id !== id);
      return {
        items: newItems,
        total: calculateTotal(newItems),
        count: calculateCount(newItems),
      };
    });
  }, [calculateTotal, calculateCount]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartState(prev => {
      const newItems = prev.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
        count: calculateCount(newItems),
      };
    });
  }, [removeFromCart, calculateTotal, calculateCount]);

  const clearCart = useCallback(() => {
    setCartState({
      items: [],
      total: 0,
      count: 0,
    });
  }, []);

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
        isInitialized,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};