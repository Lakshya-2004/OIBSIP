import Inventory from "../models/Inventory.js";

export const getAllInventory =
  async () => {

    return await Inventory.find()
      .sort({
        createdAt: -1,
      });
  };

export const createInventory =
  async (data) => {

    return await Inventory.create(
      data
    );
  };

export const updateInventoryStock =
  async (id, stock) => {

    return await Inventory.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );
  };

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

export const deleteInventory =
  async (id) => {

    return await Inventory.findByIdAndDelete(
      id
    );
  };