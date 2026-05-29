// components/layout/Sidebar.jsx

import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      name: 'Custom Pizza',
      path: '/custom-pizza',
    },
    {
      name: 'Cart',
      path: '/cart',
    },
    {
      name: 'Orders',
      path: '/orders',
    },
    {
      name: 'Admin',
      path: '/admin',
    },
    {
      name: 'Inventory',
      path: '/inventory',
    },
  ]

  return (
    <div className='sidebar'>
      <div className='sidebar-logo'>
        <h2>🍕 Pizza App</h2>
      </div>

      <div className='sidebar-links'>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path
                ? 'sidebar-link active-sidebar'
                : 'sidebar-link'
            }
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar