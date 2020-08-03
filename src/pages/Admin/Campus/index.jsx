import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TextField from '../../../components/TextField';
import TimedAlert from '../../../components/TimedAlert';
import api from '../../../request';

const Campus = ({ token }) => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(null);
  const [idUpdate, setIdUpdate] = useState(0);
  const [idDelete, setIdDelete] = useState(0);
  const [campus, setCampus] = useState('');
  const [alias, setAlias] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    api('/campus', 'get', undefined, undefined, ac.signal)
      .then(res => setList(res.data))
      .catch(err => console.log(err));
    return () => ac.abort();
  }, []);

  const remove = async id => {
    if (idDelete) {
      // confirmed
      try {
        await api(`/campus/${idDelete}`, 'delete', undefined, token);
        setList(list.filter(item => item.idCampus !== idDelete));
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
    setIdUpdate(item.idCampus);
    setCampus(item.campus);
    setAlias(item.alias);
  };

  const cancel = () => {
    setIdUpdate(0);
    setCampus('');
    setAlias('');
  };

  const submit = async event => {
    event.preventDefault();
    try {
      // check if updating for inserting new
      if (idUpdate) {
        await api(`/campus/${idUpdate}`, 'put', { campus, alias }, token);
        setList(list.map(item => {
          if (item.idCampus === idUpdate) {
            return { idCampus: idUpdate, campus, alias };
          }
          return item;
        }));
      } else {
        const res = await api('/campus', 'post', { campus, alias }, token);
        setList([...list, { idCampus: res.id, campus, alias }]);
      }

      setAlert('success');
      setIdUpdate(0);
      setCampus('');
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
        Campus
        <br />
        <small className="text-muted">Modificar datos de campus universitarios</small>
      </h3>

      <Form onSubmit={submit}>
        <div className="row">
          <div className="col-lg-6">
            {/* Campus */}
            <TextField
              id="campus"
              type="text"
              label="Campus"
              required
              value={campus}
              onChange={e => setCampus(e.target.value)}
              tooltip="Nombre del campus, ej: UNITEC Tegucigalpa"
            />
          </div>
          <div className="col-lg-6">
            {/* Alias */}
            <TextField
              id="campus-alias"
              type="text"
              label="Alias"
              required
              value={alias}
              onChange={e => setAlias(e.target.value)}
              tooltip="Alias corto del campus, ej: UNITEC-TGU"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <Button type="submit" variant="primary" className="my-3" block>
              {idUpdate ? 'Actualizar campus' : 'Crear campus'}
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
            <th>Alias</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.idCampus}>
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
                  onClick={() => remove(item.idCampus)}
                >
                  Eliminar
                </Button>
              </td>
              <td>{item.idCampus}</td>
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
        aria-labelledby="modal-campus"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-campus">
            Confirmación eliminar campus
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás segur@ de que deseas eliminar el campus? Una vez eliminado, no podrá ser recuperado.
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

export default connect(mapStateToProps)(Campus);
