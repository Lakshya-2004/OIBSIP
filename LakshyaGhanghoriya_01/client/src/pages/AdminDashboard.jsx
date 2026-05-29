import { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";


const API = "http://localhost:5000/api/orders";

const STATUS_FLOW = [
  "Order Received",
  "In Kitchen",
  "Sent To Delivery",
  "Delivered",
];

const STATUS_META = {
  "Order Received": {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    icon: "🕐",
  },
  "In Kitchen": {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    icon: "👨‍🍳",
  },
  "Sent To Delivery": {
    color: "#a855f7",
    bg: "rgba(168,85,247,0.12)",
    icon: "🛵",
  },
  Delivered: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    icon: "✅",
  },
};

const FONT = "'DM Sans', sans-serif";

function FloatingFood() {
  return (
    <>
      <div className="food food1">🍕</div>
      <div className="food food2">🍔</div>
      <div className="food food3">🍟</div>
      <div className="food food4">🌮</div>
      <div className="food food5">🍕</div>
      <div className="food food6">🍔</div>
      <div className="food food7">🌭</div>
      <div className="food food8">🍕</div>
      <div className="food food9">🍟</div>
      <div className="food food10">🍔</div>
    </>
  );
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || {
    color: "#aaa",
    bg: "rgba(255,255,255,0.08)",
    icon: "❓",
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 20,
        background: meta.bg,
        color: meta.color,
        fontSize: 12,
        fontWeight: 700,
        border: `1px solid ${meta.color}33`,
        whiteSpace: "nowrap",
      }}
    >
      {meta.icon} {status}
    </span>
  );
}

