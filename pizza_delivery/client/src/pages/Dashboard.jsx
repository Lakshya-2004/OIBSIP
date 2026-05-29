import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const FONT = "'DM Sans', sans-serif";

function Dashboard() {

  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] =
    useState("");

  const [newFavorite, setNewFavorite] =
    useState({
      name: "",
      price: "",
      description: "",
    });
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {

    try {

      setLoading(true);

      const [
        userRes,
        ordersRes,
        favoritesRes,
        addressRes,
      ] = await Promise.all([
        api.get("/users/profile"),
        api.get("/orders/my-orders"),
        api.get("/favorites"),
        api.get("/address"),
      ]);

      setUser(
        userRes?.data?.data ||
        userRes?.data ||
        {}
      );

      setOrders(
        ordersRes?.data?.data ||
        ordersRes?.data ||
        []
      );

      setFavorites(
        favoritesRes?.data?.data ||
        favoritesRes?.data ||
        []
      );

      setAddresses(
        addressRes?.data?.data ||
        addressRes?.data ||
        []
      );

    } catch (error) {

      console.log(
        "Dashboard Fetch Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };
  const addAddress = async () => {

    try {

      await api.post("/address", {
        address: newAddress,
      });

      setNewAddress("");

      fetchDashboardData();

      alert("Address Added");

    } catch (error) {

      console.log(error);

    }
  };

  const addFavorite = async () => {

    try {

      await api.post("/favorites", newFavorite);

      setNewFavorite({
        name: "",
        price: "",
        description: "",
      });

      fetchDashboardData();

      alert("Favorite Added");

    } catch (error) {

      console.log(error);

    }
  };
  const updateProfile = async () => {

    try {

      const { data } = await api.put(
        "/users/profile",
        {
          name: user.name,
          email: user.email,
          phone: user.phone,
        }
      );

      alert(
        data.message ||
        "Profile Updated Successfully"
      );

      fetchDashboardData();

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Profile Update Failed"
      );

    }
  };

  const updateAddress = async (
    id,
    updatedAddress
  ) => {

    try {

      await api.put(
        `/address/${id}`,
        updatedAddress
      );

      alert("Address Updated");

      fetchDashboardData();

    } catch (error) {

      console.log(error);

      alert("Address Update Failed");

    }
  };

  const updateFavorite = async (
    id,
    updatedFavorite
  ) => {

    try {

      await api.put(
        `/favorites/${id}`,
        updatedFavorite
      );

      alert("Favorite Updated");

      fetchDashboardData();

    } catch (error) {

      console.log(error);

      alert("Favorite Update Failed");

    }
  };

  const latestOrder =
    orders?.length > 0
      ? orders[0]
      : null;

  const totalSpent = orders?.reduce(
    (acc, order) =>
      acc + (order.totalAmount || 0),
    0
  );

  const styles = {

    root: {
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top left, rgba(255,77,45,0.14), transparent 30%), radial-gradient(circle at bottom right, rgba(255,140,0,0.08), transparent 30%), #090909",
      color: "#fff",
      fontFamily: FONT,
      padding: "35px 20px",
    },

    container: {
      maxWidth: "1350px",
      margin: "0 auto",
    },

    hero: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "30px",
      padding: "45px",
      borderRadius: "32px",
      background:
        "linear-gradient(135deg, rgba(255,77,45,0.18), rgba(255,140,0,0.06))",
      border:
        "1px solid rgba(255,255,255,0.08)",
      marginBottom: "35px",
      backdropFilter: "blur(18px)",
      boxShadow:
        "0 20px 60px rgba(0,0,0,0.35)",
    },

    heroLeft: {
      flex: 1,
      minWidth: "320px",
    },

    heroTitle: {
      fontSize: "60px",
      lineHeight: "1.1",
      fontWeight: "900",
      marginBottom: "18px",
      fontFamily: "'Syne', sans-serif",
    },

    accent: {
      color: "#ff4d2d",
    },

    heroText: {
      color: "rgba(255,255,255,0.68)",
      lineHeight: "1.9",
      maxWidth: "650px",
      marginBottom: "24px",
      fontSize: "15px",
    },

    heroButtons: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
    },

    primaryBtn: {
      padding: "14px 24px",
      borderRadius: "14px",
      border: "none",
      background:
        "linear-gradient(135deg,#ff4d2d,#ff8c00)",
      color: "#fff",
      fontWeight: "700",
      cursor: "pointer",
      fontSize: "14px",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },

    secondaryBtn: {
      padding: "14px 24px",
      borderRadius: "14px",
      border:
        "1px solid rgba(255,255,255,0.08)",
      background:
        "rgba(255,255,255,0.05)",
      color: "#fff",
      textDecoration: "none",
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    heroRight: {
      display: "grid",
      gridTemplateColumns:
        "repeat(2, minmax(150px,1fr))",
      gap: "18px",
    },

    miniCard: {
      padding: "22px",
      borderRadius: "24px",
      background:
        "rgba(255,255,255,0.05)",
      border:
        "1px solid rgba(255,255,255,0.06)",
      textAlign: "center",
      minWidth: "160px",
    },

    miniIcon: {
      fontSize: "38px",
      marginBottom: "10px",
    },

    miniValue: {
      fontSize: "28px",
      fontWeight: "900",
      marginBottom: "5px",
    },

    miniLabel: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.55)",
    },

    section: {
      marginTop: "45px",
    },

    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      flexWrap: "wrap",
      gap: "14px",
    },

    sectionTitle: {
      fontSize: "32px",
      fontWeight: "800",
      margin: 0,
      fontFamily: "'Syne', sans-serif",
    },

    badge: {
      padding: "10px 16px",
      borderRadius: "12px",
      background:
        "rgba(255,77,45,0.12)",
      border:
        "1px solid rgba(255,77,45,0.16)",
      color: "#ff4d2d",
      fontWeight: "700",
      fontSize: "13px",
    },

    grid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",
      gap: "24px",
    },

    card: {
      padding: "28px",
      borderRadius: "26px",
      background:
        "rgba(255,255,255,0.04)",
      border:
        "1px solid rgba(255,255,255,0.06)",
      backdropFilter: "blur(12px)",
    },

    cardTitle: {
      fontSize: "22px",
      fontWeight: "800",
      marginBottom: "18px",
    },

    text: {
      color: "rgba(255,255,255,0.68)",
      marginBottom: "10px",
      lineHeight: "1.8",
      fontSize: "14px",
    },

    status: {
      padding: "10px 14px",
      borderRadius: "12px",
      display: "inline-block",
      marginTop: "12px",
      background:
        "rgba(34,197,94,0.15)",
      color: "#22c55e",
      fontWeight: "700",
      fontSize: "13px",
    },

    featureGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(240px,1fr))",
      gap: "22px",
    },

    featureCard: {
      padding: "26px",
      borderRadius: "24px",
      background:
        "rgba(255,255,255,0.04)",
      border:
        "1px solid rgba(255,255,255,0.06)",
      textAlign: "center",
    },

    featureIcon: {
      fontSize: "45px",
      marginBottom: "15px",
    },

    featureTitle: {
      fontSize: "20px",
      fontWeight: "700",
      marginBottom: "10px",
    },

    featureText: {
      color: "rgba(255,255,255,0.6)",
      lineHeight: "1.7",
      fontSize: "14px",
    },

    orderItem: {
      padding: "14px 0",
      borderBottom:
        "1px solid rgba(255,255,255,0.06)",
    },

    loadingBox: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#090909",
      color: "#fff",
      fontSize: "24px",
      fontWeight: "800",
    },

    input: {
      width: "100%",
      padding: "14px",
      marginBottom: "14px",
      borderRadius: "14px",
      border:
        "1px solid rgba(255,255,255,0.08)",
      background:
        "rgba(255,255,255,0.05)",
      color: "#fff",
      outline: "none",
      fontSize: "14px",
      boxSizing: "border-box",
    },

  };

  if (loading) {
    return (
      <div style={styles.loadingBox}>
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div style={styles.root}>

      <div style={styles.container}>

        <div style={styles.hero}>

          <div style={styles.heroLeft}>

            <h1 style={styles.heroTitle}>
              Welcome Back,
              <br />
              <span style={styles.accent}>
                {user?.name || "User"} 🍕
              </span>
            </h1>

            <p style={styles.heroText}>
              Manage your profile,
              addresses, favorite pizzas,
              rewards and orders from one
              premium dashboard.
            </p>

            <div style={styles.heroButtons}>

              <Link
                to="/menu"
                style={styles.primaryBtn}
              >
                Order Pizza
              </Link>

              <Link
                to="/menu"
                style={styles.secondaryBtn}
              >
                Explore Menu
              </Link>

            </div>

          </div>

          <div style={styles.heroRight}>

            <div style={styles.miniCard}>
              <div style={styles.miniIcon}>
                🍕
              </div>

              <div style={styles.miniValue}>
                {orders.length}
              </div>

              <div style={styles.miniLabel}>
                Total Orders
              </div>
            </div>

            <div style={styles.miniCard}>
              <div style={styles.miniIcon}>
                ❤️
              </div>

              <div style={styles.miniValue}>
                {favorites.length}
              </div>

              <div style={styles.miniLabel}>
                Favorites
              </div>
            </div>

            <div style={styles.miniCard}>
              <div style={styles.miniIcon}>
                📍
              </div>

              <div style={styles.miniValue}>
                {addresses.length}
              </div>

              <div style={styles.miniLabel}>
                Saved Addresses
              </div>
            </div>

            <div style={styles.miniCard}>
              <div style={styles.miniIcon}>
                🎁
              </div>

              <div style={styles.miniValue}>
                {user?.loyaltyPoints || 0}
              </div>

              <div style={styles.miniLabel}>
                Loyalty Points
              </div>
            </div>

          </div>

        </div>

        <div style={styles.section}>

          <div style={styles.sectionHeader}>

            <h2 style={styles.sectionTitle}>
              Profile & Account
            </h2>

            <div style={styles.badge}>
              Real Database Data
            </div>

          </div>

          <div style={styles.grid}>

            <div style={styles.card}>

              <h3 style={styles.cardTitle}>
                Personal Information
              </h3>

              <input
                type="text"
                placeholder="Name"
                value={user.name || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.target.value,
                  })
                }
                style={styles.input}
              />

              <input
                type="email"
                placeholder="Email"
                value={user.email || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
                style={styles.input}
              />

              <input
                type="text"
                placeholder="Phone"
                value={user.phone || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    phone: e.target.value,
                  })
                }
                style={styles.input}
              />

              <button
                style={styles.primaryBtn}
                onClick={updateProfile}
              >
                Save Changes
              </button>

            </div>

            <div style={styles.card}>

              <h3 style={styles.cardTitle}>
                Rewards & Spending
              </h3>

              <p style={styles.text}>
                🎁 Loyalty Points:
                {" "}
                {user?.loyaltyPoints || 0}
              </p>

              <p style={styles.text}>
                💸 Total Spent:
                {" "}
                ₹{totalSpent}
              </p>

              <p style={styles.text}>
                🧾 Orders:
                {" "}
                {orders.length}
              </p>

              <div style={styles.status}>
                Premium Customer
              </div>

            </div>

          </div>

        </div>

        <div style={styles.section}>

          <div style={styles.sectionHeader}>

            <h2 style={styles.sectionTitle}>
              Latest Order
            </h2>

            <div style={styles.badge}>
              Live Tracking
            </div>

          </div>

          <div style={styles.grid}>

            <div style={styles.card}>

              {latestOrder ? (
                <>

                  <h3 style={styles.cardTitle}>
                    Order Details
                  </h3>

                  <p style={styles.text}>
                    🆔 {latestOrder._id}
                  </p>

                  <p style={styles.text}>
                    💳 {latestOrder.paymentMethod}
                  </p>

                  <p style={styles.text}>
                    💰 ₹{latestOrder.totalAmount}
                  </p>

                  <div style={styles.status}>
                    {latestOrder.status}
                  </div>

                </>
              ) : (
                <>
                  <h3 style={styles.cardTitle}>
                    No Orders
                  </h3>

                  <p style={styles.text}>
                    You have not placed any
                    orders yet.
                  </p>
                </>
              )}

            </div>

            <div style={styles.card}>

              <h3 style={styles.cardTitle}>
                Edit Addresses
              </h3>
              <input
                type="text"
                placeholder="Add New Address"
                value={newAddress}
                onChange={(e) =>
                  setNewAddress(e.target.value)
                }
                style={styles.input}
              />

              <button
                style={styles.primaryBtn}
                onClick={addAddress}
              >
                Add Address
              </button>
              {addresses.length > 0 ? (
                addresses.map((address, index) => (

                  <div
                    key={address._id}
                    style={styles.orderItem}
                  >

                    <input
                      type="text"
                      value={
                        address.address ||
                        address.fullAddress ||
                        ""
                      }
                      onChange={(e) => {

                        const updated = [...addresses];

                        updated[index].address =
                          e.target.value;

                        setAddresses(updated);

                      }}
                      style={styles.input}
                    />

                    <button
                      style={styles.primaryBtn}
                      onClick={() =>
                        updateAddress(address._id, {
                          address:
                            address.address,
                        })
                      }
                    >
                      Save Address
                    </button>

                  </div>

                ))
              ) : (
                <p style={styles.text}>
                  No addresses found.
                </p>
              )}

            </div>

          </div>

        </div>

        <div style={styles.section}>

          <div style={styles.sectionHeader}>

            <h2 style={styles.sectionTitle}>
              Favorite Pizzas
            </h2>

            <div style={styles.badge}>
              Editable Favorites
            </div>

          </div>
          <div style={styles.card}>

            <input
              type="text"
              placeholder="Pizza Name"
              value={newFavorite.name}
              onChange={(e) =>
                setNewFavorite({
                  ...newFavorite,
                  name: e.target.value,
                })
              }
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Price"
              value={newFavorite.price}
              onChange={(e) =>
                setNewFavorite({
                  ...newFavorite,
                  price: e.target.value,
                })
              }
              style={styles.input}
            />

            <textarea
              placeholder="Description"
              value={newFavorite.description}
              onChange={(e) =>
                setNewFavorite({
                  ...newFavorite,
                  description: e.target.value,
                })
              }
              style={styles.input}
            />

            <button
              style={styles.primaryBtn}
              onClick={addFavorite}
            >
              Add Favorite
            </button>

          </div>
          <div style={styles.grid}>

            {favorites.length > 0 ? (
              favorites.map((item, index) => (

                <div
                  key={item._id}
                  style={styles.card}
                >

                  <input
                    type="text"
                    value={item.name || ""}
                    onChange={(e) => {

                      const updated = [...favorites];

                      updated[index].name =
                        e.target.value;

                      setFavorites(updated);

                    }}
                    style={styles.input}
                  />

                  <input
                    type="text"
                    value={item.price || ""}
                    onChange={(e) => {

                      const updated = [...favorites];

                      updated[index].price =
                        e.target.value;

                      setFavorites(updated);

                    }}
                    style={styles.input}
                  />

                  <textarea
                    value={
                      item.description || ""
                    }
                    onChange={(e) => {

                      const updated = [...favorites];

                      updated[index].description =
                        e.target.value;

                      setFavorites(updated);

                    }}
                    style={{
                      ...styles.input,
                      minHeight: "100px",
                    }}
                  />

                  <button
                    style={styles.primaryBtn}
                    onClick={() =>
                      updateFavorite(item._id, {
                        name: item.name,
                        price: item.price,
                        description:
                          item.description,
                      })
                    }
                  >
                    Save Favorite
                  </button>

                </div>

              ))
            ) : (

              <div style={styles.card}>

                <h3 style={styles.cardTitle}>
                  No Favorites Yet
                </h3>

                <p style={styles.text}>
                  Save your favorite pizzas
                  for quick ordering.
                </p>

              </div>

            )}

          </div>

        </div>

        <div style={styles.section}>

          <div style={styles.sectionHeader}>

            <h2 style={styles.sectionTitle}>
              Premium Features
            </h2>

            <div style={styles.badge}>
              Static Features
            </div>

          </div>

          <div style={styles.featureGrid}>

            <div style={styles.featureCard}>

              <div style={styles.featureIcon}>
                🚀
              </div>

              <div style={styles.featureTitle}>
                Fast Delivery
              </div>

              <div style={styles.featureText}>
                Fresh pizza delivered in
                under 30 minutes.
              </div>

            </div>

            <div style={styles.featureCard}>

              <div style={styles.featureIcon}>
                🛡️
              </div>

              <div style={styles.featureTitle}>
                Secure Payments
              </div>

              <div style={styles.featureText}>
                100% safe encrypted payment
                system.
              </div>

            </div>

            <div style={styles.featureCard}>

              <div style={styles.featureIcon}>
                🎉
              </div>

              <div style={styles.featureTitle}>
                Weekly Offers
              </div>

              <div style={styles.featureText}>
                Cashback, discounts and
                combo deals every week.
              </div>

            </div>

            <div style={styles.featureCard}>

              <div style={styles.featureIcon}>
                ⭐
              </div>

              <div style={styles.featureTitle}>
                Top Quality
              </div>

              <div style={styles.featureText}>
                Premium ingredients and
                delicious taste.
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;