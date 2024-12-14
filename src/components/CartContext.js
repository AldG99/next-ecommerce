import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for the cart
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // If item exists, increase quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        return {
          ...state,
          items: updatedItems,
          total: parseFloat((state.total + action.payload.precio).toFixed(2)),
          itemCount: state.itemCount + 1,
        };
      }

      // If item doesn't exist, add new item
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: parseFloat((state.total + action.payload.precio).toFixed(2)),
        itemCount: state.itemCount + 1,
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(
        item => item.id === action.payload.id
      );

      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        total: parseFloat(
          (state.total - itemToRemove.precio * itemToRemove.quantity).toFixed(2)
        ),
        itemCount: state.itemCount - itemToRemove.quantity,
      };

    case 'UPDATE_QUANTITY':
      const updatedCartItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const newTotal = updatedCartItems.reduce(
        (total, item) => total + item.precio * item.quantity,
        0
      );

      const newItemCount = updatedCartItems.reduce(
        (count, item) => count + item.quantity,
        0
      );

      return {
        ...state,
        items: updatedCartItems,
        total: parseFloat(newTotal.toFixed(2)),
        itemCount: newItemCount,
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Create Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Custom action creators
  const addToCart = product => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = product => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const updateQuantity = (product, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { ...product, quantity: Math.max(1, quantity) },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
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

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
