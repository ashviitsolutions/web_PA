import React, {  useState } from 'react'
import { Link } from "react-router-dom"
import Images1 from "../assets/img/download-google-play.png"
import Images2 from "../assets/img/download-app-store.png"
// import { FaBars } from 'react-icons/fa';
import menuimage from "../assets/img/close.png"
import menucross from "../assets/img/menu.png"
function Navbar() {
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleLinks = () => {
        setIsActive((prevState) => !prevState);
    };


    const handleDropdown = () => {
      setIsOpen(!isOpen);
    }

    return (

        <div id="navigation" {...(isActive ? { active: "" } : {})} >


            <div className="toggle_button" onClick={toggleLinks}>
                {isActive ? (
                    <img src={menuimage} alt="Close" style={{ width: "50%" }} className="toggleimage" />
                ) : (
                    <img src={menucross} alt="Menu" style={{ width: "70%" }} className="toggleimage"/>
                )}
            </div>
            <div className="container">
                <div className="row">
                    <div className="float_wrapper">
                        <Link to="/">
                            <div className="logo">
                                <span className="icon"></span>
                                <span className="name">Productive Alliance <small>experience the difference</small> </span>
                            </div>
                        </Link>
                        <ul className="nav_bar">
                            <li>
                                <Link to="/">home</Link>
                            </li>
                            <li id="service_drpdwn" className="drpdwn">
                            <span className="text" >
                              <Link to="/services">services</Link>
                              <span className="ico" onClick={handleDropdown}></span>
                            </span>
                            <ul className={!isOpen ? 'drpdwn_menu open' : 'drpdwn'}>
                              <li>
                                <Link to="/services/massage_on_demand">massage on demand</Link>
                              </li>
                              <li>
                                <Link to="/services/corporate_events">corporate events</Link>
                              </li>
                              <li>
                                <Link to="/services/private_events">private events</Link>
                              </li>
                            </ul>
                          </li>
                            <li>
                                <Link to="/about">about us</Link>
                            </li>
                            <li>
                                <Link to="/giftcard">gift card</Link>
                            </li>
                            <li>
                                <Link to="/contact">contact us</Link>
                            </li>
                            <li>
                                <Link to="/become_member">membership</Link>
                            </li>
                            <li>
                                <Link to="/become_provider">become provider</Link>
                            </li>
                            <li className="withicon">
                                <span className="icon" ></span>
                                <Link to="/select_location">Book now</Link>
                            </li>
                            <li className="withicon">
                                <span className="icon" ></span>
                                <Link to="/login">login</Link>
                            </li>
                            <div className="app_buttons">
                                <Link to="https://play.google.com/store/apps" target="_blank"><img style={{ maxWidth: "180px" }} src={Images1} alt="" /></Link>
                                <Link to="https://play.google.com/store/apps" target="_blank"><img style={{ maxWidth: "161px" }} src={Images2} alt="" /></Link>
                            </div>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar