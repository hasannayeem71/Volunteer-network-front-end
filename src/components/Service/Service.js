// import axios from "axios";
import React from "react";
import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import "./Service.css";
const Service = ({ service }) => {
  const history = useHistory();
  const { title, img, _id } = service;
  // const handleDele = () => {
  //   console.log("sjbfsbf");
  //   axios
  //     .delete(`https://volunteer-networkx.herokuapp.com/services/${_id}`)
  //     .then((res) => console.log(res));
  // };
  return (
    <div>
      <Col onClick={() => history.push(`/eventTask/${_id}`)}>
        <Card className="custom-card">
          <Card.Img variant="top" src={img} className="rounded" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      {/* <button onClick={handleDele}>delete</button> */}
    </div>
  );
};

export default Service;
