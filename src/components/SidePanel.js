import React, { useState, useEffect } from "react";
import "./SidePanel.css";

export const SidePanel = ({ elements, onAddElement, onClearCanvas, isVisible, isClassCreationMode, onCreateClass, onClose, selectedClass, onUpdateClass }) => {
  const [className, setClassName] = useState("Student");
  const [classType, setClassType] = useState("Abstract");
  const [attributes, setAttributes] = useState([]);
  const [methods, setMethods] = useState([]);
  const [relationName, setRelationName] = useState("belongsTo");

  const [showClassDetails, setShowClassDetails] = useState(true);
  const [showRelationDetails, setShowRelationDetails] = useState(false);

  // Populate form when a class is selected
  useEffect(() => {
    if (selectedClass) {
      setClassName(selectedClass.name);
      
      // Parse attributes from UML format back to form format
      const parsedAttributes = selectedClass.attributes.map(attr => {
        const visibilitySymbol = attr.charAt(0);
        const visibility = visibilitySymbol === '+' ? 'public' : 'private';
        const attrText = attr.substring(1).trim();
        const [name, type] = attrText.split(':').map(s => s.trim());
        return { name: name || '', visibility, type: type || 'string', initial: '' };
      });
      setAttributes(parsedAttributes);

      // Parse methods from UML format back to form format
      const parsedMethods = selectedClass.methods.map(method => {
        const visibilitySymbol = method.charAt(0);
        const visibility = visibilitySymbol === '+' ? 'public' : 'private';
        const methodText = method.substring(1).trim();
        const [name, returnType] = methodText.split(':').map(s => s.trim());
        const methodName = name.replace('()', '');
        return { name: methodName || '', visibility, returnType: returnType || 'void' };
      });
      setMethods(parsedMethods);
    } else {
      // Reset form for new class creation
      setClassName("Student");
      setAttributes([]);
      setMethods([]);
    }
  }, [selectedClass]);

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

  const handleCreateClass = () => {
    if (className.trim()) {
      // Convert attributes to UML format
      const formattedAttributes = attributes.map(attr => {
        const visibilitySymbol = attr.visibility === 'private' ? '-' : '+';
        const initialValue = attr.initial ? ` = ${attr.initial}` : '';
        return `${visibilitySymbol} ${attr.name}: ${attr.type}${initialValue}`;
      });

      // Convert methods to UML format
      const formattedMethods = methods.map(method => {
        const visibilitySymbol = method.visibility === 'private' ? '-' : '+';
        return `${visibilitySymbol} ${method.name}(): ${method.returnType}`;
      });

      const classData = {
        name: className,
        attributes: formattedAttributes.length > 0 ? formattedAttributes : ['-  id: number'],
        methods: formattedMethods.length > 0 ? formattedMethods : ['+ constructor()']
      };

      if (selectedClass) {
        // Update existing class
        const updatedClass = {
          ...selectedClass,
          ...classData
        };
        onUpdateClass(updatedClass);
      } else {
        // Create new class
        onCreateClass(classData);
      }
      
      // Reset form
      setClassName("Student");
      setAttributes([]);
      setMethods([]);
      onClose(); // Close panel after creating/updating
    }
  };

  const removeAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const removeMethod = (index) => {
    setMethods(methods.filter((_, i) => i !== index));
  };

  return (
    <>
      {isVisible && <div className="panel-overlay" onClick={onClose}></div>}
      <div className={`side-panel ${isVisible ? 'visible' : ''}`}>
        <div className="panel-header">
          <h2 className="panel-title">{selectedClass ? 'Edit UML Class' : 'Create UML Class'}</h2>
        </div>

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
                  <div className="form-row">
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
                    <button 
                      className="remove-btn"
                      onClick={() => removeAttribute(index)}
                      title="Remove attribute"
                    >
                      ×
                    </button>
                  </div>
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
                  <div className="form-row">
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
                    <button 
                      className="remove-btn"
                      onClick={() => removeMethod(index)}
                      title="Remove method"
                    >
                      ×
                    </button>
                  </div>
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
              <div className="panel-actions">
        <button 
          className="create-class-btn"
          onClick={handleCreateClass}
          disabled={!className.trim()}
        >
          {selectedClass ? 'Update Class' : 'Create Class'}
        </button>
      </div>
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

      {/* Action Buttons */}

    </div>
    </>
  );
};

