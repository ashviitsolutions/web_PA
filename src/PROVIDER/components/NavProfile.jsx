import React from "react";
import { Nav, NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavProfile = () => {
  let src =
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg";
  let user = { username: "Test" };
  return (
    <>
      <Nav pullRight>
        <NavDropdown
          eventKey={1}
          title={
            <div className="pull-left" style={{ display: "inline-block" }}>
              <img
                className="thumbnail-image"
                src={src}
                alt="user pic"
                style={{ width: "45px",objectFit: 'cover',borderRadius: '50%',height: '45px'}}
              />
            </div>
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item>
            <Link to="/providers/profile" className="nav-link">Profile</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/providers/personal-settings" className="nav-link">Personal Settings</Link>
          </NavDropdown.Item>

          <NavDropdown.Divider />
          <NavDropdown.Item>
          <Link to="/providers/logout"className="nav-link">Log Out</Link>
           </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  );
};

export default NavProfile;
