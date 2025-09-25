import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { ZoomableCanvas } from './components/ZoomableCanvas';
import { UMLClassShape } from './components/UMLClassShape';
import { SidePanel } from './components/SidePanel';

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f0f2f5;
`;

const CanvasArea = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
`;

const App = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);

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

  return (
    <AppContainer>
      <SidePanel 
        onAddClass={addNewClass}
        onClearCanvas={clearCanvas}
      />
      <CanvasArea onClick={handleCanvasClick}>
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
      </CanvasArea>
    </AppContainer>
  );
};

export default App;