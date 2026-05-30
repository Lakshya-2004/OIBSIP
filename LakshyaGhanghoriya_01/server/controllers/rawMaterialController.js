import RawMaterial from "../models/RawMaterial.js";
import { checkLowStock } from "../services/stockService.js";

/* ================================
   GET ALL RAW MATERIALS
================================ */
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

/* ================================
   CREATE RAW MATERIAL
================================ */
export const createRawMaterial = async (req, res) => {
  try {
    let { name, stock, unit, threshold } = req.body;

    // validation
    if (!name || stock === undefined || !unit || threshold === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    name = name.trim().toLowerCase();

    const exists = await RawMaterial.findOne({ name });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Raw material already exists",
      });
    }

    const item = await RawMaterial.create({
      name,
      stock: Number(stock),
      unit,
      threshold: Number(threshold),
    });

    // 🔥 LOW STOCK CHECK (email + socket)
    await checkLowStock(item, "Raw Material");

    res.status(201).json({
      success: true,
      message: "Raw material created",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   UPDATE STOCK (+ / -)
================================ */
export const updateStock = async (req, res) => {
  try {

    // 👇 ADD THIS HERE
    console.log("REQ BODY:", req.body);
    console.log("REQ PARAMS:", req.params);

    const change = Number(req.body.change);

    if (req.body.change === undefined || isNaN(change)) {
      return res.status(400).json({
        success: false,
        message: "Invalid change value",
      });
    }

    const item = await RawMaterial.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Raw material not found",
      });
    }

    item.stock = Math.max(0, item.stock + change);

    await item.save();

    res.status(200).json({
      success: true,
      item,
    });

  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   UPDATE RAW MATERIAL (THRESHOLD/DETAILS)
================================ */
export const updateRawMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { threshold, unit, name } = req.body;

    console.log("PARAM ID:", id);
    console.log("BODY:", req.body);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing ID in request",
      });
    }

    const item = await RawMaterial.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Raw material not found",
      });
    }

    // SAFE threshold update
    if (threshold !== undefined) {
      const num = Number(threshold);

      if (isNaN(num)) {
        return res.status(400).json({
          success: false,
          message: "Invalid threshold value",
        });
      }

      item.threshold = num;
    }

    if (unit) item.unit = unit;
    if (name) item.name = name.trim().toLowerCase();

    await item.save();

    await checkLowStock(item, "Raw Material");

    res.status(200).json({
      success: true,
      item,
    });

  } catch (error) {
    console.log("THRESHOLD UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   DELETE RAW MATERIAL
================================ */
export const deleteRawMaterial = async (req, res) => {
  try {
    const item = await RawMaterial.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Raw material not found",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Raw material deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};