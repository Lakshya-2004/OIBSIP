let ioInstance = null;

export const initSocket = (io) => {
  ioInstance = io;

  io.on("connection", (socket) => {

    console.log(
      `User connected: ${socket.id}`
    );

    socket.on("disconnect", () => {

      console.log(
        `User disconnected: ${socket.id}`
      );
    });
  });
};

export const emitOrderUpdate = (
  order
) => {

  if (ioInstance) {

    ioInstance.emit(
      "orderUpdated",
      order
    );
  }
};

export const emitLowStockAlert = (
  item
) => {

  if (ioInstance) {

    ioInstance.emit(
      "lowStock",
      item
    );
  }
};