// src/pages/HotelDetalhes.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../service/api";
import Navbar from "../components/Navbar";
import "../styles/HotelDetalhes.css";

interface Unidade {
  id: number;
  nome: string;
  descricao?: string;
  cidade?: string;
  estado?: string;
  preco?: number;
  fotos?: string[];
  telefone?: string;
  email?: string;
  enderecoTexto?: string;
}

const HotelDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [unidade, setUnidade] = useState<Unidade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await api.get(`/unidades/${id}`);
        setUnidade(resp.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!unidade) return <p>Hotel não encontrado.</p>;

  const whatsapp = unidade.telefone ? unidade.telefone.replace(/\D/g, "") : null;
  const message = encodeURIComponent(`Olá, vi seu anúncio no PetPalace e tenho interesse na hospedagem no ${unidade.nome}. Poderia informar disponibilidade e preço?`);

  return (
    <>
      <Navbar />
      <section className="hotel-detalhes">
        <div className="galeria">
          {unidade.fotos && unidade.fotos.length > 0 ? (
            unidade.fotos.map((f, idx) => <img key={idx} src={f} alt={`${unidade.nome} ${idx}`} />)
          ) : (
            <img src={`https://placedog.net/900/500?id=${unidade.id}`} alt={unidade.nome} />
          )}
        </div>

        <div className="detalhes">
          <h2>{unidade.nome}</h2>
          <p className="cidade">{unidade.cidade} {unidade.estado ? `- ${unidade.estado}` : ""}</p>
          <p className="descricao">{unidade.descricao}</p>
          {unidade.preco && <p className="preco">A partir de R$ {unidade.preco}</p>}

          <div className="anfitriao-card">
            <h4>Contato do anfitrião</h4>
            {unidade.telefone && <p>Telefone: {unidade.telefone}</p>}
            {whatsapp && (
              <a className="btn" href={`https://wa.me/${whatsapp}?text=${message}`} target="_blank" rel="noreferrer">
                Falar pelo WhatsApp
              </a>
            )}
            {unidade.email && <p>E-mail: {unidade.email}</p>}
          </div>

          <Link to="/hoteis" className="btn outline">Voltar à lista</Link>
        </div>
      </section>
    </>
  );
};

export default HotelDetalhes;
