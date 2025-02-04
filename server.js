require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db");
const multaRoutes = require("./src/routes/multas");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", multaRoutes);
app.get("/", (req, res) => {
    res.send("Bienvenido a la API de Multas 🚀");
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
