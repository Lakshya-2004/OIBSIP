import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Home.css";

function Home() {
  const [items, setItems] = useState([]);
  const [offer, setOffer] = useState(null);

  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    fetchFeaturedItems();
    fetchOffer();
  }, []);

  // ✅ FIXED LIVE TIMER (DO NOT CHANGE UI)
  useEffect(() => {
    const expiryRaw = offer?.expiresAt || offer?.expiryTime;
    if (!expiryRaw) return;

    const expiryTime = new Date(expiryRaw).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = expiryTime - now;

      if (distance <= 0) {
        setTimeLeft({
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [offer?.expiresAt, offer?.expiryTime]);

  const fetchFeaturedItems = async () => {
  try {
    const { data } = await api.get("/featured");

    setItems(data);
  } catch (error) {
    console.log(error);
  }
};

  const fetchOffer = async () => {
    try {
      const { data } = await api.get("/offers/latest");
      setOffer(data);
    } catch (error) {
      console.log(error);
    }
  };

  const reviews = [
    {
      id: 1,
      name: "Alex M.",
      role: "Regular Customer",
      text: "Best pizza delivery I've ever had. Super fast and incredibly delicious every single time.",
      stars: 5,
    },
    {
      id: 2,
      name: "Sophia R.",
      role: "Food Blogger",
      text: "Amazing fresh ingredients and incredible flavors. Highly recommended.",
      stars: 5,
    },
    {
      id: 3,
      name: "Daniel K.",
      role: "Pizza Enthusiast",
      text: "The custom pizza builder is absolutely amazing.",
      stars: 5,
    },
    {
      id: 4,
      name: "Maria L.",
      role: "Verified Buyer",
      text: "Fast delivery, hot food, beautiful packaging and great taste.",
      stars: 5,
    },
  ];

  const features = [
    {
      icon: "🔥",
      title: "Stone-Fired Ovens",
      desc: "Perfect crispy crust baked at high temperatures.",
    },
    {
      icon: "🌿",
      title: "Fresh Ingredients",
      desc: "Premium quality ingredients delivered fresh daily.",
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      desc: "Lightning fast delivery to your doorstep.",
    },
    {
      icon: "🎨",
      title: "Custom Pizza",
      desc: "Build your own pizza exactly the way you want.",
    },
  ];

  const stats = [
    {
      value: "50K+",
      label: "Happy Customers",
    },
    {
      value: "4.9★",
      label: "Average Rating",
    },
    {
      value: "25+",
      label: "Food Varieties",
    },
    {
      value: "30min",
      label: "Avg. Delivery",
    },
  ];

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />

        <div className="hero-content">

          <span className="hero-badge">
            🍕 Fresh Food Delivered Fast
          </span>

          <h1>
            Delicious Food
            <br />
            <span className="gradient-text">
              Delivered To You
            </span>
          </h1>

          <p>
            Enjoy pizzas, burgers, pasta,
            drinks, desserts and much more
            freshly prepared and delivered
            hot to your doorstep.
          </p>

          <div className="hero-buttons">

            <Link
              to="/custom-pizza"
              className="primary-btn"
            >
              🎨 Customize Pizza
            </Link>

            <Link
              to="/menu"
              className="secondary-btn"
            >
              Explore Menu →
            </Link>

          </div>

          <div className="hero-trust">

            <div className="trust-avatars">
              {["A", "B", "C", "D"].map((l) => (
                <span key={l} className="avatar">
                  {l}
                </span>
              ))}
            </div>

            <p>
              <strong>50,000+</strong> happy customers
            </p>

          </div>
        </div>

        <div className="hero-image">

          <div className="pizza-ring" />

          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"
            alt="food"
          />

          <div className="floating-badge badge-1">
            🔥 Hot & Fresh
          </div>

          <div className="floating-badge badge-2">
            ⚡ Fast Delivery
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        {stats.map((s, i) => (
          <div className="stat-item" key={i}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="features-section">

        <div className="section-header">

          <span className="section-tag">
            Why Choose Us
          </span>

          <h2>
            Freshly Cooked,
            <br />
            Professionally Delivered
          </h2>

        </div>

        <div className="features-grid">

          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}

        </div>
      </section>


     <section className="gallery-section">

        <div className="section-header">

          <span className="section-tag">Food Gallery</span>

          <h2>Delicious Moments</h2>

        </div>

        <div className="gallery-grid">

          {[
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700",
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=700",
            "https://images.unsplash.com/photo-1550547660-d9450f859349?w=700",
            "https://images.unsplash.com/photo-1550317138-10000687a72b?w=700",
            "https://i.pinimg.com/736x/35/dd/e5/35dde5d977a53646faec764cb5fe6d07.jpg",
          ].map((img, i) => (

            <div className="gallery-card" key={i}>
              <img src={img} alt="food" />
            </div>

          ))}

        </div>
      </section>

      {/* MENU */}
      <section className="menu-section">

        <div className="section-header">

          <span className="section-tag">
            Popular Menu
          </span>

          <h2>
            Trending Food Items
          </h2>

          <p className="section-sub">
            Freshly added inventory items
          </p>

        </div>

        <div className="pizza-grid">

          {items.slice(0, 8).map((item) => (

            <div
              className="pizza-card"
              key={item._id}
            >

              <div className="pizza-img-wrap">

                <img
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
                  }
                  alt={item.name}
                />

                <span className="pizza-tag">
                  {item.category}
                </span>

              </div>

              <div className="pizza-info">

                <h3>{item.name}</h3>

                <p className="pizza-desc">
                  {item.description ||
                    "Fresh and delicious food item."}
                </p>

                

              </div>
            </div>
          ))}

        </div>

        <div className="menu-cta">

          <Link
            to="/menu"
            className="secondary-btn"
          >
            View Full Menu →
          </Link>

        </div>
      </section>

      {/* DYNAMIC OFFER */}
      <section
        className="deal-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)),
          url(${offer?.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="deal-overlay"></div>

        <div className="deal-content">

          <span className="section-tag">
            {offer?.tagline || "Today Special"}
          </span>

          <h2>
            {offer?.title || "Buy 1 Get 1 Free"}
          </h2>

          <p>
            {offer?.description ||
              "Order any large pizza and get another absolutely free."}
          </p>

          {offer?.code && (
            <h3
              style={{
                marginTop: "15px",
                color: "#ffb703",
                fontWeight: "800",
              }}
            >
              Code : {offer.code}
            </h3>
          )}

          {/* TIMER */}
          <div className="deal-timer">

            <div className="timer-box">
              <h3>{timeLeft.hours}</h3>
              <span>Hours</span>
            </div>

            <div className="timer-box">
              <h3>{timeLeft.minutes}</h3>
              <span>Minutes</span>
            </div>

            <div className="timer-box">
              <h3>{timeLeft.seconds}</h3>
              <span>Seconds</span>
            </div>

          </div>

          <Link
            to="/menu"
            className="primary-btn"
          >
            {offer?.buttonText || "Grab Offer →"}
          </Link>

        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews-section">
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2>What Customers Say</h2>
        </div>

        <div className="reviews-grid">

          {reviews.map((review) => (

            <div
              className="review-card"
              key={review.id}
            >

              <div className="stars">
                {"★".repeat(review.stars)}
              </div>

              <p>"{review.text}"</p>

              <div className="reviewer">

                <div className="reviewer-avatar">
                  {review.name[0]}
                </div>

                <div className="reviewer-info">

                  <strong>{review.name}</strong>

                  <span>{review.role}</span>

                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* FOOD CATEGORIES */}
      <section className="categories-section">

        <div className="section-header">

          <span className="section-tag">
            Categories
          </span>

          <h2>
            Explore Our Delicious Collection
          </h2>

          <p className="section-sub">
            From pizza to desserts —
            everything freshly prepared.
          </p>

        </div>

        <div className="categories-grid">

          {[{
            icon: "🍕", title: "Pizza", count: "25+ Items"
          }, {
            icon: "🍔", title: "Burger", count: "15+ Items"
          }, {
            icon: "🍝", title: "Pasta", count: "12+ Items"
          }, {
            icon: "🥤", title: "Drinks", count: "18+ Items"
          }, {
            icon: "🍰", title: "Desserts", count: "10+ Items"
          }, {
            icon: "🌮", title: "Wraps", count: "14+ Items"
          }].map((cat, i) => (

            <div className="category-card" key={i}>
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <span>{cat.count}</span>
            </div>

          ))}

        </div>
      </section>

      {/* CHEF */}
      <section className="chef-section">
        <div className="chef-image">
          <img
            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800"
            alt="chef"
          />
        </div>

        <div className="chef-content">

          <span className="section-tag">Master Chefs</span>

          <h2>Prepared By World-Class Chefs</h2>

          <p>
            Our professional chefs craft
            every meal with premium
            ingredients, authentic recipes
            and incredible attention to flavor.
          </p>

          <div className="chef-points">

            <div className="chef-point">✅ Fresh Ingredients Daily</div>
            <div className="chef-point">✅ Hygienic Kitchen</div>
            <div className="chef-point">✅ Premium Quality Food</div>
            <div className="chef-point">✅ Fast Cooking & Delivery</div>

          </div>

        </div>
      </section>

      {/* APP */}
      <section className="app-section">
        <div className="app-content">

          <span className="section-tag">Mobile App</span>

          <h2>Order Food From Your Phone</h2>

          <p>
            Download our mobile application and enjoy seamless ordering experience with live tracking.
          </p>

        </div>

        <div className="app-image">
          <img
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700"
            alt="app"
          />
        </div>
      </section>

      {/* GALLERY */}
      

      {/* CTA */}
      <section className="cta-section">

        <div className="cta-glow" />

        <h2>
          Hungry? <span className="gradient-text"> Order Now</span>
        </h2>

        <p>
          Fresh food delivered directly to your home.
        </p>

        <div className="hero-buttons" style={{ justifyContent: "center" }}>

          <Link to="/custom-pizza" className="primary-btn">
            Build Pizza
          </Link>

          <Link to="/cart" className="secondary-btn">
            View Cart
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;