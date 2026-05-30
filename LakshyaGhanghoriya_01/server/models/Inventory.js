import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    price: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    threshold: {
      type: Number,
      default: 5,
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    // for low stock email system
    lowStockAlertSent: {
      type: Boolean,
      default: false,
    },

    lastStockUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ THIS IS THE IMPORTANT PART (was missing or broken)
const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;