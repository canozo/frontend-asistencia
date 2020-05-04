import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';

const About = () => {
  return (
    <div id="about-root">
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Volver</span>
        </Link>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 p-5">
            Sobre el proyecto
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
