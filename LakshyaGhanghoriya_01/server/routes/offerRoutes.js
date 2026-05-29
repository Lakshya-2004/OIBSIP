import express from "express";
import Offer from "../models/Offer.js";

const router = express.Router();

router.post(
  "/create-offer",
  async (req, res) => {
    try {

      console.log(req.body);

      const offer =
        await Offer.create({
          title: req.body.title,
          description:
            req.body.description,
          code: req.body.code,
          discount:
            req.body.discount,
          image: req.body.image,
          expiryTime:
            req.body.expiryTime,
        });

      res.status(201).json(offer);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);

router.get(
  "/latest",
  async (req, res) => {
    try {

      const offer =
        await Offer.findOne().sort({
          createdAt: -1,
        });

      res.json(offer);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  }
);

router.put(
  "/:id",
  async (req, res) => {
    try {

      const updatedOffer =
        await Offer.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(updatedOffer);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  }
);

export default router;