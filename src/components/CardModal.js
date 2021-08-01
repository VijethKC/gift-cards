import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import CardForm from "./CardForm";

const CardModal = ({ title, className, id, postData }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <i onClick={handleShow} className={className}>
        {title}
      </i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Gift Card Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CardForm onClose={handleClose} postData={postData} id={id} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardModal;
