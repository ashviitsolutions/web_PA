import React, { useState } from "react";
import "./style.css"
import image13 from "../../../assets/img/goodbye.png"
import image14 from "../../../assets/img/laugh.png"
import image15 from "../../../assets/img/thinking-of-someone.png"
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import { useNavigate, useLocation } from 'react-router-dom';



const FirstForm = ({ step, nextStep }) => {
    const nav = useNavigate()
    const location = useLocation();
    const locationType = location.state?.location_type || "";
    const locationForm = location.state?.locationForm || "";
    console.log("locationForm", locationForm);
    console.log("locationType", locationType);

    const dispatch = useDispatch();


    const handleSubmit = (input) => {
        if (!input) {
            alert("please select the option")
        } else {
            nav(`/book`, { state: { firstForm: input, location_type: locationType, locationForm: locationForm } });
            nextStep();
        }


    };


    return (
        <>


            <div id="sec_wiz_1" className="section smallOne">
                <div id="employees" style={{ textAlign: "center" }}>
                    <label className="as_title whoIs" htmlFor="" >
                        Who Is it for?
                    </label>
                    <ul className="review option" style={{ display: "flex" }} id="review_option">
                        <li onClick={() => handleSubmit('single')}>
                            <span
                                className="icon"
                                style={{
                                    backgroundImage: `url(${image13})`,
                                }}
                            ></span>
                            Just me
                        </li>
                        <li onClick={() => handleSubmit('partner')}>
                            <span
                                className="icon"
                                style={{
                                    backgroundImage: `url(${image14})`,
                                }}
                            ></span>
                            Duo
                        </li>

                    </ul>
                    <a className='small' href='/'>&larr; Back to Home</a>
                </div>
            </div>


        </>
    )
}

export default FirstForm