import Favorite from "../models/Favorite.js";

export const getFavorites = async (
  req,
  res
) => {
  try {

    const favorites =
      await Favorite.find({
        user: req.user._id,
      });

    res.status(200).json(favorites);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const addFavorite = async (
  req,
  res
) => {
  try {

    const favorite =
      await Favorite.create({
        ...req.body,
        user: req.user._id,
      });

    res.status(201).json(favorite);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateFavorite = async (
  req,
  res
) => {
  try {

    const favorite =
      await Favorite.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(favorite);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const deleteFavorite = async (
  req,
  res
) => {
  try {

    await Favorite.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Favorite deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};