import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Register.css"
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", formData);

      alert("Registered Successfully 🎉");

      navigate("/login");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     

      <div className="register-page">

        {/* Floating Background Food */}
        <div className="food food1">🍕</div>
        <div className="food food2">🍔</div>
        <div className="food food3">🍟</div>
        <div className="food food4">🌮</div>
        <div className="food food5">🍕</div>
        <div className="food food6">🍔</div>
        <div className="food food7">🍗</div>
        <div className="food food8">🌭</div>

        <form
          onSubmit={handleSubmit}
          className="register-card"
        >

          <div className="glow glow1"></div>
          <div className="glow glow2"></div>

          <div className="logo">🍕</div>

          <h1 className="title">
            Create <span>Account</span>
          </h1>

          <p className="subtitle">
            Join PizzaStation and enjoy delicious
            pizzas, fast delivery, and premium taste
            right at your doorstep.
          </p>

          <div className="input-group">
            <label className="input-label">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="register-btn"
          >
            {loading
              ? "Creating Account..."
              : "🚀 Register Now"}
          </button>

          <div className="divider">
            <span>Quick Links</span>
          </div>

          <div className="auth-links">

            <Link
              to="/login"
              className="link-btn"
            >
              🔐 Already have an account?
            </Link>

            <Link
              to="/"
              className="link-btn"
            >
              🏠 Back To Home
            </Link>

          </div>

          <p className="mini-text">
            PizzaStation • Crafted With Love 🍕
          </p>

        </form>
      </div>
    </>
  );
}

export default Register;