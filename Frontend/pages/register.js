export default function Register() {
  return `
    <div class="container">
      <div class="card animated fadeIn">
        <h2>Registro</h2>
        <form id="registerForm" class="form">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input type="text" id="name" required>
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" required>
          </div>
          <div class="form-group">
            <label for="dateOfBirth">Fecha de Nacimiento</label>
            <input type="date" id="dateOfBirth" required>
          </div>
          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input type="tel" id="phone" required>
          </div>
          <div class="form-group">
            <label for="image">Imagen de Perfil</label>
            <input type="file" id="image">
          </div>
          <button type="submit" class="btn">Registrarse</button>
        </form>
        <div id="registerMessage"></div>
      </div>
    </div>
  `;
}