function ActionButton({ label, onClick, loading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        padding: "10px 16px",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.08)",
        background: disabled
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.06)",
        color: disabled ? "rgba(255,255,255,0.25)" : "#fff",
        fontSize: 13,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: FONT,
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background =
            "linear-gradient(135deg,#ff4d2d,#ff8c00)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = disabled
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.06)";
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      {loading ? "Updating..." : label}
    </button>
  );
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);



 const fetchOrders = async () => {
  try {

    setLoading(true);
    setError(null);

    const { data } = await api.get(
      "/orders/all"
    );

    console.log(
      "ADMIN ORDERS:",
      data
    );

    setOrders(
      Array.isArray(data)
        ? data
        : []
    );

  } catch (error) {

    console.log(error);

    setError(
      error?.response?.data?.message ||
      "Failed to load orders"
    );

  } finally {

    setLoading(false);
  }
};
 const updateStatus = async (
  orderId,
  status
) => {

  try {

    setUpdating(orderId);

    const token =
      localStorage.getItem(
        "token"
      );

    await axios.put(
      `${API}/status`,
      {
        orderId,
        status,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId
          ? {
              ...o,
              orderStatus: status,
            }
          : o
      )
    );

  } catch (error) {

    console.log(error);

    alert(
      error?.response?.data
        ?.message ||
      "Failed to update status"
    );

  } finally {

    setUpdating(null);
  }
};

  const advanceStatus = (order) => {
    //  fixed: read orderStatus not status
    const idx = STATUS_FLOW.indexOf(order.orderStatus);
    if (idx < STATUS_FLOW.length - 1) {
      updateStatus(order._id, STATUS_FLOW[idx + 1]);
    }
  };

  const filtered = orders.filter((o) => {
    // fixed: filter on orderStatus
    const matchFilter =
      filter === "All" || o.orderStatus === filter;

    //  fixed: search on user.name and pizzas[0].name
    const customerName = o.user?.name || "";
    const pizzaName = o.pizzas?.[0]?.name || o.pizzas?.[0]?.base || "";

    const matchSearch =
      !search ||
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      pizzaName.toLowerCase().includes(search.toLowerCase()) ||
      customerName.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  //  fixed: count on orderStatus
  const counts = STATUS_FLOW.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.orderStatus === s).length;
    return acc;
  }, {});

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        body { margin: 0; padding: 0; background: #0d0d0d; }

        .admin-page {
          min-height: 100vh;
          overflow: hidden;
          position: relative;
          background:
            radial-gradient(circle at top left, rgba(255,77,45,0.18), transparent 35%),
            radial-gradient(circle at bottom right, rgba(255,140,0,0.15), transparent 35%),
            #0b0b0b;
          color: white;
          font-family: ${FONT};
          padding: 35px 20px;
        }

        .food {
          position: absolute;
          opacity: 0.14;
          filter: blur(1.5px);
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
          user-select: none;
        }

        .food1  { top: 4%;  left: 4%;   font-size: 110px; }
        .food2  { top: 10%; right: 6%;  font-size: 120px; animation-delay: 1s; }
        .food3  { bottom: 8%;  left: 8%;  font-size: 110px; animation-delay: 2s; }
        .food4  { bottom: 10%; right: 10%; font-size: 95px;  animation-delay: 3s; }
        .food5  { top: 48%; left: -15px;  font-size: 75px;  animation-delay: 4s; }
        .food6  { top: 50%; right: -10px; font-size: 80px;  animation-delay: 5s; }
        .food7  { top: 30%; left: 22%;   font-size: 65px;  animation-delay: 2s; }
        .food8  { bottom: 25%; right: 25%; font-size: 70px;  animation-delay: 3s; }
        .food9  { top: 72%; left: 40%;   font-size: 80px;  animation-delay: 5s; }
        .food10 { top: 18%; left: 48%;   font-size: 90px;  animation-delay: 6s; }

        @keyframes float {
          0%   { transform: translateY(0px)   rotate(0deg); }
          50%  { transform: translateY(-20px) rotate(8deg); }
          100% { transform: translateY(0px)   rotate(0deg); }
        }

        .glass-card {
          background: rgba(20,20,20,0.88);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 10px 35px rgba(0,0,0,0.35);
        }

        .table-row { transition: 0.3s; }
        .table-row:hover { background: rgba(255,255,255,0.03); }

        @media (max-width: 900px) {
          .table-head { display: none !important; }
          .table-row {
            display: flex !important;
            flex-direction: column;
            gap: 14px;
            padding: 18px !important;
          }
          .mobile-actions { width: 100%; }
          .mobile-actions button { width: 100%; }
        }
        `}
      </style>

      <div className="admin-page">
        <FloatingFood />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>

          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, marginBottom: 30 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 60, height: 60, borderRadius: 18, background: "linear-gradient(135deg,#ff4d2d,#ff8c00)", display: "grid", placeItems: "center", fontSize: 28, boxShadow: "0 10px 30px rgba(255,77,45,0.3)" }}>
                🍕
              </div>
              <div>
                <h1 style={{ margin: 0, fontFamily: "'Syne',sans-serif", fontSize: 34, fontWeight: 800 }}>
                  Admin <span style={{ color: "#ff4d2d" }}>Dashboard</span>
                </h1>
                <p style={{ marginTop: 6, color: "rgba(255,255,255,0.45)", fontSize: 14 }}>
                  Manage pizza orders and deliveries in real-time
                </p>
              </div>
            </div>

            <button
              onClick={fetchOrders}
              style={{ padding: "12px 18px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.06)", color: "#fff", cursor: "pointer", fontWeight: 700, transition: "0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg,#ff4d2d,#ff8c00)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            >
              ↻ Refresh Orders
            </button>
          </div>

          {/* FILTERS */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 25 }}>
            {[
              { label: "All", count: orders.length },
              ...STATUS_FLOW.map((s) => ({ label: s, count: counts[s] || 0 })),
            ].map(({ label, count }) => {
              const meta = STATUS_META[label];
              const active = filter === label;
              return (
                <button
                  key={label}
                  onClick={() => setFilter(label)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 16px",
                    borderRadius: 14,
                    border: active
                      ? `1px solid ${meta?.color || "#ff4d2d"}55`
                      : "1px solid rgba(255,255,255,0.08)",
                    background: active
                      ? meta?.bg || "rgba(255,77,45,0.12)"
                      : "rgba(255,255,255,0.04)",
                    color: active
                      ? meta?.color || "#ff4d2d"
                      : "rgba(255,255,255,0.65)",
                    cursor: "pointer",
                    fontWeight: 700,
                    transition: "0.3s",
                  }}
                >
                  {meta?.icon} {label}
                  <span style={{ padding: "2px 8px", borderRadius: 20, background: "rgba(255,255,255,0.08)", fontSize: 11 }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* SEARCH */}
          <div className="glass-card" style={{ borderRadius: 18, padding: 18, marginBottom: 24 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, pizza name, or customer..."
              style={{ width: "100%", padding: "15px 18px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 14, outline: "none" }}
            />
          </div>

          {/* LOADING */}
          {loading && (
            <div className="glass-card" style={{ borderRadius: 24, padding: "80px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 70, marginBottom: 16 }}>🍕</div>
              <h2>Loading Orders...</h2>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="glass-card" style={{ borderRadius: 24, padding: 30, textAlign: "center", border: "1px solid rgba(248,113,113,0.2)" }}>
              <div style={{ fontSize: 50, marginBottom: 12 }}>⚠️</div>
              <h2>{error}</h2>
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && filtered.length === 0 && (
            <div className="glass-card" style={{ borderRadius: 24, padding: "80px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 70, marginBottom: 16 }}>🍕</div>
              <h2>No Orders Found</h2>
              <p style={{ color: "rgba(255,255,255,0.45)" }}>Try changing filters or search keywords</p>
            </div>
          )}

          {/* ORDERS TABLE */}
          {!loading && !error && filtered.length > 0 && (
            <div className="glass-card" style={{ borderRadius: 24, overflow: "hidden" }}>

              {/* TABLE HEAD */}
              <div
                className="table-head"
                style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr 1fr 1fr auto", gap: 16, padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}
              >
                <span>Order ID</span>
                <span>Pizza</span>
                <span>Customer</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {/* ROWS */}
              {filtered.map((order, index) => {
                const isLast = index === filtered.length - 1;

                // fixed: use orderStatus throughout
                const currentIdx = STATUS_FLOW.indexOf(order.orderStatus);
                const isDelivered = order.orderStatus === "Delivered";
                const isUpdating = updating === order._id;

                // fixed: derive display values from actual model fields
                const pizzaName =
                  order.pizzas?.[0]?.name ||
                  order.pizzas?.[0]?.base ||
                  "Custom Pizza";

                const toppings = order.pizzas?.[0]?.veggies || [];

                const customerName = order.user?.name || "Unknown";
                const customerInitial = customerName[0].toUpperCase();

                return (
                  <div
                    key={order._id}
                    className="table-row"
                    style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr 1fr 1fr auto", gap: 16, padding: "20px 24px", alignItems: "center", borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)", opacity: isUpdating ? 0.6 : 1 }}
                  >
                    {/* ID */}
                    <div style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </div>

                    {/* PIZZA */}
                    <div>
                      <h3 style={{ margin: 0, fontSize: 16, color: "#ff4d2d" }}>
                        🍕 {pizzaName}
                      </h3>
                      {toppings.length > 0 && (
                        <p style={{ marginTop: 5, color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
                          {toppings.join(", ")}
                        </p>
                      )}
                      {/* ✅ bonus: show total */}
                      <p style={{ marginTop: 4, color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                        ₹{order.total}
                      </p>
                    </div>

                    {/* CUSTOMER */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#ff4d2d,#ff8c00)", display: "grid", placeItems: "center", fontWeight: 700, flexShrink: 0 }}>
                        {customerInitial}
                      </div>
                      <span>{customerName}</span>
                    </div>

                    {/* STATUS —  fixed: orderStatus */}
                    <StatusBadge status={order.orderStatus} />

                    {/* ACTION */}
                    <div className="mobile-actions">
                      {!isDelivered ? (
                        <ActionButton
                          label={`→ ${STATUS_FLOW[currentIdx + 1]}`}
                          onClick={() => advanceStatus(order)}
                          loading={isUpdating}
                        />
                      ) : (
                        <span style={{ color: "#22c55e", fontWeight: 700 }}>
                          Completed ✅
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* FOOTER */}
          {!loading && !error && (
            <div style={{ marginTop: 18, textAlign: "right", color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
              Showing {filtered.length} of {orders.length} orders
            </div>
          )}

        </div>
      </div>
    </>
  );
}