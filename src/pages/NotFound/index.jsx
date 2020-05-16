import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="crosshair">
      <h3 className="text-center p-5">
        Página no encontrada
        <br />
        <Link to="/">
          <small className="text-muted">Volver</small>
        </Link>
      </h3>
    </div>
  );
};

export default NotFound;
