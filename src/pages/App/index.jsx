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

const App = ({ dispatch, logged }) => {
  if (!logged) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    dispatch(verify());
  }, []);

  return (
    <div className="h-100">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#">Asistencia UNITEC</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mr-auto">
            <NavDropdown title="Javier Edgardo Cano Deras" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Separated</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Link to="/logout">
            <Navbar.Text>
              Cerrar sesión
            </Navbar.Text>
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/app" component={Gateway} />
        <Route path="/app/admin" component={Admin} />
        <Route path="/app/student" component={Student} />
        <Route path="/app/professor" component={Professor} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({ logged: state.auth.logged });

export default connect(mapStateToProps)(App);
