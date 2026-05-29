import CustomPizzaBuilder from "../components/pizza/CustomPizzaBuilder";

const FONT = "'DM Sans', sans-serif";

function CustomPizza() {

  const floatingFoods = [
    "🍕",
    "🍔",
    "🌮",
    "🍟",
    "🧀",
    "🥤",
    "🍗",
    "🌭",
  ];

  const styles = {
    root: {
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top left, rgba(255,77,45,0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(255,140,0,0.14), transparent 30%), #0b0b0b",
      color: "#fff",
      fontFamily: FONT,
      padding: "35px 20px",
      overflow: "hidden",
      position: "relative",
    },

    container: {
      maxWidth: "1250px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "18px",
      marginBottom: "40px",
    },

    titleSection: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },

    logo: {
      width: "62px",
      height: "62px",
      borderRadius: "18px",
      background:
        "linear-gradient(135deg,#ff4d2d,#ff8c00)",
      display: "grid",
      placeItems: "center",
      fontSize: "30px",
      boxShadow:
        "0 14px 35px rgba(255,77,45,0.35)",
    },

    title: {
      margin: 0,
      fontSize: "38px",
      fontWeight: "800",
      letterSpacing: "-1px",
    },

    accent: {
      color: "#ff4d2d",
    },

    subtitle: {
      margin: "6px 0 0",
      color: "rgba(255,255,255,0.45)",
      fontSize: "14px",
      lineHeight: "1.6",
    },

    topBadge: {
      padding: "12px 18px",
      borderRadius: "14px",
      background: "rgba(255,77,45,0.12)",
      border: "1px solid rgba(255,77,45,0.25)",
      color: "#ff4d2d",
      fontSize: "13px",
      fontWeight: "700",
      whiteSpace: "nowrap",
      backdropFilter: "blur(10px)",
      boxShadow:
        "0 8px 25px rgba(255,77,45,0.12)",
    },

    infoGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(240px,1fr))",
      gap: "22px",
      marginBottom: "35px",
    },

    infoCard: {
      background: "rgba(18,18,18,0.9)",
      backdropFilter: "blur(18px)",
      border:
        "1px solid rgba(255,255,255,0.08)",
      borderRadius: "26px",
      padding: "24px",
      transition: "0.35s ease",
      position: "relative",
      overflow: "hidden",
      boxShadow:
        "0 15px 35px rgba(0,0,0,0.35)",
    },

    glow: {
      position: "absolute",
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(255,77,45,0.20), transparent 70%)",
      top: "-70px",
      right: "-70px",
      pointerEvents: "none",
    },

    infoIcon: {
      fontSize: "36px",
      marginBottom: "16px",
      position: "relative",
      zIndex: 2,
    },

    infoTitle: {
      margin: 0,
      fontSize: "18px",
      fontWeight: "700",
      marginBottom: "8px",
      position: "relative",
      zIndex: 2,
    },

    infoText: {
      margin: 0,
      fontSize: "14px",
      color: "rgba(255,255,255,0.45)",
      lineHeight: "1.7",
      position: "relative",
      zIndex: 2,
    },

    contentCard: {
      background: "rgba(18,18,18,0.92)",
      border:
        "1px solid rgba(255,255,255,0.08)",
      borderRadius: "32px",
      padding: "32px",
      boxShadow:
        "0 20px 55px rgba(0,0,0,0.45)",
      backdropFilter: "blur(18px)",
      position: "relative",
      overflow: "hidden",
    },

    contentGlow: {
      position: "absolute",
      width: "250px",
      height: "250px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(255,77,45,0.18), transparent 70%)",
      top: "-120px",
      right: "-100px",
      pointerEvents: "none",
    },

    floatingFood: {
      position: "absolute",
      opacity: 0.14,
      filter: "blur(1.5px)",
      animation:
        "floatFood 8s ease-in-out infinite",
      userSelect: "none",
      pointerEvents: "none",
    },
  };

  const features = [
    {
      icon: "🍞",
      title: "Fresh Base",
      text: "Choose from thin crust, cheese burst, pan & more.",
    },
    {
      icon: "🧀",
      title: "Premium Cheese",
      text: "Loaded mozzarella with extra creamy toppings.",
    },
    {
      icon: "🥬",
      title: "Healthy Veggies",
      text: "Farm-fresh veggies delivered every morning.",
    },
    {
      icon: "🔥",
      title: "Hot Delivery",
      text: "Your custom pizza arrives hot and delicious.",
    },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

          *{
            box-sizing:border-box;
          }

          @keyframes floatFood{
            0%{
              transform:translateY(0px) rotate(0deg);
            }
            50%{
              transform:translateY(-20px) rotate(10deg);
            }
            100%{
              transform:translateY(0px) rotate(0deg);
            }
          }

          @media(max-width:768px){

            .custom-title{
              font-size:30px !important;
            }

            .custom-card{
              padding:22px !important;
            }

          }
        `}
      </style>

      <div style={styles.root}>

        {/* Floating Background Food */}
        {floatingFoods.map((food, index) => (
          <div
            key={index}
            style={{
              ...styles.floatingFood,
              top: `${8 + index * 10}%`,
              left:
                index % 2 === 0
                  ? `${5 + index * 5}%`
                  : "auto",
              right:
                index % 2 !== 0
                  ? `${5 + index * 4}%`
                  : "auto",
              fontSize: `${65 + index * 5}px`,
              animationDelay: `${index}s`,
            }}
          >
            {food}
          </div>
        ))}

        <div style={styles.container}>

          {/* HEADER */}
          <div style={styles.header}>

            <div style={styles.titleSection}>
              <div style={styles.logo}>🍕</div>

              <div>
                <h1
                  className="custom-title"
                  style={styles.title}
                >
                  Customize Your{" "}
                  <span style={styles.accent}>
                    Pizza
                  </span>
                </h1>

                <p style={styles.subtitle}>
                  Build your perfect pizza exactly the
                  way you like it with premium
                  ingredients and fresh toppings
                </p>
              </div>
            </div>

            <div style={styles.topBadge}>
              Freshly Baked • Fast Delivery 🚀
            </div>
          </div>

          {/* FEATURE CARDS */}
          <div style={styles.infoGrid}>
            {features.map((item, index) => (
              <div
                key={index}
                style={styles.infoCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px)";
                  e.currentTarget.style.border =
                    "1px solid rgba(255,77,45,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.08)";
                }}
              >
                <div style={styles.glow}></div>

                <div style={styles.infoIcon}>
                  {item.icon}
                </div>

                <h3 style={styles.infoTitle}>
                  {item.title}
                </h3>

                <p style={styles.infoText}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* BUILDER SECTION */}
          <div
            className="custom-card"
            style={styles.contentCard}
          >
            <div style={styles.contentGlow}></div>

            <CustomPizzaBuilder />
          </div>

        </div>
      </div>
    </>
  );
}

export default CustomPizza;