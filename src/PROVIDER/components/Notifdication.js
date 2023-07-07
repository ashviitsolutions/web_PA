import React, { useEffect, useState } from "react";
import { Nav, NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";



const Notifdication = (props) => {






  // let src ={img}
  return (
    <>
    {
        props.toggle? (
            <>
            <Nav pullRight>
            <NavDropdown
              eventKey={1}
              title={
                <div className="pull-left" style={{ display: "inline-block" }}>
                 
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
                <Link to="/providers/logout" className="nav-link">Log Out</Link>
              </NavDropdown.Item>
            </NavDropdown>
    
    
    
    
    
    
    
    
          </Nav>
            </>
        ):null
    }
 

    

    </>
  );
};

export default Notifdication;
