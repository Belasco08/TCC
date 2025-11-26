// src/pages/MeusAnuncios.tsx
import React, { useEffect, useState } from "react";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "../styles/MeusAnuncios.css";
import { Link } from "react-router-dom";

interface Unidade {
  id: number;
  nome: string;
  descricao?: string;
  cidade?: string;
  estado?: string;
  preco?: number;
  fotos?: string[];
}

const MeusAnuncios: React.FC = () => {
  const { user } = useAuth();
  const [anuncios, setAnuncios] = useState<Unidade[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.id;

  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await api.get(`/unidades/usuario/${userId}`);
        setAnuncios(resp.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetch();
  }, [userId]);

  const excluir = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este anúncio?")) return;

    try {
      await api.delete(`/unidades/${id}`);
      setAnuncios((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir o anúncio.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="meus-anuncios-page">
        <h1>Meus Anúncios</h1>

        {loading && <p>Carregando...</p>}
        {!loading && anuncios.length === 0 && (
          <p>Você ainda não cadastrou nenhum anúncio.</p>
        )}

        <div className="anuncios-list">
          {anuncios.map((a) => (
            <div key={a.id} className="anuncio-card">
              <img
                src={
                  a.fotos?.length
                    ? a.fotos[0]
                    : `https://placedog.net/600/400?id=${a.id}`
                }
                alt={a.nome}
              />

              <div className="info">
                <h3>{a.nome}</h3>
                <p>
                  {a.cidade} {a.estado && `- ${a.estado}`}
                </p>
                {a.preco && <p className="preco">R$ {a.preco}</p>}
              </div>

              <div className="acoes">
                <Link to={`/editar-anuncio/${a.id}`} className="btn editar">
                  Editar
                </Link>

                <button className="btn excluir" onClick={() => excluir(a.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MeusAnuncios;
