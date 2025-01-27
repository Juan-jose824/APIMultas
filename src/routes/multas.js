const express = require("express");
const router = express.Router();
const Multa = require("../models/multa");

module.exports = (io) => {
  // Ruta para crear una nueva multa
  router.post("/multas", async (req, res) => {
    try {
      const { cantidad, torre, departamento, comentarios } = req.body;

      const nuevaMulta = new Multa({
        cantidad,
        torre,
        departamento,
        comentarios,
      });

      const multaGuardada = await nuevaMulta.save();

      // Emitir evento de notificación a los clientes conectados
      io.emit("nuevaMulta", {
        torre,
        departamento,
        cantidad,
        comentarios,
      });

      res.status(201).json(multaGuardada);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al guardar la multa", error });
    }
  });

  // Ruta para obtener todas las multas
  router.get("/multas", async (req, res) => {
    try {
      const { userId } = req.query;
      const multas = await Multa.find({ userId });
      res.status(200).json(multas);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener las multas del usuario", error });
    }
  });

  return router;
};
