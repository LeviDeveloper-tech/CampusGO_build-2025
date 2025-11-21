// src/components/MapView/MapCanvas.jsx
import React from "react";
import "../MapView.css";

export default function MapCanvas({
  nodes,
  edges,
  path,
  selected,
  onSelectNode,
  viewBox,
  offset,
  zoom,
  isPanning,
  svgRef,
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
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="map-svg"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: isPanning ? "none" : "transform 0.1s ease",
        }}
      >
        <rect
          x={viewBox.split(" ")[0]}
          y={viewBox.split(" ")[1]}
          width={viewBox.split(" ")[2]}
          height={viewBox.split(" ")[3]}
          fill="#f7fbff"
        />

        {edges.map((e, i) => {
          const a = nodes[e.from];
          const b = nodes[e.to];
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#cbd5e1"
              strokeWidth={6}
              strokeLinecap="round"
            />
          );
        })}

        {path.length > 0 && (
          <polyline
            className="route-line"
            points={path.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="#00b894"
            strokeWidth={10}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.9}
          />
        )}

        {Object.values(nodes).map((n) => {
          const isTarget = selected && selected.id === n.id;
          return (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y})`}
              className="node-group"
              onClick={() => onSelectNode(n)}
            >
              <circle
                r={isTarget ? 14 : 10}
                fill={isTarget ? "#00b894" : "#0984e3"}
                stroke="#ffffff"
                strokeWidth={2}
              />
              <title>{n.name}</title>
            </g>
          );
        })}
      </svg>

      {/* Renderiza os painéis filhos (InfoPanel, SchedulePanel, etc.) */}
      {children}
    </div>
  );
}
