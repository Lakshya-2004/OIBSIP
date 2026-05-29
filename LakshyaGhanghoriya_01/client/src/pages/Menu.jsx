import {
  useContext,
  useEffect,
  useState,
} from "react";

import { CartContext } from "../context/CartContext";
import api from "../services/api";

const FONT = "'DM Sans', sans-serif";

export default function Menu() {
  const { addToCart } =
    useContext(CartContext);

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [hovered, setHovered] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [quantities, setQuantities] =
    useState({});

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const { data } =
        await api.get("/inventory");

      setItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    ...new Set(
      items.map(
        (item) => item.category
      )
    ),
  ];

  const filteredItems =
    items.filter((item) => {
      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : item.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  const styles = {
    root: {
      minHeight: "100vh",
      fontFamily: FONT,
      color: "#fff",
      padding: "40px 20px",
      position: "relative",
      background:
        "radial-gradient(circle at top left, rgba(255,77,45,0.18), transparent 40%), radial-gradient(circle at bottom right, rgba(255,140,0,0.12), transparent 35%), #0d0d0d",
      overflow: "hidden",
    },

    floating: {
      position: "absolute",
      fontSize: "90px",
      opacity: 0.05,
      filter: "blur(1px)",
      animation:
        "float 8s ease-in-out infinite",
      userSelect: "none",
      pointerEvents: "none",
    },

    container: {
      maxWidth: "1300px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },

    header: {
      textAlign: "center",
      marginBottom: "40px",
    },

    title: {
      fontSize: "42px",
      fontWeight: "800",
      margin: 0,
    },

    accent: {
      color: "#ff4d2d",
    },

    subtitle: {
      marginTop: "10px",
      color:
        "rgba(255,255,255,0.55)",
      fontSize: "14px",
    },

    topBar: {
      display: "flex",
      gap: "16px",
      marginBottom: "35px",
      flexWrap: "wrap",
    },

    input: {
      flex: 1,
      minWidth: "240px",
      padding: "14px 16px",
      borderRadius: "14px",
      border:
        "1px solid rgba(255,255,255,0.08)",
      background:
        "rgba(255,255,255,0.05)",
      color: "#fff",
      outline: "none",
      fontSize: "14px",
    },

    select: {
      padding: "14px 16px",
      borderRadius: "14px",
      border:
        "1px solid rgba(255,255,255,0.08)",
      background:
        "rgba(255,255,255,0.05)",
      color: "#fff",
      outline: "none",
      fontSize: "14px",
      minWidth: "220px",
    },

    grid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(270px,1fr))",
      gap: "24px",
    },

    card: {
      background:
        "rgba(20,20,20,0.92)",
      border:
        "1px solid rgba(255,255,255,0.08)",
      borderRadius: "22px",
      overflow: "hidden",
      transition: "0.3s ease",
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.25)",
    },

    image: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
    },

    content: {
      padding: "20px",
    },

    category: {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "999px",
      background:
        "rgba(255,77,45,0.12)",
      color: "#ff7b4d",
      fontSize: "12px",
      marginBottom: "12px",
      fontWeight: "600",
    },

    name: {
      fontSize: "20px",
      fontWeight: "700",
      marginBottom: "10px",
    },

    desc: {
      fontSize: "13px",
      color:
        "rgba(255,255,255,0.55)",
      lineHeight: "1.6",
      marginBottom: "16px",
      minHeight: "42px",
    },

    price: {
      fontSize: "22px",
      fontWeight: "800",
      color: "#22c55e",
    },

    empty: {
      textAlign: "center",
      padding: "100px 20px",
      color:
        "rgba(255,255,255,0.5)",
      fontSize: "18px",
    },
  };

  return (
    <div style={styles.root}>

      <div
        style={{
          ...styles.floating,
          top: "5%",
          left: "5%",
        }}
      >
        🍕
      </div>

      <div
        style={{
          ...styles.floating,
          top: "15%",
          right: "10%",
          fontSize: 110,
        }}
      >
        🍔
      </div>

      <div
        style={{
          ...styles.floating,
          bottom: "10%",
          left: "8%",
        }}
      >
        🧀
      </div>

      <div
        style={{
          ...styles.floating,
          bottom: "15%",
          right: "12%",
        }}
      >
        🥤
      </div>

      <div style={styles.container}>

        <div style={styles.header}>
          <h1 style={styles.title}>
            Delicious{" "}
            <span style={styles.accent}>
              Menu
            </span>
          </h1>

          <p style={styles.subtitle}>
            Fresh pizzas, burgers,
            drinks & more 🍕
          </p>
        </div>

        <div style={styles.topBar}>

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={styles.input}
          />

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            style={styles.select}
          >
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
                style={{
                  background:
                    "#1a1a1a",
                }}
              >
                {cat}
              </option>
            ))}
          </select>

        </div>

        {loading ? (

          <div style={styles.empty}>
            Loading menu...
          </div>

        ) : filteredItems.length === 0 ? (

          <div style={styles.empty}>
            No menu items found
          </div>

        ) : (

          <div style={styles.grid}>

            {filteredItems.map(
              (item) => (
                <div
                  key={item._id}
                  style={{
                    ...styles.card,

                    transform:
                      hovered ===
                      item._id
                        ? "translateY(-8px)"
                        : "translateY(0px)",

                    border:
                      hovered ===
                      item._id
                        ? "1px solid rgba(255,77,45,0.35)"
                        : "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={() =>
                    setHovered(
                      item._id
                    )
                  }
                  onMouseLeave={() =>
                    setHovered(
                      null
                    )
                  }
                >

                  <img
                    src={
                      item.image ||
                      "https://images.unsplash.com/photo-1513104890138-7c749659a591"
                    }
                    alt={item.name}
                    style={
                      styles.image
                    }
                  />

                  <div
                    style={
                      styles.content
                    }
                  >

                    <div
                      style={
                        styles.category
                      }
                    >
                      {
                        item.category
                      }
                    </div>

                    <div
                      style={
                        styles.name
                      }
                    >
                      {item.name}
                    </div>

                    <div
                      style={
                        styles.desc
                      }
                    >
                      {item.description ||
                        "Fresh & delicious item"}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        marginBottom:
                          "18px",
                      }}
                    >
                      <div
                        style={
                          styles.price
                        }
                      >
                        ₹ {item.price}
                      </div>

                      <div
                        style={{
                          padding:
                            "6px 12px",
                          borderRadius:
                            "999px",

                          background:
                            item.stock > 0
                              ? "rgba(34,197,94,0.12)"
                              : "rgba(239,68,68,0.12)",

                          color:
                            item.stock > 0
                              ? "#22c55e"
                              : "#ef4444",

                          fontSize:
                            "12px",

                          fontWeight:
                            "700",
                        }}
                      >
                        {item.stock > 0
                          ? `${item.stock} Left`
                          : "Out of Stock"}
                      </div>
                    </div>

                    {/* QUANTITY SECTION */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection:
                          "column",
                        gap: "14px",
                      }}
                    >

                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "space-between",

                          background:
                            "rgba(255,255,255,0.04)",

                          border:
                            "1px solid rgba(255,255,255,0.06)",

                          borderRadius:
                            "14px",

                          padding:
                            "10px 14px",
                        }}
                      >

                        <span
                          style={{
                            fontSize:
                              "13px",

                            color:
                              "rgba(255,255,255,0.6)",

                            fontWeight:
                              "600",
                          }}
                        >
                          Quantity
                        </span>

                        <div
                          style={{
                            display:
                              "flex",

                            alignItems:
                              "center",

                            gap: "12px",
                          }}
                        >

                          {/* MINUS */}
                          <button
                            onClick={() =>
                              setQuantities(
                                (
                                  prev
                                ) => ({
                                  ...prev,

                                  [item._id]:
                                    Math.max(
                                      1,
                                      (prev[
                                        item
                                          ._id
                                      ] ||
                                        1) -
                                        1
                                    ),
                                })
                              )
                            }
                            style={{
                              width:
                                "34px",

                              height:
                                "34px",

                              borderRadius:
                                "10px",

                              border:
                                "none",

                              background:
                                "rgba(255,255,255,0.08)",

                              color:
                                "#fff",

                              fontSize:
                                "20px",

                              cursor:
                                "pointer",

                              fontWeight:
                                "700",
                            }}
                          >
                            -
                          </button>

                          {/* QUANTITY */}
                          <div
                            style={{
                              minWidth:
                                "35px",

                              textAlign:
                                "center",

                              fontWeight:
                                "800",

                              fontSize:
                                "18px",

                              color:
                                "#fff",
                            }}
                          >
                            {quantities[
                              item._id
                            ] || 1}
                          </div>

                          {/* PLUS */}
                          <button
                            disabled={
                              (quantities[
                                item
                                  ._id
                              ] || 1) >=
                              item.stock
                            }
                            onClick={() =>
                              setQuantities(
                                (
                                  prev
                                ) => ({
                                  ...prev,

                                  [item._id]:
                                    (prev[
                                      item
                                        ._id
                                    ] ||
                                      1) +
                                    1,
                                })
                              )
                            }
                            style={{
                              width:
                                "34px",

                              height:
                                "34px",

                              borderRadius:
                                "10px",

                              border:
                                "none",

                              background:
                                (quantities[
                                  item
                                    ._id
                                ] || 1) >=
                                item.stock
                                  ? "rgba(255,255,255,0.05)"
                                  : "linear-gradient(135deg,#ff4d2d,#ff8c00)",

                              color:
                                (quantities[
                                  item
                                    ._id
                                ] || 1) >=
                                item.stock
                                  ? "rgba(255,255,255,0.3)"
                                  : "#fff",

                              fontSize:
                                "20px",

                              cursor:
                                (quantities[
                                  item
                                    ._id
                                ] || 1) >=
                                item.stock
                                  ? "not-allowed"
                                  : "pointer",

                              fontWeight:
                                "700",
                            }}
                          >
                            +
                          </button>

                        </div>
                      </div>

                      {/* BUTTONS */}
                      <div
                        style={{
                          display:
                            "flex",
                          gap: "12px",
                        }}
                      >

                        {/* ADD CART */}
                        <button
                          style={{
                            flex: 1,
                            padding:
                              "12px",

                            borderRadius:
                              "12px",

                            border:
                              "1px solid rgba(255,255,255,0.08)",

                            background:
                              "rgba(255,255,255,0.05)",

                            color:
                              "#fff",

                            fontWeight:
                              "700",

                            cursor:
                              "pointer",
                          }}
                          onClick={() =>
                            addToCart({
                              ...item,

                              quantity:
                                quantities[
                                  item
                                    ._id
                                ] || 1,
                            })
                          }
                        >
                          Add Cart
                        </button>

                        {/* BUY NOW */}
                        <button
                          disabled={
                            item.stock <=
                            0
                          }
                          style={{
                            flex: 1,

                            padding:
                              "12px",

                            borderRadius:
                              "12px",

                            border:
                              "none",

                            background:
                              item.stock >
                              0
                                ? "linear-gradient(135deg,#ff4d2d,#ff8c00)"
                                : "rgba(255,255,255,0.08)",

                            color:
                              item.stock >
                              0
                                ? "#fff"
                                : "rgba(255,255,255,0.4)",

                            fontWeight:
                              "800",

                            cursor:
                              item.stock >
                              0
                                ? "pointer"
                                : "not-allowed",

                            boxShadow:
                              item.stock >
                              0
                                ? "0 10px 25px rgba(255,77,45,0.25)"
                                : "none",
                          }}
                          onClick={() => {

                            addToCart({
                              ...item,

                              quantity:
                                quantities[
                                  item
                                    ._id
                                ] || 1,
                            });

                            alert(
                              `${quantities[item._id] || 1} ${item.name} added 🚀`
                            );
                          }}
                        >
                          Buy Now
                        </button>

                      </div>

                    </div>

                  </div>
                </div>
              )
            )}

          </div>
        )}
      </div>

      <style>
        {`
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
        `}
      </style>
    </div>
  );
}