const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');  // Importar el modelo User
const router = express.Router();

// Ruta de login
router.post('/login', async (req, res) => {
  const { num_cel, password } = req.body;

  // Verificar si ambos campos fueron enviados
  if (!num_cel || !password) {
    return res.status(400).json({ message: 'Número de celular y contraseña son requeridos' });
  }

  try {
    // Buscar el usuario por número de celular
    const user = await User.findOne({ num_cel });

    if (!user) {
      return res.status(401).json({ message: 'Número de celular o contraseña incorrectos' });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const validPassword = await bcrypt.compare(password, user.contra);

    if (!validPassword) {
      return res.status(401).json({ message: 'Número de celular o contraseña incorrectos' });
    }

    // Si la autenticación es exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso', userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
