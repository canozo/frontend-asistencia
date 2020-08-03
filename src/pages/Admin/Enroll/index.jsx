import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TimedAlert from '../../../components/TimedAlert';
import api from '../../../request';

const Enroll = ({ token }) => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(null);
  const [idEnroll, setIdEnroll] = useState(0);
  const [idDelete, setIdDelete] = useState(0);
  const [idSemester, setIdSemester] = useState(0);
  const [idSection, setIdSection] = useState(0);
  const [semesterList, setSemesterList] = useState([]);
  const [sectionList, setSectionList] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    api('/student', 'get', undefined, token, ac.signal)
      .then(res => setList(res.data))
      .catch(err => console.log(err));

    api('/semester/select', 'get', undefined, token, ac.signal)
      .then(res => setSemesterList(res.data))
      .catch(err => console.log(err));

    return () => ac.abort();
  }, []);

  useEffect(() => {
    if (idSemester) {
      const ac = new AbortController();
      api(`/section/select/${idSemester}`, 'get', undefined, token, ac.signal)
        .then(res => setSectionList(res.data))
        .catch(err => console.log(err));
      return () => ac.abort();
    } else {
      setIdSection(0);
      setSectionList([]);
    }
  }, [idSemester]);

  useEffect(() => {
    if (idDelete) {
      const ac = new AbortController();
      api(`/student/select/${idDelete}`, 'get', undefined, token, ac.signal)
        .then(res => setSectionList(res.data))
        .catch(err => console.log(err));
      return () => ac.abort();
    } else {
      setIdSection(0);
      setSectionList([]);
    }
  }, [idDelete]);

  const enroll = async event => {
    event.preventDefault();
    try {
      await api('/section/student', 'post', { idSection, idStudent: idEnroll }, token);
      setIdEnroll(0);
      setIdSemester(0);
      setIdSection(0);
      setSectionList([]);
      setAlert('success');
    } catch (err) {
      setAlert(err.message);
    }
  };

  const remove = async event => {
    event.preventDefault();
    try {
      await api('/section/student', 'delete', { idSection, idStudent: idDelete }, token);
      setIdDelete(0);
      setIdSection(0);
      setSectionList([]);
      setAlert('success');
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
        Matricular estudiantes
        <br />
        <small className="text-muted">Agregar o eliminar a estudiantes de secciones</small>
      </h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Acciones</th>
            <th>#</th>
            <th>Estudiante</th>
            <th>Correo</th>
            <th>Número de cuenta</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.idUser}>
              <td className="action-long">
                <Button
                  className="mx-1"
                  variant="dark"
                  size="sm"
                  onClick={() => setIdEnroll(item.idUser)}
                >
                  Matricular
                </Button>
                <Button
                  className="mx-1"
                  variant="danger"
                  size="sm"
                  onClick={() => setIdDelete(item.idUser)}
                >
                  Eliminar
                </Button>
              </td>
              <td>{item.idUser}</td>
              <td>{item.names} {item.surnames}</td>
              <td>{item.email}</td>
              <td>{item.accountNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal add student */}
      <Modal
        show={idEnroll ? true : false}
        onHide={() => setIdEnroll(0)}
        aria-labelledby="modal-add-student"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-add-student">
            Matricular estudiante
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={enroll}>
            {/* Select semester */}
            <Form.Group controlId="enroll-semester">
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
            {/* Select section */}
            <Form.Group controlId="enroll-section">
              <Form.Label>Sección</Form.Label>
              <Form.Control
                as="select"
                value={idSection}
                disabled={!idSemester}
                onChange={e => setIdSection(e.target.value)}
                required
                custom
              >
                <option value="">Selecciona una opción</option>
                {sectionList.map(({ id, val }) => (
                  <option key={id} value={id}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIdEnroll(0)}>
                Volver
              </Button>
              <Button type="submit" variant="primary">
                Agregar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal remove student */}
      <Modal
        show={idDelete ? true : false}
        onHide={() => setIdDelete(0)}
        aria-labelledby="modal-rem-student"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-rem-student">
            Modificar matricula
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={remove}>
            {/* Select section */}
            <Form.Group controlId="remove-section">
              <Form.Label>Sección</Form.Label>
              <Form.Control
                as="select"
                value={idSection}
                onChange={e => setIdSection(e.target.value)}
                required
                custom
              >
                <option value="">Selecciona una opción</option>
                {sectionList.map(({ id, val }) => (
                  <option key={id} value={id}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIdDelete(0)}>
                Volver
              </Button>
              <Button type="submit" variant="danger">
                Eliminar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({ token: state.auth.token });

export default connect(mapStateToProps)(Enroll);
