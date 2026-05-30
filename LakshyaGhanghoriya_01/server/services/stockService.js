import { sendLowStockMail } from "../utils/stockAlertMail.js";

export const checkLowStock = async (item, type) => {
  try {
    // LOW STOCK CONDITION
    if (item.stock <= item.threshold && !item.lowStockAlertSent) {
      
      // 🔥 EMAIL SAFELY (DON'T BREAK API IF FAILS)
      try {
        await sendLowStockMail(item, type);
      } catch (emailError) {
        console.log("EMAIL FAILED (IGNORED):", emailError.message);
      }

      item.lowStockAlertSent = true;
      await item.save();
    }

    // RESET ALERT WHEN STOCK NORMAL
    if (item.stock > item.threshold) {
      item.lowStockAlertSent = false;
      await item.save();
    }

  } catch (error) {
    console.log("STOCK CHECK ERROR:", error.message);
  }
};