// src/pages/Hoteis.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../service/api";
import Navbar from "../components/Navbar";
import "../styles/Hoteis.css";

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

const Hoteis: React.FC = () => {
  const [hoteis, setHoteis] = useState<Unidade[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      // Tentar pegar localização do usuário
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            try {
              const lat = pos.coords.latitude;
              const lng = pos.coords.longitude;

              const resp = await api.get("/unidades/proximos", {
                params: { lat, lng, radiusKm: 50 },
              });

              setHoteis(resp.data);
            } catch (err) {
              console.error("Erro ao buscar unidades próximas:", err);

              const resp = await api.get("/unidades");
              setHoteis(resp.data);
            } finally {
              setLoading(false);
            }
          },

          // Caso o usuário negue permissão
          async () => {
            const resp = await api.get("/unidades");
            setHoteis(resp.data);
            setLoading(false);
          },

          { timeout: 5000 }
        );
      } else {
        const resp = await api.get("/unidades");
        setHoteis(resp.data);
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const filtered = hoteis.filter((h) => {
    const s = search.toLowerCase();
    return (
      h.nome?.toLowerCase().includes(s) ||
      (h.cidade || "").toLowerCase().includes(s)
    );
  });

  return (
    <>
      <Navbar />

      <section className="hoteis-page">
        <div className="search-bar">
          <input
            placeholder="Pesquisar por cidade ou hotel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="hoteis-list">
          {loading && <p>Carregando hotéis...</p>}

          {!loading && filtered.length === 0 && (
            <p>Nenhum hotel encontrado.</p>
          )}

          {filtered.map((h) => (
            <div className="hotel-card" key={h.id}>
              <img
                src={
                  h.fotos && h.fotos.length > 0
                    ? h.fotos[0]
                    : `https://placedog.net/600/400?id=${h.id}`
                }
                alt={h.nome}
              />

              <div className="hotel-card-body">
                <h3>{h.nome}</h3>

                <p className="cidade">
                  {h.cidade} {h.estado ? `- ${h.estado}` : ""}
                </p>

                {h.preco && (
                  <p className="preco">A partir de R$ {h.preco}</p>
                )}

                <div className="acoes">
                  <Link to={`/hotel/${h.id}`} className="btn">
                    Ver detalhes
                  </Link>

                  {h.telefone && (
                    <a
                      className="btn outline"
                      href={`tel:${h.telefone.replace(/\D/g, "")}`}
                    >
                      Ligar
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hoteis;
