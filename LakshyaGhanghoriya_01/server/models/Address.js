import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    address: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Address",
  addressSchema
);