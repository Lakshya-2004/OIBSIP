// components/pizza/CustomPizzaBuilder.jsx


import { useState, useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import "../../styles/CustomPizzaBuilder.css"
function CustomPizzaBuilder() {
  const { addToCart } = useContext(CartContext)

  const [pizza, setPizza] = useState({
    base: '',
    sauce: '',
    cheese: '',
    veggies: [],
    quantity: 1,
    price: 299,
  })

  const bases = ['Thin Crust', 'Cheese Burst', 'Pan Crust', 'Classic', 'Wheat Base']
  const sauces = ['Tomato', 'Spicy', 'Barbeque', 'Garlic', 'White Sauce']
  const cheeses = ['Mozzarella', 'Cheddar', 'Parmesan', 'Blue Cheese', 'Mix Cheese']
  const veggiesList = ['Onion', 'Capsicum', 'Olives', 'Corn', 'Mushroom', 'Paneer']

  const handleVeggies = (veg) => {
    setPizza((prev) => {
      const exists = prev.veggies.includes(veg)
      return {
        ...prev,
        veggies: exists
          ? prev.veggies.filter((v) => v !== veg)
          : [...prev.veggies, veg],
      }
    })
  }

  const generatePizzaId = (pizza) => {
    return [
      pizza.base,
      pizza.sauce,
      pizza.cheese,
      [...pizza.veggies].sort().join('-'),
    ]
      .join('|')
      .toLowerCase()
  }

  const handleAddToCart = () => {
  if (!pizza.base || !pizza.sauce || !pizza.cheese) {
    alert('Please select base, sauce and cheese')
    return
  }

  const item = {
    id: generatePizzaId(pizza),
    name: 'Custom Pizza',
    base: pizza.base,
    sauce: pizza.sauce,
    cheese: pizza.cheese,
    veggies: pizza.veggies,
    price: pizza.price,
    quantity: pizza.quantity,
  }

  addToCart(item)
}

  return (
    <div className="builder-container">

      <div className="builder-section">
        <h2>Select Pizza Base</h2>
        <div className="options-grid">
          {bases.map((base) => (
            <button
              key={base}
              className={pizza.base === base ? 'selected-option' : 'option-btn'}
              onClick={() => setPizza({ ...pizza, base })}
            >
              {base}
            </button>
          ))}
        </div>
      </div>

      <div className="builder-section">
        <h2>Select Sauce</h2>
        <div className="options-grid">
          {sauces.map((sauce) => (
            <button
              key={sauce}
              className={pizza.sauce === sauce ? 'selected-option' : 'option-btn'}
              onClick={() => setPizza({ ...pizza, sauce })}
            >
              {sauce}
            </button>
          ))}
        </div>
      </div>

      <div className="builder-section">
        <h2>Select Cheese</h2>
        <div className="options-grid">
          {cheeses.map((cheese) => (
            <button
              key={cheese}
              className={pizza.cheese === cheese ? 'selected-option' : 'option-btn'}
              onClick={() => setPizza({ ...pizza, cheese })}
            >
              {cheese}
            </button>
          ))}
        </div>
      </div>

      <div className="builder-section">
        <h2>Select Veggies</h2>
        <div className="options-grid">
          {veggiesList.map((veg) => (
            <button
              key={veg}
              className={pizza.veggies.includes(veg) ? 'selected-option' : 'option-btn'}
              onClick={() => handleVeggies(veg)}
            >
              {veg}
            </button>
          ))}
        </div>
      </div>

      <div className="builder-section">
        <h2>Quantity</h2>
        <div className="quantity-box">
          <button
            onClick={() =>
              setPizza((p) => ({
                ...p,
                quantity: p.quantity > 1 ? p.quantity - 1 : 1,
              }))
            }
          >
            -
          </button>

          <span>{pizza.quantity}</span>

          <button
            onClick={() =>
              setPizza((p) => ({
                ...p,
                quantity: p.quantity + 1,
              }))
            }
          >
            +
          </button>
        </div>
      </div>

      <div className="summary-card">
        <h2>Pizza Summary</h2>

        <p><strong>Base:</strong> {pizza.base || 'Not Selected'}</p>
        <p><strong>Sauce:</strong> {pizza.sauce || 'Not Selected'}</p>
        <p><strong>Cheese:</strong> {pizza.cheese || 'Not Selected'}</p>
        <p>
          <strong>Veggies:</strong>{' '}
          {pizza.veggies.length ? pizza.veggies.join(', ') : 'None'}
        </p>

        <p><strong>Quantity:</strong> {pizza.quantity}</p>

        <h3>Total: ₹ {pizza.price * pizza.quantity}</h3>

        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export default CustomPizzaBuilder