import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      lowercase: true,
      unique: true, // creates index automatically
      index: true,  // ✅ better performance for searches
    },

    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },

    unit: {
      type: String,
      required: true,
      enum: ["kg", "g", "L", "ml", "pcs", "pack", "bottle"],
      default: "kg",
    },

    threshold: {
      type: Number,
      default: 5,
      min: [0, "Threshold cannot be negative"],
    },

    // ⭐ NEW: prevents repeated low-stock email spam
    lowStockAlertSent: {
      type: Boolean,
      default: false,
    },

    // ⭐ NEW: optional tracking (very useful for admin panel)
    lastStockUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


rawMaterialSchema.index({ name: 1 });

export default mongoose.model("RawMaterial", rawMaterialSchema);