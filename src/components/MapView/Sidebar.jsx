// src/components/MapView/Sidebar.jsx
import React from "react";
import "../MapView.css";

export default function Sidebar({ menuOpen, toggleMenu }) {
  return (
    <>
      {/* BOTÃO HAMBÚRGUER */}
      <div
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* MENU LATERAL */}
      <aside className={`sidebar ${menuOpen ? "visible" : ""}`}>
        <img
          src="/Logo-branca-transparente.png"
          alt="CampusGO"
          className="logo"
        />
        <nav>
          <button>🗺️ Mapa</button>
          <button>☕ Cafeteria</button>
          <button>🚻 Banheiros</button>
          <button>🎓 Salas de Aula</button>
          <button>📚 Biblioteca</button>
        </nav>
      </aside>
    </>
  );
}
