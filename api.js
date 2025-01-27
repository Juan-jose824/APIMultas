require('dotenv').config();
const express = require("express");
const cors = require("cors");
const http = require("http"); // Necesario para Socket.IO
const { Server } = require("socket.io");
const connectDB = require("./src/db");
const multas = require("./src/routes/multas");
const usuarios = require("./src/routes/usuarios");

const app = express();
const server = http.createServer(app); // Crear el servidor HTTP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Puerto del frontend
    methods: ["GET", "POST"],
  },
});

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", multas(io)); // Pasar `io` a las rutas de multas
app.use("/api/usuarios", usuarios);

// Socket.IO - Manejo de conexiones
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Servidor
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Servidor API corriendo en el puerto ${PORT}`));
