import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css"
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    const { data } = await api.post(
      "/auth/login",
      formData
    );

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    localStorage.setItem(
      "role",
      data.user.role
    );

    navigate(
      data.user.role === "admin"
        ? "/admin"
        : "/dashboard"
    );

  } catch (error) {

    alert(
      error?.response?.data?.message ||
      "Login failed"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <>
     

      <div className="login-page">

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
          className="login-card"
        >

          <div className="glow glow1"></div>
          <div className="glow glow2"></div>

          <div className="logo">🍕</div>

          <h1 className="title">
            Welcome <span>Back</span>
          </h1>

          <p className="subtitle">
            Login to PizzaStation and continue
            enjoying delicious pizzas delivered
            hot & fresh to your doorstep.
          </p>

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
              placeholder="Enter password"
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-btn"
          >
            {loading
              ? "Signing In..."
              : "🚀 Login Now"}
          </button>

          <div className="divider">
            <span>Quick Links</span>
          </div>

          <div className="auth-links">

            <Link
              to="/forgot-password"
              className="link-btn"
            >
              🔑 Forgot Password?
            </Link>

            <Link
              to="/register"
              className="link-btn"
            >
              📝 Create Account
            </Link>

            <Link
              to="/"
              className="link-btn"
            >
              🏠 Back To Home
            </Link>

          </div>

          <p className="mini-text">
            PizzaStation • Fresh & Hot 🍕
          </p>

        </form>
      </div>
    </>
  );
}

export default Login;