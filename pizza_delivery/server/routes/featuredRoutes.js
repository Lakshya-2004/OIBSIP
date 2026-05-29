import express from "express";
import Featured from "../models/Featured.js";

const router = express.Router();


// GET ALL FEATURED ITEMS
router.get("/", async (req, res) => {
  try {
    console.log("✅ GET /featured hit");

    const items = await Featured.find().sort({
      createdAt: -1,
    });

    res.status(200).json(items);

  } catch (error) {

    console.log(
      "❌ GET FEATURED ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch featured items",
    });
  }
});


// CREATE FEATURED ITEM
router.post("/", async (req, res) => {
  try {

    const {
      name,
      category,
     
      image,
      description,
    } = req.body;

    if (
      !name ||
      !category 
     
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, category and price are required",
      });
    }

    const item =
      await Featured.create({
        name,
        category,
        
        image,
        description,
      });

    res.status(201).json({
      success: true,
      message:
        "Featured item created successfully",
      item,
    });

  } catch (error) {

    console.log(
      "❌ CREATE FEATURED ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create featured item",
    });
  }
});


// UPDATE FEATURED ITEM
router.put("/:id", async (req, res) => {
  try {

    const updated =
      await Featured.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message:
          "Featured item not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Featured item updated successfully",
      item: updated,
    });

  } catch (error) {

    console.log(
      "❌ UPDATE FEATURED ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update featured item",
    });
  }
});


// DELETE FEATURED ITEM
router.delete("/:id", async (req, res) => {
  try {

    const deleted =
      await Featured.findByIdAndDelete(
        req.params.id
      );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message:
          "Featured item not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Featured item deleted successfully",
    });

  } catch (error) {

    console.log(
      "❌ DELETE FEATURED ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete featured item",
    });
  }
});

export default router;