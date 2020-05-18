import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TextField from '../../../components/TextField';
import TimedAlert from '../../../components/TimedAlert';
import api from '../../../request';

const Section = ({ token }) => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(null);
  const [idDelete, setIdDelete] = useState(0);
  const [idCampus, setIdCampus] = useState(0);
  const [idBuilding, setIdBuilding] = useState(0);
  const [idClassroom, setIdClassroom] = useState(0);
  const [idSemester, setIdSemester] = useState(0);
  const [idClass, setIdClass] = useState(0);
  const [idStartTime, setIdStartTime] = useState(0);
  const [idFinishTime, setIdFinishTime] = useState(0);
  const [idProfessor, setIdProfessor] = useState(0);
  const [comments, setComments] = useState('');
  const [campusList, setCampusList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [classroomList, setClassroomList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [professorList, setProfessorList] = useState([]);

  useEffect(() => {
    const ac = new AbortController();

    api('/section/extra', 'get', undefined, token, ac.signal)
      .then(res => setList(res.data))
      .catch(err => console.log(err));

    api('/campus/select', 'get', undefined, undefined, ac.signal)
      .then(res => setCampusList(res.data))
      .catch(err => console.log(err));

    api('/semester/select', 'get', undefined, token, ac.signal)
      .then(res => setSemesterList(res.data))
      .catch(err => console.log(err));

    api('/class/select', 'get', undefined, undefined, ac.signal)
      .then(res => setClassList(res.data))
      .catch(err => console.log(err));

    api('/schedule/select', 'get', undefined, undefined, ac.signal)
      .then(res => setTimeList(res.data))
      .catch(err => console.log(err));

    api('/professor/select', 'get', undefined, token, ac.signal)
      .then(res => setProfessorList(res.data))
      .catch(err => console.log(err));

      return () => ac.abort();
  }, []);

  useEffect(() => {
    if (idCampus) {
      const ac = new AbortController();
      api(`/building/select/${idCampus}`, 'get', undefined, undefined, ac.signal)
        .then(res => setBuildingList(res.data))
        .catch(err => console.log(err));
        return () => ac.abort();
    } else {
      setBuildingList([]);
      setIdBuilding(0);
      setClassroomList([]);
      setIdClassroom(0);
    }
  }, [idCampus]);

  useEffect(() => {
    if (idBuilding) {
      const ac = new AbortController();
      api(`/classroom/select/${idBuilding}`, 'get', undefined, undefined, ac.signal)
        .then(res => setClassroomList(res.data))
        .catch(err => console.log(err));
        return () => ac.abort();
    } else {
      setClassroomList([]);
      setIdClassroom(0);
    }
  }, [idBuilding]);

  const remove = async id => {
    if (idDelete) {
      // confirmed
      try {
        await api(`/section/${idDelete}`, 'delete', undefined, token);
        setList(list.filter(item => item.idSection !== idDelete));
        setAlert('success');
      } catch (err) {
        setAlert(err.message);
      }
      setIdDelete(0);
    } else {
      setIdDelete(id);
    }
  };

  const submit = async event => {
    event.preventDefault();
    try {
      const payload = {
        idSemester,
        idClass,
        idClassroom,
        idStartTime,
        idFinishTime,
        idProfessor,
        comments,
      };
      const res = await api('/section', 'post', payload, token);
      const classroom = classroomList.find(item => item.id === Number(idClassroom)).val;
      const alias = classroom.split('Aula: ')[1].split(',')[0];

      // TODO
      const days = {
        idSection: res.id,
        idDays: [2, 3, 4, 5, 6],
      };
      const daysString = 'LuMaMiJu';
      await api('/section/days', 'post', days, token);

      setList([...list, {
        idSection: res.id,
        idSemester,
        idCampus,
        campus: campusList.find(item => item.id === Number(idCampus)).val,
        idBuilding,
        building: buildingList.find(item => item.id === Number(idBuilding)).val,
        idClassroom,
        classroom: alias,
        idClass,
        classCode: classList.find(item => item.id === Number(idClass)).val.split(' - ')[0],
        idStartTime,
        startTime: timeList.find(item => item.id === Number(idStartTime)).val,
        idFinishTime,
        finishTime: timeList.find(item => item.id === Number(idFinishTime)).val,
        idProfessor,
        professor: professorList.find(item => item.id === Number(idProfessor)).val,
        days: daysString,
        comments,
      }]);

      setAlert('success');
      setIdClassroom(0);
      setIdSemester(0);
      setIdClass(0);
      setIdStartTime(0);
      setIdFinishTime(0);
      setIdProfessor(0);
      setComments('');
    } catch (err) {
      setAlert(err.message);
    }
  };

  return (
    <div className="container-fluid fade-in">
      <TimedAlert
        className="mb-4"
        type={alert}
        reset={() => setAlert(null)}
        success="Operación realizada con éxito!"
      />
      <h3 className="mb-4">
        Secciones
        <br />
        <small className="text-muted">Modificar datos de secciones</small>
      </h3>

      <Form onSubmit={submit}>
        <div className="row">
          <div className="col-lg-6">
            {/* Semester */}
            <Form.Group controlId="section-semester">
              <Form.Label>Semestre</Form.Label>
              <Form.Control
                as="select"
                value={idSemester}
                onChange={e => setIdSemester(e.target.value)}
                required
                custom
              >
                <option value="">Selecciona una opción</option>
                {semesterList.map(({ id, val }) => (
                  <option key={id} value={id}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            {/* Campus */}
            <Form.Group controlId="section-campus">
              <Form.Label>Campus</Form.Label>
              <Form.Control
                as="select"
                value={idCampus}
                onChange={e => setIdCampus(e.target.value)}
                required
                custom
              >
                <option value="">Selecciona una opción</option>
                {campusList.map(({ id, val }) => (
                  <option key={id} value={id}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-lg-6">
            {/* Building */}
            <Form.Group controlId="section-building">
              <Form.Label>Edificio</Form.Label>
              <Form.Control
                as="select"
                value={idBuilding}
                disabled={!idCampus}
                onChange={e => setIdBuilding(e.target.value)}
                required
                custom
              >
                <option value="">Selecciona una opción</option>
                {buildingList.map(({ id, val }) => (
                  <option key={id} value={id}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            {/* Classroom */}
            <Form.Group controlId="section-classroom">
              <Form.Label>Aula de clases</Form.Label>
              <Form.Control
                as="select"
                value={idClassroom}
                disabled={!idBuilding}
                onChange={e => setIdClassroom(e.target.value)}
                required
                custom
              >
                <option value="">Selecciona una opción</option>
                {classroomList.map(({ id, val }) => (
                  <option key={id} value={id}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-lg-6">
            {/* Class */}
            <Form.Group controlId="section-class">
              <Form.Label>Clase</Form.Label>
              <Form.Control
                as="select"
                value={idClass}
                onChange={e => setIdClass(e.target.value)}
                required
                custom
              >
                <option value="">Selecciona una opción</option>
                {classList.map(({ id, val }) => (
                  <option key={id} value={id}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            {/* Start time */}
            <Form.Group controlId="section-start">
              <Form.Label>Hora de inicio</Form.Label>
              <Form.Control
                as="select"
                value={idStartTime}
                onChange={e => setIdStartTime(e.target.value)}
                required
                custom
              >
                <option value="">Selecciona una opción</option>
                {timeList.map(({ id, val }) => (
                  <option key={id} value={id}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-lg-6">
            {/* Finish time */}
            <Form.Group controlId="section-finish">
              <Form.Label>Hora de finalizado</Form.Label>
              <Form.Control
                as="select"
                value={idFinishTime}
                onChange={e => setIdFinishTime(e.target.value)}
                required
                custom
              >
                <option value="">Selecciona una opción</option>
                {timeList.map(({ id, val }) => (
                  <option key={id} value={id}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            {/* Professor */}
            <Form.Group controlId="section-professor">
              <Form.Label>Profesor</Form.Label>
              <Form.Control
                as="select"
                value={idProfessor}
                onChange={e => setIdProfessor(e.target.value)}
                required
                custom
              >
                <option value="">Selecciona una opción</option>
                {professorList.map(({ id, val }) => (
                  <option key={id} value={id}>{val}</option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">
                Profesor que imparte la sección
              </Form.Text>
            </Form.Group>
          </div>
          <div className="col-lg-6">
            {/* Comments */}
            <TextField
              id="section-comments"
              type="text"
              label="Comentarios"
              value={comments}
              onChange={e => setComments(e.target.value)}
              tooltip="Comentarios de la seccion, ej: Compartida con MAT111"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <Button type="submit" variant="primary" className="my-3" block>
              Crear sección
            </Button>
          </div>
        </div>
      </Form>

      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>Acciones</th>
            <th>Código</th>
            <th>Hora</th>
            <th>Campus</th>
            <th>Aula</th>
            <th>Días</th>
            <th>Catedrático</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.idSection}>
              <td style={{ width: '92px' }}>
                <Button
                  className="mx-1"
                  variant="danger"
                  size="sm"
                  onClick={() => remove(item.idSection)}
                >
                  Eliminar
                </Button>
              </td>
              <td>{item.classCode}</td>
              <td>{item.startTime} - {item.finishTime}</td>
              <td>{item.campus}</td>
              <td>{item.classroom}/{item.building}</td>
              <td>{item.days}</td>
              <td>{item.professor}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal delete item */}
      <Modal
        show={idDelete ? true : false}
        onHide={() => setIdDelete(0)}
        aria-labelledby="modal-section"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-section">
            Confirmación eliminar sección
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás segur@ de que deseas eliminar la sección? Una vez eliminada, no podrá ser recuperada.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIdDelete(0)}>
            Volver
          </Button>
          <Button variant="danger" onClick={() => remove(idDelete)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({ token: state.auth.token });

export default connect(mapStateToProps)(Section);
