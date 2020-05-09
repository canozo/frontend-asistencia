import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ id, title, primary, txtPrimary, onPrimary, children }) => (
  <div
    className="modal fade"
    id={id}
    tabIndex="-1"
    role="dialog"
    aria-labelledby={`${id}Title`}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">

        {/* Header */}
        <div className="modal-header">
          <h5 className="modal-title" id={`${id}Title`}>
            {title}
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {children}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Volver
          </button>
          {primary ? (
            <button type={primary} className="btn btn-primary" onClick={onPrimary}>
              {txtPrimary}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  primary: PropTypes.oneOf(['button', 'submit']),
  txtPrimary: (props, propName) => {
    if (props.primary && typeof(props[propName]) !== 'string') {
      return new Error(`Please provide a prop \`${propName}\` of type string.`);
    }
  },
  onPrimary: (props, propName) => {
    if (props.primary && props.primary === 'button' && typeof(props[propName]) !== 'function') {
      return new Error(`Please provide a prop \`${propName}\` of type function.`);
    }
  },
  children: PropTypes.node.isRequired,
};

export default Modal;
