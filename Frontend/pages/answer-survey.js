export default function (surveyId) {
  return `
    <div class="container">
      <div class="card animated fadeIn">
        <h2 id="surveyTitle"></h2>
        <form id="answerSurveyForm" class="form">
          <div id="surveyQuestions"></div>
          <button type="submit" class="btn">Enviar Respuestas</button>
        </form>
        <div id="answerMessage"></div>
      </div>
    </div>
  `;
}
