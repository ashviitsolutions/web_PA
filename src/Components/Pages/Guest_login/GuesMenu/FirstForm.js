import React, { useState } from "react";
import "./style.css"
import image13 from "../../../assets/img/goodbye.png"
import image14 from "../../../assets/img/laugh.png"
import image15 from "../../../assets/img/thinking-of-someone.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';



const FirstForm = ({ step, nextStep }) => {
    // Use useSelector with the correct selector to get the formData
    const formData = useSelector((state) => state.counter.formData);
    console.log("firstform", formData);

    const dispatch = useDispatch();
    // const handleSubmit = (input) => {
    //     dispatch(updateInputData({ formName: 'firstForm', inputData: input }));


    //     setTimeout(() => {
    //         nextStep();

    //       }, 2000)
    //     nav("/guest_login")
    // };

    const handleSubmit = (input) => {
        console.log('handleSubmit called with input:', input);
        console.log('dispatch:', dispatch);
        dispatch(updateInputData({ formName: 'firstForm', inputData: input }));
        setTimeout(() => {
            nextStep();

        }, 2000)
    };


    return (
        <>


            <div id="sec_wiz_1" className="section smallOne">
                <div id="employees" style={{ textAlign: "center" }}>
                    <label className="as_title whoIs" htmlFor="" >
                        Who Is it for?
                    </label>
                    <ul className="review option" style={{ display: "flex" }} id="review_option">
                        <li onClick={() => handleSubmit('myself')}>
                            <span
                                className="icon"
                                style={{
                                    backgroundImage: `url(${image13})`,
                                }}
                            ></span>
                            Just me
                        </li>
                        <li onClick={() => handleSubmit('guest')}>
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