import express from "express";

import {
  getRawMaterials,
  createRawMaterial,
  updateStock,
  deleteRawMaterial,
  updateRawMaterial,
} from "../controllers/rawMaterialController.js";

const router = express.Router();

/* ================= GET ALL ================= */

router.get(
  "/",
  getRawMaterials
);

/* ================= CREATE ================= */

router.post(
  "/",
  createRawMaterial
);

/* ================= UPDATE STOCK ================= */

router.patch(
  "/:id/stock",
  updateStock
);

/* ================= UPDATE MATERIAL ================= */

router.put(
  "/:id",
  updateRawMaterial
);

/* ================= DELETE ================= */

router.delete(
  "/:id",
  deleteRawMaterial
);

export default router;