import Order from "../models/Order.js";

export const createCustomPizzaOrder = async (
  req,
  res
) => {
  try {

    const {
      pizzas,
      total,
      deliveryAddress,
    } = req.body;

    console.log(
      "CUSTOM ORDER PAYLOAD:",
      req.body
    );

    if (!pizzas || pizzas.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No pizzas found",
      });
    }

    const order = await Order.create({
      user: req.user._id,

      pizzas,

      total,

      deliveryAddress,

      paymentStatus: "Paid",

      orderStatus: "Order Received",
    });

    console.log(
      "CUSTOM ORDER SAVED:",
      order._id
    );

    return res.status(201).json({
      success: true,
      message:
        "Custom pizza order placed successfully",
      order,
    });

  } catch (error) {

    console.error(
      "CUSTOM ORDER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};