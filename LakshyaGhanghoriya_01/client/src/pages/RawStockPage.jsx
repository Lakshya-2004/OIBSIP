import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RawStockPage.css";
import { io } from "socket.io-client";

const API = "/api/raw-material";

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
      alert(
        `⚠ LOW STOCK ALERT\n\n${item.name} stock is only ${item.stock}`
      );
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
        name === "stock" ||
        name === "threshold"
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

      await axios.post(API, {
        name: form.name,
        stock: form.stock,
        unit: form.unit,
        threshold: form.threshold,
      });

      setForm({
        name: "",
        stock: 0,
        unit: "kg",
        threshold: 5,
      });

      fetchData();

    } catch (error) {
      console.log(
        "Add item error:",
        error?.response?.data || error
      );

      alert("Failed to add item");
    }
  };

  /* =========================
     UPDATE STOCK
  ========================= */

  const updateStock = async (
    item,
    change
  ) => {
    try {
      await axios.patch(
        `${API}/${item._id}/stock`,
        { change }
      );

      fetchData();

    } catch (error) {
      console.log(
        "Stock update error:",
        error
      );

      alert("Failed to update stock");
    }
  };

  /* =========================
     UPDATE THRESHOLD
  ========================= */

  const updateThreshold = async (
    item,
    newThreshold
  ) => {
    try {
      await axios.put(
        `${API}/${item._id}`,
        {
          threshold: Number(
            newThreshold
          ),
        }
      );

      fetchData();

    } catch (error) {
      console.log(
        "Threshold update error:",
        error
      );

      alert("Failed to update threshold");
    }
  };

  /* =========================
     DELETE ITEM
  ========================= */

  const deleteItem = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this item?"
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/${id}`
      );

      fetchData();

    } catch (error) {
      console.log(
        "Delete error:",
        error
      );

      alert("Failed to delete item");
    }
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="raw-stock-container">
      <h2>🧺 Raw Material Stock</h2>

      {/* FORM */}

      <div className="raw-form">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        <input
          type="text"
          name="unit"
          placeholder="Unit (kg, L, pcs)"
          value={form.unit}
          onChange={handleChange}
        />

        <input
          type="number"
          name="threshold"
          placeholder="Threshold"
          value={form.threshold}
          onChange={handleChange}
        />

        <button onClick={addItem}>
          ➕ Add Item
        </button>
      </div>

      {/* TABLE */}

      <div className="raw-table-wrapper">
        {loading ? (
          <p className="loading">
            Loading stock...
          </p>
        ) : items.length === 0 ? (
          <p className="loading">
            No raw materials found.
          </p>
        ) : (
          <table className="raw-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Threshold</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  {/* NAME */}

                  <td>{item.name}</td>

                  {/* STOCK */}

                  <td>
                    <div className="stock-controls">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateStock(
                            item,
                            -1
                          )
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.stock}
                      </span>

                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateStock(
                            item,
                            1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* UNIT */}

                  <td>{item.unit}</td>

                  {/* THRESHOLD */}

                  <td>
                    <input
                      className="threshold-input"
                      type="number"
                      defaultValue={
                        item.threshold
                      }
                      onBlur={(e) =>
                        updateThreshold(
                          item,
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* STATUS */}

                  <td>
                    {item.stock <=
                    item.threshold ? (
                      <span className="low">
                        ⚠ Low
                      </span>
                    ) : (
                      <span className="ok">
                        ✅ OK
                      </span>
                    )}
                  </td>

                  {/* DELETE */}

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteItem(
                          item._id
                        )
                      }
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RawStockPage;