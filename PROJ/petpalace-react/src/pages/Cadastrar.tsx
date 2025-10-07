import React, { useState } from "react";
import "../styles/Cadastrar.css";
import { Link, useNavigate } from "react-router-dom";

const Cadastrar: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipoResidencia, setTipoResidencia] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosUsuario = {
      nome,
      email,
      senha,
      telefone,
      endereco,
      tipoResidencia,
    };

    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosUsuario),
      });

      if (response.ok) {
        setMsg(" Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const erro = await response.text();
        setMsg(` Erro ao cadastrar: ${erro}`);
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setMsg(" Falha de conexão com o servidor.");
    }
  };

  return (
    <div className="cadastrar-page">
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
            <Link to="/login" className="btn">Entrar</Link>
          </nav>
        </div>
      </header>

      {/* Formulário de Cadastro */}
      <section className="form-section">
        <div className="form-container">
          {/* Parte esquerda */}
          <div className="form-left">
            <h2>Faça o seu cadastro</h2>
            <p>Preencha os dados ao lado para efetivar o seu cadastro</p>
            <div className="contact">
              <i className="fas fa-phone-alt"></i>
              <span>(11) 98765-4321</span>
            </div>
            <div className="contact">
              <i className="fas fa-envelope"></i>
              <span>reservas@petpalace.com</span>
            </div>
          </div>

          {/* Parte direita */}
          <div className="form-right">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Seu Nome</label>
              <input
                type="text"
                id="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />

              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              <label htmlFor="phone">Telefone</label>
              <input
                type="tel"
                id="phone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />

              <label htmlFor="address">Endereço</label>
              <input
                type="text"
                id="address"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
              />

              <label htmlFor="residenceType">Tipo de residência</label>
              <select
                id="residenceType"
                value={tipoResidencia}
                onChange={(e) => setTipoResidencia(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="CASA">Casa</option>
                <option value="APARTAMENTO">Apartamento</option>
                <option value="CONDOMINIO">Condomínio</option>
              </select>

              <button type="submit" className="submit-btn">
                Cadastrar
              </button>

              {msg && <p className="msg">{msg}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cadastrar;
