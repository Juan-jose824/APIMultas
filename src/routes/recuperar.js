const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken"); // Para generar el token
const User = require("../models/User"); // Suponiendo que tienes un modelo de User
const express = require("express");
const router = express.Router();

// Configurar el transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Puede ser otro servicio como SendGrid, etc.
  auth: {
    user: "condominiorivera2@gmail.com",  // Tu correo
    pass: "ofyf vxdw sqqr wcqm"         // Tu contraseña o contraseñas de aplicación
  }
});

// Ruta para recuperar la contraseña
router.post("/", async (req, res) => {
  const { correo } = req.body;
  console.log("Correo recibido:", correo);


  try {
    // Verificar si el correo existe en la base de datos
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(404).json({ success: false, message: "Correo no encontrado" });
    }

    // Generar un token de recuperación de contraseña (expira en 1 hora)
    const token = jwt.sign({ correo: user.correo }, "secreta_clave", { expiresIn: "1h" });

    // Crear el enlace con el token
    const resetLink = `http://localhost:3000/recuperar/${token}`; // Cambia localhost por tu dominio

    // Configurar el correo
    const mailOptions = {
      from: "condominiorivera2@gmail.com",  // Remitente
      to: user.correo ,              // Destinatario
      subject: "Recuperación de Contraseña",
      html: `
        <h2>Recuperación de Contraseña</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">Restablecer Contraseña</a>
      `
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    // Responder que el correo fue enviado correctamente
    res.json({ success: true, message: "Correo de recuperación enviado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al enviar el correo" });
  }
});

module.exports = router;
