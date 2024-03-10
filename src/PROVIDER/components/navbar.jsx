import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import NavProfile from "./NavProfile";
import { NavDropdown } from "react-bootstrap";
import "../custom.css"
import React, { useState } from "react";
import image1 from "./img/logo_image2.png"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
function NavBar() {
  const [toggle, setToggle] = useState(false)
  const handleToggle = () => {
    setToggle(!toggle)
  }
  return (
    <>
      <Navbar className="bg-white shadow-sm" expand="lg" id="topbar">
        <Container>
          <Link className="navbar-brandn" to="/">
            <img

              style={{ marginTop: "-30px" }}
              src={image1}
              width="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
          {/* <NotificationsActiveIcon className="notificationmobile" onClick={handleToggle} /> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-navs">
            <Nav className="me-auto" id="links">
              <NavLink className="nav-link" role="button" to="/providers">
                Dashboard
              </NavLink>
              <NavLink className="nav-link" role="button" to="/providers/scheduled-requests">
                Scheduled Events
              </NavLink>
              <NavLink className="nav-link" role="button" to="/providers/events">
                Events
              </NavLink>
              <NavLink className="nav-link" role="button" to="/providers/services">
                Services
              </NavLink>
              <NavLink className="nav-link" role="button" to="/providers/earnings">
                Earnings
              </NavLink>
              <NavLink className="nav-link" role="button" to="/providers/application-form">
                Application Form
              </NavLink>
            </Nav>
            <NavProfile />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* {
        toggle ? (
          <Nav >
            <div className="notificationdroupdown">
              <NavDropdown.Item>
                <h3 className="nav-link">notification1</h3>
              </NavDropdown.Item>
              <NavDropdown.Item>

                <h3 className="nav-link">notification1</h3>
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item>

                <h3 className="nav-link">notification1</h3>
              </NavDropdown.Item>
            </div>

          </Nav>
        ) : null
      } */}
    </>


  );
}

export default NavBar;


