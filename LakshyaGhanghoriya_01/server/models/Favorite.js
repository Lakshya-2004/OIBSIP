import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,
    price: Number,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Favorite",
  favoriteSchema
);