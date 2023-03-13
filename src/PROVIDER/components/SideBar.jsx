import React from "react";
import { Link } from "react-router-dom";
// import images from "../../Components/assets/img/productive alliance rect.png"


const SideBar = () => {
  
  return (
    <>
      <div className="sidebar" >
        <div className="sidebar-title">
          <Link className="navbar-brand shadow-sm" to="/providers">
            <img
              src="/assets/img/productive alliance rect.png"
              width="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </div>
        <div className="sidebar-menu">
          <Link to="/providers">
            <div className="menu-item">Dashboard</div>
          </Link>
          <Link to="/providers/scheduled-requests">
            <div className="menu-item">Scheduled Events</div>
          </Link>
          <Link to="/providers/events">
            <div className="menu-item">Events</div>
          </Link>
          <Link to="/providers/services">
            <div className="menu-item">Services</div>
          </Link>
          <Link to="/providers/earnings">
            <div className="menu-item">Earnings</div>
          </Link>
          <Link to="/providers/application-form">
            <div className="menu-item">Application Form</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
