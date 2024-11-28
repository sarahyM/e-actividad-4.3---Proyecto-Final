const express = require("express");
const Survey = require("../models/survey");
const auth = require("../middleware/auth");

const router = express.Router();

// Crear una nueva encuesta
router.post("/create-survey", auth, async (req, res) => {
  try {
    const { title, questions } = req.body;
    const newSurvey = new Survey({
      title,
      questions,
      creator: req.user.id,
    });
    await newSurvey.save();
    res.status(201).json(newSurvey);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Obtener todas las encuestas del usuario
router.get("/my-surveys", auth, async (req, res) => {
  try {
    const surveys = await Survey.find({ creator: req.user.id });
    res.json(surveys);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Error al obtener las encuestas del usuario" });
  }
});

// Obtener todas las encuestas
router.get("/all-surveys", async (req, res) => {
  console.log("Recibida solicitud para /all-surveys");
  try {
    const surveys = await Survey.find().populate("creator", "name");
    console.log("Encuestas encontradas:", surveys);
    res.json(surveys);
  } catch (error) {
    console.error("Error al obtener las encuestas:", error);
    res.status(500).json({ message: "Error al obtener las encuestas" });
  }
});

// Nueva ruta: Obtener una encuesta específica por ID
router.get("/:id", async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }
    res.json(survey);
  } catch (error) {
    console.error("Error al obtener la encuesta:", error);
    res.status(500).json({ message: "Error al obtener la encuesta" });
  }
});

// Nueva ruta: Responder a una encuesta
router.post("/:id/answer", async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }
    const { answers } = req.body;
    survey.responses.push({
      answers,
      respondent: req.user ? req.user.id : null,
    });
    await survey.save();
    res.status(201).json({ message: "Respuesta guardada exitosamente" });
  } catch (error) {
    console.error("Error al guardar la respuesta:", error);
    res.status(500).json({ message: "Error al guardar la respuesta" });
  }
});

// Nueva ruta: Obtener resultados de una encuesta específica
router.get("/:id/results", auth, async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id).populate('responses.respondent', 'name');
    
    if (!survey) {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    // Verificar si el usuario autenticado es el creador de la encuesta
    if (survey.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "No tienes permiso para ver estos resultados" });
    }

    res.json(survey);
  } catch (error) {
    console.error("Error al obtener los resultados de la encuesta:", error);
    res.status(500).json({ message: "Error al obtener los resultados de la encuesta" });
  }
});

module.exports = router;