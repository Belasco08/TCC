
import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import petsImage from "../assets/img/gatodeitado.webp";
import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

      const data = response.data;

      const user = {
        id: data.id ?? null,
        nome: data.nome ?? data.name ?? "Usuário",
        email: email,
        foto: null
      };

      login(user, data.token);

      setMsg("Login realizado com sucesso!");

      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (error: any) {
      console.error("Erro ao realizar login:", error);
      setMsg("E-mail ou senha inválidos.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="login-form-section">
        <div className="login-form-container">
          <div className="login-form-left">
            <img src={petsImage} className="login-form-image" />
          </div>

          <div className="login-form-right">
            <h2>Acesse sua conta</h2>

            <form onSubmit={handleSubmit}>
              <label>E-mail</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Senha</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="login-submit-btn">
                Entrar
              </button>

              <Link to="/cadastrar" className="login-btn-cadastrar">
                Criar Conta
              </Link>
            </form>

            {msg && <div className="login-msg">{msg}</div>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;