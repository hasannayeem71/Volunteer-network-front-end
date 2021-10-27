import axios from "axios";
import React, { useState } from "react";
import { Col, Modal } from "react-bootstrap";
import "./Event.css";
const Event = ({ event, events, setEvents }) => {
  const { img, date, title, _id } = event;
  const [smShow, setSmShow] = useState(false);
  const handleCancel = () => {
    axios
      .delete(`https://volunteer-networkx.herokuapp.com/services/user/${_id}`)
      .then((res) => {
        if (res.data.acknowledged) {
          setSmShow(false);
          const remainingEvents = events.filter((event) => event._id !== _id);
          setEvents(remainingEvents);
        }
      });
  };
  return (
    <Col>
      <div className="event-container">
        <div className="d-flex">
          <img src={img} alt="" className="img-fluid w-25" />
          <div className="p-3">
            <h6>{title}</h6>
            <p>{date}</p>
          </div>
        </div>
        <button onClick={() => setSmShow(true)}>CANCEL</button>
      </div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <p>Your events in network</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure that you want to delete {title}</p>
          <button onClick={handleCancel} className="delete-btn">
            DELETE
          </button>
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default Event;
