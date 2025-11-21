// src/components/MapView/Topbar.jsx
import React from "react";
import "../MapView.css";

export default function Topbar({ user, menuOpen, onLogout }) {
  return (
    <header className={`topbar ${menuOpen ? "shifted" : ""}`}>
      <div className="topbar-content">
        <div className="user-info">
          👋 Olá, {user?.name || "Visitante"}{" "}
          {user?.matricula ? `(${user.matricula})` : ""}
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquise o local que você procura..."
          />
          <button>🔍</button>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          🚪 Sair
        </button>
      </div>
    </header>
  );
}
