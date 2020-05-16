import React from 'react';

export default () => (
  <div className="crosshair">
    <div
      className="spinner-border text-primary"
      style={{ height: '5rem', width: '5rem' }}
      role="status"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  </div>
);
