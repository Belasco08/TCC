import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import "../styles/Cadastrar.css";
import petsImage from "../assets/img/fundograd.jpg"; // imagem do cachorro azul

const Cadastrar: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/usuarios/cadastrar", { nome, email, password });
      alert("Cadastro realizado com sucesso!");
      navigate("/login"); // volta para login
    } catch (error: any) {
      const serverErrorMsg =
        error.response?.data?.error || "Erro ao conectar ao servidor. Verifique os dados.";
      setMsg(serverErrorMsg);
    }
  };

  return (
    <div className="login-page">
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <i className="fas fa-paw"></i>
            <Link to="/" className="logo-text">
              Pet<span className="highlight">Palace</span>
            </Link>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/servicos">Serviços</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/reservar">Reservar</Link>
            <Link to="/login" className="btn">
              Entrar
            </Link>
          </nav>
        </div>
      </header>

      <section className="form-section">
        <div className="form-container">
          <div className="form-left">
            <img src={petsImage} alt="Cachorro azul" className="form-image" />
            <div className="overlay-text">
              <h2>Bem-vindo ao PetPalace!</h2>
              <p>O melhor lugar para o conforto e cuidado do seu pet</p>
            </div>
          </div>

          <div className="form-right">
            <h2 className="titulo-login">Crie sua conta</h2>
            <p className="subtitulo-login">
              Gerencie suas reservas e acompanhe seus pets com facilidade
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="nome">Nome completo</label>
              <input
                type="text"
                id="nome"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />

              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="submit-btn">Cadastrar</button>

              <div className="link-container">
                <Link to="/login" className="btn-cadastrar">
                  Já tem uma conta? Entrar
                </Link>
              </div>

              {msg && <div className="login-msg">{msg}</div>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cadastrar;
