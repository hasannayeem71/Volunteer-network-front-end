import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Col, FloatingLabel, Form, Modal, Row, Table } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import UserTable from "../UserTable/UserTable";
import "./AddEvents.css";
const AddEvents = () => {
  const titleRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const imgRef = useRef();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [addEvent, setAddEvent] = useState(false);
  const [volunteerList, setVolunteerList] = useState([]);
  const [smShow, setSmShow] = useState(false);
  useEffect(() => {
    //change the title of the site
    document.title = "Add Events";
    axios
      .get("https://volunteer-networkx.herokuapp.com/user/register")
      .then((res) => {
        setVolunteerList(res.data);
      });
  }, []);
  const handleSubmit = () => {
    if (user.email !== "mahmudulnayeem71@gmail.com") {
      alert("YOU ARE NOT ABLE TO ADD USER . ADMIN ONLY");
      return;
    }
    //check all the input are fill
    if (
      titleRef.current.value === "" ||
      dateRef.current.value === "" ||
      descriptionRef.current.value === "" ||
      imgRef.current.value === ""
    ) {
      setMessage("Fill all the field"); // if input are not fill then show a error message
      setSmShow(true);
    } else {
      //set all the data to a object
      const event = {
        title: titleRef.current.value,
        date: dateRef.current.value,
        description: descriptionRef.current.value,
        img: imgRef.current.value,
      };
      //post this data to api
      axios
        .post("https://volunteer-networkx.herokuapp.com/services", event)
        .then((res) => {
          if (res.data.acknowledged) {
            setMessage("Event Successfully added");
            setSmShow(true);
            titleRef.current.value = "";
            dateRef.current.value = "";
            descriptionRef.current.value = "";
            imgRef.current.value = "";
          }
        });
    }
  };
  return (
    <div className="mt-5 pt-5">
      <div className="container add-event-custom">
        <h4>{addEvent ? "ADD EVENT" : "VOLUNTEER REGISTER LIST"}</h4>
        <Row xs={2} md={2} className="">
          <Col className="col-lg-3  col-sm-2 custom-add-style">
            <div className="d-flex flex-column">
              <img src="https://i.ibb.co/b32Bd81/Group-1329.png" alt="" />
              <button
                onClick={() => setAddEvent(false)}
                className="mt-4 custom-btn-style"
                style={{ color: !addEvent ? "green" : "" }}>
                <i className="fas fa-hands-helping"></i>
                Volunteer register list
              </button>
              <button
                onClick={() => setAddEvent(true)}
                className="mt-2 custom-btn-style"
                style={{ color: addEvent ? "green" : "" }}>
                <i className="fas fa-plus"></i> Add event
              </button>
            </div>
          </Col>
          <Col
            className="col-lg-9 col-sm-10 add-container "
            style={{ display: addEvent ? "block" : "none" }}>
            <div className="mt-3 p-5 bg-white rounded">
              <Row className="g-4">
                <Col md>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    className="mt-4"
                    label="ENTER TITLE">
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      ref={titleRef}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col md>
                  <FloatingLabel
                    className="mt-4"
                    controlId="floatingInputGrid"
                    label="DATE">
                    <Form.Control
                      type="date"
                      placeholder="name@example.com"
                      ref={dateRef}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="g-4">
                <Col md>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    className="mt-4"
                    label="DESCRIPTION">
                    <Form.Control
                      type="text"
                      ref={descriptionRef}
                      required
                      placeholder="Enter Designation"
                    />
                  </FloatingLabel>
                </Col>
                <Col md>
                  <FloatingLabel
                    className="mt-4"
                    controlId="floatingInputGrid"
                    label="BANNER">
                    <Form.Control
                      type="text"
                      placeholder="IMG URL"
                      ref={imgRef}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              <button className="submit-btn" onClick={handleSubmit}>
                submit
              </button>
            </div>
          </Col>
          <Col
            className="col-lg-9 col-sm-10 add-container "
            style={{ display: !addEvent ? "block" : "none" }}>
            <Table
              striped
              bordered
              responsive
              hover
              className="mt-3 p-5 bg-white rounded">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email ID</th>
                  <th>Registering date</th>
                  <th>Volunteer list</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {volunteerList.map((volunteer) => (
                  <UserTable
                    key={volunteer._id}
                    volunteer={volunteer}
                    volunteerList={volunteerList}
                    setVolunteerList={setVolunteerList}
                  />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
      <>
        <Modal
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Volunteer register form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default AddEvents;
