import express from "express";

import {
  getAddresses,
  addAddress,
  updateAddress,
} from "../controllers/addressController.js";

const router = express.Router();

router.get("/", getAddresses);

router.post("/", addAddress);

router.put("/:id", updateAddress);

export default router;