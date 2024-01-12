import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from "../../../assets/img/43547063_s.jpg";
import image2 from "../../../assets/img/istockphoto-1307109392-170667a.jpg";
import { useDispatch } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import { useNavigate } from 'react-router-dom';

function Select_location() {
    const nav = useNavigate()
    const dispatch = useDispatch();
    const [state, setState] = useState()

    const handleSubmit = (input) => {
        setState(input)
        const formData = {
            location_type: input,
        };

        // Dispatch the form data to Redux
        dispatch(updateInputData({ formName: 'location', inputData: formData }));
    };

    useEffect(() => {
        if (state === "Home") {
            nav("/select_location")
        } else if (state === "providers location") {
            nav("/listofprovider")
        }

    }, [state])

    return (
        <>
            <div id="over_banner">
                <div className="container">
                    <div className="row">
                        <form className="location">
                            <h3 className='blue_head'>Where would you like us to <b>serve you</b> </h3>
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
                                        <span className="text">At the convenience of your home / your location</span>
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
                                        <span className="text">at service provider's location for better professional support</span>
                                    </li>
                                </div>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Select_location;
