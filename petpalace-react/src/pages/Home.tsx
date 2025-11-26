import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>Bem-vindo ao PetPalace</h1>
          <p>O melhor hotel de luxo para o seu pet</p>

          <Link to="/reservar" className="btn">
            Fazer Reserva
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
