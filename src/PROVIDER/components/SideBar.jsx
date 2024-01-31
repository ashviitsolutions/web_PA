import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image1 from "../../Components/assets/img/logo_home_navbar.png"
import { IP } from "../../Constant";
// import Protected from "../ProtectedRute/Protected";

const SideBar = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("providertoken");

    try {

      fetch(`${IP}/provider/application-status`, {
        headers: {
          Authorization: token,
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((result) => {
          setUser(result.application_status);
          console.log("application-status", result.application_status)
          if (result.application_status >= 3) {
            localStorage.setItem("approvaluser", "approval");

          }

        })

    } catch (error) {
      console.log(error);
    }

  }, []);



  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  return (
    <>

      <div className="sidebar col-md-3" >
        <div className="sidebar-title">
          <Link className="navbar-brand" to="/providers">
            <img

              src={image1}
              width="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </div>
        <div className="sidebar-menu">
          {user >= 3 ? (
            <>
              <Link to="/providers">
                <div className="menu-item">Dashboard</div>
              </Link>

              <Link to="/providers/events">
                <div className="menu-item">My Events</div>
              </Link>
              <Link to="/providers/services">
                <div className="menu-item">Services</div>
              </Link>
              <Link to="/providers/earnings">
                <div className="menu-item">Earnings</div>
              </Link>
              {user !== 4 && (
                <Link to="/providers/application-form">
                  <div className="menu-item">Application Form</div>
                </Link>
              )}


            </>
          ) : (
            <>
              <Link to="/providers/waiting">
                <div className="menu-item">Dashboard</div>
              </Link>

              <Link to="/providers/waiting">
                <div className="menu-item">My Events</div>
              </Link>
              <Link to="/providers/waiting">
                <div className="menu-item">Services</div>
              </Link>
              <Link to="/providers/waiting">
                <div className="menu-item">Earnings</div>
              </Link>
              <Link to="/providers/application-form">
                <div className="menu-item">Application Form</div>
              </Link>

            </>
          )}
        </div>
      </div>

    </>
  );
};

export default SideBar;
