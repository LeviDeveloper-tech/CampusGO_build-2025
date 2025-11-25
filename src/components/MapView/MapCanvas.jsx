import React from "react";
import "../MapView.css";
import MapSVG from "../assets/map.svg?react"

export default function MapCanvas({
  nodes,
  path,
  onSelectNode,
  offset,
  zoom,
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
        {nodes &&
          Object.values(nodes).map((node) => (
            <g
              key={node.id}
              className="node-group"
              transform={`translate(${node.x}, ${node.y})`}
              onClick={() => onSelectNode(node)}
              style={{ cursor: "pointer", pointerEvents: "auto" }} // reabilita clique
            >
              <circle r="1" fill="#024221" stroke="#fff" strokeWidth="2" />
              <text
                x={-50}
                y={5}
                fontSize="14"
                fill="#024221"
                fontWeight="bold"
                style={{ pointerEvents: "auto", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation(); // evita duplo clique no g
                  onSelectNode(node);
                }}
              >
                {node.name}
              </text>
            </g>
          ))}
      </svg>
        





      {/* Renderiza os painéis filhos (InfoPanel, SchedulePanel, etc.) */}
      {children}
    </div>
  );
}
