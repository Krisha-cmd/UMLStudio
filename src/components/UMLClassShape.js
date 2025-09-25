import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './UMLClassShape.css';

export const UMLClassShape = ({
  umlClass,
  onUpdate,
  onSelect,
  isSelected = false
}) => {
  const [editingAttribute, setEditingAttribute] = useState(null);
  const [editingMethod, setEditingMethod] = useState(null);
  const [editingName, setEditingName] = useState(false);

  const handleDrag = (e, data) => {
    onUpdate({
      ...umlClass,
      position: { x: data.x, y: data.y }
    });
  };

  const handleNameChange = (newName) => {
    onUpdate({
      ...umlClass,
      name: newName
    });
    setEditingName(false);
  };

  const handleAttributeChange = (index, newValue) => {
    const newAttributes = [...umlClass.attributes];
    newAttributes[index] = newValue;
    onUpdate({
      ...umlClass,
      attributes: newAttributes
    });
    setEditingAttribute(null);
  };

  const handleMethodChange = (index, newValue) => {
    const newMethods = [...umlClass.methods];
    newMethods[index] = newValue;
    onUpdate({
      ...umlClass,
      methods: newMethods
    });
    setEditingMethod(null);
  };

  const addAttribute = () => {
    onUpdate({
      ...umlClass,
      attributes: [...umlClass.attributes, 'newAttribute: string']
    });
  };

  const addMethod = () => {
    onUpdate({
      ...umlClass,
      methods: [...umlClass.methods, 'newMethod(): void']
    });
  };

  const removeAttribute = (index) => {
    const newAttributes = umlClass.attributes.filter((_, i) => i !== index);
    onUpdate({
      ...umlClass,
      attributes: newAttributes
    });
  };

  const removeMethod = (index) => {
    const newMethods = umlClass.methods.filter((_, i) => i !== index);
    onUpdate({
      ...umlClass,
      methods: newMethods
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
          {editingName ? (
            <input
              className="editable-input"
              type="text"
              value={umlClass.name}
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={(e) => handleNameChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleNameChange(e.target.value);
                }
              }}
              autoFocus
            />
          ) : (
            <div onDoubleClick={() => setEditingName(true)}>
              {umlClass.name}
            </div>
          )}
        </div>
        
        <div className="class-section">
          {umlClass.attributes.map((attr, index) => (
            <div className="section-item" key={index}>
              {editingAttribute === index ? (
                <input
                  className="editable-input"
                  type="text"
                  value={attr}
                  onChange={(e) => handleAttributeChange(index, e.target.value)}
                  onBlur={(e) => handleAttributeChange(index, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAttributeChange(index, e.target.value);
                    }
                    if (e.key === 'Delete' && e.ctrlKey) {
                      removeAttribute(index);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <div 
                  onDoubleClick={() => setEditingAttribute(index)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    removeAttribute(index);
                  }}
                >
                  {attr}
                </div>
              )}
            </div>
          ))}
          <button className="add-button" onClick={addAttribute}>+ Add Attribute</button>
        </div>
        
        <div className="class-section">
          {umlClass.methods.map((method, index) => (
            <div className="section-item" key={index}>
              {editingMethod === index ? (
                <input
                  className="editable-input"
                  type="text"
                  value={method}
                  onChange={(e) => handleMethodChange(index, e.target.value)}
                  onBlur={(e) => handleMethodChange(index, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleMethodChange(index, e.target.value);
                    }
                    if (e.key === 'Delete' && e.ctrlKey) {
                      removeMethod(index);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <div 
                  onDoubleClick={() => setEditingMethod(index)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    removeMethod(index);
                  }}
                >
                  {method}
                </div>
              )}
            </div>
          ))}
          <button className="add-button" onClick={addMethod}>+ Add Method</button>
        </div>
      </div>
    </Draggable>
  );
};