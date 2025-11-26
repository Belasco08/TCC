// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ProfileButton from "./ProfileButton";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" className="logo-text">
            <span className="highlight">Pet</span>Palace
          </Link>
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} color="#fff" /> : <Menu size={26} color="#fff" />}
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/servicos" onClick={() => setMenuOpen(false)}>Serviços</Link>
          <Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>
          <Link to="/hoteis" onClick={() => setMenuOpen(false)}>Hotéis</Link>

          <Link to="/cadastrarhotel" className="btn" onClick={() => setMenuOpen(false)}>
            Cadastre seu hotel
          </Link>

          {!user && (
            <Link to="/login" className="btn" onClick={() => setMenuOpen(false)}>
              Entrar
            </Link>
          )}

          {user && (
            <div onClick={() => setMenuOpen(false)}>
              <ProfileButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
