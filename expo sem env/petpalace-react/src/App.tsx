import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importar suas páginas
import Home from "./pages/Home";
import Servicos from "./pages/Servicos";
import Contato from "./pages/Contato";
import Reservar from "./pages/Reservar";
import Login from "./pages/Login";
import Cadastrar from "./pages/Cadastrar";
import Anunciar from "./pages/Anunciar";
import LoginAnfitriao from "./pages/LoginAnfitriao";
import CadastrarAnfitriao from "./pages/CadastrarAnfitriao";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/reservar" element={<Reservar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} /> 
        <Route path="/anunciar" element={<Anunciar />} />
        <Route path="/login-anfitriao" element={<LoginAnfitriao />} />
        <Route path="/cadastrar-anfitriao" element={<CadastrarAnfitriao />} />
       
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;