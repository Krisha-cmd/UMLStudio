import React from 'react';
import ReactDOM from 'react-dom/client';

// Simple test component
const TestApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>UML Studio Test</h1>
      <p>If you see this, React is working correctly!</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TestApp />);