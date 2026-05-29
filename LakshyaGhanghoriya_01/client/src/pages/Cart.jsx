import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FONT = "'DM Sans', sans-serif";

function Cart() {
  const { cart, removeFromCart, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] =
    useState("");

  const [paying, setPaying] =
    useState(false);

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      Number(item.price || 0) *
      Number(item.quantity || 1),
    0
  );


  const placeOrder = async () => {

    if (!deliveryAddress.trim()) {
      alert(
        "Please enter delivery address"
      );
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {

      setPaying(true);

      const token =
        localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const { data: razorpayOrder, } = await axios.post(
        "http://localhost:5000/api/payment/create-order",

        {
          amount: Number(totalPrice),
        },

        { headers }
      );

      const options = {

        key:
          import.meta.env
            .VITE_RAZORPAY_KEY,

        amount:
          razorpayOrder.amount,

        currency: "INR",

        name: "PizzaStation",

        description:
          "Pizza Order Payment",

        order_id: razorpayOrder.id,

        handler: async () => {

          try {

            // =========================
            // STEP 3 : SAVE ORDER
            // =========================

            const orderPayload = {

              pizzas: cart.map((item) => ({
                _id: item._id, // ⭐ THIS IS REQUIRED FOR INVENTORY

                name: item.name || "Pizza",
                quantity: Number(item.quantity || 1),
                price: Number(item.price || 0),

                image: item.image || "",
                base: item.base || "",
                sauce: item.sauce || "",
                cheese: item.cheese || "",
                veggies: item.veggies || [],
              })),

              total: Number(totalPrice),
              deliveryAddress: deliveryAddress.trim(),
            };

            console.log(
              "ORDER PAYLOAD:",
              orderPayload
            );

            await axios.post(
              "http://localhost:5000/api/orders/create",

              orderPayload,

              { headers }
            );

            // =========================
            // STEP 4 : CLEAR CART
            // =========================

            clearCart();

            alert(
              "Order placed successfully 🍕"
            );

            navigate("/orders");

          } catch (err) {

            console.error(
              "ORDER SAVE ERROR:",
              err.response?.data || err
            );

            alert(
              "Payment successful but order save failed"
            );
          }
        },

        prefill: {

          name:
            localStorage.getItem(
              "name"
            ) || "",

          email:
            localStorage.getItem(
              "email"
            ) || "",
        },

        theme: {
          color: "#ff4d2d",
        },
      };

      const rzp =
        new window.Razorpay(options);

      rzp.on(
        "payment.failed",
        (response) => {

          console.error(
            "PAYMENT FAILED:",
            response.error
          );

          alert(
            "Payment failed. Please try again."
          );
        }
      );

      rzp.open();

    } catch (err) {

      console.error(
        "PAYMENT ERROR:",
        err.response?.data || err
      );

      alert(
        "Something went wrong"
      );

    } finally {

      setPaying(false);
    }
  };

  // =========================
  // FLOATING ICONS
  // =========================

  const foodIcons = [
    "🍕",
    "🍔",
    "🍟",
    "🌮",
    "🥤",
    "🧀",
  ];

  // =========================
  // STYLES
  // =========================

  const styles = {

    root: {
      minHeight: "100vh",

      background:
        "radial-gradient(circle at top left, rgba(255,77,45,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(255,140,0,0.12), transparent 45%), #0b0b0b",

      color: "#fff",

      fontFamily: FONT,

      padding: "35px 20px",

      position: "relative",

      overflow: "hidden",
    },

    bgIcon: {
      position: "absolute",

      fontSize: "80px",

      opacity: 0.08,

      filter: "blur(2px)",

      animation:
        "float 8s ease-in-out infinite",

      pointerEvents: "none",
    },

    container: {
      maxWidth: "1200px",

      margin: "0 auto",

      position: "relative",

      zIndex: 2,
    },

    header: {
      display: "flex",

      justifyContent:
        "space-between",

      alignItems: "center",

      marginBottom: "30px",

      flexWrap: "wrap",

      gap: "10px",
    },

    titleBox: {
      display: "flex",

      alignItems: "center",

      gap: "12px",
    },

    logo: {
      width: "46px",

      height: "46px",

      borderRadius: "12px",

      background:
        "linear-gradient(135deg,#ff4d2d,#ff8c00)",

      display: "grid",

      placeItems: "center",

      fontSize: "22px",

      boxShadow:
        "0 10px 25px rgba(255,77,45,0.25)",
    },

    title: {
      fontSize: "28px",

      fontWeight: "800",

      margin: 0,
    },

    subtitle: {
      color:
        "rgba(255,255,255,0.45)",

      fontSize: "13px",

      marginTop: "4px",
    },

    cartGrid: {
      display: "grid",

      gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",

      gap: "20px",
    },

    card: {
      background:
        "rgba(20,20,20,0.92)",

      border:
        "1px solid rgba(255,255,255,0.08)",

      borderRadius: "18px",

      padding: "22px",

      backdropFilter: "blur(10px)",
    },

    pizzaTitle: {
      fontSize: "20px",

      fontWeight: "700",

      marginBottom: "16px",

      color: "#ff4d2d",
    },

    row: {
      marginBottom: "10px",

      fontSize: "14px",

      color:
        "rgba(255,255,255,0.75)",
    },

    label: {
      color: "#fff",

      fontWeight: "600",
    },

    price: {
      marginTop: "15px",

      fontSize: "22px",

      fontWeight: "800",

      color: "#22c55e",
    },

    removeBtn: {
      marginTop: "16px",

      width: "100%",

      padding: "12px",

      borderRadius: "10px",

      border:
        "1px solid rgba(255,77,45,0.3)",

      background:
        "rgba(255,77,45,0.12)",

      color: "#ff4d2d",

      fontWeight: "600",

      cursor: "pointer",
    },

    addressBox: {
      marginTop: "24px",

      background:
        "rgba(20,20,20,0.92)",

      border:
        "1px solid rgba(255,255,255,0.08)",

      borderRadius: "18px",

      padding: "22px",
    },

    addressInput: {
      width: "100%",

      padding: "14px 16px",

      borderRadius: "12px",

      border:
        "1px solid rgba(255,255,255,0.08)",

      background:
        "rgba(255,255,255,0.04)",

      color: "#fff",

      fontSize: "14px",

      outline: "none",

      marginTop: "10px",

      fontFamily: FONT,
    },

    checkoutBox: {
      marginTop: "20px",

      background:
        "rgba(20,20,20,0.95)",

      border:
        "1px solid rgba(255,255,255,0.08)",

      borderRadius: "18px",

      padding: "22px",

      display: "flex",

      justifyContent:
        "space-between",

      alignItems: "center",

      flexWrap: "wrap",

      gap: "15px",
    },

    totalText: {
      fontSize: "26px",

      fontWeight: "800",
    },

    checkoutBtn: {
      padding: "14px 28px",

      borderRadius: "12px",

      border: "none",

      background: paying
        ? "rgba(255,255,255,0.1)"
        : "linear-gradient(135deg,#ff4d2d,#ff8c00)",

      color: "#fff",

      fontWeight: "700",

      cursor: paying
        ? "not-allowed"
        : "pointer",

      fontSize: "15px",
    },
  };

  return (
    <div style={styles.root}>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-20px);
          }

          100% {
            transform: translateY(0px);
          }
        }
      `}</style>

      {foodIcons.map(
        (icon, i) => (
          <div
            key={i}

            style={{
              ...styles.bgIcon,

              top: `${10 + i * 15}%`,

              left:
                i % 2 === 0
                  ? `${5 + i * 6}%`
                  : "auto",

              right:
                i % 2 !== 0
                  ? `${5 + i * 6}%`
                  : "auto",

              fontSize: `${60 + i * 8}px`,
            }}
          >
            {icon}
          </div>
        )
      )}

      <div style={styles.container}>

        <div style={styles.header}>

          <div style={styles.titleBox}>

            <div style={styles.logo}>
              🛒
            </div>

            <div>
              <h1 style={styles.title}>
                Your Cart
              </h1>

              <p style={styles.subtitle}>
                Review your delicious order
              </p>
            </div>

          </div>

        </div>

        {cart.length === 0 ? (

          <h3
            style={{
              textAlign: "center",
              marginTop: "60px",
              opacity: 0.5,
            }}
          >
            Cart is empty 🍕
          </h3>

        ) : (

          <>
            <div style={styles.cartGrid}>

              {cart.map((item) => (

                <div
                  key={
                    item.id || item._id
                  }

                  style={styles.card}
                >
                  <h2
                    style={
                      styles.pizzaTitle
                    }
                  >
                    🍕{" "}
                    {item.name ||
                      "Pizza"}
                  </h2>

                  <div style={styles.row}>
                    <span style={styles.label}>
                      Qty:
                    </span>{" "}
                    {item.quantity || 1}
                  </div>

                  <div style={styles.row}>
                    <span style={styles.label}>
                      Base:
                    </span>{" "}
                    {item.base ||
                      "Regular"}
                  </div>

                  <div style={styles.row}>
                    <span style={styles.label}>
                      Veggies:
                    </span>{" "}
                    {item.veggies?.length
                      ? item.veggies.join(
                        ", "
                      )
                      : "None"}
                  </div>

                  <div style={styles.price}>
                    ₹{" "}
                    {(item.price || 0) *
                      (item.quantity ||
                        1)}
                  </div>

                  <button
                    style={
                      styles.removeBtn
                    }

                    onClick={() =>
                      removeFromCart(
                        item.id ||
                        item._id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>
              ))}
            </div>

            <div style={styles.addressBox}>

              <label
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                📍 Delivery Address
              </label>

              <input
                style={
                  styles.addressInput
                }

                placeholder="Enter your full delivery address..."

                value={
                  deliveryAddress
                }

                onChange={(e) =>
                  setDeliveryAddress(
                    e.target.value
                  )
                }
              />

            </div>

            <div style={styles.checkoutBox}>

              <div>
                <p
                  style={{
                    opacity: 0.5,
                    margin: 0,
                  }}
                >
                  Total
                </p>

                <div
                  style={
                    styles.totalText
                  }
                >
                  ₹ {totalPrice}
                </div>
              </div>

              <button
                style={
                  styles.checkoutBtn
                }

                onClick={placeOrder}

                disabled={paying}
              >
                {paying
                  ? "Processing..."
                  : "Pizza-Pay →"}
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;