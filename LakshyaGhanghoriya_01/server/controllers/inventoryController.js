import Inventory from "../models/Inventory.js";

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
 * ADD NEW RAW ITEM
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
 * UPDATE INVENTORY ITEM
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
    const { change } = req.body; // + or -

    const item = await Inventory.findByIdAndUpdate(
      id,
      {
        $inc: { stock: Number(change) },
      },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // LOW STOCK ALERT
    if (item.stock <= (item.threshold || 5)) {
      const io = req.app.get("io");

      if (io) {
        io.emit("lowInventoryStock", {
          _id: item._id,
          name: item.name,
          stock: item.stock,
        });
      }
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