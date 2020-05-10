import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const TextField = ({ id, label, tooltip, prepend, append, ...rest }) => {
  return (
    <Form.Group controlId={id}>
      {label ? <Form.Label>{label}</Form.Label> : null}
      <Form.Control {...rest} />
      {tooltip ? (
        <Form.Text className="text-muted">
          {tooltip}
        </Form.Text>
      ) : null}
    </Form.Group>
  );
};

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'password',
    'email',
    'number'
  ]).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  pattern: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  tooltip: PropTypes.string,
};

export default TextField;
