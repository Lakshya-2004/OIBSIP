import { Link } from "react-router-dom";
import "../../styles/Footer.css";
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/orders", label: "My Orders" },
  { to: "/cart", label: "Cart" },
  { to: "/custom-pizza", label: "Custom Pizza" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
];

function Footer() {
  return (
    <>
  
      <footer className="ft-root">
        <div className="ft-grid">

          {/* Brand */}
          <div className="ft-brand">
            <Link to="/" className="ft-logo">
              <div className="ft-logo-icon">🍕</div>
              Pizza<span>Station</span>
            </Link>
            <p className="ft-tagline">
              Fresh, hot and delicious pizzas delivered straight to your doorstep in minutes. Made with love, every single slice.
            </p>
            <div className="ft-socials">
              {socialLinks.map(({ label, href, icon }) => (
                <a key={label} href={href} className="ft-social-btn" aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="ft-col-title">Quick Links</p>
            <ul className="ft-list">
              {navLinks.map(({ to, label }) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="ft-col-title">Contact</p>
            <div className="ft-contact-list">
              <div className="ft-contact-item">
                <div className="ft-contact-icon">✉️</div>
                <span>support@pizzahub.com</span>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon">📞</div>
                <span>+91 98765 43210</span>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon">📍</div>
                <span>Mumbai, India</span>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon">🕐</div>
                <span>Mon – Sun, 10 AM – 11 PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="ft-col-title">Stay Updated</p>
            <p className="ft-newsletter-text">
              Get exclusive deals and new menu alerts delivered to your inbox.
            </p>
            <div className="ft-newsletter-form">
              <input
                className="ft-newsletter-input"
                type="email"
                placeholder="your@email.com"
              />
              <button className="ft-newsletter-btn">Subscribe →</button>
            </div>
          </div>

        </div>

        <div className="ft-divider" />

        <div className="ft-bottom">
          <p className="ft-copy">© 2026 PizzaHub. All rights reserved.</p>
          <div className="ft-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;