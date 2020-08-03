import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TextField from '../../../components/TextField';
import TimedAlert from '../../../components/TimedAlert';
import api from '../../../request';

const Classroom = ({ token }) => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(null);
  const [idUpdate, setIdUpdate] = useState(0);
  const [idDelete, setIdDelete] = useState(0);
  const [idCampus, setIdCampus] = useState(0);
  const [idBuilding, setIdBuilding] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [alias, setAlias] = useState('');
  const [campusList, setCampusList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);

  useEffect(() => {
    const ac = new AbortController();

    api('/classroom', 'get', undefined, undefined, ac.signal)
      .then(res => setList(res.data))
      .catch(err => console.log(err));

    api('/campus/select', 'get', undefined, undefined, ac.signal)
      .then(res => setCampusList(res.data))
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
    }
  }, [idCampus]);

  const remove = async id => {
    if (idDelete) {
      // confirmed
      try {
        await api(`/classroom/${idDelete}`, 'delete', undefined, token);
        setList(list.filter(item => item.idClassroom !== idDelete));
        setAlert('success');
      } catch (err) {
        setAlert(err.message);
      }
      setIdDelete(0);
    } else {
      setIdDelete(id);
    }
  };

  const update = item => {
    setIdUpdate(item.idClassroom);
    setIdCampus(item.idCampus);
    setIdBuilding(item.idBuilding);
    setAlias(item.alias);
    setCapacity(item.capacity);
  };

  const cancel = () => {
    setIdUpdate(0);
    setIdCampus(0);
    setIdBuilding(0);
    setAlias('');
    setCapacity(0);
  };

  const submit = async event => {
    event.preventDefault();
    try {
      // check if updating for inserting new
      if (idUpdate) {
        await api(`/classroom/${idUpdate}`, 'put', { idBuilding, capacity, alias }, token);
        setList(list.map(item => {
          if (item.idClassroom === idUpdate) {
            return {
              idClassroom: item.idClassroom,
              campus: campusList.find(item => item.id === Number(idCampus)).val,
              building: buildingList.find(item => item.id === Number(idBuilding)).val,
              capacity,
              alias,
            };
          }
          return item;
        }));
      } else {
        const res = await api('/classroom', 'post', { idBuilding, capacity, alias }, token);
        setList([...list, {
          idClassroom: res.id,
          idCampus,
          campus: campusList.find(item => item.id === Number(idCampus)).val,
          idBuilding,
          building: buildingList.find(item => item.id === Number(idBuilding)).val,
          capacity,
          alias,
        }]);
      }

      setAlert('success');
      setIdUpdate(0);
      setIdCampus(0);
      setIdBuilding(0);
      setAlias('');
      setCapacity(0);
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
        Aulas de clase
        <br />
        <small className="text-muted">Modificar datos de aulas de clase</small>
      </h3>

      <Form onSubmit={submit}>
        <div className="row">
          <div className="col-lg-6">
            {/* Campus */}
            <Form.Group controlId="classroom-campus">
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
              <Form.Text className="text-muted">
                Campus donde se encuentra el aula
              </Form.Text>
            </Form.Group>
          </div>
          <div className="col-lg-6">
            {/* Building */}
            <Form.Group controlId="classroom-building">
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
              <Form.Text className="text-muted">
                Edificio donde se encuentra el aula
              </Form.Text>
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            {/* Alias */}
            <TextField
              id="classroom-alias"
              type="text"
              label="Aula"
              required
              value={alias}
              onChange={e => setAlias(e.target.value)}
              tooltip="Nombre corto del aula, ej: 301, 302, LAB1"
            />
          </div>
          <div className="col-lg-6">
            {/* Capacity */}
            <TextField
              id="classroom-capacity"
              type="number"
              label="Capacidad"
              required
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
              tooltip="Capacidad maxima de estudiantes en el aula, ej: 30, 45"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <Button type="submit" variant="primary" className="my-3" block>
              {idUpdate ? 'Actualizar aula' : 'Crear aula'}
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
            <th>Campus</th>
            <th>Edificio</th>
            <th>Aula</th>
            <th>Capacidad</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.idClassroom}>
              <td className="action-medium">
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
                  onClick={() => remove(item.idClassroom)}
                >
                  Eliminar
                </Button>
              </td>
              <td>{item.campus}</td>
              <td>{item.building}</td>
              <td>{item.alias}</td>
              <td>{item.capacity}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal delete item */}
      <Modal
        show={idDelete ? true : false}
        onHide={() => setIdDelete(0)}
        aria-labelledby="modal-classroom"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-classroom">
            Confirmación eliminar aula
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás segur@ de que deseas eliminar el aula de clases? Una vez eliminado, no podrá ser recuperado.
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

export default connect(mapStateToProps)(Classroom);
