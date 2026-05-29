// components/admin/StockAlert.jsx

function StockAlert({ inventory = [] }) {

  const lowStockItems = inventory.filter(
    (item) =>
      item.stock <= item.threshold
  );

  if (lowStockItems.length === 0) {
    return (
      <div className="stock-alert success-alert">
        <h3>
          ✅ All Ingredients Are In Stock
        </h3>
      </div>
    );
  }

  return (
    <div className="stock-alert danger-alert">

      <h2>⚠ Low Stock Alert</h2>

      <div className="alert-items">

        {lowStockItems.map((item) => (

          <div
            key={item._id}
            className="alert-card"
          >

            <h3>{item.name}</h3>

            <p>
              Remaining Stock:{" "}
              <strong>
                {item.stock}
              </strong>
            </p>

            <p>
              Threshold:{" "}
              <strong>
                {item.threshold}
              </strong>
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default StockAlert;