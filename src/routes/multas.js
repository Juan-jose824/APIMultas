const express = require("express");
const router = express.Router();
const Multa = require("../models/multa");

router.post("/multas", async (req, res) => {
  try {
    const { coto, monto, fecha, comentario } = req.body;

    const nuevaMulta = new Multa({ coto, monto, fecha, comentario });
    const multaGuardada = await nuevaMulta.save();

    res.status(201).json(multaGuardada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al guardar la multa", error });
  }
});

router.get("/multas", async (req, res) => {
  try {
    const multas = await Multa.find();
    res.status(200).json(multas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener multas", error });
  }
});

module.exports = router;
