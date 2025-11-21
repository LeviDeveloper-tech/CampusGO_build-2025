import React, { useEffect, useState, useRef } from "react";
import { mapData, calculateRoute, aulas } from "../utils/mockData";
import PresencePopup from "./MapView/PresencePopup";
import InfoPanel from "./MapView/InfoPanel";
import SchedulePanel from "./MapView/SchedulePanel";
import Sidebar from "./MapView/Sidebar";
import Topbar from "./MapView/Topbar";
import MapCanvas from "./MapView/MapCanvas";

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
      {/* MENU LATERAL */}
      <Sidebar
        menuOpen={menuOpen}
        toggleMenu={() => setMenuOpen(!menuOpen)}
      />

      {/* TOPO */}
      <Topbar user={user} menuOpen={menuOpen} onLogout={onLogout} />

      {/* MAPA */}
      <MapCanvas
        nodes={mapData.nodes}
        edges={mapData.edges}
        path={path}
        selected={selected}
        onSelectNode={setSelected}
        viewBox={vb}
        offset={offset}
        zoom={zoom}
        isPanning={isPanning.current}
        svgRef={svgRef}
        handleWheel={handleWheel}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
      >
        {/* PAINEL DE INFORMAÇÕES */}
        <InfoPanel selected={selected} onRequestRoute={requestRoute} />

        {/* CRONOGRAMA */}
        {mode === "student" &&
          studentSchedule &&
          studentSchedule.length > 0 && (
            <SchedulePanel
              schedule={studentSchedule}
              onSelectSala={(id, name) => {
                setSelected({ id, name });
                requestRoute(id);
              }}
            />
          )}
      </MapCanvas>

      {/* POPUP DE PRESENÇA */}
      {showPresencePopup && (
        <PresencePopup
          onStay={() => setShowPresencePopup(false)}
          onLogout={onLogout}
        />
      )}
    </div>
  );
}
