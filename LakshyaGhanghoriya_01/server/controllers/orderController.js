import mongoose from "mongoose";
import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";

export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      pizzas,
      total,
      deliveryAddress,
    } = req.body;

    if (!pizzas || pizzas.length === 0) {
      throw new Error("No items in order");
    }

    // =========================
    // 1. VALIDATE INVENTORY STOCK
    // =========================
    for (const item of pizzas) {
      const qty = Number(item.quantity || 1);

      const inventoryItem =
        await Inventory.findById(item._id).session(session);

      if (!inventoryItem) {
        throw new Error(`Item not found: ${item.name}`);
      }

      if (inventoryItem.stock < qty) {
        throw new Error(
          `Not enough stock for ${inventoryItem.name}`
        );
      }
    }

    // =========================
    // 2. CREATE ORDER
    // =========================
    const order = await Order.create(
      [
        {
          user: req.user._id,
          pizzas,
          total,
          deliveryAddress,
          paymentStatus: "Paid",
          orderStatus: "Order Received",
        },
      ],
      { session }
    );

    // =========================
    // 3. UPDATE INVENTORY STOCK
    // =========================
    for (const item of pizzas) {
      const qty = Number(item.quantity || 1);

      const updatedItem =
        await Inventory.findByIdAndUpdate(
          item._id,
          {
            $inc: {
              stock: -qty,
            },
          },
          {
            new: true,
            session,
          }
        );
      // =========================
      // LOW STOCK ALERT
      // =========================

      if (updatedItem) {

        const io = req.app.get("io");

        // LOW STOCK
        if (
          updatedItem.stock <= 5
        ) {
          console.log(
            "LOW STOCK EMITTED"
          );
          io?.emit("lowStock", {
            _id: updatedItem._id,
            name: updatedItem.name,
            stock: updatedItem.stock,
          });
        }

        // OUT OF STOCK
        if (updatedItem.stock === 0) {
          console.log(
            "EMITTING OUT OF STOCK:",
            updatedItem.name
          );
          io?.emit("outOfStock", {
            _id: updatedItem._id,
            name: updatedItem.name,
            stock: 0,
          });
        }
      }


    }

    // =========================
    // 5. COMMIT
    // =========================
    await session.commitTransaction();

    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: order[0],
    });

  } catch (error) {

    await session.abortTransaction();

    session.endSession();

    console.error("ORDER ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};