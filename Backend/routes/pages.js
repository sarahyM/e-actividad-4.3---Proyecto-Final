const express = require("express");
const router = express.Router();

// Ruta para la página de inicio
router.get("/", (req, res) => {
  res.json({
    title: "Bienvenido al Sistema de Encuestas",
    content: "Aquí puedes crear y gestionar tus encuestas.",
  });
});

// Ruta para la página de creación de encuestas
router.get("/create-survey", (req, res) => {
  res.json({
    title: "Crear Nueva Encuesta",
    content: "Utiliza este formulario para crear una nueva encuesta.",
  });
});

// Ruta para la página de mis encuestas
router.get("/my-surveys", (req, res) => {
  res.json({
    title: "Mis Encuestas",
    content: "Aquí puedes ver todas tus encuestas creadas.",
  });
});

module.exports = router;
