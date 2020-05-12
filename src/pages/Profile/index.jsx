import React from 'react';
import Password from './Password';
import Update from './Update';

const Profile = () => (
  <div className="container-fluid fade-in">
    <h3 className="mb-4">
      Perfil de Usuario
      <br />
      <small className="text-muted">Modifica datos de tu perfil</small>
    </h3>

    {/* Update Profile */}
    <Update />

    {/* Update password */}
    <Password />
  </div>
);

export default Profile;
