import React, { useState, DragEvent, ChangeEvent } from "react";
import Navbar from "../components/Navbar";
import "../styles/CadastrarHotel.css";
import { useNavigate } from "react-router-dom";

const CadastrarHotel: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    cidade: "",
    estado: "",
    enderecoTexto: "",
    telefone: "",
    email: "",
    aceita_gatos: false,
    aceita_caes: false
  });

  const [imagens, setImagens] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagens((prev) => [...prev, ...files]);
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagens((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome) {
      alert("Preencha o nome do hotel.");
      return;
    }

    const data = new FormData();
    data.append("nome", formData.nome);
    data.append("descricao", formData.descricao);
    if(formData.preco) data.append("preco", formData.preco);
    data.append("cidade", formData.cidade);
    data.append("estado", formData.estado);
    data.append("enderecoTexto", formData.enderecoTexto);
    data.append("telefone", formData.telefone);
    data.append("email", formData.email);
    data.append("aceita_gatos", String(formData.aceita_gatos));
    data.append("aceita_caes", String(formData.aceita_caes));

    imagens.forEach((img) => {
      data.append("fotos", img);
    });

    try {
      const resp = await fetch("http://localhost:8080/unidades", {
        method: "POST",
        body: data,
      });

      if (resp.ok) {
        alert("Unidade cadastrada com sucesso!");
        // limpar form
        setFormData({
          nome: "",
          descricao: "",
          preco: "",
          cidade: "",
          estado: "",
          enderecoTexto: "",
          telefone: "",
          email: "",
          aceita_gatos: false,
          aceita_caes: false
        });
        setImagens([]);
        setPreviewUrls([]);
        // redireciona para reservas para ver o novo hotel
        navigate("/reservar");
      } else {
        const text = await resp.text();
        alert("Erro ao cadastrar: " + text);
      }
    } catch (err) {
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="cadastrarhotel-page">
        <section className="cadastrarhotel-section">
          <div className="cadastrarhotel-form-container">
            <h1>Cadastrar Hotel</h1>

            <form onSubmit={handleSubmit} className="cadastrarhotel-form">
              <div className="cadastrarhotel-form-grid">
                <input type="text" name="nome" placeholder="Nome do Hotel" value={formData.nome} onChange={handleChange} required />
                <textarea name="descricao" placeholder="Descrição" value={formData.descricao} onChange={handleChange} />

                <input type="number" name="preco" placeholder="Preço por diária" value={formData.preco} onChange={handleChange} />
                <input type="text" name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} required />
                <input type="text" name="estado" placeholder="Estado" value={formData.estado} onChange={handleChange} required />
                <input type="text" name="enderecoTexto" placeholder="Endereço" value={formData.enderecoTexto} onChange={handleChange} required />

                <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

                <label>
                  <input type="checkbox" name="aceita_caes" checked={formData.aceita_caes} onChange={handleChange} />
                  Aceita cães
                </label>

                <label>
                  <input type="checkbox" name="aceita_gatos" checked={formData.aceita_gatos} onChange={handleChange} />
                  Aceita gatos
                </label>

              </div>

              <div
                className={`upload-area ${dragOver ? "dragover" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <p>Arraste imagens ou clique para selecionar</p>
                <input type="file" accept="image/*" multiple onChange={handleFileChange} />

                <div className="preview-grid">
                  {previewUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Preview ${index}`} className="preview-image" />
                  ))}
                </div>
              </div>

              <button type="submit" className="cadastrarhotel-btn-cadastrar">
                Cadastrar
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default CadastrarHotel;
