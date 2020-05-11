import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { verify } from '../../redux/modules/auth';
import Gateway from './Gateway';
import NotFound from '../NotFound';
import Admin from '../Admin';
import Student from '../Student';
import Professor from '../Professor';
import './App.scss';

const home = '/app';

const App = ({ dispatch, logged, names, surnames }) => {
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
            <Navbar.Text>{names} {surnames}</Navbar.Text>
          </Nav>
          <Nav className="mr-3 ml-3 d-lg-none">
            <NavDropdown title={`${names} ${surnames}`} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Separated</NavDropdown.Item>
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
      <Switch>
        <Route exact path={home} component={Gateway} />
        <Route path={`${home}/admin`} component={Admin} />
        <Route path={`${home}/student`} component={Student} />
        <Route path={`${home}/professor`} component={Professor} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  logged: state.auth.logged,
  names: state.auth.names,
  surnames: state.auth.surnames,
});

export default connect(mapStateToProps)(App);
