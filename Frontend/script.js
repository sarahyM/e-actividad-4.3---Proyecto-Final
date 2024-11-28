// Definir loadPage fuera del evento DOMContentLoaded
async function loadPage(page, params = {}) {
  const content = document.getElementById("content");
  content.innerHTML = '<div class="loader"></div>';

  try {
    const module = await import(`./pages/${page}.js`);
    content.innerHTML = module.default(params);

    if (page === "my-surveys") {
      loadMySurveys();
    } else if (page === "all-surveys") {
      loadAllSurveys();
    } else if (page === "answer-survey") {
      loadSurveyToAnswer(params.surveyId);
    }

    initializePageEvents(page);
  } catch (error) {
    console.error("Error loading page:", error);
    content.innerHTML = "<p>Error al cargar la página.</p>";
  }
}

// Función para mostrar mensajes
function showMessage(elementId, message, isError = false) {
  const messageElement = document.getElementById(elementId);
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = isError ? "error-message" : "success-message";
    messageElement.style.display = "block";
  }
}

// Función para actualizar la navegación
function updateNavigation(userName = null) {
  const loginLink = document.getElementById("login");
  const registerLink = document.getElementById("register");
  const createSurveyLink = document.getElementById("create-survey");
  const mySurveysLink = document.getElementById("my-surveys");
  const userNameDisplay = document.getElementById("userName");
  const logoutLink = document.getElementById("logout");

  if (localStorage.getItem("token")) {
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    createSurveyLink.style.display = "inline";
    mySurveysLink.style.display = "inline";
    logoutLink.style.display = "inline";
    if (userNameDisplay && userName) {
      userNameDisplay.textContent = `Bienvenido, ${userName}`;
      userNameDisplay.style.display = "inline";
    }
  } else {
    loginLink.style.display = "inline";
    registerLink.style.display = "inline";
    createSurveyLink.style.display = "none";
    mySurveysLink.style.display = "none";
    logoutLink.style.display = "none";
    if (userNameDisplay) {
      userNameDisplay.style.display = "none";
    }
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  updateNavigation();
  loadPage("home");
}

// Manejador de formularios
async function handleForms(e) {
  if (e.target.matches("#loginForm")) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        showMessage("loginMessage", "Inicio de sesión exitoso");
        updateNavigation(data.user.name);
        setTimeout(() => loadPage("home"), 1000);
      } else {
        showMessage(
          "loginMessage",
          data.msg || "Error al iniciar sesión",
          true
        );
      }
    } catch (error) {
      showMessage("loginMessage", "Error de conexión", true);
    }
  }

  if (e.target.matches("#registerForm")) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("registerMessage", "Registro exitoso");
        setTimeout(() => loadPage("login"), 1000);
      } else {
        showMessage(
          "registerMessage",
          data.msg || "Error en el registro",
          true
        );
      }
    } catch (error) {
      showMessage("registerMessage", "Error de conexión", true);
    }
  }

  if (e.target.matches("#surveyForm")) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const questions = Array.from(
      document.querySelectorAll(".question-item")
    ).map((item) => item.textContent.replace("Eliminar", "").trim());

    if (!questions.length) {
      showMessage("surveyMessage", "Agrega al menos una pregunta", true);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/surveys/create-survey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title, questions }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showMessage("surveyMessage", "Encuesta creada exitosamente");
        setTimeout(() => loadPage("my-surveys"), 1000);
      } else {
        showMessage(
          "surveyMessage",
          data.msg || "Error al crear la encuesta",
          true
        );
      }
    } catch (error) {
      showMessage("surveyMessage", "Error de conexión", true);
    }
  }

  if (e.target.matches("#answerSurveyForm")) {
    e.preventDefault();
    const surveyId = e.target.dataset.surveyId;
    const answers = Array.from(e.target.elements)
      .filter((el) => el.tagName === "INPUT" && el.type === "text")
      .map((el) => el.value);
    await submitSurveyAnswer(surveyId, answers);
  }
}

// Cargar y mostrar las encuestas del usuario
async function loadMySurveys() {
  const surveysListElement = document.getElementById("surveysList");
  if (!surveysListElement) return;

  try {
    const response = await fetch(
      "http://localhost:3000/api/surveys/my-surveys",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      const surveys = await response.json();
      if (surveys.length === 0) {
        surveysListElement.innerHTML = "<p>No tienes encuestas creadas</p>";
        return;
      }

      const surveysHTML = surveys
        .map(
          (survey) => `
        <div class="survey-item animated fadeIn">
          <h3>${survey.title}</h3>
          <p>Fecha: ${new Date(survey.date).toLocaleDateString()}</p>
          <p>Respuestas: ${survey.responses ? survey.responses.length : 0}</p>
          <div class="questions-list">
            ${survey.questions.map((q) => `<p>- ${q}</p>`).join("")}
          </div>
          <button class="view-results btn" data-id="${
            survey._id
          }">Ver Resultados</button>
        </div>
      `
        )
        .join("");

      surveysListElement.innerHTML = surveysHTML;
    } else {
      surveysListElement.innerHTML = "<p>Error al cargar las encuestas</p>";
    }
  } catch (error) {
    surveysListElement.innerHTML = "<p>Error de conexión</p>";
  }
}

