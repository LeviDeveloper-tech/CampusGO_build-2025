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
          <button>
            <img src="public/mapa.png.png" alt="" />
            Mapa
          </button>

          <button>
            <img src="public/cafeteria.png.png" alt="" />
            Cafeteria
          </button>

          <button>
            <img src="public/banheiro.png.png" alt="" />
            Banheiros
          </button>

          <button>
            <img src="public/sala.png.png" alt="" />
            Salas de Aula
          </button>

          <button>
            <img src="public/biblioteca.png.png" alt="" />
            Biblioteca
          </button>
        </nav>
      </aside>
    </>
  );
}
