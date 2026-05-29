import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    expiryTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model(
  "Offer",
  offerSchema
);

export default Offer;