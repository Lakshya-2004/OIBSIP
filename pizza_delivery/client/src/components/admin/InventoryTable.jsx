// components/admin/InventoryTable.jsx

function InventoryTable({
  inventory,
  onEdit,
  onDelete,
}) {
  return (
    <div className='inventory-wrapper'>
      <table className='inventory-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Ingredient</th>
            <th>Stock</th>
            <th>Threshold</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item, index) => (
            <tr key={item._id || index}>
              <td>{index + 1}</td>

              <td>{item.ingredientName}</td>

              <td>{item.stock}</td>

              <td>{item.threshold}</td>

              <td>
                <span
                  className={
                    item.stock <= item.threshold
                      ? 'stock-low'
                      : 'stock-good'
                  }
                >
                  {item.stock <= item.threshold
                    ? 'Low Stock'
                    : 'Available'}
                </span>
              </td>

              <td>
                <div className='inventory-actions'>
                  <button
                    className='edit-btn'
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className='delete-btn'
                    onClick={() =>
                      onDelete(item._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryTable