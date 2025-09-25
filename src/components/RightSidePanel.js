import React from 'react';
import './RightSidePanel.css';

export const RightSidePanel = ({ onToggleClassCreation, isCreating }) => {
  return (
    <div className="right-panel-container">
      <div className="right-panel-content">
        <h3 className="right-panel-title">Quick Actions</h3>
        
        <div className="quick-actions">
          <button 
            className="primary-action-button" 
            onClick={onToggleClassCreation}
          >
            <span className="button-text">
              {isCreating ? 'Hide Class Form' : 'Create Class'}
            </span>
          </button>
        </div>
        
        <div className="panel-info">
          <div className="info-item">
            <span className="info-icon">💡</span>
            <span className="info-text">
              {isCreating 
                ? 'Use the left panel to create your UML class with attributes and methods'
                : 'Click "Create Class" to build a detailed UML class'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};