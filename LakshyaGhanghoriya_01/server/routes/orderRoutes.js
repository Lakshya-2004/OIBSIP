// routes/orderRoutes.js

import express from "express";
import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";
import { emitLowStockAlert } from "../sockets/orderSocket.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();



// CREATE ORDER
// POST /api/orders/create

// CREATE ORDER
router.post("/create", protect, async (req, res) => {
  try {
    const { pizzas, total, deliveryAddress } = req.body;

    console.log(req.body);

    // VALIDATION (UNCHANGED)
    if (!pizzas || !Array.isArray(pizzas) || pizzas.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No pizzas provided",
      });
    }

    if (!total || total <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid total amount",
      });
    }

    if (!deliveryAddress?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Delivery address required",
      });
    }

    // =========================
    // 🔥 ONLY ADDITION (SAFE)
    // =========================

    for (let item of pizzas) {
      const inventoryItem = await Inventory.findById(item._id);

      if (!inventoryItem) {
        return res.status(404).json({
          success: false,
          message: "Inventory item not found",
        });
      }

      if (inventoryItem.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${inventoryItem.name}`,
        });
      }
    }

    for (let item of pizzas) {
      await Inventory.findByIdAndUpdate(item._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // =========================
    // 🔥 ORIGINAL ORDER CREATION (UNCHANGED)
    // =========================

    const order = await Order.create({
      user: req.user._id,
      pizzas,
      total,
      deliveryAddress,
      paymentStatus: "Paid",
      orderStatus: "Order Received",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Failed to create order",
    });
  }
});



// GET MY ORDERS
// GET /api/orders/my-orders

router.get(
  "/my-orders",
  protect,
  async (req, res) => {
    try {

      const orders =
        await Order.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        orders
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Failed to fetch orders",
      });
    }
  }
);



// GET ALL ORDERS (ADMIN)
// GET /api/orders/all

router.get(
  "/all",
  protect,
  adminOnly,
  async (req, res) => {
    try {

      const orders =
        await Order.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        orders
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Failed to fetch orders",
      });
    }
  }
);



// UPDATE ORDER STATUS (ADMIN)
// PUT /api/orders/status

router.put(
  "/status",
  protect,
  adminOnly,
  async (req, res) => {
    try {

      const {
        orderId,
        status,
      } = req.body;

      const allowed = [
        "Order Received",
        "In Kitchen",
        "Sent To Delivery",
        "Delivered",
      ];

      if (
        !allowed.includes(status)
      ) {
        return res.status(400).json({
          message:
            "Invalid status value",
        });
      }

      const updated =
        await Order.findByIdAndUpdate(
          orderId,
          {
            orderStatus: status,
          },
          {
            new: true,
          }
        ).populate(
          "user",
          "name email"
        );

      if (!updated) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      res.status(200).json(
        updated
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Failed to update status",
      });
    }
  }
);

export default router;