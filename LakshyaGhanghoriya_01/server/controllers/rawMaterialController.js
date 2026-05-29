import RawMaterial from "../models/RawMaterial.js";

// ================================
// GET ALL RAW STOCK
// ================================
export const getRawMaterials = async (req, res) => {
  try {
    const items = await RawMaterial.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// CREATE ITEM (SAFE + VALIDATION)
// ================================
export const createRawMaterial = async (req, res) => {
  try {
    let { name, stock, unit, threshold } = req.body;

    // 🔥 VALIDATION (IMPORTANT)
    if (!name || stock === undefined || threshold === undefined || !unit) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (name, stock, unit, threshold)",
      });
    }

    name = name.trim().toLowerCase();

    const exists = await RawMaterial.findOne({ name });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Item already exists. Use stock update API.",
      });
    }

    const item = await RawMaterial.create({
      name,
      stock: Number(stock),
      unit,
      threshold: Number(threshold),
    });

    res.status(201).json({
      success: true,
      message: "Item created",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// UPDATE STOCK (SAFE)
// ================================
// controllers/rawMaterialController.js

export const updateStock = async (
  req,
  res
) => {
  try {

    const { change } = req.body;

    // find item
    const item =
      await RawMaterial.findById(
        req.params.id
      );

    // item not found
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Raw material not found",
      });
    }

    // update stock safely
    item.stock = Math.max(
      0,
      item.stock + Number(change)
    );

    // save item
    await item.save();

    /* ================= LOW STOCK ALERT ================= */

    if (
      item.stock <= item.threshold
    ) {

      console.log(
        `⚠ LOW STOCK: ${item.name}`
      );

      // emit socket event
      req.app
        .get("io")
        .emit("lowStock", item);
    }

    return res.status(200).json({
      success: true,
      item,
    });

  } catch (error) {

    console.log(
      "UPDATE STOCK ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateRawMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { threshold } = req.body;

    const item = await RawMaterial.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (threshold !== undefined) {
      item.threshold = Number(threshold);
    }

    await item.save();

    res.json({
      success: true,
      message: "Item updated",
      item,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ================================
// DELETE ITEM
// ================================
export const deleteRawMaterial = async (req, res) => {
  try {
    const item = await RawMaterial.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};