import React, { createContext, useReducer, useContext } from 'react';
import { convertToCents } from '../utils/priceConversion';

const CartContext = createContext();

export const ACTIONS = {
  ADD_ITEM: 'add-item',
  REMOVE_ITEM: 'remove-item',
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      const { newItem } = action.payload;
      const cartIndex = state.cart.findIndex((item) => item.id === newItem.id);

      if (cartIndex < 0) {
        return {
          cart: [...state.cart, { ...newItem, quantity: 1 }],
          totalAmount: state.totalAmount + convertToCents(newItem.price),
          numberOfItems: state.numberOfItems + 1,
        };
      }

      const newCart = state.cart.map((item, index) => {
        if (index === cartIndex) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      return {
        cart: newCart,
        totalAmount: state.totalAmount + convertToCents(newItem.price),
        numberOfItems: state.numberOfItems + 1,
      };

    case ACTIONS.REMOVE_ITEM:
      const { id, price } = action.payload;
      const cartItem = state.cart.find((item) => item.id === id);
      const { quantity } = cartItem;

      if (quantity > 1) {
        const newCart = state.cart.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });

        return {
          cart: newCart,
          totalAmount: state.totalAmount - convertToCents(price),
          numberOfItems: state.numberOfItems - 1,
        };
      }

      const filteredCart = state.cart.filter((item) => item.id !== id);
      return {
        cart: filteredCart,
        totalAmount: state.totalAmount - convertToCents(price),
        numberOfItems: state.numberOfItems - 1,
      };

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {
    cart: [],
    totalAmount: 0,
    numberOfItems: 0,
  });

  const onAddItem = (newItem) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: { newItem } });
  };

  const onRemoveItem = (id, price) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { id, price } });
  };

  return (
    <CartContext.Provider value={{ cart, onAddItem, onRemoveItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
