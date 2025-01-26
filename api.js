require('dotenv').config();  // Carga las variables de entorno
const express = require("express");
const cors = require("cors");  // Importar CORS
const connectDB = require("./src/db");  // Conexión a MongoDB
const multas = require("./src/routes/multas");  // Importa la ruta de multas
const usuarios = require("./src/routes/usuarios"); // Importa la ruta de usuarios

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());  // Habilitar CORS
app.use(express.json());

// Rutas
app.use("/api", multas);  // Ruta para las operaciones relacionadas con multas
app.use("/api/usuarios", usuarios);

// Servidor
const PORT = process.env.PORT || 4000;  // El puerto del servidor (puedes mantener 4000 o cambiar según la necesidad)
const FRONTEND_PORT = 5173;  // Puerto de la aplicación web

// Configurar redireccionamiento CORS para la aplicación web (habilita solicitudes entre dominios)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `http://localhost:${FRONTEND_PORT}`);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
});

app.listen(PORT, () => console.log(`Servidor API corriendo en el puerto ${PORT}`));
