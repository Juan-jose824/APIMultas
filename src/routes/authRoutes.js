// src/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const validateToken = require('../middlewares/authMiddleware'); // Ruta del middleware

const router = express.Router();

// Ruta para login (creación del token)
router.post('/login', (req, res) => {
  const { phone, password } = req.body;

  // Aquí iría la lógica para validar el teléfono y la contraseña
  // Si es válido, creamos un token JWT
  const token = jwt.sign({ phone, role: 'usuario' }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Ruta protegida, solo accesible con un token válido
router.get('/protected-route', validateToken, (req, res) => {
  res.send('Acceso a la ruta protegida exitoso');
});

module.exports = router;
