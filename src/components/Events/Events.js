import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import Event from "../Event/Event";
import "./Events.css";
const Events = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    document.title = "Events";
    axios
      .post(
        `https://volunteer-networkx.herokuapp.com/services/user?email=${user.email}`
      )
      .then((res) => {
        setEvents(res.data);
      });
  }, [user.email]);
  if (events.length === 0) {
    return (
      <div className="container mt-5 pt-5">
        <h2>YOUR HAVE NO EVENTS</h2>
      </div>
    );
  }
  return (
    <div className="container mt-5 pt-5">
      <h2>YOUR EVENTS</h2>
      <div className="user-events-container">
        <Row xs={1} md={2} lg={2} className="g-4 ">
          {events.map((event) => (
            <Event
              key={event._id}
              event={event}
              events={events}
              setEvents={setEvents}
            />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Events;
