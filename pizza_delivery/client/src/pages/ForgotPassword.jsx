import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/ForgotPassword.css"
function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data } = await api.post(
        "/auth/forgot-password",
        {
          email,
        }
      );

      setMessage(
        data.message ||
          "Password reset link sent to your email 🍕"
      );

      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      

      <div className="forgot-page">

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
          className="forgot-card"
        >

          <div className="glow glow1"></div>
          <div className="glow glow2"></div>

          <div className="logo">🔑</div>

          <h1 className="title">
            Forgot <span>Password</span>
          </h1>

          <p className="subtitle">
            Enter your registered email and
            we’ll send you a secure password
            reset link instantly.
          </p>

          {message && (
            <div className="success">
              {message}
            </div>
          )}

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <div className="input-group">
            <label className="input-label">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="forgot-btn"
          >
            {loading
              ? "Sending Reset Link..."
              : "📩 Send Reset Link"}
          </button>

          <div className="divider">
            <span>Quick Links</span>
          </div>

          <div className="auth-links">

            <Link
              to="/login"
              className="link-btn"
            >
              🔐 Back To Login
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="link-btn"
            >
              ⬅ Go Back
            </button>

          </div>

          <p className="mini-text">
            PizzaStation • Secure Access 🔒
          </p>

        </form>
      </div>
    </>
  );
}

export default ForgotPassword;