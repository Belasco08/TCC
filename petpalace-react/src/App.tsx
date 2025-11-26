// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Servicos from "./pages/Servicos";
import Contato from "./pages/Contato";
import Hoteis from "./pages/Hoteis";
import HotelDetalhes from "./pages/HotelDetalhes";
import Login from "./pages/Login";
import Cadastrar from "./pages/Cadastrar";
import CadastrarHotel from "./pages/CadastrarHotel";
import Perfil from "./pages/Perfil";


// Auth
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/contato" element={<Contato />} />

          {/* MARKETPLACE */}
          <Route path="/hoteis" element={<Hoteis />} />
          <Route path="/hotel/:id" element={<HotelDetalhes />} />
          {/* mantenho /reservar redirecionando (opcional) */}
          <Route path="/reservar" element={<Navigate to="/hoteis" replace />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastrar />} />

          {/* Host */}
          <Route path="/cadastrarhotel" element={<CadastrarHotel />} />

          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
