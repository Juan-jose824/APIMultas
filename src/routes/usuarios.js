const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');  // Importa el modelo de usuario

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { numero_tel, contrasena } = req.body;
    
    const usuario = await Usuario.findOne({ numero_tel, contrasena });  // Encuentra usuario por número de teléfono y contraseña

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Número de teléfono o contraseña incorrectos' });
    }

    res.status(200).json({
      id: usuario._id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
});

module.exports = router;
