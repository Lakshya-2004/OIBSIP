import express from "express";

import {
  getRawMaterials,
  createRawMaterial,
  updateStock,
  deleteRawMaterial,
  updateRawMaterial,
} from "../controllers/rawMaterialController.js";

const router = express.Router();

router.get(
  "/",
  getRawMaterials
);

router.post(
  "/",
  createRawMaterial
);

router.patch(
  "/:id/stock",
  updateStock
);

router.put(
  "/:id",
  updateRawMaterial
);

router.delete(
  "/:id",
  deleteRawMaterial
);

export default router;