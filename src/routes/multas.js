const express = require('express');
const router = express.Router();
const Multa = require('../models/multa');  

// Ruta para crear una nueva multa
router.post('/multas', async (req, res) => {
  try {
    const { cantidad, departamento, torre, comentarios } = req.body;  // Ajusta los campos que necesitas recibir
    const nuevaMulta = new Multa({
      cantidad,
      torre,
      departamento,
      comentarios
    });

    const multaGuardada = await nuevaMulta.save();  // Guarda el documento en la base de datos
    res.status(201).json(multaGuardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar la multa', error });
  }
});

// Ruta para obtener todas las multas
router.get('/multas', async (req, res) => {
  try {
    const { userId } = req.query; // Obtener el id del usuario autenticado desde el query
    const multas = await Multa.find({ userId }); // Filtrar multas por el usuario
    res.status(200).json(multas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las multas del usuario', error });
  }
});



module.exports = router;