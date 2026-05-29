import express from "express";

import {
  getFavorites,
  addFavorite,
  deleteFavorite,
  updateFavorite,
} from "../controllers/favoriteController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getFavorites
);

router.post(
  "/",
  protect,
  addFavorite
);

router.put(
  "/:id",
  protect,
  updateFavorite
);

router.delete(
  "/:id",
  protect,
  deleteFavorite
);

export default router;