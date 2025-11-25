import React from "react";
import "../MapView.css";
import MapSVG from "../assets/map.svg?react"
import TextLabelDestination from "./TextLabelDestination";

export default function MapCanvas({
  nodes,
  path,
  onSelectNode,
  offset,
  zoom,
  selected,
  isPanning,
  handleWheel,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  children 
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
          width: "100%", height: "auto",
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: isPanning ? "none" : "transform 0.1s ease",
        }}
      />

      {/* Overlay SVG para rota e nós clicáveis */}
      <svg
        viewBox="0 0 810 810"  // Ajuste conforme o tamanho real do mapa
        className="map-svg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "auto",
          pointerEvents: "none",       // por padrão não intercepta eventos
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: isPanning ? "none" : "transform 0.1s ease",
        }}
      >
        {/* Rota: polyline usando path */}
        {path && path.length > 1 && (
          <polyline
            className="route-line"
            points={path.map((n) => `${n.x},${n.y}`).join(" ")}
            stroke="#00b894"
            strokeWidth="5"
            fill="none"
          />
        )}

        {/* Nós clicáveis: círculo + texto */}
        {/* Primeiro: renderiza os invisíveis */}
          {nodes &&
  Object.values(nodes)
    .filter((node) => !!node.name)
    .map((node) => (
      <g
        key={node.id}
        className={`text-node ${selected?.id === node.id ? "selected" : ""}`}
        transform={`translate(${node.x}, ${node.y})`}
        style={{ cursor: "pointer", pointerEvents: "auto" }}
        onClick={() => onSelectNode(node)}
      >
        <TextLabelDestination
          text={node.name}
          onClick={(e) => {
            e.stopPropagation();
            onSelectNode(node);
          }}
        />
      </g>
    ))}
        </svg>
      {/* Renderiza os painéis filhos (InfoPanel, SchedulePanel, etc.) */}
      {children}
    </div>
  );
}
