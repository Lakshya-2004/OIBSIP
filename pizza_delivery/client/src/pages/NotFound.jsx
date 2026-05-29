import { Link } from "react-router-dom";
import "../styles/NotFound.css"
function NotFound() {
  return (
    <>
     

      <div className="notfound-page">

        {/* Floating blurry pizza images */}
        <div className="floating pizza1">🍕</div>
        <div className="floating pizza2">🍕</div>
        <div className="floating pizza3">🍕</div>
        <div className="floating pizza4">🍕</div>
        <div className="floating pizza5">🍕</div>
        <div className="floating pizza6">🍕</div>

        <div className="notfound-card">

          <div className="glow glow1"></div>
          <div className="glow glow2"></div>

          <div className="emoji">🍕</div>

          <h1 className="code">404</h1>

          <h2 className="title">
            Oops! Pizza Not Found
          </h2>

          <p className="text">
            The page you are looking for may have been
            moved, deleted, or never existed.
            Meanwhile, your pizza is probably getting cold 🍕
          </p>

          <div className="button-group">

            <Link to="/" className="home-btn">
              🏠 Back To Home
            </Link>

            <Link
              to="/dashboard"
              className="secondary-btn"
            >
              🍕 Browse Pizzas
            </Link>

          </div>

          <p className="mini-text">
            PizzaStation • Premium Pizza Experience
          </p>

        </div>
      </div>
    </>
  );
}

export default NotFound;