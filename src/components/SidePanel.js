import React, { useState } from "react";
import "./SidePanel.css";

export const SidePanel = (onClearCanvas) => {
  const [className, setClassName] = useState("Student");
  const [classType, setClassType] = useState("Abstract");
  const [attributes, setAttributes] = useState([]);
  const [methods, setMethods] = useState([]);
  const [relationName, setRelationName] = useState("belongsTo");

  const [showClassDetails, setShowClassDetails] = useState(true);
  const [showRelationDetails, setShowRelationDetails] = useState(false);

  // Handlers
  const addAttribute = () => {
    setAttributes([
      ...attributes,
      { name: "", visibility: "private", type: "int", initial: "" },
    ]);
  };

  const addMethod = () => {
    setMethods([
      ...methods,
      { name: "", visibility: "public", returnType: "void" },
    ]);
  };

  return (
    <div className="side-panel">
      <h2 className="panel-title">UML Editor</h2>

      {/* Class Details Accordion */}
      <div className="accordion">
        <div
          className="accordion-header"
          onClick={() => setShowClassDetails(!showClassDetails)}
        >
          <h3>Class Details</h3>
          <span>{showClassDetails ? "▲" : "▼"}</span>
        </div>
        {showClassDetails && (
          <div className="accordion-content">
            <label>Class Name</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />

            <label>Class Type</label>
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
            >
              <option value="Abstract">Abstract</option>
              <option value="Interface">Interface</option>
              <option value="Concrete">Concrete</option>
            </select>

            {/* Add Data Member */}
            <div className="sub-section">
              <div className="sub-header">
                <h4>Add Data Member</h4>
                <button className="add-btn" onClick={addAttribute}>+</button>
              </div>

              {attributes.map((attr, index) => (
                <div key={index} className="form-group">
                  <input
                    type="text"
                    placeholder="Attribute Name"
                    value={attr.name}
                    onChange={(e) => {
                      const updated = [...attributes];
                      updated[index].name = e.target.value;
                      setAttributes(updated);
                    }}
                  />
                  <select
                    value={attr.visibility}
                    onChange={(e) => {
                      const updated = [...attributes];
                      updated[index].visibility = e.target.value;
                      setAttributes(updated);
                    }}
                  >
                    <option value="private">private</option>
                    <option value="public">public</option>
                  </select>
                  <select
                    value={attr.type}
                    onChange={(e) => {
                      const updated = [...attributes];
                      updated[index].type = e.target.value;
                      setAttributes(updated);
                    }}
                  >
                    <option value="int">int</option>
                    <option value="char">char</option>
                    <option value="string">string</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Initial Value"
                    value={attr.initial}
                    onChange={(e) => {
                      const updated = [...attributes];
                      updated[index].initial = e.target.value;
                      setAttributes(updated);
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Add Methods */}
            <div className="sub-section">
              <div className="sub-header">
                <h4>Add Methods</h4>
                <button className="add-btn" onClick={addMethod}>+</button>
              </div>

              {methods.map((m, index) => (
                <div key={index} className="form-group">
                  <input
                    type="text"
                    placeholder="Method Name"
                    value={m.name}
                    onChange={(e) => {
                      const updated = [...methods];
                      updated[index].name = e.target.value;
                      setMethods(updated);
                    }}
                  />
                  <select
                    value={m.visibility}
                    onChange={(e) => {
                      const updated = [...methods];
                      updated[index].visibility = e.target.value;
                      setMethods(updated);
                    }}
                  >
                    <option value="private">private</option>
                    <option value="public">public</option>
                  </select>
                  <select
                    value={m.returnType}
                    onChange={(e) => {
                      const updated = [...methods];
                      updated[index].returnType = e.target.value;
                      setMethods(updated);
                    }}
                  >
                    <option value="int">int</option>
                    <option value="char">char</option>
                    <option value="string">string</option>
                    <option value="void">void</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Relation Details Accordion */}
      <div className="accordion">
        <div
          className="accordion-header"
          onClick={() => setShowRelationDetails(!showRelationDetails)}
        >
          <h3>Relation Details</h3>
          <span>{showRelationDetails ? "▲" : "▼"}</span>
        </div>
        {showRelationDetails && (
          <div className="accordion-content">
            <label>Relation Name</label>
            <input
              type="text"
              value={relationName}
              onChange={(e) => setRelationName(e.target.value)}
            />
          </div>
        )}
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

