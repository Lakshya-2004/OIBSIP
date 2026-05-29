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

  //  Save cart whenever it changes
  useEffect(() => {

    localStorage.setItem(
      "pizza-cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  //  Add item to cart
  const addToCart = (item) => {

    setCart((prev) => {

      const existingItem =
        prev.find(
          (cartItem) =>
            (cartItem._id ||
              cartItem.id) ===
            (item._id || item.id)
        );

      // If item already exists → increase quantity
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

      // Otherwise add new item
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

  //  Remove item
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

  //  Increase quantity
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

  //  Decrease quantity
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

  //  Clear cart after order
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