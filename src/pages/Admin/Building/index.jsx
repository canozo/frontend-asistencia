import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TextField from '../../../components/TextField';
import TimedAlert from '../../../components/TimedAlert';
import api from '../../../request';

const Building = ({ token }) => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(null);
  const [idUpdate, setIdUpdate] = useState(0);
  const [idDelete, setIdDelete] = useState(0);
  const [idCampus, setIdCampus] = useState(0);
  const [alias, setAlias] = useState('');
  const [campusList, setCampusList] = useState([]);

  useEffect(() => {
    const ac = new AbortController();

    api('/building', 'get', undefined, undefined, ac.signal)
      .then(res => setList(res.data))
      .catch(err => console.log(err));

    api('/campus/select', 'get', undefined, undefined, ac.signal)
      .then(res => setCampusList(res.data))
      .catch(err => console.log(err));

      return () => ac.abort();
  }, []);

  const remove = async id => {
    if (idDelete) {
      // confirmed
      try {
        await api(`/building/${idDelete}`, 'delete', undefined, token);
        setList(list.filter(item => item.idBuilding !== idDelete));
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
    setIdUpdate(item.idBuilding);
    setIdCampus(item.idCampus);
    setAlias(item.alias);
  };

  const cancel = () => {
    setIdUpdate(0);
    setIdCampus(0);
    setAlias('');
  };

  const submit = async event => {
    event.preventDefault();
    try {
      // check if updating for inserting new
      if (idUpdate) {
        await api(`/building/${idUpdate}`, 'put', { idCampus, alias }, token);
        setList(list.map(item => {
          if (item.idBuilding === idUpdate) {
            return {
              idBuilding: item.idBuilding,
              campus: campusList.find(item => item.id === Number(idCampus)).val,
              alias,
            };
          }
          return item;
        }));
      } else {
        const res = await api('/building', 'post', { idCampus, alias }, token);
        setList([...list, {
          idBuilding: res.id,
          idCampus,
          campus: campusList.find(item => item.id === Number(idCampus)).val,
          alias,
        }]);
      }

      setAlert('success');
      setIdUpdate(0);
      setIdCampus(0);
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
        Edificios
        <br />
        <small className="text-muted">Modificar datos de edificios</small>
      </h3>

      <Form onSubmit={submit}>
        <div className="row">
          <div className="col-lg-6">
            {/* Campus */}
            <Form.Group controlId="building-campus">
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
                Campus donde se encuentra el edificio
              </Form.Text>
            </Form.Group>
          </div>
          <div className="col-lg-6">
            {/* Alias */}
            <TextField
              id="building-alias"
              type="text"
              label="Edificio"
              required
              value={alias}
              onChange={e => setAlias(e.target.value)}
              tooltip="Alias del edificio, ej: 02, 03, CATI"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <Button type="submit" variant="primary" className="my-3" block>
              {idUpdate ? 'Actualizar edificio' : 'Crear edificio'}
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
            <th>Campus</th>
            <th>Edificio</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.idBuilding}>
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
                  onClick={() => remove(item.idBuilding)}
                >
                  Eliminar
                </Button>
              </td>
              <td>{item.idBuilding}</td>
              <td>{item.campus}</td>
              <td>{item.alias}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal delete item */}
      <Modal
        show={idDelete ? true : false}
        onHide={() => setIdDelete(0)}
        aria-labelledby="modal-building"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-building">
            Confirmación eliminar edificio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás segur@ de que deseas eliminar el edificio? Una vez eliminado, no podrá ser recuperado.
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

export default connect(mapStateToProps)(Building);
