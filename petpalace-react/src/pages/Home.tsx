import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <i className="fas fa-paw"></i>
            <Link to="/" className="logo-text">
              Pet<span className="highlight">Palace</span>
            </Link>
          </div>

          {/* Links da navbar */}
          <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/servicos">Serviços</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/reservar">Reservar</Link>
            <Link to="/login" className="btn">Entrar</Link>
          </nav>

          {/* Menu hambúrguer */}
          <div className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1>Bem-vindo ao PetPalace</h1>
        <p>O melhor hotel de luxo para o seu pet</p>
        <Link to="/reservar" className="btn">Fazer Reserva</Link>
      </section>
    </div>
  );
};

export default Home;
