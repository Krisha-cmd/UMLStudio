import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './UMLClassShape.css';

export const UMLClassShape = ({
  umlClass,
  onUpdate,
  onSelect,
  isSelected = false
}) => {

  const handleDrag = (e, data) => {
    onUpdate({
      ...umlClass,
      position: { x: data.x, y: data.y }
    });
  };



  return (
    <Draggable
      position={umlClass.position}
      onDrag={handleDrag}
      handle=".drag-handle"
    >
      <div
        className={`class-container ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelect(umlClass.id)}
      >
        <div className="class-header drag-handle">
          <div>{umlClass.name}</div>
        </div>
        
        <div className="class-section">
          {umlClass.attributes.map((attr, index) => (
            <div className="section-item" key={index}>
              <div>{attr}</div>
            </div>
          ))}
        </div>
        
        <div className="class-section">
          {umlClass.methods.map((method, index) => (
            <div className="section-item" key={index}>
              <div>{method}</div>
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );
};