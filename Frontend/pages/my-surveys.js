export default function () {
  const token = localStorage.getItem("token");
  if (!token) {
    return `
      <div class="error-message">
        Por favor, inicia sesión para ver tus encuestas.
      </div>
    `;
  }

  return `
     <div class="container">
      <div class="card animated fadeIn">
        <h2>Mis Encuestas</h2>
        <input type="text" id="searchSurvey" class="search-input" placeholder="Buscar encuestas...">
        <div id="surveysList" class="surveys-list"></div>
      </div>
    </div>
  `;
}
