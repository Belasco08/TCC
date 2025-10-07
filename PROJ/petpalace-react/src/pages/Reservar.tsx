import React, { useEffect, useRef, useState, FormEvent } from "react";
import "../styles/Reservar.css";
import { Link } from "react-router-dom";

interface Hotel {
  nome: string;
  coords: [number, number];
  cidade: string;
  img: string;
}

const Reservar: React.FC = () => {
  const [showOtherPetType, setShowOtherPetType] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [hoteis, setHoteis] = useState<Hotel[]>([]);
  const [hotelSelecionado, setHotelSelecionado] = useState<Hotel | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const otherPetTypeInputRef = useRef<HTMLInputElement>(null);
  const mapaRef = useRef<HTMLDivElement>(null);
  const mapaInstancia = useRef<any>(null);

  useEffect(() => {
    // injeta CSS do Leaflet
    const leafletCSS = document.createElement("link");
    leafletCSS.rel = "stylesheet";
    leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(leafletCSS);

    // injeta script do Leaflet
    const leafletScript = document.createElement("script");
    leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    leafletScript.async = true;
    leafletScript.onload = () => {
      // gera nomes e hotéis fictícios
      const gerarNomesFicticios = (quantidade: number): string[] => {
        const nomes: string[] = [];
        const prefixos = ["Hotel", "Refúgio", "Cantinho", "Estalagem", "Palácio", "Mansão", "Recanto"];
        const meios = ["Patinhas", "Bigodes", "Peludos", "Focinhos", "Miados", "Pets", "Amiguinhos"];
        const sufixos = ["Felizes", "Dourados", "Reais", "Amados", "Alegres", "Aconchegantes"];
        for (let i = 0; i < quantidade; i++) {
          const nome = `${prefixos[Math.floor(Math.random() * prefixos.length)]} ${
            meios[Math.floor(Math.random() * meios.length)]
          } ${sufixos[Math.floor(Math.random() * sufixos.length)]}`;
          nomes.push(`${nome} #${i + 1}`);
        }
        return nomes;
      };

      const nomesHoteis = gerarNomesFicticios(100);

      const cidades = [
        { nome: "São Paulo", lat: -23.55, lon: -46.63 },
        { nome: "Rio de Janeiro", lat: -22.91, lon: -43.17 },
        { nome: "Brasília", lat: -15.79, lon: -47.88 },
        { nome: "Belo Horizonte", lat: -19.92, lon: -43.94 },
        { nome: "Porto Alegre", lat: -30.03, lon: -51.23 },
        { nome: "Curitiba", lat: -25.42, lon: -49.27 },
        { nome: "Salvador", lat: -12.97, lon: -38.50 },
        { nome: "Fortaleza", lat: -3.72, lon: -38.54 },
        { nome: "Recife", lat: -8.05, lon: -34.90 },
        { nome: "Manaus", lat: -3.12, lon: -60.02 },
      ];

      const gerarHoteis = (count: number): Hotel[] => {
        const hoteisGerados: Hotel[] = [];
        for (let i = 0; i < count; i++) {
          const cidade = cidades[i % cidades.length];
          const lat = cidade.lat + (Math.random() - 0.5) * 1.2;
          const lon = cidade.lon + (Math.random() - 0.5) * 1.2;
          const nome = nomesHoteis[i % nomesHoteis.length];
          // imagens de placeholder (pets)
          const img = `https://placedog.net/600/400?id=${i + 10}`;
          hoteisGerados.push({ nome, coords: [lat, lon], cidade: cidade.nome, img });
        }
        return hoteisGerados;
      };

      const locais = gerarHoteis(40);
      setHoteis(locais);

      if (mapaRef.current && (window as any).L) {
        const L = (window as any).L;
        const mapa = L.map(mapaRef.current, { zoomControl: false }).setView([-14.235, -51.9253], 4.2);
        mapaInstancia.current = mapa;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapa);

        locais.forEach((local) => {
          const marker = L.marker(local.coords).addTo(mapa);
          marker.bindPopup(`<b>${local.nome}</b><br>${local.cidade}`);
          // abrir popup ao clicar no card:
          (marker as any).onSelect = () => {
            marker.openPopup();
          };
        });

        // garantindo que o mapa renderize corretamente
        setTimeout(() => {
          mapa.invalidateSize();
        }, 300);
      }
    };

    document.body.appendChild(leafletScript);

    return () => {
      // cleanup
      try {
        if (leafletCSS.parentNode) leafletCSS.parentNode.removeChild(leafletCSS);
      } catch {}
      try {
        if (leafletScript.parentNode) leafletScript.parentNode.removeChild(leafletScript);
      } catch {}
      if (mapaInstancia.current) {
        try {
          mapaInstancia.current.remove();
        } catch {}
      }
    };
  }, []);

  const handlePetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowOtherPetType(e.target.value === "other");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`Reserva enviada com sucesso para ${hotelSelecionado?.nome || "o hotel selecionado"}!`);
    if (formRef.current) formRef.current.reset();
    setShowOtherPetType(false);
    setHotelSelecionado(null);
  };

  const selecionarHotel = (hotel: Hotel) => {
    setHotelSelecionado(hotel);
    if (mapaInstancia.current) {
      mapaInstancia.current.setView(hotel.coords, 11, { animate: true });
      // procurar marker correspondente e abrir popup (marcadores não guardados diretamente aqui, simplificação)
    }
    // rola a lista para o topo do item selecionado (melhora UX)
    const el = document.querySelector(`.hotel-card-airbnb[data-nome="${CSS.escape(hotel.nome)}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="reservar-page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <span className="paw"></span>
            <Link to="/" className="logo-text">
              Pet<span className="highlight">Palace</span>
            </Link>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/servicos">Serviços</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/reservar" className="active">Reservar</Link>
            <Link to="/login" className="btn">Entrar</Link>
          </nav>
        </div>
      </header>

      <section className="reserva-section">
        <div className="reserva-header">
          <div>

          </div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar por cidade, hotel ou região..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
        </div>

        {/* Layout estilo Airbnb: lista à esquerda, mapa e formulário à direita */}
        <div className="reserva-flex-airbnb">
          {/* Coluna esquerda: Cards */}
          <div className="hotel-list-airbnb">
            {hoteis
              .filter(h => h.nome.toLowerCase().includes(search.toLowerCase()) || h.cidade.toLowerCase().includes(search.toLowerCase()))
              .slice(0, 20)
              .map((hotel, i) => (
                <div
                  key={i}
                  data-nome={hotel.nome}
                  className={`hotel-card-airbnb ${hotelSelecionado?.nome === hotel.nome ? "selecionado" : ""}`}
                  onClick={() => selecionarHotel(hotel)}
                >
                  <img src={hotel.img} alt={hotel.nome} />
                  <div className="hotel-info-airbnb">
                    <h4>{hotel.nome}</h4>
                    <p className="cidade"><i className="fas fa-map-marker-alt"></i> {hotel.cidade}</p>
                    <p className="small">A partir de R$ 79/noite • Aceita cães e gatos</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Coluna direita: Mapa + Formulário (fixo quando escolhe um hotel) */}
          <div className="map-form-container">
            <div className="map-wrapper-airbnb">
              <div id="mapa" ref={mapaRef}></div>
            </div>

            <div className="form-container-airbnb">
              {hotelSelecionado ? (
                <>
                  <h3>Reservar no {hotelSelecionado.nome}</h3>
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="nome">Nome do Tutor</label>
                        <input type="text" id="nome" required />
                      </div>
                      <div className="col">
                        <label htmlFor="telefone">Telefone</label>
                        <input type="tel" id="telefone" required />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <label htmlFor="pet">Nome do Pet</label>
                        <input type="text" id="pet" required />
                      </div>
                      <div className="col">
                        <label htmlFor="petType">Tipo de Pet</label>
                        <select id="petType" required onChange={handlePetTypeChange}>
                          <option value="">Selecione</option>
                          <option value="dog">Cachorro</option>
                          <option value="cat">Gato</option>
                          <option value="other">Outro</option>
                        </select>
                      </div>
                    </div>

                    {showOtherPetType && (
                      <input
                        type="text"
                        placeholder="Qual outro animal?"
                        ref={otherPetTypeInputRef}
                      />
                    )}

                    <div className="row">
                      <div className="col">
                        <label htmlFor="checkin">Check-in</label>
                        <input type="date" id="checkin" required />
                      </div>
                      <div className="col">
                        <label htmlFor="checkout">Check-out</label>
                        <input type="date" id="checkout" required />
                      </div>
                    </div>

                    <button type="submit" className="submit-btn">Confirmar Reserva</button>
                  </form>
                </>
              ) : (
                <div className="placeholder-form">
                  <h3>Selecione um hotel à esquerda</h3>
                  <p>Clique em um card para ver detalhes e abrir o formulário de reserva.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservar;
