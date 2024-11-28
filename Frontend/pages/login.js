export default function Login() {
  return `
    <div class="container">
      <div class="card animated fadeIn">
        <h2>Iniciar Sesión</h2>
        <form id="loginForm" class="form">
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" required>
          </div>
          <button type="submit" class="btn">Iniciar Sesión</button>
        </form>
        <div id="loginMessage"></div>
      </div>
    </div>
  `;
}
