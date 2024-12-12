import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.scss';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Descubre Nuestra Colección de Relojes</h1>
        <p>Los mejores diseños y marcas al alcance de tu muñeca</p>
        <Link to="/productos" className="cta-button">
          Ver Catálogo
        </Link>
      </div>
      <div className="featured-products">
        <h2>Relojes Destacados</h2>
        {/* Aquí irían los relojes destacados */}
      </div>
    </div>
  );
};

export default Home;
