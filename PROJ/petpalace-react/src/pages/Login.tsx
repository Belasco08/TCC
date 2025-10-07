import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Salva token no localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.name);

        alert("Login realizado com sucesso!");
        navigate("/");
      } else {
        setErro("E-mail ou senha incorretos.");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="login-page">
      {/* Navbar */}
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

      {/* Login Section */}
      <section className="form-section">
        <div className="form-container">
          {/* Parte esquerda */}
          <div className="form-left">
            <h2>Bem-vindo de volta!</h2>
            <p>Faça login para continuar e gerenciar suas reservas.</p>
            <div className="contact">
              <i className="fas fa-phone-alt"></i>
              <span>(11) 98765-4321</span>
            </div>
            <div className="contact">
              <i className="fas fa-envelope"></i>
              <span>contato@petpalace.com</span>
            </div>
          </div>

          {/* Parte direita */}
          <div className="form-right">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {erro && <p className="erro-login">{erro}</p>}

              <button type="submit" className="submit-btn">
                Entrar
              </button>

              <button type="button" className="btn-google">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                  alt="Google"
                />
                Entrar com Google
              </button>

              <div className="outros-logins">
                <button type="button" className="btn-facebook">
                  Entrar com Facebook
                </button>
                <button type="button" className="btn-github">
                  Entrar com GitHub
                </button>
              </div>

              <p>
                Não tem uma conta?{" "}
                <Link to="/cadastrar" className="btn-cadastrar">
                  Criar Conta
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
