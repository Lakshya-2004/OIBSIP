// components/pizza/CartItem.jsx

function CartItem({ item, removeFromCart }) {
  return (
    <div className='cart-card'>
      <div className='cart-top'>
        <img
          src={
            item.image ||
            'https://images.unsplash.com/photo-1513104890138-7c749659a591'
          }
          alt='pizza'
          className='cart-image'
        />

        <div className='cart-info'>
          <h2>Custom Pizza</h2>

          <p>
            <strong>Base:</strong> {item.base}
          </p>

          <p>
            <strong>Sauce:</strong> {item.sauce}
          </p>

          <p>
            <strong>Cheese:</strong> {item.cheese}
          </p>

          <p>
            <strong>Veggies:</strong>{' '}
            {item.veggies?.join(', ')}
          </p>

          <p>
            <strong>Quantity:</strong> {item.quantity}
          </p>
        </div>
      </div>

      <div className='cart-bottom'>
        <h3>
          ₹ {item.price * item.quantity}
        </h3>

        <button
          className='remove-btn'
          onClick={() => removeFromCart( item._id || item.id)}
        >
          Remove Item
        </button>
      </div>
    </div>
  )
}

export default CartItem