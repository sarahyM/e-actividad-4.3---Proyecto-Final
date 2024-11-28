export default function Home() {
  return `
    <div class="hero">
      <div class="container">
        <h1>Encuestas Online</h1>
        <p>Crea y comparte encuestas de forma fácil y rápida. Obtén resultados en tiempo real y toma mejores decisiones.</p>
        <button class="btn" onclick="loadPage('create-survey')">Crear Encuesta</button>
      </div>
    </div>
    <div class="container">
      <div class="card">
        <h2>¿Por qué usar nuestro sistema?</h2>
        <div class="features">
          <div class="feature">
            <h3>Fácil de usar</h3>
            <p>Interfaz intuitiva y amigable para crear encuestas en minutos.</p>
          </div>
          <div class="feature">
            <h3>Resultados en tiempo real</h3>
            <p>Visualiza las respuestas de tus encuestas al instante.</p>
          </div>
          <div class="feature">
            <h3>Compartir fácilmente</h3>
            <p>Comparte tus encuestas con un simple enlace.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
