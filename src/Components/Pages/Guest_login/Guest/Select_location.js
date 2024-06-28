import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image1 from "../../../assets/img/43547063_s.jpg";
import image2 from "../../../assets/img/istockphoto-1307109392-170667a.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

function Select_location() {
    const nav = useNavigate();


    const handleSubmit = (input) => {
        const formData = {
            location_type: input,
        };

        if (input === "Home") {
            nav(`/select_location`, { state: { location: formData } });
        } else if (input === "providers location") {
            nav(`/listofprovider`, { state: { location: formData } });
        }
    };

    return (
        <>
            <div id="over_banner">
                <div className="container">
                    <div className="row">
                        <form className="location">
                            <h3 className='blue_head'>Where would you like <b>our service?</b> </h3>
                            <ul className="service">
                                <div onClick={() => handleSubmit('Home')}>
                                    <li>
                                        <span
                                            className="bg"
                                            style={{
                                                backgroundImage: `url(${image2})`,
                                            }}
                                        ></span>
                                        <span className="title">My Location</span>
                                        <span className="text">Home, Office, Hotel</span>
                                    </li>
                                </div>
                                <div onClick={() => handleSubmit('providers location')}>
                                    <li>
                                        <span
                                            className="bg"
                                            style={{
                                                backgroundImage: `url(${image1})`,
                                            }}
                                        ></span>
                                        <span className="title">Provider's Location</span>
                                        <span className="text">Massage Parlor, Spa, Wellness Center</span>
                                    </li>
                                </div>
                            </ul>
                            <Link className='small' to='/'><FontAwesomeIcon icon={faArrowLeftLong} /> Back to Home</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Select_location;
