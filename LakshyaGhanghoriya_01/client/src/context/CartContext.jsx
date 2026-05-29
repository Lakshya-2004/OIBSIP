//cartContext

import {
  createContext,
  useEffect,
  useState,
} from "react";

export const CartContext =
  createContext();

export function CartProvider({
  children,
}) {

  //  Load cart from localStorage on app start
  const [cart, setCart] =
    useState(() => {

      const savedCart =
        localStorage.getItem(
          "pizza-cart"
        );

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    });


  const addToCart = (item) => {

    setCart((prev) => {

      const existingItem =
        prev.find(
          (cartItem) =>
            (cartItem._id ||
              cartItem.id) ===
            (item._id || item.id)
        );

      if (existingItem) {

        return prev.map(
          (cartItem) =>

            (cartItem._id ||
              cartItem.id) ===
            (item._id || item.id)

              ? {
                  ...cartItem,
                  quantity:
                    (cartItem.quantity ||
                      1) +
                    (item.quantity ||
                      1),
                }

              : cartItem
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity:
            item.quantity || 1,
        },
      ];
    });
  };

  const removeFromCart = (
    itemId
  ) => {

    setCart((prev) =>
      prev.filter(
        (item) =>

          (item._id ||
            item.id) !== itemId
      )
    );
  };

  const increaseQuantity = (
    itemId
  ) => {

    setCart((prev) =>
      prev.map((item) =>

        (item._id ||
          item.id) === itemId

          ? {
              ...item,
              quantity:
                (item.quantity || 1) +
                1,
            }

          : item
      )
    );
  };

  const decreaseQuantity = (
    itemId
  ) => {

    setCart((prev) =>
      prev.map((item) =>

        (item._id ||
          item.id) === itemId

          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }

          : item
      )
    );
  };

  const clearCart = () => {

    setCart([]);

    localStorage.removeItem(
      "pizza-cart"
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}