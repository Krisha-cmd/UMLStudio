// UML Class structure - no longer using TypeScript interfaces
// This file now just exports utility functions for creating UML classes

export const createUMLClass = (id, name, attributes = [], methods = [], position = { x: 0, y: 0 }) => {
  return {
    id,
    name,
    attributes,
    methods,
    position
  };
};