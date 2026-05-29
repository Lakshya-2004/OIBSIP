// components/admin/OrderTable.jsx

function OrderTable({
  orders,
  onStatusChange,
}) {
  return (
    <div className='orders-table-wrapper'>
      <table className='inventory-table'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>

              <td>
                {order.user?.name ||
                  'Customer'}
              </td>

              <td>₹ {order.total}</td>

              <td>
                <span
                  className={
                    order.paymentStatus ===
                    'Success'
                      ? 'payment-success'
                      : 'payment-pending'
                  }
                >
                  {order.paymentStatus}
                </span>
              </td>

              <td>{order.orderStatus}</td>

              <td>
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    onStatusChange(
                      order._id,
                      e.target.value
                    )
                  }
                  className='status-select'
                >
                  <option value='Order Received'>
                    Order Received
                  </option>

                  <option value='Preparing'>
                    Preparing
                  </option>

                  <option value='In Kitchen'>
                    In Kitchen
                  </option>

                  <option value='Out For Delivery'>
                    Out For Delivery
                  </option>

                  <option value='Delivered'>
                    Delivered
                  </option>

                  <option value='Cancelled'>
                    Cancelled
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable