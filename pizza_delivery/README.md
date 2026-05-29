# React + Vite
# 🍕 PizzaStation — Full Stack Food Ordering Website

PizzaStation is a modern and fully responsive MERN Stack based food ordering web application where users can explore delicious food items, customize pizzas, manage carts, place orders, and make secure online payments. The platform also includes a powerful admin dashboard for inventory and offer management.

---

# 🚀 Features

## 👤 User Features

- User Authentication (Login/Register)
- JWT Based Authorization
- Explore Dynamic Food Menu
- Search & Browse Food Items
- Custom Pizza Builder
- Add to Cart Functionality
- Persistent Cart Storage
- Razorpay Payment Integration
- Order Placement & Tracking
- Dynamic Offer Section
- Live Offer Countdown Timer
- Responsive UI for Mobile & Desktop

---

## 🛠️ Admin Features

- Admin Dashboard
- Add/Edit/Delete Inventory Items
- Manage Homepage Offers
- Dynamic Discount System
- Offer Expiry Timer Control
- View Orders
- Manage Product Images & Pricing

---

# 🧑‍💻 Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- CSS3

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JWT (JSON Web Token)
- bcryptjs

## Payment Gateway
- Razorpay

---

# 📁 Folder Structure

```bash
PizzaStation/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── styles/
│
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js


#Install Dependencies
#Frontend
cd client
npm install

#Backend

cd server
npm install


#Environment Variables

#Create a .env file inside the server folder.

PORT=5000
MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

#Create .env inside client folder.

VITE_RAZORPAY_KEY=your_key

#▶️ Run Project

#Start Backend
cd server
npm start

#Start Frontend
cd client
npm run dev

#Razorpay Payment Integration

This project uses Razorpay for secure online payments.

Features:
Order Creation
Secure Checkout
Payment Verification
Order Saving After Successful Payment
🧠 Key Functionalities
🛒 Persistent Cart

Cart items remain saved even after refreshing the page or logging out using LocalStorage.

#🎨 Custom Pizza Builder

Users can customize:

Base
Sauce
Cheese
Veggies

#⏳ Dynamic Offer Timer

Admin can:

Create Offers
Set Expiry Time
Change Offer Images
Add Promo Codes

The homepage timer updates automatically in real-time.

#📸 Main Pages

Home Page
Menu Page
Cart Page
Orders Page
Login/Register Page
Admin Dashboard
Inventory Management
Offers Management

#📚 Learning Outcomes

Through this project I improved my understanding of:

Full Stack MERN Development
REST API Development
Authentication & Authorization
Payment Gateway Integration
MongoDB Database Design
React State Management
Dynamic UI/UX Design
Real-world Problem Solving

#🙌 Acknowledgement

Special thanks to OASIS InfoBytes for providing this amazing internship opportunity and practical exposure to Full Stack Web Development.

#📌 Future Improvements

Email Notifications
Live Order Tracking
Coupon System
AI Food Recommendations
Multi-vendor Support
PWA Support

#👨‍💻 Developer

Lakshya Ghanghoriya
Connect with me:
LinkedIn: https://www.linkedin.com/in/lakshya-ghanghoriya-b476a6267
GitHub: https://github.com/LakshyaGhanghoriya