import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const ModalScreen = (props) => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false)
    navigate(-1)
  };
  //const handleShow = () => setShow(true);

  //console.log(props.btnText)

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className=" d-block text-center" >
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">{props.children}</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {props.btnText}
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}


export default ModalScreen