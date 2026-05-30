import transporter from "./sendMail.js";

export const sendLowStockMail = async (item, type = "Inventory") => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `⚠ Low Stock Alert - ${type}`,
    html: `
      <h2>Low Stock Alert 🚨</h2>
      <p><b>Item:</b> ${item.name}</p>
      <p><b>Stock:</b> ${item.stock}</p>
      <p><b>Threshold:</b> ${item.threshold}</p>
      <p><b>Type:</b> ${type}</p>
      <p style="color:red;">Please restock immediately.</p>
    `,
  });
};