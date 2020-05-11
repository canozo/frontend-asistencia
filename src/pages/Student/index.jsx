import React from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import Welcome from '../../components/Welcome';
import Profile from '../Profile';

const home = '/app/student';

const menu = [{
  to: '/section',
  icon: 'library_books',
  title: 'Secciones matriculadas',
}, {
  to: '/history',
  icon: 'assignment_turned_in',
  title: 'Historial de asistencia',
}, {
  to: '/upload',
  icon: 'face',
  title: 'Cargar imagen de rostro',
}, {
  to: '/presencial',
  icon: 'event_note',
  title: 'Secciones presencial',
}];

const Student = () => {
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
          <Switch>
            <Route exact path={home} component={Welcome} />
            <Route path={`${home}/profile`} component={Profile} />
            <Route path={`${home}/section`} component={() => <h3>Sections</h3>} />
            <Route path={`${home}/history`} component={() => <h3>History</h3>} />
            <Route path={`${home}/upload`} component={() => <h3>Upload</h3>} />
            <Route path={`${home}/presencial`} component={() => <h3>Presencial</h3>} />
            <Route component={Welcome} />
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Student;
