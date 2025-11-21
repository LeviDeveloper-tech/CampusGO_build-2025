// src/components/MapView/SchedulePanel.jsx
import React from "react";
import "../MapView.css";

export default function SchedulePanel({ schedule, onSelectSala }) {
  return (
    <div className="schedule-panel">
      <h3>📅 Aulas da Semana</h3>
      <ul>
        {schedule.map((aula, i) => (
          <li
            key={i}
            onClick={() => onSelectSala(aula.sala_id, aula.sala)}
            className="schedule-item"
            title={`Clique para ver o caminho até ${aula.sala}`}
          >
            <div className="aula-header">
              <strong>{aula.disciplina}</strong>
              <span className="dia">{aula.dia_semana}</span>
            </div>
            <div className="aula-body">
              <span>{aula.horário}</span> — <b>{aula.sala}</b>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
