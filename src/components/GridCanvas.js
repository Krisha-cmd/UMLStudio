import React from 'react';
import './GridCanvas.css';

export const GridCanvas = ({ children, zoom = 1 }) => {
  const gridSize = 20;
  const adjustedGridSize = gridSize * zoom;

  return (
    <div className="grid-canvas-container">
      <svg className="grid-svg">
        <defs>
          <pattern
            id="grid"
            width={adjustedGridSize}
            height={adjustedGridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${adjustedGridSize} 0 L 0 0 0 ${adjustedGridSize}`}
              fill="none"
              stroke="#e1e5e9"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="majorGrid"
            width={adjustedGridSize * 5}
            height={adjustedGridSize * 5}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${adjustedGridSize * 5} 0 L 0 0 0 ${adjustedGridSize * 5}`}
              fill="none"
              stroke="#c1c7cd"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#majorGrid)" />
      </svg>
      <div className="content-layer">
        {children}
      </div>
    </div>
  );
};