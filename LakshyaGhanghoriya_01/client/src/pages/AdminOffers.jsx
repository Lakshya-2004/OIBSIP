import { useEffect, useState } from "react";
import api from "../services/api";

const FONT = "'DM Sans', sans-serif";

export default function AdminOffers() {

  const [offer, setOffer] = useState({
    title: "",
    description: "",
    code: "",
    discount: "",
    image: "",
    expiryTime: "",
  });

  const [offerId, setOfferId] = useState("");

  useEffect(() => {
    fetchOffer();
  }, []);

  const fetchOffer = async () => {
    try {

      const { data } = await api.get("/offers/latest");

      if (data) {

        setOffer({
          title: data.title || "",
          description: data.description || "",
          code: data.code || "",
          discount: data.discount || "",
          image: data.image || "",
          expiryTime: data.expiryTime
            ? new Date(data.expiryTime)
                .toISOString()
                .slice(0, 16)
            : "",
        });

        setOfferId(data._id);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setOffer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveOffer = async () => {

    try {

      if (
        !offer.title ||
        !offer.description ||
        !offer.code ||
        !offer.discount ||
        !offer.expiryTime
      ) {
        alert("Please fill all required fields");
        return;
      }

      const payload = {
        ...offer,
        expiryTime: new Date(
          offer.expiryTime
        ).toISOString(),
      };

      if (offerId) {

        await api.put(
          `/offers/${offerId}`,
          payload
        );

        alert(
          "Offer Updated Successfully 🚀"
        );

      } else {

        const { data } = await api.post(
          "/offers/create-offer",
          payload
        );

        setOfferId(data._id);

        alert(
          "Offer Created Successfully 🎉"
        );
      }

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  const styles = {

    root: {
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top left, rgba(255,77,45,0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(255,140,0,0.12), transparent 35%), #0d0d0d",
      color: "#fff",
      fontFamily: FONT,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
      position: "relative",
      overflow: "hidden",
    },

    floating: {
      position: "absolute",
      fontSize: "90px",
      opacity: 0.06,
      animation:
        "float 8s ease-in-out infinite",
      userSelect: "none",
      pointerEvents: "none",
    },

    card: {
      width: "100%",
      maxWidth: "650px",
      background:
        "rgba(20,20,20,0.95)",
      border:
        "1px solid rgba(255,255,255,0.08)",
      borderRadius: "28px",
      padding: "35px",
      backdropFilter: "blur(10px)",
      boxShadow:
        "0 15px 40px rgba(0,0,0,0.35)",
      position: "relative",
      zIndex: 2,
    },

    title: {
      fontSize: "38px",
      fontWeight: "800",
      marginBottom: "10px",
    },

    accent: {
      color: "#ff4d2d",
    },

    subtitle: {
      color:
        "rgba(255,255,255,0.5)",
      marginBottom: "35px",
      fontSize: "14px",
    },

    group: {
      marginBottom: "22px",
    },

    label: {
      display: "block",
      marginBottom: "10px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#fff",
    },

    input: {
      width: "100%",
      padding: "15px 18px",
      borderRadius: "14px",
      border:
        "1px solid rgba(255,255,255,0.08)",
      background:
        "rgba(255,255,255,0.05)",
      color: "#fff",
      fontSize: "14px",
      outline: "none",
      transition: "0.3s",
      boxSizing: "border-box",
    },

    textarea: {
      width: "100%",
      minHeight: "120px",
      padding: "15px 18px",
      borderRadius: "14px",
      border:
        "1px solid rgba(255,255,255,0.08)",
      background:
        "rgba(255,255,255,0.05)",
      color: "#fff",
      fontSize: "14px",
      outline: "none",
      resize: "none",
      boxSizing: "border-box",
    },

    imagePreview: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
      borderRadius: "18px",
      marginTop: "15px",
      border:
        "1px solid rgba(255,255,255,0.08)",
    },

    button: {
      width: "100%",
      padding: "16px",
      borderRadius: "16px",
      border: "none",
      background:
        "linear-gradient(135deg,#ff4d2d,#ff8c00)",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "800",
      cursor: "pointer",
      marginTop: "10px",
      transition: "0.3s",
      boxShadow:
        "0 10px 30px rgba(255,77,45,0.25)",
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
          top: "12%",
          right: "8%",
          fontSize: "110px",
        }}
      >
        🔥
      </div>

      <div
        style={{
          ...styles.floating,
          bottom: "8%",
          left: "10%",
        }}
      >
        🍔
      </div>

      <div
        style={{
          ...styles.floating,
          bottom: "10%",
          right: "12%",
        }}
      >
        🎉
      </div>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Manage{" "}
          <span style={styles.accent}>
            Offers
          </span>
        </h1>

        <p style={styles.subtitle}>
          Create and manage homepage
          promotional offers dynamically.
        </p>

        <div style={styles.group}>
          <label style={styles.label}>
            Offer Title
          </label>

          <input
            style={styles.input}
            name="title"
            placeholder="Enter offer title"
            value={offer.title}
            onChange={handleChange}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>
            Description
          </label>

          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Enter offer description"
            value={offer.description}
            onChange={handleChange}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>
            Promo Code
          </label>

          <input
            style={styles.input}
            name="code"
            placeholder="Enter promo code"
            value={offer.code}
            onChange={handleChange}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>
            Discount %
          </label>

          <input
            type="number"
            style={styles.input}
            name="discount"
            placeholder="Enter discount percentage"
            value={offer.discount}
            onChange={handleChange}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>
            Offer Image URL
          </label>

          <input
            style={styles.input}
            name="image"
            placeholder="Paste image URL"
            value={offer.image}
            onChange={handleChange}
          />

          {offer.image && (
            <img
              src={offer.image}
              alt="offer"
              style={styles.imagePreview}
            />
          )}
        </div>

        <div style={styles.group}>
          <label style={styles.label}>
            Offer Expiry Time
          </label>

          <input
            type="datetime-local"
            style={styles.input}
            name="expiryTime"
            value={offer.expiryTime}
            onChange={handleChange}
          />
        </div>

        <button
          style={styles.button}
          onClick={saveOffer}
        >
          Save Offer 🚀
        </button>

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