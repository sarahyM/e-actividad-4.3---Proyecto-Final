export default function () {
  return `
    <div class="container">
      <div class="card animated fadeIn">
        <h2>Todas las Encuestas</h2>
        <input type="text" id="searchAllSurveys" class="search-input" placeholder="Buscar encuestas...">
        <div id="allSurveysList" class="surveys-list"></div>
      </div>
    </div>
  `;
}
