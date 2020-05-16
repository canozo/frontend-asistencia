import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { verify } from '../../redux/modules/auth';
import { AdminDropdown } from '../Admin';
import { StudentDropdown } from '../Student';
import { ProfessorDropdown } from '../Professor';
import { CameraDropdown } from '../Camera';
import Loading from '../../components/Loading';
import Gateway from './Gateway';
import NotFound from '../NotFound';
import './App.scss';

const Admin = React.lazy(() => import('../Admin'));
const Student = React.lazy(() => import('../Student'));
const Professor = React.lazy(() => import('../Professor'));
const Camera = React.lazy(() => import('../Camera'));

const home = '/app';

const App = ({ dispatch, logged, userType, names, surnames }) => {
  if (!logged) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    dispatch(verify());
  }, []);

  return (
    <div className="h-100 position-relative">
      <Navbar bg="dark" variant="dark" className="shadow p-0" expand="lg">
        <Navbar.Brand className="col-6 col-md-3 col-lg-2 mr-0" href="#">
          Asistencia UNITEC
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" className="mr-1" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mr-auto ml-3 d-none d-lg-block">
            <Link to={`${home}/${userType}/profile`}>
              <Navbar.Text>
                {names} {surnames}
              </Navbar.Text>
            </Link>
          </Nav>
          <Nav className="mr-3 ml-3 d-lg-none">
            <NavDropdown title={`${names} ${surnames}`} id="basic-nav-dropdown">
              <Link to={`${home}/${userType}/profile`}>
                <NavDropdown.Item className="menu-mobile" as="button">
                  <i className="material-icons icon">
                    account_circle
                  </i>
                  Perfil
                </NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <Switch>
                <Route path={`${home}/admin`} component={AdminDropdown} />
                <Route path={`${home}/student`} component={StudentDropdown} />
                <Route path={`${home}/professor`} component={ProfessorDropdown} />
                <Route path={`${home}/camera`} component={CameraDropdown} />
              </Switch>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end px-3">
          <Link to="/logout">
            <Navbar.Text>
              Cerrar sesión
            </Navbar.Text>
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <Suspense fallback={Loading()}>
        <Switch>
          <Route exact path={home} component={Gateway} />
          <Route path={`${home}/admin`} component={Admin} />
          <Route path={`${home}/student`} component={Student} />
          <Route path={`${home}/professor`} component={Professor} />
          <Route path={`${home}/camera`} component={Camera} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
};

const mapStateToProps = state => ({
  logged: state.auth.logged,
  userType: state.auth.userType,
  names: state.auth.names,
  surnames: state.auth.surnames,
});

export default connect(mapStateToProps)(App);
