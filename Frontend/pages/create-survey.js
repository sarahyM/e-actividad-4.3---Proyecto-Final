export default function () {
  const token = localStorage.getItem("token");
  if (!token) {
    return `
      <div class="error-message">
        Por favor, inicia sesión para crear una encuesta.
      </div>
    `;
  }

  return `
    <div class="container">
      <div class="card animated fadeIn">
        <h2>Crear Nueva Encuesta</h2>
        <form id="surveyForm" class="form">
          <div class="form-group">
            <label for="title">Título de la Encuesta</label>
            <input type="text" id="title" required>
          </div>
          <div class="form-group">
            <label for="question">Agregar Pregunta</label>
            <div class="question-input-group">
              <input type="text" id="question">
              <button type="button" id="addQuestion" class="btn btn-secondary">Agregar</button>
            </div>
          </div>
          <div id="questionsList" class="questions-list"></div>
          <button type="submit" class="btn">Crear Encuesta</button>
        </form>
        <div id="surveyMessage"></div>
      </div>
    </div
  `;
}
