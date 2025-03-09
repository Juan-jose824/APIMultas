const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.user = decoded; // Guarda los datos del usuario decodificados
    next(); // Continúa con la siguiente función
  });
};

// Middleware para verificar roles
const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    next();
  };
};

module.exports = { validateToken, verificarRol };
