import Pizza from "../models/Pizza.js";

export const updateStockAfterOrder = async (items) => {
  try {
    for (const item of items) {
      if (!item._id || !item.quantity) continue;

      await Pizza.findByIdAndUpdate(
        item._id,
        {
          $inc: {
            stock: -Number(item.quantity),
          },
        },
        { new: true }
      );
    }
  } catch (error) {
    console.log("❌ Stock update failed:", error.message);
  }
};