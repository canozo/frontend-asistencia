import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TextField from '../../../components/TextField';
import TimedAlert from '../../../components/TimedAlert';
import api from '../../../request';

const Semester = ({ token }) => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(null);
  const [idUpdate, setIdUpdate] = useState('');
  const [idDelete, setIdDelete] = useState('');
  const [active, setActive] = useState(false);
  const [alias, setAlias] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    api('/semester', 'get', undefined, token, ac.signal)
      .then(res => setList(res.data))
      .catch(err => console.log(err));
    return () => ac.abort();
  }, []);

  const remove = async id => {
    if (idDelete) {
      // confirmed
      try {
        await api(`/semester/${idDelete}`, 'delete', undefined, token);
        setList(list.filter(item => item.idSemester !== idDelete));
        setAlert('success');
      } catch (err) {
        setAlert(err.message);
      }
      setIdDelete('');
    } else {
      setIdDelete(id);
    }
  };

  const update = item => {
    setIdUpdate(item.idSemester);
    setAlias(item.alias);
    setActive(Boolean(item.active));
  };

  const cancel = () => {
    setIdUpdate('');
    setAlias('');
    setActive(false);
  };

  const submit = async event => {
    event.preventDefault();
    try {
      // check if updating for inserting new
      if (idUpdate) {
        await api(`/semester/${idUpdate}`, 'put', { active, alias }, token);
        setList(list.map(item => {
          if (item.idSemester === idUpdate) {
            return { idSemester: idUpdate, active, alias };
          }
          return item;
        }));
      } else {
        const res = await api('/semester', 'post', { active, alias }, token);
        setList([...list, { idSemester: res.id, active, alias }]);
      }

      setAlert('success');
      setIdUpdate('');
      setActive('');
      setAlias('');
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
        Semestres
        <br />
        <small className="text-muted">Modificar datos de semestres</small>
      </h3>

      <Form onSubmit={submit}>
        <div className="row">
          <div className="col-lg-6">
            {/* Semester alias */}
            <TextField
              id="semester-alias"
              type="text"
              label="Semestre"
              required
              value={alias}
              onChange={e => setAlias(e.target.value)}
              tooltip="Nombre para identificar el semestre, ej: 2018-I, 2020-Q1, etc."
            />
          </div>
          <div className="col-lg-6 mt-3">
            {/* Active */}
            <Form.Group className="mt-3" controlId="semester-active">
              <Form.Check
                custom
                type="checkbox"
                id="semester-active"
                label="Activo"
                checked={active}
                onChange={() => setActive(!active)}
              />
              <Form.Text className="text-muted">
                Campo para definir si el semestre está activo o ya pasó.
              </Form.Text>
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <Button type="submit" variant="primary" className="my-3" block>
              {idUpdate ? 'Actualizar semestre' : 'Crear semestre'}
            </Button>
          </div>
          <div className={`col-sm ${idUpdate ? '' : 'd-none'}`}>
            <Button variant="danger" className="my-3" block onClick={cancel}>
              Cancelar
            </Button>
          </div>
        </div>
      </Form>

      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>Acciones</th>
            <th>#</th>
            <th>Semestre</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.idSemester}>
              <td style={{ width: '185px' }}>
                <Button
                  className="mx-1"
                  variant="dark"
                  size="sm"
                  disabled={idUpdate}
                  onClick={() => update(item)}
                >
                  Modificar
                </Button>
                <Button
                  className="mx-1"
                  variant="danger"
                  size="sm"
                  disabled={idUpdate}
                  onClick={() => remove(item.idSemester)}
                >
                  Eliminar
                </Button>
              </td>
              <td>{item.idSemester}</td>
              <td>{item.alias}</td>
              <td>{item.active ? 'Activo' : 'Inactivo'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal delete item */}
      <Modal
        show={idDelete ? true : false}
        onHide={() => setIdDelete('')}
        aria-labelledby="modal-semester"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-semester">
            Confirmación eliminar semestre
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás segur@ de que deseas eliminar el semestre? Una vez eliminado, no podrá ser recuperado.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIdDelete('')}>
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

export default connect(mapStateToProps)(Semester);
