// src/components/MapView/TextLabelDestination.jsx
import React, { useRef, useEffect, useState } from "react";

export default function TextLabelDestination({ text, onClick }) {
  const textRef = useRef();
  const [bbox, setBbox] = useState(null);

  useEffect(() => {
    if (textRef.current) {
      const box = textRef.current.getBBox();
      setBbox(box);
    }
  }, [text]);

  return (
    <g
      className="text-label"
      onClick={onClick}
      style={{ cursor: "pointer", pointerEvents: "auto" }}
    >
      {bbox && (
        <rect
          x={bbox.x - 0}
          y={bbox.y - 0}
          width={bbox.width + 0}
          height={bbox.height + 0}
          rx={1}
          ry={1}
          fill="#fff"
        />
      )}
      <text
        ref={textRef}
        x={0}
        y={5}
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="#024221"
      >
        {text}
      </text>
    </g>
  );
}
