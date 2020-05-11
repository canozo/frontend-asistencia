import React from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import Welcome from '../../components/Welcome';
import Profile from '../Profile';

const home = '/app/admin';

const menu = [{
  division: 'Universidad',
}, {
  to: '/campus',
  icon: 'location_city',
  title: 'Campus',
}, {
  to: '/building',
  icon: 'domain',
  title: 'Edificios',
}, {
  to: '/classroom',
  icon: 'event_seat',
  title: 'Aulas de clase',
}, {
  division: 'Carga académica',
}, {
  to: '/semester',
  icon: 'date_range',
  title: 'Semestres',
}, {
  to: '/class',
  icon: 'class',
  title: 'Clases',
}, {
  to: '/section',
  icon: 'schedule',
  title: 'Secciones',
}, {
  division: 'Usuarios',
}, {
  to: '/student',
  icon: 'school',
  title: 'Estudiantes',
}, {
  to: '/professor',
  icon: 'account_box',
  title: 'Profesores',
}, {
  to: '/personnel',
  icon: 'portrait',
  title: 'Personal administrativo',
}, {
  to: '/camera',
  icon: 'photo_camera',
  title: 'Camaras',
}, {
  division: 'Otros',
}, {
  to: '/presencial',
  icon: 'event_note',
  title: 'Secciones presencial',
}];

const Admin = () => {
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
            <Route path={`${home}/campus`} component={() => <h3>/campus</h3>} />
            <Route path={`${home}/building`} component={() => <h3>/building</h3>} />
            <Route path={`${home}/classroom`} component={() => <h3>/classroom</h3>} />
            <Route path={`${home}/semester`} component={() => <h3>/semester</h3>} />
            <Route path={`${home}/class`} component={() => <h3>/class</h3>} />
            <Route path={`${home}/section`} component={() => <h3>/section</h3>} />
            <Route path={`${home}/student`} component={() => <h3>/student</h3>} />
            <Route path={`${home}/professor`} component={() => <h3>/professor</h3>} />
            <Route path={`${home}/personnel`} component={() => <h3>/personnel</h3>} />
            <Route path={`${home}/camera`} component={() => <h3>/camera</h3>} />
            <Route path={`${home}/presencial`} component={() => <h3>/presencial</h3>} />
            <Route component={Welcome} />
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Admin;
