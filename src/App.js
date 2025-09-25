import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { ZoomableCanvas } from './components/ZoomableCanvas';
import { UMLClassShape } from './components/UMLClassShape';
import { SidePanel } from './components/SidePanel';
import { RightSidePanel } from './components/RightSidePanel';

const App = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isClassCreationMode, setIsClassCreationMode] = useState(false);

  const addNewClass = () => {
    const newClass = {
      id: uuidv4(),
      name: 'NewClass',
      attributes: [
        '- id: number',
        '- name: string'
      ],
      methods: [
        '+ constructor()',
        '+ getId(): number',
        '+ getName(): string',
        '+ setName(name: string): void'
      ],
      position: { 
        x: Math.random() * 300 + 50, 
        y: Math.random() * 200 + 50 
      }
    };

    setClasses(prev => [...prev, newClass]);
    setSelectedClassId(newClass.id);
  };

  const updateClass = (updatedClass) => {
    setClasses(prev =>
      prev.map(cls => cls.id === updatedClass.id ? updatedClass : cls)
    );
  };

  const selectClass = (id) => {
    setSelectedClassId(id);
    setIsClassCreationMode(true); // Open side panel when class is selected
  };

  const createClassFromPanel = (classData) => {
    const newClass = {
      id: uuidv4(),
      name: classData.name,
      attributes: classData.attributes,
      methods: classData.methods,
      position: { 
        x: Math.random() * 300 + 50, 
        y: Math.random() * 200 + 50 
      }
    };

    setClasses(prev => [...prev, newClass]);
    setSelectedClassId(newClass.id);
  };

  const clearCanvas = () => {
    if (window.confirm('Are you sure you want to clear all classes from the canvas?')) {
      setClasses([]);
      setSelectedClassId(null);
    }
  };

  const handleCanvasClick = (e) => {
    // Deselect when clicking on empty canvas
    if (e.target === e.currentTarget) {
      setSelectedClassId(null);
    }
  };

  const toggleClassCreation = () => {
    setIsClassCreationMode(!isClassCreationMode);
  };

  return (
    <div className="app-container">
      <SidePanel 
        onClearCanvas={clearCanvas}
        onCreateClass={createClassFromPanel}
        isVisible={isClassCreationMode}
        onClose={() => setIsClassCreationMode(false)}
        selectedClass={classes.find(cls => cls.id === selectedClassId)}
        onUpdateClass={updateClass}
      />
      <div className="canvas-area" onClick={handleCanvasClick}>
        <ZoomableCanvas>
          {classes.map(umlClass => (
            <UMLClassShape
              key={umlClass.id}
              umlClass={umlClass}
              onUpdate={updateClass}
              onSelect={selectClass}
              isSelected={selectedClassId === umlClass.id}
            />
          ))}
        </ZoomableCanvas>
      </div>
      <RightSidePanel 
        onToggleClassCreation={toggleClassCreation}
        isCreating={isClassCreationMode}
      />
    </div>
  );
};

export default App;