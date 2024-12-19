import React from 'react';
import '../styles/Footer.scss'; // Asegúrate de crear este archivo de estilos.

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección de Información */}
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Email: info@watchworld.com</p>
          <p>Teléfono: +123 456 7890</p>
        </div>

        {/* Sección de Navegación */}
        <div className="footer-section">
          <h4>Enlaces Útiles</h4>
          <ul>
            <li>
              <a href="/about">Sobre Nosotros</a>
            </li>
            <li>
              <a href="/privacy">Política de Privacidad</a>
            </li>
            <li>
              <a href="/terms">Términos y Condiciones</a>
            </li>
          </ul>
        </div>

        {/* Sección de Redes Sociales */}
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Derechos Reservados */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} WatchWorld. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
