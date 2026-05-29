import Address from "../models/Address.js";

export const getAddresses = async (
  req,
  res
) => {
  try {

    const addresses =
      await Address.find();

    res.json(addresses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const addAddress = async (
  req,
  res
) => {
  try {

    const address =
      await Address.create(req.body);

    res.status(201).json(address);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateAddress = async (
  req,
  res
) => {
  try {

    const address =
      await Address.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(address);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};