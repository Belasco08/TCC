import React, { useState } from "react";
import "../styles/Cadastrar.css";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import petsImage from "../assets/img/gatocapaa.jpg";
import Navbar from "../components/Navbar"; // mesmo Navbar usado em CadastrarHotel

const Cadastrar: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    tipoUsuario: "cliente",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/usuarios/cadastrar", {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone,
      });
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      alert(
        "Erro ao conectar ao servidor. Verifique se o back-end está rodando."
      );
    }
  };

  return (
    <>
      {/* Navbar igual ao CadastrarHotel */}
      <Navbar />

      <section className="cadastrar-form-section">
        <div className="cadastrar-form-container">
          {/* Parte esquerda */}
          <div className="cadastrar-form-left">
            <img
              src={petsImage}
              alt="Pets felizes"
              className="cadastrar-form-image"
            />
            <div className="cadastrar-overlay-text">
              <h2>Faça o seu cadastro</h2>
              <p>Preencha os dados ao lado para efetivar o seu cadastro</p>
              <div className="cadastrar-contact">
                <i className="fas fa-phone-alt"></i>
                <span>(11) 98765-4321</span>
              </div>
              <div className="cadastrar-contact">
                <i className="fas fa-envelope"></i>
                <span>reservas@petpalace.com</span>
              </div>
            </div>
          </div>

          {/* Parte direita */}
          <div className="cadastrar-form-right">
            <h2 className="cadastrar-titulo-login">Cadastro de Usuário</h2>
            <p className="cadastrar-subtitulo-login">
              Crie sua conta e comece a gerenciar seus pets
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="nome">Seu Nome</label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />

              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
              />

              <label htmlFor="tipoUsuario">Tipo de Usuário</label>
              <select
                id="tipoUsuario"
                value={formData.tipoUsuario}
                onChange={handleChange}
              >
                <option value="cliente">Cliente</option>
                <option value="anfitriao">Anfitrião</option>
              </select>

              <button type="submit" className="cadastrar-submit-btn">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cadastrar;
