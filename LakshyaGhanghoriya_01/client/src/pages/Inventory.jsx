import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
const FONT = "'DM Sans', sans-serif";
function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] =
    useState("All");

  const [form, setForm] = useState({
    name: "",
    category: "Pizza",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);
  useEffect(() => {

    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED");
    });

    socket.on("outOfStock", (data) => {

      console.log("EVENT RECEIVED:", data);

      toast.error(
        `${data.name} is OUT OF STOCK`
      );

    });

    return () => {
      socket.disconnect();
    };

  }, []);
  const fetchInventory = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        "/inventory"
      );

      setInventory(data);
    } catch (error) {
      console.log(error);

      alert("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "Pizza",
      price: "",
      stock: "",
      image: "",
      description: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      if (editingId) {
        await api.put(
          `/inventory/${editingId}`,
          payload
        );

        alert(
          "Inventory updated successfully"
        );
      } else {
        await api.post(
          "/inventory",
          payload
        );

        alert(
          "Inventory item added successfully"
        );
      }

      resetForm();
      fetchInventory();
    } catch (error) {
      console.log(error);

      alert("Operation failed");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setForm({
      name: item.name || "",
      category:
        item.category || "Pizza",
      price: item.price || "",
      stock: item.stock || "",
      image: item.image || "",
      description:
        item.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this inventory item?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/inventory/${id}`
      );

      alert("Item deleted");

      fetchInventory();
    } catch (error) {
      console.log(error);

      alert("Delete failed");
    }
  };

  const filteredInventory =
    inventory.filter((item) => {
      const matchesSearch =
        item.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        filterCategory === "All"
          ? true
          : item.category ===
          filterCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  const getStockColor = (stock) => {
    if (stock <= 5) return "#ef4444";
    if (stock <= 15) return "#f59e0b";

    return "#22c55e";
  };

  const categories = [
    "Pizza",
    "Cheese",
    "Sauce",
    "Veggies",
    "Drinks",
    "Toppings",
    "Burger",
    "Pasta",
    "Dessert",
    "Sandwich",
    "French Fries",
    "Garlic Bread",
    "Combo Meal",
    "Ice Cream",
    "Salad",
    "Noodles",
    "Wrap",
    "Tacos",
    "Shakes",
    "Coffee",
    "Mocktail",
    "Extra Cheese",
    "Paneer",
    "Chicken",
    "Seafood",
    "Spices",
    "Dip",
  ];

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "40px 20px",
      background:
        "linear-gradient(135deg,#0b0b0b,#171717)",
      color: "#fff",
      fontFamily: FONT,
    },

    container: {
      maxWidth: "1400px",
      margin: "0 auto",
    },

    title: {
      fontSize: "42px",
      fontWeight: "800",
      marginBottom: "10px",
    },

    subtitle: {
      color: "rgba(255,255,255,0.6)",
      marginBottom: "35px",
      lineHeight: "1.6",
    },

    grid: {
      display: "grid",
      gridTemplateColumns:
        "380px 1fr",
      gap: "28px",
    },

    card: {
      background:
        "rgba(255,255,255,0.04)",
      border:
        "1px solid rgba(255,255,255,0.08)",
      borderRadius: "24px",
      padding: "24px",
      backdropFilter: "blur(12px)",
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.35)",
    },

    sectionTitle: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "20px",
    },

    input: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "14px",
      border:
        "1px solid rgba(255,255,255,0.08)",
      background:
        "rgba(255,255,255,0.05)",
      color: "#fff",
      outline: "none",
      marginBottom: "16px",
      fontSize: "14px",
    },

    textarea: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "14px",
      border:
        "1px solid rgba(255,255,255,0.08)",
      background:
        "rgba(255,255,255,0.05)",
      color: "#fff",
      outline: "none",
      marginBottom: "16px",
      minHeight: "100px",
      resize: "none",
    },

    button: {
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "14px",
      background:
        "linear-gradient(135deg,#ff4d2d,#ff8c00)",
      color: "#fff",
      fontWeight: "700",
      cursor: "pointer",
      fontSize: "15px",
      transition: "0.3s",
    },

    cancelBtn: {
      width: "100%",
      padding: "14px",
      borderRadius: "14px",
      border:
        "1px solid rgba(255,255,255,0.1)",
      background:
        "rgba(255,255,255,0.05)",
      color: "#fff",
      cursor: "pointer",
      marginTop: "12px",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
    },

    th: {
      textAlign: "left",
      padding: "16px",
      color:
        "rgba(255,255,255,0.5)",
      borderBottom:
        "1px solid rgba(255,255,255,0.08)",
      fontSize: "13px",
    },

    td: {
      padding: "16px",
      borderBottom:
        "1px solid rgba(255,255,255,0.05)",
      fontSize: "14px",
    },

    actionBtn: {
      padding: "9px 14px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "600",
      marginRight: "8px",
    },

    row: {
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          🍕 Inventory Management
        </h1>

        <p style={styles.subtitle}>
          Manage inventory items,
          update stock levels, track
          low stock products and
          maintain your restaurant
          inventory system.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>
              {editingId
                ? "✏ Edit Inventory"
                : "➕ Add Inventory"}
            </h2>

            <form
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={form.name}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={styles.input}
              >
                {categories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                      style={{
                        background:
                          "#111",
                      }}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock Quantity"
                value={form.stock}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                style={styles.input}
              />

              {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    marginBottom: "16px",
                  }}
                />
              )}

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                style={styles.textarea}
              />

              <button
                type="submit"
                style={styles.button}
              >
                {editingId
                  ? "Update Item"
                  : "Add Item"}
              </button>

              {editingId && (
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={resetForm}
                >
                  Cancel Editing
                </button>
              )}
            </form>
          </div>

          <div style={styles.card}>
            {/* TOP BAR */}
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                }}
              >
                📦 Inventory Items
              </h2>

              <span
                style={{
                  color:
                    "rgba(255,255,255,0.5)",
                }}
              >
                {
                  filteredInventory.length
                }{" "}
                Items
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                placeholder="Search inventory..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                style={{
                  ...styles.input,
                  marginBottom: 0,
                  flex: 1,
                }}
              />

              <select
                value={filterCategory}
                onChange={(e) =>
                  setFilterCategory(
                    e.target.value
                  )
                }
                style={{
                  ...styles.input,
                  marginBottom: 0,
                  width: "220px",
                }}
              >
                <option
                  value="All"
                  style={{
                    background: "#111",
                  }}
                >
                  All Categories
                </option>

                {[
                  ...new Set(
                    inventory.map(
                      (item) =>
                        item.category
                    )
                  ),
                ].map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    style={{
                      background: "#111",
                    }}
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div
                style={{
                  overflowX: "auto",
                }}
              >
                <table
                  style={styles.table}
                >
                  <thead>
                    <tr>
                      <th style={styles.th}>
                        Image
                      </th>

                      <th style={styles.th}>
                        Name
                      </th>

                      <th style={styles.th}>
                        Category
                      </th>

                      <th style={styles.th}>
                        Price
                      </th>

                      <th style={styles.th}>
                        Stock
                      </th>

                      <th style={styles.th}>
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredInventory.length ===
                      0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          style={{
                            padding:
                              "40px",
                            textAlign:
                              "center",
                            opacity: 0.5,
                          }}
                        >
                          No inventory items
                          found
                        </td>
                      </tr>
                    ) : (
                      filteredInventory.map(
                        (item) => (
                          <tr
                            key={item._id}
                            style={
                              styles.row
                            }
                            onMouseEnter={(
                              e
                            ) => {
                              e.currentTarget.style.background =
                                "rgba(255,255,255,0.03)";
                            }}
                            onMouseLeave={(
                              e
                            ) => {
                              e.currentTarget.style.background =
                                "transparent";
                            }}
                          >
                            <td
                              style={
                                styles.td
                              }
                            >
                              <img
                                src={
                                  item.image ||
                                  "https://images.unsplash.com/photo-1513104890138-7c749659a591"
                                }
                                alt={
                                  item.name
                                }
                                style={{
                                  width:
                                    "70px",
                                  height:
                                    "70px",
                                  objectFit:
                                    "cover",
                                  borderRadius:
                                    "14px",
                                }}
                              />
                            </td>

                            <td
                              style={
                                styles.td
                              }
                            >
                              {
                                item.name
                              }
                            </td>

                            <td
                              style={
                                styles.td
                              }
                            >
                              {
                                item.category
                              }
                            </td>

                            <td
                              style={
                                styles.td
                              }
                            >
                              ₹
                              {
                                item.price
                              }
                            </td>

                            <td
                              style={{
                                ...styles.td,
                                color:
                                  getStockColor(
                                    item.stock
                                  ),
                                fontWeight:
                                  "700",
                              }}
                            >
                              {
                                item.stock
                              }

                              {item.stock <=
                                5 && (
                                  <div
                                    style={{
                                      fontSize:
                                        "12px",
                                      marginTop:
                                        "4px",
                                    }}
                                  >
                                    Low Stock
                                  </div>
                                )}
                            </td>

                            <td
                              style={
                                styles.td
                              }
                            >
                              <button
                                style={{
                                  ...styles.actionBtn,
                                  background:
                                    "#3b82f6",
                                }}
                                onClick={() =>
                                  handleEdit(
                                    item
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                style={{
                                  ...styles.actionBtn,
                                  background:
                                    "#ef4444",
                                }}
                                onClick={() =>
                                  handleDelete(
                                    item._id
                                  )
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;