import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './ZoomableCanvas.css';
import { GridCanvas } from './GridCanvas.js';

export const ZoomableCanvas = ({ children }) => {
  const [currentZoom, setCurrentZoom] = useState(1);

  return (
    <div className="zoom-container">
      <TransformWrapper
        initialScale={1}
        minScale={0.1}
        maxScale={3}
        limitToBounds={false}
        centerOnInit
        wheel={{ step: 0.1 }}
        panning={{ disabled: false }}
        onTransformed={(ref) => {
          setCurrentZoom(ref.state.scale);
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="zoom-controls">
              <button className="zoom-button" onClick={() => zoomIn()}>+</button>
              <button className="zoom-button" onClick={() => zoomOut()}>−</button>
              <button className="zoom-button" onClick={() => resetTransform()}>⌂</button>
            </div>
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
              }}
              contentStyle={{
                width: '100%',
                height: '100%',
              }}
            >
              <GridCanvas zoom={currentZoom}>
                {children}
              </GridCanvas>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};