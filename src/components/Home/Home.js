import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import Service from "../Service/Service";
import "./Home.css";
const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    //change the title of the site
    document.title = "Home";
    //load data from api
    axios
      .get("https://volunteer-networkx.herokuapp.com/services")
      .then((res) => setServices(res.data));
  }, []);
  if (services.length === 0) {
    return <CustomSpinner></CustomSpinner>;
  }
  return (
    <div className=" pt-5 home-container">
      <div className="services-and-search">
        <h2 className="text-center text-uppercase pt-3">
          I grow by helping people in need.
        </h2>
        <div className="search-option my-4">
          <input type="text" placeholder="Search..." className="search-box" />
          <button className="search-btn">SEARCH</button>
        </div>
        <div className="container mt-4">
          <Row xs={2} md={4} lg={4} className="g-4 ">
            {services.map((service) => (
              <Service key={service._id} service={service} />
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