async function loadSurveyResults(surveyId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/surveys/${surveyId}/results`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const survey = await response.json();

    let resultsHTML = `
      <h2>${survey.title}</h2>
      <p>Total de respuestas: ${survey.responses.length}</p>
    `;

    survey.questions.forEach((question, qIndex) => {
      resultsHTML += `
        <div class="question-result">
          <h3>Pregunta ${qIndex + 1}: ${question}</h3>
          <ul>
      `;

      survey.responses.forEach((response, rIndex) => {
        resultsHTML += `
          <li>
            Respuesta ${rIndex + 1}: ${response.answers[qIndex]}
            ${
              response.respondent
                ? `(${response.respondent.name})`
                : "(Anónimo)"
            }
          </li>
        `;
      });

      resultsHTML += `
          </ul>
        </div>
      `;
    });

    document.getElementById("content").innerHTML = resultsHTML;
  } catch (error) {
    console.error("Error loading survey results:", error);
    showMessage(
      "content",
      `Error al cargar los resultados: ${error.message}`,
      true
    );
  }
}

async function loadAllSurveys() {
  const surveysListElement = document.getElementById("allSurveysList");
  if (!surveysListElement) return;

  try {
    const response = await fetch(
      "http://localhost:3000/api/surveys/all-surveys"
    );

    if (response.ok) {
      const surveys = await response.json();
      if (surveys.length === 0) {
        surveysListElement.innerHTML = "<p>No hay encuestas disponibles</p>";
        return;
      }

      const surveysHTML = surveys
        .map(
          (survey) => `
        <div class="survey-item animated fadeIn">
          <h3>${survey.title}</h3>
          <p>Creado por: ${survey.creator.name}</p>
          <p>Fecha: ${new Date(survey.date).toLocaleDateString()}</p>
          <button class="answer-survey btn" data-id="${
            survey._id
          }">Responder</button>
        </div>
      `
        )
        .join("");

      surveysListElement.innerHTML = surveysHTML;
    } else {
      surveysListElement.innerHTML = "<p>Error al cargar las encuestas</p>";
    }
  } catch (error) {
    surveysListElement.innerHTML = "<p>Error de conexión</p>";
    console.error("Error loading all surveys:", error);
  }
}

// Actualiza la función loadSurveyToAnswer
async function loadSurveyToAnswer(surveyId) {
  try {
    const response = await fetch(`http://localhost:3000/api/surveys/${surveyId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const survey = await response.json();
    document.getElementById("surveyTitle").textContent = survey.title;
    const questionsHTML = survey.questions
      .map(
        (question, index) => `
      <div class="question">
        <label for="question${index}">${question}</label>
        <input type="text" id="question${index}" name="question${index}" required>
      </div>
    `
      )
      .join("");
    document.getElementById("surveyQuestions").innerHTML = questionsHTML;
    document.getElementById("answerSurveyForm").dataset.surveyId = surveyId;
  } catch (error) {
    console.error("Error loading survey to answer:", error);
    showMessage("answerMessage", `Error al cargar la encuesta: ${error.message}`, true);
  }
}
async function submitSurveyAnswer(surveyId, answers) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/surveys/${surveyId}/answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
            ? `Bearer ${localStorage.getItem("token")}`
            : "",
        },
        body: JSON.stringify({ answers }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    showMessage("answerMessage", result.message);
    setTimeout(() => loadPage("all-surveys"), 2000);
  } catch (error) {
    console.error("Error submitting survey answer:", error);
    showMessage(
      "answerMessage",
      `Error al enviar las respuestas: ${error.message}`,
      true
    );
  }
}

function initializePageEvents(page) {
  if (page === "create-survey") {
    const addQuestionBtn = document.getElementById("addQuestion");
    const questionsList = document.getElementById("questionsList");

    if (addQuestionBtn) {
      addQuestionBtn.addEventListener("click", () => {
        const question = document.getElementById("question").value;
        if (question.trim()) {
          const questionItem = document.createElement("div");
          questionItem.className = "question-item animated fadeIn";
          questionItem.innerHTML = `
            ${question}
            <button type="button" class="delete-question">Eliminar</button>
          `;
          questionsList.appendChild(questionItem);
          document.getElementById("question").value = "";
        }
      });
    }

    if (questionsList) {
      questionsList.addEventListener("click", (e) => {
        if (e.target.matches(".delete-question")) {
          e.target.parentElement.remove();
        }
      });
    }
  }

  if (page === "all-surveys") {
    const searchInput = document.getElementById("searchAllSurveys");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const surveyItems = document.querySelectorAll(".survey-item");

        surveyItems.forEach((item) => {
          const title = item.querySelector("h3").textContent.toLowerCase();
          item.style.display = title.includes(searchTerm) ? "block" : "none";
        });
      });
    }

    document.addEventListener("click", (e) => {
      if (e.target.matches(".answer-survey")) {
        const surveyId = e.target.dataset.id;
        loadPage("answer-survey", { surveyId });
      }
    });
  }

  if (page === "my-surveys") {
    const searchInput = document.getElementById("searchSurvey");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const surveyItems = document.querySelectorAll(".survey-item");

        surveyItems.forEach((item) => {
          const title = item.querySelector("h3").textContent.toLowerCase();
          item.style.display = title.includes(searchTerm) ? "block" : "none";
        });
      });
    }

    document.addEventListener("click", (e) => {
      if (e.target.matches(".view-results")) {
        const surveyId = e.target.dataset.id;
        loadSurveyResults(surveyId);
      }
    });
}
}

document.addEventListener("DOMContentLoaded", () => {
  // Event listener para la navegación
  document.querySelector("nav").addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName === "A") {
      const page = e.target.id;
      loadPage(page);
    }
  });

  // Event listener para formularios
  document.addEventListener("submit", handleForms);

  // Event listener para cerrar sesión
  document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });

  // Inicialización
  updateNavigation(localStorage.getItem("userName"));
  loadPage("home");
});
