import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div id="not-found-container">
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
