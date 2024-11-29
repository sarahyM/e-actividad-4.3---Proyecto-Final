const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Obtener el token del header
  const token = req.header("Authorization");

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay token, autorización denegada" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    // Añadir el usuario del payload decodificado a la request
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token no válido" });
  }
};
