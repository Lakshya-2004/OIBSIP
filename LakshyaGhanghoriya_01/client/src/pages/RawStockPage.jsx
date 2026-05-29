import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const API = "/api/raw-material";
const FONT = "'DM Sans', sans-serif";

function RawStockPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    stock: 0,
    unit: "kg",
    threshold: 5,
  });

  /* =========================
     SOCKET CONNECTION
  ========================= */

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("✅ Socket connected");
    });

    socket.on("lowStock", (item) => {
      alert(`⚠ LOW STOCK ALERT\n\n${item.name} stock is only ${item.stock}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  /* =========================
     FETCH INVENTORY
  ========================= */

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setItems(res.data?.items || []);
    } catch (error) {
      console.log("Fetch error:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "stock" || name === "threshold"
          ? Number(value)
          : value,
    }));
  };

  /* =========================
     ADD ITEM
  ========================= */

  const addItem = async () => {
    try {
      if (!form.name.trim()) {
        alert("Item name is required");
        return;
      }

      const duplicate = items.find(
        (item) =>
          item.name.trim().toLowerCase() ===
          form.name.trim().toLowerCase()
      );

      if (duplicate) {
        alert(`"${duplicate.name}" already exists in stock.`);
        return;
      }

      await axios.post(API, {
        name: form.name,
        stock: form.stock,
        unit: form.unit,
        threshold: form.threshold,
      });

      setForm({ name: "", stock: 0, unit: "kg", threshold: 5 });
      fetchData();
    } catch (error) {
      console.log("Add item error:", error?.response?.data || error);
      alert("Failed to add item");
    }
  };

  /* =========================
     UPDATE STOCK
  ========================= */

  const updateStock = async (item, change) => {
    try {
      await axios.patch(`${API}/${item._id}/stock`, { change });
      fetchData();
    } catch (error) {
      console.log("Stock update error:", error);
      alert("Failed to update stock");
    }
  };

  /* =========================
     UPDATE THRESHOLD
  ========================= */

  const updateThreshold = async (item, newThreshold) => {
    try {
      await axios.put(`${API}/${item._id}`, {
        threshold: Number(newThreshold),
      });
      fetchData();
    } catch (error) {
      console.log("Threshold update error:", error);
      alert("Failed to update threshold");
    }
  };

  /* =========================
     DELETE ITEM
  ========================= */

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm("Delete this item?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchData();
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete item");
    }
  };

  /* =========================
     STYLES
  ========================= */

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "40px 20px",
      background: "linear-gradient(135deg,#0b0b0b,#171717)",
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
      gridTemplateColumns: "380px 1fr",
      gap: "28px",
      alignItems: "start",
    },

    card: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "24px",
      padding: "24px",
      backdropFilter: "blur(12px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
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
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.05)",
      color: "#fff",
      outline: "none",
      marginBottom: "16px",
      fontSize: "14px",
      boxSizing: "border-box",
    },

    button: {
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "14px",
      background: "linear-gradient(135deg,#ff4d2d,#ff8c00)",
      color: "#fff",
      fontWeight: "700",
      cursor: "pointer",
      fontSize: "15px",
      transition: "0.3s",
      marginTop: "4px",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
    },

    th: {
      textAlign: "left",
      padding: "16px",
      color: "rgba(255,255,255,0.5)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      fontSize: "13px",
    },

    td: {
      padding: "16px",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      fontSize: "14px",
      verticalAlign: "middle",
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

    qtyBtn: {
      width: "30px",
      height: "30px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.07)",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 1,
    },

    thresholdInput: {
      width: "72px",
      padding: "8px 10px",
      borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.05)",
      color: "#fff",
      outline: "none",
      fontSize: "13px",
      textAlign: "center",
      boxSizing: "border-box",
    },
  };

  const getStatusBadge = (stock, threshold) => {
    const isLow = stock <= threshold;
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          background: isLow
            ? "rgba(239,68,68,0.12)"
            : "rgba(34,197,94,0.12)",
          color: isLow ? "#f87171" : "#4ade80",
          border: isLow
            ? "1px solid rgba(239,68,68,0.25)"
            : "1px solid rgba(34,197,94,0.25)",
          borderRadius: "20px",
          padding: "4px 10px",
          fontSize: "12px",
          fontWeight: "500",
          whiteSpace: "nowrap",
        }}
      >
        {isLow ? "⚠ Low" : "✅ OK"}
      </span>
    );
  };

  /* =========================
     UI
  ========================= */

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🧺 Raw Material Stock</h1>

        <p style={styles.subtitle}>
          Manage raw materials, update stock levels, set thresholds and get
          alerts when inventory runs low.
        </p>

        <div style={styles.grid}>
          {/* LEFT — FORM */}
          <div style={{ ...styles.card, position: "sticky", top: "40px" }}>
            <h2 style={styles.sectionTitle}>➕ Add Item</h2>

            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name="unit"
              placeholder="Unit (kg, L, pcs)"
              value={form.unit}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="number"
              name="threshold"
              placeholder="Threshold"
              value={form.threshold}
              onChange={handleChange}
              style={styles.input}
            />

            <button style={styles.button} onClick={addItem}>
              ➕ Add Item
            </button>
          </div>

          {/* RIGHT — TABLE */}
          <div style={styles.card}>
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "700" }}>
                🧺 Raw Material Stock
              </h2>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>
                {items.length} Items
              </span>
            </div>

            {/* TABLE */}
            {loading ? (
              <p
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  opacity: 0.5,
                }}
              >
                Loading stock...
              </p>
            ) : items.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  opacity: 0.5,
                }}
              >
                No raw materials found.
              </p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Item</th>
                      <th style={styles.th}>Quantity</th>
                      <th style={styles.th}>Unit</th>
                      <th style={styles.th}>Threshold</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item) => (
                      <tr
                        key={item._id}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.03)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                        style={{ transition: "0.3s" }}
                      >
                        {/* NAME */}
                        <td style={styles.td}>{item.name}</td>

                        {/* STOCK CONTROLS */}
                        <td style={styles.td}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <button
                              style={styles.qtyBtn}
                              onClick={() => updateStock(item, -1)}
                            >
                              −
                            </button>

                            <span
                              style={{
                                fontWeight: "700",
                                color: "#22c55e",
                                minWidth: "32px",
                                textAlign: "center",
                              }}
                            >
                              {item.stock}
                            </span>

                            <button
                              style={styles.qtyBtn}
                              onClick={() => updateStock(item, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* UNIT */}
                        <td style={styles.td}>{item.unit}</td>

                        {/* THRESHOLD */}
                        <td style={styles.td}>
                          <input
                            style={styles.thresholdInput}
                            type="number"
                            defaultValue={item.threshold}
                            onBlur={(e) =>
                              updateThreshold(item, e.target.value)
                            }
                          />
                        </td>

                        {/* STATUS */}
                        <td style={styles.td}>
                          {getStatusBadge(item.stock, item.threshold)}
                        </td>

                        {/* DELETE */}
                        <td style={styles.td}>
                          <button
                            style={{
                              ...styles.actionBtn,
                              background: "#ef4444",
                            }}
                            onClick={() => deleteItem(item._id)}
                          >
                            🗑 Delete
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default RawStockPage;