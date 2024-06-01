import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import NavProfile from "./NavProfile";
import "../custom.css";
import React, { useState } from "react";
import image1 from "./img/logo_image2.png";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function NavBar() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    setExpanded(false);
  };

  return (
    <>
      <Navbar
        className="bg-white shadow-sm"
        expand="lg"
        id="topbar"
        expanded={expanded}
      >
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

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          />
          <Navbar.Collapse id="basic-navbar-navs">
            <Nav className="me-auto" id="links">
              <NavLink
                className="nav-link"
                role="button"
                to="/providers"
                onClick={handleSelect}
              >
                Dashboard
              </NavLink>
              <NavLink
                className="nav-link"
                role="button"
                to="/providers/scheduled-requests"
                onClick={handleSelect}
              >
                Scheduled Events
              </NavLink>
              <NavLink
                className="nav-link"
                role="button"
                to="/providers/events"
                onClick={handleSelect}
              >
                Events
              </NavLink>
              <NavLink
                className="nav-link"
                role="button"
                to="/providers/services"
                onClick={handleSelect}
              >
                Services
              </NavLink>
              <NavLink
                className="nav-link"
                role="button"
                to="/providers/earnings"
                onClick={handleSelect}
              >
                Earnings
              </NavLink>
              <NavLink
                className="nav-link"
                role="button"
                to="/providers/application-form"
                onClick={handleSelect}
              >
                Application Form
              </NavLink>
            </Nav>
            <NavProfile />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
