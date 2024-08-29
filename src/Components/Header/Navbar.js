import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Images1 from "../assets/img/download-google-play.png"
import Images2 from "../assets/img/download-app-store.png"
import profileimage from "../img/user.png"
import logo from "../assets/img/logo_home_navbar.png"
// import { FaBars } from 'react-icons/fa';
import menuimage from "../assets/img/close.png"
import menucross from "../assets/img/menu.png"
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
function Navbar() {

    const location = useLocation();

    // const isUserProfilePath = location.pathname === '/userProfile';
    const isUserProfilePath = [
        '/userProfile',
        '/userProfile/membership',
        '/userProfile/bookinghistory',
        '/userProfile/usergift',
        '/userProfile/profile',
        '/userProfile/notification',
        '/userProfile/favorites',
        '/userProfile/support'
    ].includes(location.pathname);



    const nav = useNavigate()
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleLinks = () => {
        setIsActive((prevState) => !prevState);
    };


    const handleDropdown = () => {
        setIsOpen(!isOpen);
    }
    const loginguser = localStorage.getItem('token');
    const showToggleButton = loginguser;

    const dashboardpage = () => {

        nav("/userProfile");
    };

    // useEffect(() => {

    //     if (!showToggleButton) {
    //         nav("/")
    //     }
    // }, [])
    return (

        <div id="navigation" {...(isActive ? { active: "" } : {})} >
            {!showToggleButton && (
                <div className="toggle_button" onClick={toggleLinks}>
                    {isActive ? (
                        <img src={menuimage} alt="Close" style={{ width: '50%' }} className={isUserProfilePath ? "toggleimage hidden_navbar" : "toggleimage"} />
                    ) : (
                        <img src={menucross} alt="Menu" style={{ width: '70%' }} className={isUserProfilePath ? "toggleimage hidden_navbar" : "toggleimage"} />
                    )}
                </div>
            )}

            {showToggleButton && (
                <div className="toggle_button" onClick={toggleLinks}>
                    {isActive ? (
                        <img src={menuimage} alt="Close" style={{ width: '50%' }} className={isUserProfilePath ? "toggleimage hidden_navbar" : "toggleimage"} />
                    ) : (
                        <img src={menucross} alt="Menu" style={{ width: '70%' }} className={isUserProfilePath ? "toggleimage hidden_navbar" : "toggleimage"} />
                    )}
                </div>
            )}
            <div className="container">
                <div className="row">
                    <div className="float_wrapper">
                        {!showToggleButton ? (
                            <Link to="/">
                                <div className="logo">
                                    <img src={logo} alt='' />
                                </div>
                            </Link>
                        ) : (
                            <Link to="/userProfile">
                                <div className="logo">
                                    <img src={logo} alt='' />
                                </div>
                            </Link>
                        )}
                        <ul className="nav_bar">
                            <li>
                                <Link to="/" onClick={toggleLinks}>home</Link>
                            </li>
                            <li id="service_drpdwn" className="drpdwn">
                                <span className="text" >
                                    <Link to="/services">services</Link>
                                    <span className="ico" onClick={handleDropdown}></span>
                                </span>
                                <ul className={!isOpen ? 'drpdwn_menu open' : 'drpdwn'}>
                                    <li>
                                        <Link to="/services/massage_on_demand" onClick={toggleLinks}>massage on demand</Link>
                                    </li>
                                    <li>
                                        <Link to="/services/corporate_events" onClick={toggleLinks}>corporate events</Link>
                                    </li>
                                    <li>
                                        <Link to="/services/private_events" onClick={toggleLinks}>private events</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/about" onClick={toggleLinks}>about us</Link>
                            </li>

                            <li>
                                <Link to="/contact" onClick={toggleLinks}>contact us</Link>
                            </li>
                            <li>
                                <Link to="/become_member" onClick={toggleLinks}>membership</Link>
                            </li>
                            <li>
                                <Link to="/become_provider" onClick={toggleLinks}>become provider</Link>
                            </li>
                            <li>
                                <Link to="/giftcard" onClick={toggleLinks}> Gift Card</Link>
                            </li>
                            <li className="withicon">
                                <span className="icon" ></span>
                                <Link to="/guest_login" onClick={toggleLinks}>Book now</Link>
                            </li>
                            {
                                !showToggleButton ? (
                                    <li className="withicon">
                                        <span className="icon"></span>
                                        <Link to="/login" onClick={toggleLinks}>
                                            Login
                                        </Link>
                                    </li>
                                ) : (
                                    <li id="service_drpdwn" className="drpdwn" onClick={dashboardpage}>
                                        <span className="text" id='profileiconimage' >
                                            <img

                                                width={40}
                                                height={40}
                                                src={profileimage}
                                                alt=""
                                                style={{ borderRadius: "100%" }}
                                                className='profileiconimage'
                                            />
                                            <span className="ico" onClick={handleDropdown}></span>
                                        </span>

                                    </li>
                                )
                            }


                            <div className="app_buttons">
                                <Link to="https://play.google.com/store/apps" target="_blank"><img style={{ maxWidth: "180px" }} src={Images1} alt="" /></Link>
                                <Link to="https://play.google.com/store/apps" target="_blank"><img style={{ maxWidth: "161px" }} src={Images2} alt="" /></Link>
                            </div>
                        </ul>

                    </div>
                </div>
            </div>

            {/*  {
                showToggleButton ? (
                    <li id="service_drpdwn" className="drpdwn" onClick={dashboardpage}>
                    <span className="text" id='profileiconimage' >
                        <img
                          
                            width={40}
                            height={40}
                            src={profileimage}
                            alt=""
                            style={{ borderRadius: "100%"}}
                            className='profileiconimage'
                        />
                        <span className="ico" onClick={handleDropdown}></span>
                    </span>

                </li>
                ) :null
            } */}

        </div>
    )
}

export default Navbar