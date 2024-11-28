const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validaciones
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Todos los campos son requeridos",
      });
    }

    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        msg: "El usuario ya existe",
      });
    }

    // Crear nuevo usuario
    user = new User({ name, email, password });

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardar usuario
    await user.save();

    res.status(201).json({
      success: true,
      msg: "Usuario registrado con éxito",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      msg: "Error del servidor",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Todos los campos son requeridos",
      });
    }

    // Verificar usuario
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Credenciales inválidas",
      });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: "Credenciales inválidas",
      });
    }

    // Crear token
    const payload = {
      user: {
        id: user.id,
        name: user.name,
      },
    };

    jwt.sign(payload, "tu_secreto_jwt", { expiresIn: "24h" }, (err, token) => {
      if (err) throw err;
      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      msg: "Error del servidor",
    });
  }
});

module.exports = router;
