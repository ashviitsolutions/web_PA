import React from 'react'
import { Link } from 'react-router-dom'
import image1 from "../../../assets/img/43547063_s.jpg"
import image2 from "../../../assets/img/istockphoto-1307109392-170667a.jpg"


function Select_location() {

    return (
        <>
            <div id="over_banner">
                <div className="container">
                    <div className="row">
                        <form className="location" >
                            <h3>Where would you like us to <b>Serve you</b> </h3>

                            <ul className="service">
                                <Link to="/book">
                                    <li>
                                    <span
                                    className="bg"
                                    style={{
                                        backgroundImage: `url(${image2})`,
                                    }}
                                ></span>

                                        <span className="title">Home</span>
                                        <span className="text">At convience of your home / your location</span>
                                    </li>
                                </Link>
                                <Link to="/become_provider">
                                    <li>
                                        <span
                                            className="bg"
                                            style={{
                                                backgroundImage: `url(${image1})`,
                                            }}
                                        ></span>


                                        <span className="title">Provider's Location</span>
                                        <span className="text">at service provider's location for better professional support</span>
                                    </li>
                                </Link>
                            </ul>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Select_location