import Order from "../models/Order.js";
import RawMaterial from "../models/RawMaterial.js";

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

    console.log("\n========== CUSTOM ORDER START ==========");
    console.log("USER:", req.user?._id);
    console.log("TOTAL:", total);
    console.log("ADDRESS:", deliveryAddress);
    console.log(
      "PIZZAS:",
      JSON.stringify(pizzas, null, 2)
    );

    if (!pizzas || pizzas.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No pizzas found",
      });
    }

    // =========================
    // DEDUCT RAW MATERIAL STOCK
    // =========================

    for (const pizza of pizzas) {

      const qty = Number(
        pizza.quantity || 1
      );

      const materials = [
        pizza.base,
        pizza.sauce,
        pizza.cheese,
        ...(pizza.veggies || []),
      ].filter(Boolean);

      console.log(
        "PROCESSING MATERIALS:",
        materials
      );

      for (const materialName of materials) {

        const item =
          await RawMaterial.findOne({
            name: materialName
              .trim()
              .toLowerCase(),
          });

        if (!item) {

          console.log(
            "RAW MATERIAL NOT FOUND:",
            materialName
          );

          continue;
        }

        if (item.stock < qty) {
          return res.status(400).json({
            success: false,
            message: `${item.name} is out of stock`,
          });
        }

        item.stock -= qty;

        await item.save();

        console.log(
          `${item.name} stock reduced to ${item.stock}`
        );

        if (
          item.stock <= item.threshold
        ) {

          req.app
            .get("io")
            ?.emit("lowStock", {
              _id: item._id,
              name: item.name,
              stock: item.stock,
            });
        }
      }
    }

    // =========================
    // CLEAN CUSTOM PIZZA DATA
    // =========================

    const cleanPizzas =
      pizzas.map((pizza) => ({
        name:
          pizza.name ||
          "Custom Pizza",

        quantity: Number(
          pizza.quantity || 1
        ),

        price: Number(
          pizza.price || 0
        ),

        image: pizza.image || "",

        base: pizza.base || "",

        sauce: pizza.sauce || "",

        cheese: pizza.cheese || "",

        veggies:
          pizza.veggies || [],
      }));

    console.log(
      "BEFORE ORDER CREATE"
    );

    const order =
      await Order.create({
        user: req.user._id,

        pizzas: cleanPizzas,

        total: Number(total),

        deliveryAddress,

        paymentStatus: "Paid",

        orderStatus:
          "Order Received",
      });

    console.log(
      "AFTER ORDER CREATE"
    );

    console.log(
      "CUSTOM ORDER SAVED:",
      order._id
    );

    console.log(
      "========== CUSTOM ORDER END ==========\n"
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