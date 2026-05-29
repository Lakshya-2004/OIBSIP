import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      lowercase: true,
      unique: true, // creates index automatically (IMPORTANT)
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



export default mongoose.model("RawMaterial", rawMaterialSchema);