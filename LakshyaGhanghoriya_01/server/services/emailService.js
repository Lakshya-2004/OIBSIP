import { sendEmail } from '../config/mailer.js'

export const sendWelcomeEmail =
  async (userEmail, userName) => {
    const html = `
      <h2>Welcome to Pizza Delivery 🍕</h2>
      <p>Hello ${userName},</p>
      <p>Your account has been created successfully.</p>
    `

    await sendEmail({
      to: userEmail,
      subject: 'Welcome To Pizza Delivery',
      html,
    })
  }

export const sendOrderEmail =
  async (userEmail, orderId) => {
    const html = `
      <h2>Order Confirmed ✅</h2>
      <p>Your order has been placed successfully.</p>
      <p>Order ID: <strong>${orderId}</strong></p>
    `

    await sendEmail({
      to: userEmail,
      subject: 'Pizza Order Confirmation',
      html,
    })
  }