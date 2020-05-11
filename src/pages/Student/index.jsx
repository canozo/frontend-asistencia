import React from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import Welcome from '../../components/Welcome';

const home = '/app/student';

const menu = [{
  to: '/sections',
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
              {menu.map(({ to, icon, title }) => (
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
            <Route path={`${home}/sections`} component={() => <h3>Sections</h3>} />
            <Route path={`${home}/history`} component={() => <h3>History</h3>} />
            <Route path={`${home}/upload`} component={() => <h3>Upload</h3>} />
            <Route component={Welcome} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default Student;
