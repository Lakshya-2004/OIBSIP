// pages/featured.jsx

import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/common/Loader";

const FONT = "'DM Sans', sans-serif";

function Inventory() {
  const [inventory, setInventory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    filterCategory,
    setFilterCategory,
  ] = useState("All");

  const [form, setForm] =
    useState({
      name: "",
      category: "Pizza",
      
      
      image: "",
      description: "",
    });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);

      const { data } =
        await api.get("/featured");

      setInventory(data);

    } catch (error) {
      console.log(error);

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
      
      
      image: "",
      description: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await api.put(
          `/featured/${editingId}`,
          form
        );

        alert("Item updated successfully");

      } else {

        await api.post(
          "/featured",
          form
        );

        alert("Item added successfully");
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
      name: item.name,
      category: item.category,
      
   
      image: item.image,
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
        "Delete this item?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/featured/${id}`
      );

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
          .toLowerCase()
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
      maxWidth: "1350px",
      margin: "0 auto",
    },

    title: {
      fontSize: "42px",
      fontWeight: "800",
      marginBottom: "10px",
    },

    subtitle: {
      color: "rgba(255,255,255,0.55)",
      marginBottom: "35px",
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
      padding: "8px 14px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "600",
      marginRight: "8px",
    },

    rowHover: {
      transition: "0.3s",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <h1 style={styles.title}>
          🍕 Trending Item Management
        </h1>

        <p style={styles.subtitle}>
          Manage pizzas, burgers,
          drinks, toppings and all
          Trending items dynamically.
        </p>

        <div style={styles.grid}>

          {/* FORM */}

          <div style={styles.card}>

            <h2
              style={{
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              {editingId
                ? "Edit Item"
                : "Add New Item"}
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
                style={{
                  ...styles.input,

                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",

                  background:
                    "linear-gradient(135deg, rgba(28,28,28,0.98), rgba(18,18,18,0.95))",

                  color: "#ffffff",

                  border:
                    "1px solid rgba(255,140,0,0.25)",

                  borderRadius: "18px",

                  padding: "15px 18px",

                  fontSize: "15px",

                  fontWeight: "600",

                  cursor: "pointer",

                  outline: "none",

                  transition: "all 0.35s ease",

                  backdropFilter: "blur(14px)",

                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.35)",

                  letterSpacing: "0.4px",

                  backgroundImage:
                    "linear-gradient(45deg, transparent 50%, #ff8c00 50%), linear-gradient(135deg, #ff8c00 50%, transparent 50%)",

                  backgroundPosition:
                    "calc(100% - 20px) calc(50% - 3px), calc(100% - 14px) calc(50% - 3px)",

                  backgroundSize: "6px 6px",

                  backgroundRepeat: "no-repeat",
                }}

                onFocus={(e) => {
                  e.target.style.border =
                    "1px solid #ff8c00";

                  e.target.style.boxShadow =
                    "0 0 0 4px rgba(255,140,0,0.18), 0 10px 25px rgba(0,0,0,0.35)";

                  e.target.style.transform =
                    "translateY(-1px)";
                }}

                onBlur={(e) => {
                  e.target.style.border =
                    "1px solid rgba(255,140,0,0.25)";

                  e.target.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.35)";

                  e.target.style.transform =
                    "translateY(0px)";
                }}
              >
                {[
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
                ].map((item) => (
                  <option
                    key={item}
                    value={item}
                    style={{
                      background: "#181818",
                      color: "#ffffff",
                      padding: "10px",
                    }}
                  >
                    {item}
                  </option>
                ))}
              </select>

              

              <div
                style={{
                  marginBottom: "18px",
                }}
              >
                <input
                  type="text"
                  name="image"
                  placeholder="Paste Image URL"
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
                      marginTop: "12px",
                      border:
                        "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                )}
              </div>

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

            </form>
          </div>

          {/* TABLE */}

          <div style={styles.card}>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                }}
              >
              Tranding Items
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

            {/* SEARCH + FILTER */}

            <div
              style={{
                display: "flex",
                gap: "14px",
                marginBottom: "22px",
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                placeholder="Search items..."
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
                  setFilterCategory(e.target.value)
                }
                style={{
                  ...styles.input,

                  marginBottom: 0,
                  width: "240px",

                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",

                  background:
                    "linear-gradient(135deg, rgba(30,30,30,0.95), rgba(18,18,18,0.95))",

                  color: "#fff",

                  border:
                    "1px solid rgba(255,140,0,0.25)",

                  borderRadius: "16px",

                  padding: "14px 18px",

                  fontSize: "14px",

                  fontWeight: "600",

                  cursor: "pointer",

                  outline: "none",

                  backdropFilter: "blur(12px)",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.35)",

                  transition: "all 0.3s ease",

                  backgroundImage: `
      linear-gradient(45deg, transparent 50%, #ff8c00 50%),
      linear-gradient(135deg, #ff8c00 50%, transparent 50%)
    `,

                  backgroundPosition:
                    "calc(100% - 20px) calc(1.1em + 2px), calc(100% - 15px) calc(1.1em + 2px)",

                  backgroundSize: "5px 5px, 5px 5px",

                  backgroundRepeat: "no-repeat",
                }}

                onFocus={(e) => {
                  e.target.style.border =
                    "1px solid #ff8c00";

                  e.target.style.boxShadow =
                    "0 0 0 4px rgba(255,140,0,0.15)";
                }}

                onBlur={(e) => {
                  e.target.style.border =
                    "1px solid rgba(255,140,0,0.25)";

                  e.target.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.35)";
                }}
              >
                <option value="All">
                  All Categories
                </option>

                {[...new Set(
                  inventory.map(
                    (i) => i.category
                  )
                )].map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    style={{
                      background: "#181818",
                      color: "#fff",
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
                      <th
                        style={styles.th}
                      >
                        Image
                      </th>

                      <th
                        style={styles.th}
                      >
                        Name
                      </th>

                      <th
                        style={styles.th}
                      >
                        Category
                      </th>

                     

                     

                      <th
                        style={styles.th}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredInventory.map(
                      (item) => (
                        <tr
                          key={
                            item._id
                          }
                          style={
                            styles.rowHover
                          }
                          onMouseEnter={(
                            e
                          ) => {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";
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
                                item.image
                              }
                              alt=""
                              style={{
                                width:
                                  "70px",
                                height:
                                  "70px",
                                borderRadius:
                                  "14px",
                                objectFit:
                                  "cover",
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