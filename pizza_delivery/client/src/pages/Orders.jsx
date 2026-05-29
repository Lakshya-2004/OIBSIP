import { useEffect, useState } from "react";
import axios from "axios";

const FONT = "'DM Sans', sans-serif";

const STATUS_META = {
  "Order Received": {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    icon: "🕐",
  },
  "In Kitchen": {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    icon: "👨‍🍳",
  },
  "Sent To Delivery": {
    color: "#a855f7",
    bg: "rgba(168,85,247,0.12)",
    icon: "🛵",
  },
  Delivered: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    icon: "✅",
  },
};

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || {
    color: "#aaa",
    bg: "rgba(255,255,255,0.08)",
    icon: "❓",
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        borderRadius: "20px",
        background: meta.bg,
        color: meta.color,
        border: `1px solid ${meta.color}33`,
        fontSize: "12px",
        fontWeight: "600",
        whiteSpace: "nowrap",
      }}
    >
      {meta.icon} {status}
    </span>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    root: {
      minHeight: "100vh",
      background: "#0d0d0d",
      color: "#fff",
      fontFamily: FONT,
      padding: "35px 20px",
    },

    container: {
      maxWidth: "1150px",
      margin: "0 auto",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "35px",
    },

    titleWrap: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
    },

    logo: {
      width: "50px",
      height: "50px",
      borderRadius: "14px",
      background:
        "linear-gradient(135deg,#ff4d2d,#ff8c00)",
      display: "grid",
      placeItems: "center",
      fontSize: "24px",
      boxShadow:
        "0 8px 25px rgba(255,77,45,0.25)",
    },

    title: {
      margin: 0,
      fontSize: "30px",
      fontWeight: "700",
    },

    accent: {
      color: "#ff4d2d",
    },

    subtitle: {
      margin: "5px 0 0",
      color: "rgba(255,255,255,0.45)",
      fontSize: "14px",
    },

    topBadge: {
      padding: "10px 16px",
      borderRadius: "12px",
      background: "rgba(255,77,45,0.12)",
      border:
        "1px solid rgba(255,77,45,0.2)",
      color: "#ff4d2d",
      fontSize: "13px",
      fontWeight: "600",
    },

    loadingBox: {
      background: "#141414",
      border:
        "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px",
      padding: "70px 20px",
      textAlign: "center",
      color: "rgba(255,255,255,0.45)",
    },

    errorBox: {
      background: "#141414",
      border:
        "1px solid rgba(248,113,113,0.2)",
      borderRadius: "20px",
      padding: "40px 20px",
      textAlign: "center",
      color: "#f87171",
    },

    ordersGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(320px,1fr))",
      gap: "22px",
    },

    card: {
      background: "#141414",
      border:
        "1px solid rgba(255,255,255,0.07)",
      borderRadius: "22px",
      padding: "24px",
      transition: "0.3s",
      boxShadow:
        "0 8px 20px rgba(0,0,0,0.25)",
    },

    cardTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "18px",
      gap: "10px",
      flexWrap: "wrap",
    },

    pizzaName: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#ff4d2d",
      margin: 0,
      lineHeight: "1.5",
    },

    orderId: {
      fontSize: "12px",
      color: "rgba(255,255,255,0.35)",
      fontFamily: "monospace",
    },

    infoRow: {
      marginBottom: "12px",
      fontSize: "14px",
      color: "rgba(255,255,255,0.7)",
      lineHeight: "1.6",
    },

    label: {
      color: "#fff",
      fontWeight: "600",
    },

    divider: {
      margin: "18px 0",
      border: "none",
      borderTop:
        "1px solid rgba(255,255,255,0.06)",
    },

    emptyBox: {
      background: "#141414",
      border:
        "1px solid rgba(255,255,255,0.07)",
      borderRadius: "22px",
      padding: "70px 20px",
      textAlign: "center",
    },

    emptyEmoji: {
      fontSize: "60px",
      marginBottom: "15px",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .food {
          position: absolute;
          user-select: none;
          pointer-events: none;
          opacity: 0.12;
          filter: blur(1.8px);
          animation: float 8s ease-in-out infinite;
          z-index: 0;
        }

        .food1 {
          top: 5%;
          left: 4%;
          font-size: 110px;
        }

        .food2 {
          top: 12%;
          right: 6%;
          font-size: 120px;
          animation-delay: 1s;
        }

        .food3 {
          bottom: 8%;
          left: 8%;
          font-size: 110px;
          animation-delay: 2s;
        }

        .food4 {
          bottom: 10%;
          right: 8%;
          font-size: 95px;
          animation-delay: 3s;
        }

        .food5 {
          top: 45%;
          left: -10px;
          font-size: 75px;
          animation-delay: 4s;
        }

        .food6 {
          top: 50%;
          right: -10px;
          font-size: 80px;
          animation-delay: 5s;
        }

        .food7 {
          top: 28%;
          left: 22%;
          font-size: 70px;
          animation-delay: 2s;
        }

        .food8 {
          bottom: 25%;
          right: 25%;
          font-size: 70px;
          animation-delay: 3s;
        }

        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }

          50% {
            transform: translateY(-20px) rotate(10deg);
          }

          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @media (max-width: 768px) {
          .food {
            opacity: 0.08;
          }

          .food1,
          .food2,
          .food3,
          .food4 {
            font-size: 70px;
          }

          .food5,
          .food6,
          .food7,
          .food8 {
            font-size: 55px;
          }
        }
      `}</style>

      <div
        style={{
          ...styles.root,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="food food1">🍕</div>
        <div className="food food2">🍔</div>
        <div className="food food3">🍟</div>
        <div className="food food4">🌮</div>
        <div className="food food5">🍕</div>
        <div className="food food6">🍔</div>
        <div className="food food7">🍗</div>
        <div className="food food8">🌭</div>

        <div
          style={{
            ...styles.container,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* HEADER */}
          <div style={styles.header}>
            <div style={styles.titleWrap}>
              <div style={styles.logo}>📦</div>

              <div>
                <h1 style={styles.title}>
                  My{" "}
                  <span style={styles.accent}>
                    Orders
                  </span>
                </h1>

                <p style={styles.subtitle}>
                  Track your delicious pizza orders
                </p>
              </div>
            </div>

            <div style={styles.topBadge}>
              Live Order Tracking 🚀
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div style={styles.loadingBox}>
              <div
                style={{
                  fontSize: 60,
                  marginBottom: 16,
                }}
              >
                🍕
              </div>

              Loading your orders...
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div style={styles.errorBox}>
              <div
                style={{
                  fontSize: 50,
                  marginBottom: 12,
                }}
              >
                ⚠️
              </div>

              <h2>{error}</h2>

              <button
                onClick={fetchOrders}
                style={{
                  marginTop: 16,
                  padding: "10px 20px",
                  borderRadius: 12,
                  border: "none",
                  background:
                    "linear-gradient(135deg,#ff4d2d,#ff8c00)",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            orders.length === 0 && (
              <div style={styles.emptyBox}>
                <div style={styles.emptyEmoji}>
                  🍕
                </div>

                <h2>No Orders Yet</h2>

                <p
                  style={{
                    color:
                      "rgba(255,255,255,0.45)",
                  }}
                >
                  Start ordering your favorite pizza now
                </p>
              </div>
            )}

          {/* ORDERS */}
          {!loading &&
            !error &&
            orders.length > 0 && (
              <div style={styles.ordersGrid}>
                {orders.map((order) => {
                  const pizzas =
                    order.pizzas || [];

                  const totalItems =
                    pizzas.reduce(
                      (acc, item) =>
                        acc +
                        (item.quantity || 1),
                      0
                    );

                  const itemNames =
                    pizzas
                      .map(
                        (item) =>
                          `${item.name || item.base || "Custom Pizza"} x${
                            item.quantity || 1
                          }`
                      )
                      .join(", ");

                  const toppings =
                    pizzas.flatMap(
                      (item) =>
                        item.veggies || []
                    );

                  return (
                    <div
                      key={order._id}
                      style={styles.card}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-5px)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,77,45,0.2)";

                        e.currentTarget.style.boxShadow =
                          "0 15px 35px rgba(255,77,45,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0px)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.07)";

                        e.currentTarget.style.boxShadow =
                          "0 8px 20px rgba(0,0,0,0.25)";
                      }}
                    >
                      <div style={styles.cardTop}>
                        <h2 style={styles.pizzaName}>
                          🍕 {itemNames}
                        </h2>

                        <StatusBadge
                          status={
                            order.orderStatus
                          }
                        />
                      </div>

                      <div style={styles.orderId}>
                        Order ID: #
                        {order._id
                          .slice(-8)
                          .toUpperCase()}
                      </div>

                      <hr
                        style={styles.divider}
                      />

                      <div
                        style={styles.infoRow}
                      >
                        <span
                          style={styles.label}
                        >
                          Items:
                        </span>{" "}
                        {totalItems} item
                        {totalItems > 1
                          ? "s"
                          : ""}
                      </div>

                      {toppings.length >
                        0 && (
                        <div
                          style={
                            styles.infoRow
                          }
                        >
                          <span
                            style={
                              styles.label
                            }
                          >
                            Toppings:
                          </span>{" "}
                          {toppings.join(
                            ", "
                          )}
                        </div>
                      )}

                      <div
                        style={styles.infoRow}
                      >
                        <span
                          style={styles.label}
                        >
                          Total:
                        </span>{" "}
                        ₹{order.total}
                      </div>

                      <div
                        style={styles.infoRow}
                      >
                        <span
                          style={styles.label}
                        >
                          Payment:
                        </span>{" "}
                        {order.paymentStatus ||
                          "Pending"}
                      </div>

                      <div
                        style={styles.infoRow}
                      >
                        <span
                          style={styles.label}
                        >
                          Delivery Address:
                        </span>{" "}
                        {order.deliveryAddress ||
                          "Not provided"}
                      </div>

                      <div
                        style={styles.infoRow}
                      >
                        <span
                          style={styles.label}
                        >
                          Ordered:
                        </span>{" "}
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>
      </div>
    </>
  );
}