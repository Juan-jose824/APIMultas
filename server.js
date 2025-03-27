require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db");
const multaRoutes = require("./src/routes/multas");
const authRoutes = require("./src/routes/authRoutes"); // Importamos las rutas de autenticación
const validateToken = require("./src/middleware/validateToken"); // Importamos el middleware para validar el token
const recuperar = require("./src/routes/recuperar");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Rutas de autenticación (login)
app.use("/api/auth", authRoutes); // Esta ruta maneja el login y la creación de tokens

// Rutas de multas, protegidas por token
app.use("/api", validateToken, multaRoutes); // Estas rutas están protegidas por token

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Multas 🚀");
});

app.use("/api/recuperar", recuperar);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
