import React from 'react';
import config from '../../../config';

/**
 * Create a new campus
 * @route POST /api/campus
 * @permissions admin
 * @body {string} campus
 * @body {string} alias
 */

const Campus = () => {
  return (
    <div className="container-fluid fade-in">
      <h3 className="mb-4">
        Campus
        <br />
        <small className="text-muted">Modificar datos de campus universitarios</small>
      </h3>

      <div className="row">
        <div className="col-lg-6">
          {/* Names */}
          <TextField
            id="profile-names"
            type="text"
            label="Nombres"
            required
            value={names}
            onChange={e => setNames(e.target.value)}
          />
        </div>
        <div className="col-lg-6">
          {/* Surnames */}
          <TextField
            id="profile-surnames"
            type="text"
            label="Apellidos"
            required
            value={surnames}
            onChange={e => setSurnames(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Campus;
