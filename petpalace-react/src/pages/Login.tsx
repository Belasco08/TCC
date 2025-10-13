import React, { useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import api from "../service/api";
import petsImage from "../assets/img/gatodeitado.webp"; // sua imagem local

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/usuarios/login", { email, password });
      const data = response.data;
      localStorage.setItem("pp_token", data.token);
      setMsg("Login bem-sucedido!");
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
            <Link to="/login" className="btn">Entrar</Link>
          </nav>
        </div>
      </header>

      <section className="form-section">
        <div className="form-container">
          <div className="form-left">
            <img src={petsImage} alt="Pets felizes" className="form-image" />
            <div className="overlay-text">
              <h2>Bem-vindo de volta ao PetPalace!</h2>
              <p>O melhor lugar para o conforto e cuidado do seu pet </p>
              <div className="contact">
                <i className="fas fa-phone-alt"></i>
                <span>(11) 98765-4321</span>
              </div>
              <div className="contact">
                <i className="fas fa-envelope"></i>
                <span>contato@petpalace.com</span>
              </div>
            </div>
          </div>

          <div className="form-right">
            <h2 className="titulo-login">Acesse sua conta</h2>
            <p className="subtitulo-login">
              Gerencie suas reservas e acompanhe seus pets com facilidade 
            </p>

            <form onSubmit={handleSubmit}>
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

              <button type="submit" className="submit-btn">Entrar</button>

              <div className="link-container">
                <Link to="/cadastrar" className="btn-cadastrar">Criar Conta</Link>
              </div>
            </form>

            {msg && <div className="login-msg">{msg}</div>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
