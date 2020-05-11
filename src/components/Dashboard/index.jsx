import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = ({ menu, home, children }) => {
  const location = useLocation();
  const active = location.pathname.split(home)[1];

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-lg-block bg-light sidebar p-0">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              {menu.map(({ division, to, icon, title }) => division ? (
                <h6 key={division} className="sidebar-heading px-3 mt-4 mb-1 text-muted">
                  {division}
                </h6>
              ) : (
                <li key={to} className="nav-item hover-highlight">
                  <Link className={`nav-link ${active === to ? 'active' : ''}`} to={`${home}${to}`}>
                    <i className="material-icons icon">
                      {icon}
                    </i>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <main role="main" className="mt-3 col-lg-10 px-4">
          {children}
        </main>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  menu: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
    const prop = propValue[key];
    if (!(prop instanceof Object)) {
      return new Error(`Invalid prop \`${propFullName}\`, is not an Object.`);
    }
    if (!prop.hasOwnProperty('division')) {
      let missing = 3;
      const keys = ['to', 'icon', 'title'];
      Object.keys(prop).forEach((key) => {
        if (keys.includes(key)) {
          missing -= 1;
        }
      });
      if (missing) {
        return new Error(`Invalid prop \`${propFullName}\`, must include key \`division\` OR keys \`to\`, \`icon\`, \`title\`.`);
      }
    }
  }),
  home: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Dashboard;
