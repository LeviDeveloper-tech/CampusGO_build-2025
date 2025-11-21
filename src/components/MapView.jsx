import React, { useEffect, useState, useRef } from "react";
import { mapData, calculateRoute, aulas, students } from "../utils/mockData"; // ← Importar no topo
import PresencePopup from './MapView/PresencePopup'
import InfoPanel from "./MapView/InfoPanel";
import SchedulePanel from "./MapView/SchedulePanel";


import "./MapView.css";

export default function MapView({ user, mode, onLogout }) {
  const [selected, setSelected] = useState(null);
  const [path, setPath] = useState([]);
  const [studentSchedule, setStudentSchedule] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPresencePopup, setShowPresencePopup] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const svgRef = useRef();
  const isPanning = useRef(false);
  const startPan = useRef({ x: 0, y: 0 });


useEffect(() => {
  if (mode === "student" && user?.matricula) {
    const aulasDoAluno = aulas.filter((aula) =>
      aula.matriculas?.includes(user.matricula)
    );
    setStudentSchedule(aulasDoAluno);
  }
}, [mode, user]);

  function requestRoute(destNode) {
    const origin = "n1";
    const route = calculateRoute(mapData.nodes, mapData.edges, origin, destNode);
    setPath(route);
  }

  function handleWheel(e) {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setZoom((z) => Math.min(Math.max(0.5, z + delta), 3));
  }

  function handleMouseDown(e) {
    isPanning.current = true;
    startPan.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  }

  function handleMouseMove(e) {
    if (!isPanning.current) return;
    setOffset({
      x: e.clientX - startPan.current.x,
      y: e.clientY - startPan.current.y,
    });
  }

  function handleMouseUp() {
    isPanning.current = false;
  }

  useEffect(() => {
    let inactivityTimer;
    let warningTimer;

    const handleActivity = () => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      inactivityTimer = setTimeout(() => {
        setShowPresencePopup(true);
        warningTimer = setTimeout(() => {
          setShowPresencePopup(false);
          onLogout();
        }, 15000);
      }, 30000);
    };

    const events = ["mousemove", "keydown", "click", "wheel"];
    events.forEach((ev) => window.addEventListener(ev, handleActivity));

    handleActivity();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleActivity));
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
    };
  }, [onLogout]);

  const nodes = Object.values(mapData.nodes);
  const allX = nodes.map((n) => n.x);
  const allY = nodes.map((n) => n.y);
  const minX = Math.min(...allX) - 50;
  const maxX = Math.max(...allX) + 50;
  const minY = Math.min(...allY) - 50;
  const maxY = Math.max(...allY) + 50;
  const vb = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;

  return (
    <div className="map-container">
      {/* BOTÃO HAMBÚRGUER */}
      <div
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
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

      {/* TOPO */}
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

      {/* MAPA */}
      <div
        className={`map-wrapper ${menuOpen ? "shrink" : ""}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          viewBox={vb}
          className="map-svg"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            transition: isPanning.current ? "none" : "transform 0.1s ease",
          }}
        >
          <rect
            x={minX}
            y={minY}
            width={maxX - minX}
            height={maxY - minY}
            fill="#f7fbff"
          />

          {mapData.edges.map((e, i) => {
            const a = mapData.nodes[e.from];
            const b = mapData.nodes[e.to];
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

          {nodes.map((n) => {
            const isTarget = selected && selected.id === n.id;
            return (
              <g
                key={n.id}
                transform={`translate(${n.x},${n.y})`}
                className="node-group"
                onClick={() => setSelected(n)}
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

        {/* PAINEL DE INFORMAÇÕES */}
          <InfoPanel selected={selected} onRequestRoute={requestRoute} />

        {/* CRONOGRAMA */}
        {mode === "student" && studentSchedule && studentSchedule.length > 0 && (
  <SchedulePanel
    schedule={studentSchedule}
    onSelectSala={(id, name) => {
      setSelected({ id, name });
      requestRoute(id);
    }}
  />
)}


      </div>
      {/* POPUP DE PRESENÇA */}
{/* POPUP DE PRESENÇA (agora componente separado) */}
      {showPresencePopup && (
        <PresencePopup
          onStay={() => setShowPresencePopup(false)}
          onLogout={onLogout}
        />
      )}

    </div>
  );
  }
