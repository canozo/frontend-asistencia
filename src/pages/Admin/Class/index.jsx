import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TextField from '../../../components/TextField';
import TimedAlert from '../../../components/TimedAlert';
import api from '../../../request';

const Class = ({ token }) => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(null);
  const [idUpdate, setIdUpdate] = useState('');
  const [idDelete, setIdDelete] = useState('');
  const [classCode, setCode] = useState('');
  const [className, setName] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    api('/class', 'get', undefined, undefined, ac.signal)
      .then(res => setList(res.data))
      .catch(err => console.log(err));
    return () => ac.abort();
  }, []);

  const remove = async id => {
    if (idDelete) {
      // confirmed
      try {
        await api(`/class/${idDelete}`, 'delete', undefined, token);
        setList(list.filter(item => item.idClass !== idDelete));
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
    setIdUpdate(item.idClass);
    setCode(item.classCode);
    setName(item.className);
    setComments(item.comments || '');
  };

  const cancel = () => {
    setIdUpdate('');
    setCode('');
    setName('');
    setComments('');
  };

  const submit = async event => {
    event.preventDefault();
    try {
      // check if updating for inserting new
      if (idUpdate) {
        await api(`/class/${idUpdate}`, 'put', { classCode, className, comments }, token);
        setList(list.map(item => {
          if (item.idClass === idUpdate) {
            return { idClass: idUpdate, classCode, className, comments };
          }
          return item;
        }));
      } else {
        const res = await api('/class', 'post', { classCode, className, comments }, token);
        setList([...list, { idClass: res.id, classCode, className, comments }]);
      }

      setAlert('success');
      setIdUpdate('');
      setCode('');
      setName('');
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
        Clases
        <br />
        <small className="text-muted">Modificar datos de clases</small>
      </h3>

      <Form onSubmit={submit}>
        <div className="row">
          <div className="col-lg-6">
            {/* Class code */}
            <TextField
              id="class-code"
              type="text"
              label="Código de clase"
              required
              value={classCode}
              onChange={e => setCode(e.target.value)}
              tooltip="Codigo de la clase, ej: CCC202"
            />
          </div>
          <div className="col-lg-6">
            {/* Class name */}
            <TextField
              id="class-name"
              type="text"
              label="Nombre de la clase"
              required
              value={className}
              onChange={e => setName(e.target.value)}
              tooltip="Nombre de la clase, ej: Algoritmos y Estructuras de datos II"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            {/* Comments */}
            <TextField
              id="class-comments"
              type="text"
              label="Comentarios"
              value={comments}
              onChange={e => setComments(e.target.value)}
              tooltip="(Opcional) Comentarios de la clase, ej: Con Laboratorios (LCP208)"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <Button type="submit" variant="primary" className="my-3" block>
              {idUpdate ? 'Actualizar clase' : 'Crear clase'}
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
            <th>Código</th>
            <th>Clase</th>
            <th>Comentarios</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.idClass}>
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
                  onClick={() => remove(item.idClass)}
                >
                  Eliminar
                </Button>
              </td>
              <td>{item.idClass}</td>
              <td>{item.classCode}</td>
              <td>{item.className}</td>
              <td>{item.comments || ''}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal delete item */}
      <Modal
        show={idDelete ? true : false}
        onHide={() => setIdDelete('')}
        aria-labelledby="modal-class"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-class">
            Confirmación eliminar clase
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás segur@ de que deseas eliminar la clase? Una vez eliminado, no podrá ser recuperado.
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

export default connect(mapStateToProps)(Class);
