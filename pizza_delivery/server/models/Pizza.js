import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
    },

    description: {
      type: String,
    },

    // 🔥 THIS IS THE IMPORTANT PART
   ingredients: [
  {
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
    },
    rawMaterialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawMaterial",
    },
    qty: {
      type: Number,
      required: true,
    },
  },
],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pizza", pizzaSchema);