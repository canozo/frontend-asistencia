import React, { useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isOpen } from '../../redux/modules/attendance';
import MobileItem from '../../components/MobileItem';
import Dashboard from '../../components/Dashboard';
import Welcome from '../../components/Welcome';
import Profile from '../Profile';
import Sections from '../Sections';
import Attendance from './Attendance';
import Alert from 'react-bootstrap/Alert';

const home = '/app/professor';

const menu = [{
  to: '/attendance',
  icon: 'assignment_turned_in',
  title: 'Abrir asistencia',
}, {
  to: '/presencial',
  icon: 'event_note',
  title: 'Secciones presencial',
}];

const MainComponent = ({ dispatch, open, idAttendanceLog }) => {
  useEffect(() => {
    const ac = new AbortController();
    dispatch(isOpen(ac.signal))
      .catch(err => console.log(err));
    return () => ac.abort();
  }, []);

  return (
    <Dashboard menu={menu} home={home}>
      <Alert className="fade-in" show={open} variant="primary">
        Tienes una sesión de asistencia abierta, haz clic{' '}
        <Alert.Link as="span">
          <Link to={`${home}/attendance/${idAttendanceLog}`}>aquí</Link>
        </Alert.Link>
        {' '}para ver la lista.
      </Alert>
      <Switch>
        <Route exact path={home} component={Welcome} />
        <Route path={`${home}/profile`} component={Profile} />
        <Route path={`${home}/attendance`} component={Attendance} />
        <Route path={`${home}/presencial`} component={Sections} />
        <Route component={Welcome} />
      </Switch>
    </Dashboard>
  );
};

const mapStateToProps = state => ({
  open: state.attendance.open,
  idAttendanceLog: state.attendance.idAttendanceLog,
});

const Professor = connect(mapStateToProps)(MainComponent);
const ProfessorDropdown = () => <MobileItem menu={menu} home={home} />;

export default Professor;

export {
  Professor,
  ProfessorDropdown,
};
