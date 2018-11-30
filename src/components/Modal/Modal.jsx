import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

const Component = props => {
  const { show, onHide, bsSize, bContent, bHeader, bFooter, className } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      bsSize={bsSize}
      className={className}
      aria-labelledby="contained-modal"
    >
      {bHeader && (
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{bHeader}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{bContent}</Modal.Body>
      {bFooter && <Modal.Footer>{bFooter}</Modal.Footer>}
    </Modal>
  );
};

Component.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  bsSize: PropTypes.string,
  className: PropTypes.string
};

Component.defaultProps = {
  bsSize: "",
  className: ""
};

export default Component;
