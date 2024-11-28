const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const surveyRoutes = require("./routes/surveys");
const pageRoutes = require("./routes/pages");

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Conexión a la base de datos con manejo de errores
mongoose
  .connect("mongodb://127.0.0.1:27017/survey_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado exitosamente a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1); // Terminar la aplicación si no se puede conectar a la BD
  });

// Middleware para logging de solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api", pageRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Ruta catch-all para el frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
