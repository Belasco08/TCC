import React, { useEffect, useRef, useState } from "react";
import "../styles/Reservar.css";
import Navbar from "../components/Navbar";

interface Hotel {
  id?: number;
  nome: string;
  coords: [number, number];
  cidade: string;
  img?: string;
  preco?: number;
  aceita_caes?: boolean;
  aceita_gatos?: boolean;
}

const unidadesFicticias: Hotel[] = [
  {
    id: 9991,
    nome: "Pet Hotel Fictício Bauru",
    cidade: "Bauru",
    preco: 120,
    aceita_caes: true,
    aceita_gatos: true,
    img: "https://placedog.net/600/400?id=100",
    coords: [-22.30, -49.05],
  },
  {
    id: 9992,
    nome: "Dog House Fictícia",
    cidade: "São Paulo",
    preco: 140,
    aceita_caes: true,
    aceita_gatos: false,
    img: "https://placedog.net/600/400?id=101",
    coords: [-23.55, -46.63],
  },
];

const Reservar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [hoteis, setHoteis] = useState<Hotel[]>([]);
  const [hotelSelecionado, setHotelSelecionado] = useState<Hotel | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [pagando, setPagando] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState<"pix" | "cartao" | null>(null);

  const mapaRef = useRef<HTMLDivElement | null>(null);
  const mapaInstancia = useRef<any>(null);
  const marcadoresLayer = useRef<any>(null);

  // Carrega Leaflet dinamicamente
  const loadLeaflet = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if ((window as any).L) return resolve((window as any).L);

      const cssId = "leaflet-css";
      if (!document.getElementById(cssId)) {
        const leafletCSS = document.createElement("link");
        leafletCSS.id = cssId;
        leafletCSS.rel = "stylesheet";
        leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(leafletCSS);
      }

      const scriptId = "leaflet-script";
      if (document.getElementById(scriptId)) {
        const waitForL = setInterval(() => {
          if ((window as any).L) {
            clearInterval(waitForL);
            resolve((window as any).L);
          }
        }, 50);
        return;
      }

      const leafletScript = document.createElement("script");
      leafletScript.id = scriptId;
      leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      leafletScript.onload = () => resolve((window as any).L);
      leafletScript.onerror = () => reject("Erro ao carregar Leaflet");
      document.body.appendChild(leafletScript);
    });
  };

  // Carregar hotéis do backend
  const carregarHoteis = async () => {
    try {
      const resp = await fetch("http://localhost:8080/unidades");
      const data = await resp.json();

      const formatados: Hotel[] = (data || []).map((item: any, i: number) => ({
        id: item.id,
        nome: item.nome,
        cidade: item.cidade || "Cidade não informada",
        preco: item.preco,
        aceita_caes: item.aceita_caes,
        aceita_gatos: item.aceita_gatos,
        img:
          item.fotos && item.fotos.length > 0
            ? `http://localhost:8080/unidades/fotos/${item.fotos[0].id}`
            : `https://placedog.net/600/400?id=${i + 500}`,
        coords: item.mapa
          ? [item.mapa.latitude, item.mapa.longitude]
          : [-23.5 + i * 0.05, -46.6 + i * 0.05],
      }));

      setHoteis([...unidadesFicticias, ...formatados]);
    } catch (e) {
      console.error("Erro ao buscar unidades:", e);
      setHoteis(unidadesFicticias);
    }
  };

  // Inicializar mapa
  useEffect(() => {
    let alive = true;

    (async () => {
      const L = await loadLeaflet();
      if (!alive) return;

      if (mapaRef.current && !mapaInstancia.current) {
        const mapa = L.map(mapaRef.current).setView([-14.2, -51.9], 4);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapa);

        mapaInstancia.current = mapa;
        marcadoresLayer.current = L.layerGroup().addTo(mapa);
      }

      await carregarHoteis();
    })();

    return () => {
      alive = false;
      if (mapaInstancia.current) mapaInstancia.current.remove();
    };
  }, []);

  // Atualizar marcadores
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapaInstancia.current) return;

    marcadoresLayer.current.clearLayers();

    hoteis.forEach((h) => {
      const marker = L.marker(h.coords);
      marker.on("click", () => setHotelSelecionado(h));
      marker.bindPopup(`<b>${h.nome}</b><br>${h.cidade}`);
      marcadoresLayer.current.addLayer(marker);
    });
  }, [hoteis]);

  // FUNÇÃO MOCK PIX
  const iniciarPagamentoPIX = async () => {
    setPagando(true);
    setTimeout(() => {
      alert("PIX gerado! (mock)");
      setPagando(false);
    }, 1200);
  };

  // FUNÇÃO MOCK CARTÃO
  const iniciarPagamentoCartao = async () => {
    setPagando(true);
    setTimeout(() => {
      alert("Cartão aprovado! (mock)");
      setPagando(false);
    }, 1500);
  };

  return (
    <div className="reservar-page">
      <Navbar />

      <section className="reserva-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar por cidade ou hotel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="reserva-flex-airbnb">
          
          {/* LISTA */}
          <div className="hotel-list-airbnb">
            {hoteis
              .filter(
                (h) =>
                  h.nome.toLowerCase().includes(search.toLowerCase()) ||
                  h.cidade.toLowerCase().includes(search.toLowerCase())
              )
              .map((hotel) => (
                <div
                  key={hotel.id}
                  className="hotel-card-airbnb"
                  onClick={() => setHotelSelecionado(hotel)}
                >
                  <img src={hotel.img} alt={hotel.nome} />
                  <h4>{hotel.nome}</h4>
                  <p>{hotel.cidade}</p>
                  <p>A partir de R$ {hotel.preco}</p>
                </div>
              ))}
          </div>

          {/* MAPA + FORM */}
          <div className="map-form-container">
            <div id="mapa" ref={mapaRef} style={{ width: "100%", height: "420px" }} />

            <div className="form-container-airbnb">
              {!hotelSelecionado && <p>Selecione um hotel no mapa ou lista</p>}

              {hotelSelecionado && (
                <>
                  <h3>Reservar no {hotelSelecionado.nome}</h3>

                  <label>Nome do Tutor</label>
                  <input type="text" required />

                  <label>Nome do Pet</label>
                  <input type="text" required />

                  <label>Check-in</label>
                  <input type="date" required />

                  <label>Check-out</label>
                  <input type="date" required />

                  {/* FORMA DE PAGAMENTO */}
                  <h3>Forma de pagamento</h3>
                  <label>
                    <input type="radio" name="pay" onChange={() => setMetodoPagamento("pix")} />
                    PIX
                  </label>
                  <label>
                    <input type="radio" name="pay" onChange={() => setMetodoPagamento("cartao")} />
                    Cartão de crédito
                  </label>

                  {/* PIX */}
                  {metodoPagamento === "pix" && (
                    <button
                      className="submit-btn"
                      onClick={iniciarPagamentoPIX}
                      disabled={pagando}
                    >
                      {pagando ? "Gerando QR..." : "Pagar com PIX"}
                    </button>
                  )}

                  {/* CARTÃO */}
                  {metodoPagamento === "cartao" && (
                    <div className="cartao-container">
                      <label>Número do Cartão</label>
                      <input placeholder="1234 5678 9012 3456" />

                      <label>Validade</label>
                      <input placeholder="MM/AA" />

                      <label>CVV</label>
                      <input placeholder="123" />

                      <label>Parcelas</label>
                      <select>
                        <option>1x sem juros</option>
                        <option>2x sem juros</option>
                        <option>3x sem juros</option>
                        <option>4x</option>
                        <option>5x</option>
                      </select>

                      <button
                        className="submit-btn"
                        style={{ background: "#007aff" }}
                        onClick={iniciarPagamentoCartao}
                        disabled={pagando}
                      >
                        {pagando ? "Processando..." : "Pagar com Cartão"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservar;
