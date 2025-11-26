import React, { useEffect, useState } from "react";
import "../styles/Perfil.css";
import Navbar from "../components/Navbar";

const Perfil: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("pp_user");

    try {
      if (stored) {
        const u = JSON.parse(stored);
        setUserData(u);
        setPreview(u.foto || null);
        setNome(u.nome);
        setEmail(u.email);
      }
    } catch (err) {
      console.warn("Erro ao ler pp_user:", err);
      localStorage.removeItem("pp_user");
    }
  }, []);

  // Trocar foto
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Salvar nova foto
  const handleSavePhoto = () => {
    if (!preview) return;

    const updated = { ...userData, foto: preview };
    localStorage.setItem("pp_user", JSON.stringify(updated));
    setUserData(updated);

    alert("Foto atualizada!");
    window.location.reload();
  };

  // Remover foto
  const handleRemovePhoto = () => {
    const updated = { ...userData, foto: null };

    localStorage.setItem("pp_user", JSON.stringify(updated));
    setUserData(updated);
    setPreview(null);

    alert("Foto removida!");
    window.location.reload();
  };

  // Salvar nome e e-mail
  const handleSaveInfo = () => {
    const updated = { ...userData, nome, email };

    localStorage.setItem("pp_user", JSON.stringify(updated));
    setUserData(updated);
    setEditMode(false);

    alert("Informações atualizadas!");
  };

  // EVITA TELA BRANCA
  if (!userData) {
    return (
      <>
        <Navbar />
        <div className="perfil-page">
          <div className="perfil-container">
            <h2>Nenhum usuário encontrado</h2>
            <p>Faça login novamente para carregar seu perfil.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="perfil-page">
        <div className="perfil-container">

          <div className="perfil-header">
            <img
              src={
                preview ||
                userData.foto ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Usuário"
              className="perfil-foto"
            />

            <div>
              <h2>{userData.nome}</h2>
              <p>{userData.email}</p>
            </div>
          </div>

          {/* FOTO DE PERFIL */}
          <div className="perfil-card">
            <h3>Foto de Perfil</h3>

            <input type="file" accept="image/*" onChange={handleFile} />

            <button className="editar-btn" onClick={handleSavePhoto}>
              Salvar Nova Foto
            </button>

            <button
              className="editar-btn remove-btn"
              onClick={handleRemovePhoto}
              style={{ background: "#dc2626" }}
            >
              Remover Foto
            </button>
          </div>

          {/* EDITAR INFORMAÇÕES */}
          <div className="perfil-card">
            <h3>Informações da Conta</h3>

            {editMode ? (
              <>
                <label>Nome</label>
                <input value={nome} onChange={(e) => setNome(e.target.value)} />

                <label>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button className="editar-btn" onClick={handleSaveInfo}>
                  Salvar Alterações
                </button>

                <button
                  className="editar-btn remove-btn"
                  onClick={() => setEditMode(false)}
                  style={{ background: "#6b7280" }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p><strong>Nome:</strong> {userData.nome}</p>
                <p><strong>E-mail:</strong> {userData.email}</p>

                <button className="editar-btn" onClick={() => setEditMode(true)}>
                  Editar Informações
                </button>
              </>
            )}
          </div>

          <div className="perfil-card">
            <h3>Minhas Reservas</h3>
            <p>Você ainda não possui reservas ativas.</p>
          </div>

          <div className="perfil-card">
            <h3>Preferências</h3>
            <p>Personalize suas notificações e preferências de hospedagem.</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Perfil;
