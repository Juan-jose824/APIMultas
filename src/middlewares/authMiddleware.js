// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token no proporcionado');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Token inválido');
    }
    req.user = decoded; // Guarda los datos del usuario decodificados
    next(); // Pasa al siguiente middleware o controlador
  });
};

module.exports = validateToken;
