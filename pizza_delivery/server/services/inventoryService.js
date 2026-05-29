// services/inventoryService.js

import Inventory from "../models/Inventory.js";

// GET ALL INVENTORY
export const getAllInventory =
  async () => {

    return await Inventory.find()
      .sort({
        createdAt: -1,
      });
  };

// CREATE INVENTORY ITEM
export const createInventory =
  async (data) => {

    return await Inventory.create(
      data
    );
  };

// UPDATE INVENTORY ITEM
export const updateInventoryStock =
  async (id, stock) => {

    return await Inventory.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );
  };

// DECREASE STOCK
export const decreaseStock =
  async (
    id,
    quantity
  ) => {

    return await Inventory.findByIdAndUpdate(
      id,
      {
        $inc: {
          stock: -quantity,
        },
      },
      { new: true }
    );
  };

// DELETE INVENTORY ITEM
export const deleteInventory =
  async (id) => {

    return await Inventory.findByIdAndDelete(
      id
    );
  };