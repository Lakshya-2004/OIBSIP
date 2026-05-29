import express from "express";
import Inventory from "../models/Inventory.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.log("GET INVENTORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// CREATE
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.log("POST INVENTORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
   const updated =
  await Inventory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

    res.json(updated);
  } catch (err) {
    console.log("PUT INVENTORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.log("DELETE INVENTORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;