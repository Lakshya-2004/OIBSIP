import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css"
function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } =
        await axios.post(
          `http://localhost:5000/api/auth/reset-password/${token}`,
          { password }
        );

      setMessage(data.message);
      setPassword("");
    } catch (error) {
      setMessage(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );
    }

    setLoading(false);
  };

  return (
    <>
      

      <div className="reset-page">

        <div className="food food1">
          🍕
        </div>

        <div className="food food2">
          🍔
        </div>

        <div className="food food3">
          🌮
        </div>

        <div className="food food4">
          🍟
        </div>

        <div className="reset-card">

          <div className="glow glow1"></div>
          <div className="glow glow2"></div>

          <div className="logo">
            🔐
          </div>

          <h1 className="title">
            Reset <span>Password</span>
          </h1>

          <p className="subtitle">
            Create a fresh new password
            and secure your account.
          </p>

          <form
            onSubmit={handleSubmit}
          >
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="input"
              required
            />

            <button
              type="submit"
              className="reset-btn"
            >
              {loading
                ? "Updating..."
                : "Reset Password"}
            </button>
          </form>

          {message && (
            <p className="message">
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default ResetPassword;