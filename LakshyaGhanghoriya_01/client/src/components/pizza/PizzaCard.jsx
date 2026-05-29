import { Link } from 'react-router-dom'

function PizzaCard({ pizza }) {
  return (
    <Link
          to='/menu'
          state={{ pizza }}
          
        >
    <div className='pizza-card'>
      <img
        src={
          pizza.image ||
          'https://images.unsplash.com/photo-1513104890138-7c749659a591'
        }
        alt={pizza.name}
        className='pizza-image'
      />

      <div className='pizza-content'>
        <h2>{pizza.name}</h2>

        <p className='pizza-description'>
          {pizza.description ||
            'Delicious hot pizza made with fresh ingredients.'}
        </p>

        <div className='pizza-details'>
          <span className='pizza-price'>
            ₹ {pizza.price}
          </span>

          <span className='pizza-category'>
            {pizza.category || 'Veg'}
          </span>
        </div>

      
      </div>
    </div>
     </Link>
  )
}

export default PizzaCard