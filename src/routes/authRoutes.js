const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');  // Importar el modelo User
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { num_cel, correo, password, nombre_com, rol } = req.body;

  // Validación de los campos
  if (!num_cel || !correo || !password || !nombre_com || !rol) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el número de celular ya existe
    const existingUser = await User.findOne({ num_cel });
    if (existingUser) {
      return res.status(400).json({ message: 'El número de celular ya está registrado' });
    }

    // Crear el nuevo usuario
    const newUser = new User({
      num_cel,
      correo,
      password, // Se hasheará automáticamente en el modelo
      nombre_com,
      rol,
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

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

    // Usar el método matchPassword definido en el modelo User.js
    const validPassword = await user.matchPassword(password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Número de celular o contraseña incorrectos' });
    }
    
    // Si la autenticación es exitosa, generar el token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    


    // Enviar el token como respuesta al frontend
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token: token,  // El token se envía al frontend
      userId: user._id,  // Puedes enviar el userId si lo necesitas
      rol: user.rol
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});








router.post('/cambiarpass', async (req, res) => {
  try {
    const { password } = req.body;
    const authHeader = req.headers.authorization;

    // Validar que el token está presente en los headers
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token no proporcionado o inválido" });
    }

    const token = authHeader.split(" ")[1];

    // Verificar si la contraseña fue enviada
    if (!password) {
      return res.status(400).json({ message: "La contraseña es requerida" });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const correo = decoded.correo;

    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Actualizar la contraseña del usuario en la base de datos
    const updatedUser = await User.findOneAndUpdate(
      { correo },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Contraseña cambiada exitosamente",
      success: true
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


module.exports = router;
