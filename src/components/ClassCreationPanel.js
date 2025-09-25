import React, { useState } from 'react';
import './ClassCreationPanel.css';

export const ClassCreationPanel = ({ isOpen, onClose, onCreateClass }) => {
  const [className, setClassName] = useState('');
  const [dataMembers, setDataMembers] = useState([]);
  const [operations, setOperations] = useState([]);
  const [showDataMemberForm, setShowDataMemberForm] = useState(false);
  const [showOperationForm, setShowOperationForm] = useState(false);
  
  // Data Member Form State
  const [dataMember, setDataMember] = useState({
    name: '',
    type: '',
    visibility: 'private'
  });
  
  // Operation Form State
  const [operation, setOperation] = useState({
    name: '',
    returnType: 'void',
    parameters: '',
    visibility: 'public'
  });

  const resetForms = () => {
    setClassName('');
    setDataMembers([]);
    setOperations([]);
    setShowDataMemberForm(false);
    setShowOperationForm(false);
    setDataMember({ name: '', type: '', visibility: 'private' });
    setOperation({ name: '', returnType: 'void', parameters: '', visibility: 'public' });
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  const addDataMember = () => {
    if (dataMember.name && dataMember.type) {
      const visibilitySymbol = dataMember.visibility === 'private' ? '-' : 
                              dataMember.visibility === 'protected' ? '#' : '+';
      const newDataMember = `${visibilitySymbol} ${dataMember.name}: ${dataMember.type}`;
      
      setDataMembers(prev => [...prev, newDataMember]);
      setDataMember({ name: '', type: '', visibility: 'private' });
      setShowDataMemberForm(false);
    }
  };

  const addOperation = () => {
    if (operation.name) {
      const visibilitySymbol = operation.visibility === 'private' ? '-' : 
                              operation.visibility === 'protected' ? '#' : '+';
      const params = operation.parameters ? operation.parameters : '';
      const newOperation = `${visibilitySymbol} ${operation.name}(${params}): ${operation.returnType}`;
      
      setOperations(prev => [...prev, newOperation]);
      setOperation({ name: '', returnType: 'void', parameters: '', visibility: 'public' });
      setShowOperationForm(false);
    }
  };

  const removeDataMember = (index) => {
    setDataMembers(prev => prev.filter((_, i) => i !== index));
  };

  const removeOperation = (index) => {
    setOperations(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateClass = () => {
    if (className.trim()) {
      const newClass = {
        name: className,
        attributes: dataMembers.length > 0 ? dataMembers : ['- id: number'],
        methods: operations.length > 0 ? operations : ['+ constructor()']
      };
      onCreateClass(newClass);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="class-creation-overlay">
      <div className="class-creation-panel">
        <div className="panel-header">
          <h2 className="panel-title">Create UML Class</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>

        <div className="panel-content">
          {/* Class Name Section */}
          <div className="form-section">
            <label className="form-label">Class Name *</label>
            <input
              type="text"
              className="form-input"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Enter class name"
            />
          </div>

          {/* Data Members Section */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">Data Members</h3>
              <button
                className="add-button"
                onClick={() => setShowDataMemberForm(true)}
                disabled={showDataMemberForm}
              >
                + Add Data Member
              </button>
            </div>

            {showDataMemberForm && (
              <div className="form-popup">
                <div className="form-row">
                  <input
                    type="text"
                    className="form-input small"
                    placeholder="Name"
                    value={dataMember.name}
                    onChange={(e) => setDataMember(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <input
                    type="text"
                    className="form-input small"
                    placeholder="Type"
                    value={dataMember.type}
                    onChange={(e) => setDataMember(prev => ({ ...prev, type: e.target.value }))}
                  />
                  <select
                    className="form-select small"
                    value={dataMember.visibility}
                    onChange={(e) => setDataMember(prev => ({ ...prev, visibility: e.target.value }))}
                  >
                    <option value="private">Private (-)</option>
                    <option value="protected">Protected (#)</option>
                    <option value="public">Public (+)</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button className="save-button" onClick={addDataMember}>Save</button>
                  <button className="cancel-button" onClick={() => setShowDataMemberForm(false)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="items-list">
              {dataMembers.map((member, index) => (
                <div key={index} className="list-item">
                  <span className="item-text">{member}</span>
                  <button 
                    className="remove-button"
                    onClick={() => removeDataMember(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Operations Section */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">Operations</h3>
              <button
                className="add-button"
                onClick={() => setShowOperationForm(true)}
                disabled={showOperationForm}
              >
                + Add Operation
              </button>
            </div>

            {showOperationForm && (
              <div className="form-popup">
                <div className="form-row">
                  <input
                    type="text"
                    className="form-input small"
                    placeholder="Method Name"
                    value={operation.name}
                    onChange={(e) => setOperation(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <input
                    type="text"
                    className="form-input small"
                    placeholder="Return Type"
                    value={operation.returnType}
                    onChange={(e) => setOperation(prev => ({ ...prev, returnType: e.target.value }))}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    className="form-input medium"
                    placeholder="Parameters (e.g., name: string, age: number)"
                    value={operation.parameters}
                    onChange={(e) => setOperation(prev => ({ ...prev, parameters: e.target.value }))}
                  />
                  <select
                    className="form-select small"
                    value={operation.visibility}
                    onChange={(e) => setOperation(prev => ({ ...prev, visibility: e.target.value }))}
                  >
                    <option value="public">Public (+)</option>
                    <option value="private">Private (-)</option>
                    <option value="protected">Protected (#)</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button className="save-button" onClick={addOperation}>Save</button>
                  <button className="cancel-button" onClick={() => setShowOperationForm(false)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="items-list">
              {operations.map((op, index) => (
                <div key={index} className="list-item">
                  <span className="item-text">{op}</span>
                  <button 
                    className="remove-button"
                    onClick={() => removeOperation(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel-footer">
          <button className="cancel-button" onClick={handleClose}>Cancel</button>
          <button 
            className="create-button"
            onClick={handleCreateClass}
            disabled={!className.trim()}
          >
            Create Class
          </button>
        </div>
      </div>
    </div>
  );
};