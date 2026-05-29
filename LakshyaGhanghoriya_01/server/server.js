import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import pizzaRoutes from "./routes/pizzaRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import featuredRoutes from "./routes/featuredRoutes.js";
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";

import { initSocket } from "./sockets/orderSocket.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

initSocket(io);

app.set("io", io);

connectDB();

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/pizzas", pizzaRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api/raw-material", rawMaterialRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/offers", offerRoutes);

app.use("/api/featured", featuredRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/address", addressRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🍕 Pizza Delivery API Running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    timestamp: new Date(),
    environment:
      process.env.NODE_ENV || "development",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found -> ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:");
  console.error(err);

  res.status(500).json({
    success: false,
    message:
      err.message || "Internal Server Error",
  });
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`
==========================================
🚀 SERVER RUNNING SUCCESSFULLY
==========================================
🌍 Environment : ${process.env.NODE_ENV || "development"}
📡 Port        : ${PORT}
🖥 Client URL  : ${process.env.CLIENT_URL}
==========================================
  `);
});