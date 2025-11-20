// src/components/MapView/InfoPanel.jsx
import React from "react";
import "../MapView.css"; // aproveita os estilos já existentes

export default function InfoPanel({ selected, onRequestRoute }) {
  return (
    <div className="info-panel">
      <h3>Informações</h3>
      {selected ? (
        <>
          <div>
            <b>{selected.name}</b>
          </div>
          <div>ID: {selected.id}</div>
          <div style={{ marginTop: 8 }}>
            <button
              className="btn primary"
              onClick={() => onRequestRoute(selected.id)}
            >
              Traçar rota até aqui
            </button>
          </div>
        </>
      ) : (
        <div>Clique em um ponto do mapa</div>
      )}
    </div>
  );
}
