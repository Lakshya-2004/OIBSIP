// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

   pizzas: [
  {
    _id: {
  type: mongoose.Schema.Types.Mixed,
},

    name: String,

    quantity: Number,

    price: Number,

    image: String,

    base: String,

    sauce: String,

    cheese: String,

    veggies: [String],
  },
],

    total: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Order Received",
        "In Kitchen",
        "Sent To Delivery",
        "Delivered",
      ],
      default: "Order Received",
    },

    deliveryAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;