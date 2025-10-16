import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import "../styles/CadastrarAnfitriao.css";

const CadastrarAnfitriao: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/anfitrioes/cadastrar", { nome, email, password });
      alert("Cadastro de anfitrião realizado com sucesso!");
      navigate("/login-anfitriao"); // redireciona para login do anfitrião
    } catch (error: any) {
      console.error("Erro ao cadastrar anfitrião:", error);
      const serverErrorMsg =
        error.response?.data?.error ||
        "Erro ao conectar ao servidor. Verifique os dados.";
      setMsg(serverErrorMsg);
    }
  };

  return (
    <div className="cadastrar-page">
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
              Cliente
            </Link>
          </nav>
        </div>
      </header>

      <section className="cadastrar-section">
        <div className="cadastrar-box">
          <h2 className="cadastrar-title">Cadastro de Anfitrião</h2>
          <p className="cadastrar-subtitle">
            Crie sua conta para começar a hospedar pets e gerenciar suas reservas.
          </p>

          <form onSubmit={handleSubmit} className="cadastrar-form">
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
              <Link to="/login-anfitriao" className="btn-voltar">
                Já tem uma conta? Entrar
              </Link>
            </div>

            {msg && <div className="cadastrar-msg">{msg}</div>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default CadastrarAnfitriao;
