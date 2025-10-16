import React from "react";
import "../styles/Anunciar.css";
import { useNavigate } from "react-router-dom";

const Anunciar: React.FC = () => {
  const navigate = useNavigate();

  const opcoes = [
    { nome: "Acomodação", emoji: "🏠" },
    { nome: "Experiência", emoji: "🎈" },
    { nome: "Serviço", emoji: "🔔" },
  ];

  const handleEscolha = (tipo: string) => {
    navigate(`/login-anfitriao?tipo=${tipo}`);
  };

  return (
    <div className="anunciar-container">
      <div className="anunciar-card">
        <h2>O que você gostaria de anunciar?</h2>

        <div className="opcoes-container">
          {opcoes.map((item) => (
            <div
              key={item.nome}
              className="opcao"
              onClick={() => handleEscolha(item.nome)}
            >
              <div className="emoji">{item.emoji}</div>
              <p>{item.nome}</p>
            </div>
          ))}
        </div>

        <button className="voltar-btn" onClick={() => navigate("/")}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Anunciar;
