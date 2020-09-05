/*
  Example of using a modal with React Bootstrap
*/
import React, { useState } from "react";
import pexels from "../videos/video.mp4";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  
  const handleShow = () => {
    setDialogField('')  
    setShowModal(true)
  }

  const handleClose = () => setShowModal(false)

  const [dialogField, setDialogField] = useState('')

  const handleCloser = () => {
    if (dialogField.length === 0) {
      console.log("No input")
    } else {
      console.log(dialogField)
    }
    setShowModal(false)
  }

  let doIt = (e) => {
    console.log("Did it", e.target.value)
    setDialogField(e.target.value)
  }

  return (
    <>
      <div className="hero-container">
        <p>Home sweet home</p>
        <Button variant="primary" onClick={handleShow}>Add Item</Button>
        <video autoPlay loop muted>
          <source src={pexels} type="video/mp4" />
        </video>
        <Modal 
          animation="true"
          centered="true"
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Add a link</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Add a new link below:
            <Form>
              <Form.Group controlId="form">
              <Form.Label>Link adress</Form.Label>
              <Form.Control onChange={doIt} type="text" placeholder="<url>" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
          </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Ok
            </Button>
            <Button variant="warning" onClick={handleCloser}>Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Home;
