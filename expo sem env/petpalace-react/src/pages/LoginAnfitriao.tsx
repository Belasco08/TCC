import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import "../styles/LoginAnfitriao.css";

const LoginAnfitriao: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/anfitrioes/login", { email, password });
      const data = response.data;
      localStorage.setItem("pp_token_anfitriao", data.token);
      alert("Login de anfitrião realizado com sucesso!");
      navigate("/"); // redireciona para a home
    } catch (error: any) {
      console.error("Erro ao realizar login:", error);
      const serverErrorMsg =
        error.response?.data?.error ||
        "Erro ao conectar ao servidor. Verifique o email/senha.";
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
              Cliente
            </Link>
          </nav>
        </div>
      </header>

      <section className="login-section">
        <div className="login-box">
          <h2 className="login-title">Login do Anfitrião</h2>
          <p className="login-subtitle">
            Acesse sua conta para gerenciar hospedagens e serviços.
          </p>

          <form onSubmit={handleSubmit} className="login-form">
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

            <button type="submit" className="submit-btn">
              Entrar
            </button>

            <div className="link-container">
              <Link to="/cadastrar-anfitriao" className="btn-cadastrar">
                Criar Conta
              </Link>
            </div>

            {msg && <div className="login-msg">{msg}</div>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginAnfitriao;
