// ./src/middleware/validateToken.js

const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Acceso no autorizado' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token no válido' });
  }
}

module.exports = validateToken;