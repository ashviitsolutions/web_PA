import React from 'react';
import { Link } from 'react-router-dom';
import image1 from "../../../assets/img/43547063_s.jpg";
import image2 from "../../../assets/img/istockphoto-1307109392-170667a.jpg";
import { useDispatch } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';

function Select_location() {
    const dispatch = useDispatch();

    const handleSubmit = (input) => {
        const formData = {
            location_type: input,
        };

        // Dispatch the form data to Redux
        dispatch(updateInputData({ formName: 'location', inputData: formData }));
    };

    return (
        <>
            <div id="over_banner">
                <div className="container">
                    <div className="row">
                        <form className="location">
                            <h3>Where would you like us to <b>serve you</b> </h3>
                            <ul className="service">
                                <Link to="/select_location" onClick={() => handleSubmit('Home')}>
                                    <li>
                                        <span
                                            className="bg"
                                            style={{
                                                backgroundImage: `url(${image2})`,
                                            }}
                                        ></span>

                                        <span className="title">My Location</span>
                                        <span className="text">At the convenience of your home / your location</span>
                                    </li>
                                </Link>
                                <Link to="/listofprovider" onClick={() => handleSubmit('providers location')}>
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
    );
}

export default Select_location;
