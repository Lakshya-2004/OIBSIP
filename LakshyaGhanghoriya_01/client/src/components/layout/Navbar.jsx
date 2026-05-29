import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Navbar.css";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const role = localStorage.getItem("role");

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks =
    role === "admin"
      ? [
          { to: "/", label: "Home", icon: "🏘️" },
          { to: "/admin", label: "Admin Dashboard", icon: "🛠️" },
          { to: "/inventory", label: "Inventory", icon: "📦" },
          { to: "/raw-products", label: "Raw Products", icon: "🧺" },
          { to: "/trend", label: "Trending", icon: "🔥" },
          { to: "/admin-offers", label: "Offers", icon: "🎁" },
          
        ]
      : [
          { to: "/", label: "Home", icon: "🏘️" },
          { to: "/dashboard", label: "Dashboard", icon: "⚡" },
          { to: "/menu", label: "Menu", icon: "📜" },
          { to: "/custom-pizza", label: "Custom Pizza", icon: "🍕" },
          { to: "/cart", label: "Cart", icon: "🛒" },
          { to: "/orders", label: "Orders", icon: "📦" },
        ];

  return (
    <>
     

      <nav className={`nb-root${scrolled ? " scrolled" : ""}`}>
        <div className="nb-bar">

          <Link to="/" className="nb-logo">
            <div className="nb-logo-icon">🍕</div>
            Pizza<span>Station</span>
          </Link>

          <div className="nb-links">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nb-link${location.pathname === to ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="nb-auth">
            {!role ? (
              <>
                <Link to="/login" className="nb-login">Login</Link>
                <Link to="/register" className="nb-register">Get Started</Link>
              </>
            ) : (
              <>
                <button
                  className="nb-register"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </button>

               
              </>
            )}
          </div>

          <button
            className="nb-burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`nb-overlay${menuOpen ? " visible" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer */}
      <aside className={`nb-drawer${menuOpen ? " open" : ""}`}>

        <div className="nb-drawer-head">
          <Link to="/" className="nb-logo">
            <div className="nb-logo-icon">🍕</div>
            Pizza<span>Station</span>
          </Link>

          <button
            className="nb-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="nb-drawer-nav">
          {navLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`nb-drawer-link${location.pathname === to ? " active" : ""}`}
            >
              <span className="nb-drawer-icon">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        <div className="nb-drawer-footer">
          {!role ? (
            <>
              <Link to="/login" className="nb-drawer-login">Login</Link>
              <Link to="/register" className="nb-drawer-register">Get Started →</Link>
            </>
          ) : (
            <button
              className="nb-drawer-register"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          )}
        </div>

      </aside>
    </>
  );
}

export default Navbar;