import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Header.css";
const Header = () => {
  const { user, logOut } = useAuth();
  return (
    <Navbar expand="lg" className="bg-white fixed-top">
      <Container fluid>
        <Link to="/">
          <img
            src="https://i.ibb.co/b32Bd81/Group-1329.png"
            alt="Volunteer network logo"
            className="nav-bar-img"
          />
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll>
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/donation">
              Donation
            </Nav.Link>

            <Nav.Link as={Link} to="/events">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/blog">
              Blog
            </Nav.Link>
          </Nav>
          <div className="nav-btns">
            {user ? (
              <button className="login_btn" onClick={logOut}>
                LOGOUT
              </button>
            ) : (
              <Link to="/login">
                <button className="login_btn">LOGIN</button>
              </Link>
            )}
            <Link to="/addevents">
              <button className="admin-btn">ADMIN</button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
