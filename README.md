
🌟 ##Descripción general
El sistema de encuestas es una aplicación web moderna diseñada para:

✅ Crear encuestas personalizadas.

✅ Compartir encuestas con usuarios registrados y no registrados.

✅ Ofrecer una interfaz intuitiva y responsiva.

##Prototipo Frima 
![image](https://github.com/user-attachments/assets/1f73aaa7-4b68-4743-af86-8912c7fe55ce)

`https://www.figma.com/proto/vyWNnSbplPJKQStGGCUtIf/Untitled?node-id=2-2&node-type=canvas&t=mMvs6fYt1qEsS2yP-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1`

🎯 ##Objetivos del Sistema
1. Facilitar la creación y gestión de encuestas.
2. Proporcionar un flujo de datos seguro y eficiente.
3. Permitir la visualización de resultados con análisis en tiempo real.

🏗️ ##Arquitectura del Sistema
#El sistema utiliza una arquitectura de tres capas:

1. Frontend: HTML, CSS, JavaScript puro.
2. Backend: Node.js con Express.
3. Base de datos: MongoDB para almacenamiento persistente.
   
🔍 ##Componentes principales
1. Cliente: Interfaz de usuario.
2. Servidor Web: Lógica de negocio y manejo de solicitudes HTTP.
3. Middleware de Autenticación: Protección de rutas sensibles.
4. Controladores y Modelos: Gestión de datos y operaciones.

💻 ##Tecnologías utilizadas
1. Interfaz: HTML5, CSS3, JavaScript (ES6+).
2. Backend: Node.js con Express.
3. Base de datos: MongoDB con Mongoose.
4. Autenticación: JWT (JSON Web Tokens).

📁 ##Estructura del proyecto

![image](https://github.com/user-attachments/assets/193d18e4-9603-4b38-82b2-573a7a6a6356)


🛠️##Implementación del Sistema

1. 🛡️#Seguridad y Autenticación
- Registro e inicio de sesión con validación.
- Contraseñas hasheadas con bcrypt.
- Rutas protegidas con JWT.
2. 📊 #Funcionalidades Clave
- Creación y obtención de encuestas.
- Respuesta y almacenamiento de resultados.
- Visualización detallada de estadísticas.

 ##Despliegue y Mantenimiento
-  clona el proyecto `https://github.com/sarahyM/e-actividad-4.3---Proyecto-Final.git`
-  entras a la carpeta con cd 
  
⚙️ #Requisitos
- Node.js 
- MongoDB 
- Navegador moderno (Chrome, Firefox, Edge).
  
🛠️ #Pasos para Desplegar
- Clona el proyecto `https://github.com/sarahyM/e-actividad-4.3---Proyecto-Final.git`
- Entras a la carpeta con cd 
- Configurar variables de entorno: PORT, MONGODB_URI, JWT_SECRET.
- Instalar dependencias: npm install.
- Iniciar el servidor: node backend/server.js
  
![image](https://github.com/user-attachments/assets/322efc2d-4f94-4008-8b87-369ea5656b21)
