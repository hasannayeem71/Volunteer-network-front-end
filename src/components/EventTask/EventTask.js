import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import "./EventTask.css";
const EventTask = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [smShow, setSmShow] = useState(false);
  const history = useHistory();
  const { user } = useAuth();
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  useEffect(() => {
    //change the title of the site
    document.title = "Register volunteer";
    //call api
    axios
      .get(`https://volunteer-networkx.herokuapp.com/services/${id}`)
      .then((res) => {
        setEvent(res.data);
      });
  }, [id]);

  const handleRegistration = () => {
    const userEvent = {
      userName: user.displayName,
      email: user.email,
      title: event.title,
      description: event.description,
      date: date,
      img: event.img,
    };
    axios
      .post(
        `https://volunteer-networkx.herokuapp.com/register/service`,
        userEvent
      )
      .then((res) => {
        if (res.data.acknowledged) {
          setSmShow(true);
        }
      });
  };

  if (!event._id) {
    return <CustomSpinner></CustomSpinner>;
  }
  return (
    <div className="container mt-5 pt-4">
      <div>
        <img
          src="https://i.ibb.co/b32Bd81/Group-1329.png"
          alt=""
          className="img-fluid w-25"
        />
        <div className="d-flex justify-content-center align-items-center">
          <div className="registration-form ">
            <h4>Registration as a volunteer</h4>
            <FloatingLabel
              controlId="floatingInputGrid"
              className="mt-2"
              label="Full Name">
              <Form.Control
                type="text"
                value={user.displayName || ""}
                readOnly
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInputGrid"
              className="mt-4"
              label="Username or Email">
              <Form.Control type="text" value={user.email} readOnly />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInputGrid"
              className="mt-4"
              label="Date">
              <Form.Control type="text" value={date} readOnly />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInputGrid"
              className="mt-4"
              label="Description">
              <Form.Control
                type="text"
                value={event.description || ""}
                readOnly
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInputGrid"
              className="mt-4"
              label="Title">
              <Form.Control type="text" value={event.title || ""} readOnly />
            </FloatingLabel>
            <input
              type="button"
              value="REGISTER"
              className="w-100 mt-4 text-white login_btn py-1"
              onClick={handleRegistration}
            />
          </div>
        </div>
      </div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => {
          setSmShow(false);
          history.push("/events");
        }}
        aria-labelledby="example-modal-sizes-title-sm"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <p>Registry to network</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Successfully register to {event.title}</p>
          <button onClick={() => history.push("/events")}>
            Go to your event
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventTask;
