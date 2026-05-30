import Inventory from "../models/Inventory.js";
import { checkLowStock } from "../services/stockService.js";

/**
 * =========================
 * GET ALL INVENTORY ITEMS
 * =========================
 */
export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * ADD NEW ITEM
 * =========================
 */
export const addInventoryItem = async (req, res) => {
  try {
    const { name, stock, unit, threshold } = req.body;

    const existing = await Inventory.findOne({ name });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Item already exists",
      });
    }

    const item = await Inventory.create({
      name,
      stock: Number(stock || 0),
      unit,
      threshold: Number(threshold || 5),
    });

    // 🔥 check immediately after creation
    await checkLowStock(item, "Inventory");

    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * UPDATE ITEM (FULL UPDATE)
 * =========================
 */
export const updateInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    item.lastStockUpdatedAt = new Date();
    await item.save();

    // 🔥 LOW STOCK CHECK
    await checkLowStock(item, "Inventory");

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * DELETE ITEM
 * =========================
 */
export const deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * ADJUST STOCK (+ / -)
 * =========================
 */
export const adjustStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { change } = req.body;

    const item = await Inventory.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // safe update
    item.stock = Math.max(0, item.stock + Number(change));
    item.lastStockUpdatedAt = new Date();

    await item.save();

    // 🔥 LOW STOCK CHECK (EMAIL + ALERT)
    await checkLowStock(item, "Inventory");

    // 🔔 SOCKET ALERT
    const io = req.app.get("io");

    if (item.stock <= item.threshold && io) {
      io.emit("lowInventoryStock", {
        _id: item._id,
        name: item.name,
        stock: item.stock,
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * LOW STOCK ITEMS
 * =========================
 */
export const getLowStockItems = async (req, res) => {
  try {
    const items = await Inventory.find({
      $expr: { $lte: ["$stock", "$threshold"] },
    });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};