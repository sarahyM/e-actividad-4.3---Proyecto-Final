
🌟 ##Descripción general
El sistema de encuestas es una aplicación web moderna diseñada para:

✅ Crear encuestas personalizadas.
✅ Compartir encuestas con usuarios registrados y no registrados.
✅ Analizar resultados en tiempo real.
✅ Ofrecer una interfaz intuitiva y responsiva.

🎯 ##Objetivos del Sistema
Facilitar la creación y gestión de encuestas.
Proporcionar un flujo de datos seguro y eficiente.
Permitir la visualización de resultados con análisis en tiempo real.

🏗️ ##Arquitectura del Sistema
El sistema utiliza una arquitectura de tres capas:

Frontend: HTML, CSS, JavaScript puro.
Backend: Node.js con Express.
Base de datos: MongoDB para almacenamiento persistente.
🔍 Componentes principales
Cliente: Interfaz de usuario.
Servidor Web: Lógica de negocio y manejo de solicitudes HTTP.
Middleware de Autenticación: Protección de rutas sensibles.
Controladores y Modelos: Gestión de datos y operaciones.

💻 ##Tecnologías utilizadas
Interfaz: HTML5, CSS3, JavaScript (ES6+).
Backend: Node.js con Express.
Base de datos: MongoDB con Mongoose.
Autenticación: JWT (JSON Web Tokens).

📁 ##Estructura del proyecto
proyecto/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── pages/
│       ├── home.js
│       ├── create-survey.js
│       └── ...
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── middleware/
└── README.md

🛠️##Implementación del Sistema

🛡️#Seguridad y Autenticación
Registro e inicio de sesión con validación.
Contraseñas hasheadas con bcrypt.
Rutas protegidas con JWT.
📊 #Funcionalidades Clave
Creación y obtención de encuestas.
Respuesta y almacenamiento de resultados.
Visualización detallada de estadísticas.

 ##Despliegue y Mantenimiento
⚙️ #Requisitos
Node.js versión 14+
MongoDB versión 4+
Navegador moderno (Chrome, Firefox, Edge).
🛠️ #Pasos para Desplegar
Configurar variables de entorno: PORT, MONGODB_URI, JWT_SECRET.
Instalar dependencias: npm install.
Construir el frontend: npm run build.
Iniciar el servidor: npm start.
