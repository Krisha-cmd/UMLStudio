import React from 'react';
import './SidePanel.css';

export const SidePanel = ({ onAddClass, onClearCanvas }) => {
  return (
    <div className="panel-container">
      <h2 className="panel-title">UML Studio</h2>
      
      <div className="tool-section">
        <h3 className="section-title">Shapes</h3>
        <button className="tool-button" onClick={onAddClass}>
          <span>📦</span>
          Add Class
        </button>
      </div>

      <div className="tool-section">
        <h3 className="section-title">Actions</h3>
        <button className="danger-button" onClick={onClearCanvas}>
          <span>🗑️</span>
          Clear Canvas
        </button>
      </div>

      <div className="info-box">
        <strong>Instructions:</strong><br />
        • Click "Add Class" to create a new UML class<br />
        • Drag classes around the canvas<br />
        • Double-click to edit text<br />
        • Right-click attributes/methods to delete<br />
        • Use mouse wheel to zoom<br />
        • Drag to pan around the canvas
      </div>

      <div className="keyboard-shortcuts">
        <h3 className="section-title">Shortcuts</h3>
        <div className="shortcut-item">
          <span>Zoom In</span>
          <span className="shortcut-key">Scroll Up</span>
        </div>
        <div className="shortcut-item">
          <span>Zoom Out</span>
          <span className="shortcut-key">Scroll Down</span>
        </div>
        <div className="shortcut-item">
          <span>Pan</span>
          <span className="shortcut-key">Click + Drag</span>
        </div>
        <div className="shortcut-item">
          <span>Edit Text</span>
          <span className="shortcut-key">Double Click</span>
        </div>
        <div className="shortcut-item">
          <span>Delete Item</span>
          <span className="shortcut-key">Right Click</span>
        </div>
      </div>
    </div>
  );
};