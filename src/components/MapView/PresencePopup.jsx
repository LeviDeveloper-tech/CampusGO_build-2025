// src/components/MapView/PresencePopup.jsx
import React from "react";
import "../MapView.css"; // mantém os estilos já definidos

export default function PresencePopup({ onStay, onLogout }) {
  return (
    <div className="presence-popup">
      <div className="presence-box">
        <h3>👋 Tem alguém aí?</h3>
        <p>O sistema voltará à tela inicial em 15 segundos se não houver resposta.</p>
        <div className="presence-buttons">
          <button className="btn stay" onClick={onStay}>
            ✅ Estou aqui
          </button>
          <button className="btn exit" onClick={onLogout}>
            🚪 Sair agora
          </button>
        </div>
      </div>
    </div>
  );
}
