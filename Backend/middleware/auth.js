const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No hay token, autorización denegada" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "tu_secreto_jwt");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token no válido" });
  }
};
