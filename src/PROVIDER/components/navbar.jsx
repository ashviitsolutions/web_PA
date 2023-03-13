import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import NavProfile from "./NavProfile";
import "../custom.css"

function NavBar() {
  return (
    <Navbar className="bg-white shadow-sm" expand="lg" id="topbar">
      <Container>
        <Link className="navbar-brandn" to="/">
          <img
            
            src="/assets/img/productive alliance rect.png"
            width="200"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
  );
}

export default NavBar;


