import React from "react";
import "../MapView.css";
import MapSVG from "../assets/map.svg?react"

export default function MapCanvas({
  offset,
  zoom,
  isPanning,
  handleWheel,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  children // ← suporte para painéis sobrepostos
}) {
  return (
    <div
      className="map-wrapper"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <MapSVG
        className="map-svg"
        style={{
          width: "90%", height: "auto",
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: isPanning ? "none" : "transform 0.1s ease",
        }}
      />





      {/* Renderiza os painéis filhos (InfoPanel, SchedulePanel, etc.) */}
      {children}
    </div>
  );
}
