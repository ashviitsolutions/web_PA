
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IP } from '../../../../Constant';
import './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import vectorImg from "../../../assets/img/6212029.jpg";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Conform = () => {

    const { provider_id } = useParams();
    const { totalPrice } = useParams();
    const useremail = localStorage.getItem("user_email");
    const username = localStorage.getItem("user_name");
    const userid = localStorage.getItem("userid");
    const tokenuser = localStorage.getItem("token");
    const nav = useNavigate();

    const formData = useSelector((state) => state.counter.formData);
    const addressUser = formData.locationForm?.[0]?.address || "";


    console.log("most of the data", totalPrice)

    // Check if the necessary form data exists before accessing its properties    
    const addon_id = formData.addon_id && formData.addon_id[0] ? formData.addon_id[0] : "";
    const location = formData.locationForm && formData.locationForm[0] ? formData.locationForm[0] : null;
    // Check if location is defined before trying to access its properties
    const locationName = location ? location.location : null;


    const location_type = formData.location && formData.location[0] ? formData.location[0].location_type : "";
    const gender = formData.secondform && formData.secondform[0] ? formData.secondform[0].gender : "";
    //   const totalPrice = formData.secondform && formData.secondform[0] ? formData.secondform[0].totalPrice : "";
    const service_id = formData.secondform && formData.secondform[0] ? formData.secondform[0].service_ids : "";
    const service_time = formData.secondform && formData.secondform[0] ? formData.secondform[0].service_time : "";
    const areas_of_concern = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].areas_of_concern : "";
    const health_conditions = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].health_conditions : "";
    const massage_body_part = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].massage_body_part : "";
    const massage_pressure = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].massage_pressure : "";
    const special_considerations = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].special_considerations : "";
    const scheduled_date = formData.fourthform && formData.fourthform[0] ? formData.fourthform[0].date : "";
    const scheduled_timing = formData.fourthform && formData.fourthform[0] ? formData.fourthform[0].time : "";
    const massage_for = formData?.firstForm?.[0];




    const email = formData.fifthform?.[0]?.email || "";
    const address = formData.fifthform?.[0]?.address || "";
    const arrivalInstructions = formData.fifthform?.[0]?.arrivalInstructions || "";
    const confirmpassword = formData.fifthform?.[0]?.confirmpassword || "";
    const password = formData.fifthform?.[0]?.password || "";

    console.log("email dispatch", totalPrice, email, address, arrivalInstructions, confirmpassword, password)

    const [paymentIntentId, setPaymentIntentId] = useState('');
    const [client_secret, setClientSecret] = useState();
    const [loading, setLoading] = useState(false);

    // const [clientSecret, setClientSecret] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [tax, setTax] = useState(0);
    const [tip, setTip] = useState(0);
    const [error, setError] = useState(false);

    useEffect(() => {
        const tip = 31.5;
        const taxRate = 0.06625;
        const calculatedTax = (totalPrice * 100 * taxRate) / 100;
        const totalAmount = (totalPrice * 100 + tip * 100 + calculatedTax * 100) / 100;
        const totalAmountInteger = Math.floor(totalAmount);
        setTax(calculatedTax);
        setTip(tip);
        setTotalAmount(totalAmountInteger);
    }, [totalPrice]);




    // const makePayment = async () => {
    //     try {
    //         const response = await axios.post(`${IP}/create-payment-intent`, {
    //             amount: totalAmount, // Assuming the amount is in cents (i.e., $10.00)
    //             returnUrl: 'http://localhost:3000/userProfile/payment/success/:paymentId'
    //         });
    //         setPaymentIntentId(response?.data?.paymentIntent?.id);
    //         setClientSecret(response.data.client_secret)
    //         console.log("data of paymemnt", response?.data?.paymentIntent?.id)
    //         console.log("data of paymemnts", response?.data?.paymentIntent?.client_secret)
    //     } catch (error) {
    //         console.error('Error creating payment intent:', error);
    //     }
    // };


    // Add totalAmount as a 


    const makePayment = async () => {
        try {
            const response = await axios.post(`${IP}/create-payment-intent`, {
                amount: totalAmount, // Assuming the amount is in cents (i.e., $10.00)
                returnUrl: 'http://productivealliance.com/userProfile/payment/success/:paymentId'
            });
            setPaymentIntentId(response?.data?.paymentIntent?.id);
            setClientSecret(response.data.client_secret) // Accessing client_secret from paymentIntent object
            // console.log("data of payment", response?.data?.paymentIntent?.id);
            // console.log("data of payment client_secret", response?.data?.paymentIntent?.client_secret);
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };






    useEffect(() => {
        if (totalAmount) {
            makePayment()
        }

    }, [totalAmount])

    console.log("clientSecret", client_secret);







    const onSubmit = async (token) => {
        if (token) {
            try {
                const formData = {
                    ...(userid ? {
                        user: userid,
                        customer_email: email,
                    }
                        : {
                            email: email,
                            password: password,
                            confirm_password: confirmpassword
                        }

                    ),
                    location: locationName,
                    paymentIntentId: paymentIntentId,
                    location_type: location_type,
                    massage_for: massage_for,
                    service_id: service_id,
                    gender: gender,
                    provider_id: provider_id,

                    service_time: service_time,
                    health_conditions: health_conditions,
                    areas_of_concern: areas_of_concern,
                    special_considerations: special_considerations,
                    massage_body_part: massage_body_part,
                    massage_pressure: massage_pressure,
                    scheduled_date: scheduled_date,
                    scheduled_timing: scheduled_timing,
                    address: address,

                    instructions: "bring material",
                    add_ons: addon_id,


                }
                const paymentId = token.id;

                const url = `${IP}/user/service_book`;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: tokenuser,
                    },
                };

                const res = await axios.post(url, formData, config);

                if (res.status === 200) {

                    // Show success notification and navigate to payment success page
                    toast.success("Your Booking Successfully", {
                        position: "top-right",
                        autoClose: 1000,
                        onClose: () => {
                            nav(`/userProfile/payment/success/${paymentId}`);
                        },

                    });
                    setLoading(false)
                } else {
                    // Show error notification if the API response is not successful
                    toast.error("An error occurred. Please try again.", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } else {
            setError(true);
        }
    };

    return (
        <>
            <div className='container checkoutPage'>
                <div className='row'>
                    <div className='col-md-4 centerFlex circle'><img src={vectorImg} alt='' className='col-md-12' /></div>
                    <div id="" className="col-md-8 padding20">
                        <div id="employees">
                            <label style={{ textAlign: 'center', fontSize: '18px' }} className="as_title" htmlFor="">
                                Review
                            </label>
                            <ul className="review d-block">
                                <li>
                                    <span className="title">Date</span>
                                    <span className="value">{formData.fourthform?.[0]?.date}</span>
                                </li>
                                <li>
                                    <span className="title">Personal Details</span>
                                    <span className="value">{addressUser}</span>
                                </li>
                                <li>
                                    <span className="title">Massage Pressure</span>
                                    <span className="value">{formData.thirdform?.[0]?.massage_pressure}</span>
                                </li>
                                <li>
                                    <span className="title">Appointments</span>
                                    <span className="value"> <small>{formData.secondform?.[0]?.service_time}</small> </span>
                                    <div className="price" style={{ display: 'block', lineHeight: '10px' }}>
                                        <p className="prices" style={{ fontSize: '17px' }}>
                                            Amount: ${formData.secondform?.[0]?.totalPrice}
                                        </p>
                                        <p className="prices" style={{ fontSize: '17px' }}>
                                            18% Tip: ${tip}
                                        </p>
                                        <p className="prices" style={{ fontSize: '17px' }}>
                                            6.625% Taxes: ${tax.toFixed(2)}
                                        </p>
                                        <p className="prices" style={{ fontSize: '17px' }} onClick={onSubmit}>
                                            Total: ${totalAmount.toFixed(2)}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <StripeCheckout
                                amount={totalAmount * 100}
                                token={onSubmit} // Pass onSubmit as a callback to the token prop
                                client_secret={client_secret}
                                currency="USD"
                                stripeKey="pk_test_51MXmewLnVrUYOeK2PN2SexCsPAi8lsw8dIt7Pw04DUCsoCsv7a0VReRlGhbUuDOKYqbp1PEDWRWklwSvEsUD0NZ400sa7PXdfg"
                            >
                                <div style={{ textAlign: 'center' }}>

                                    <button className="button"> Proceed to Pay ${totalAmount}</button>
                                </div>
                            </StripeCheckout>

                        </div>
                    </div>
                </div>
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
        </>
    );
};

export default Conform;

















import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import Calendar from 'react-calendar';

const FourForm = ({ nextStep }) => {
    const selector = useSelector((state) => state.counter.formData);
    console.log("selector", selector);
    const [selectedTime, setSelectedTime] = useState(""); // State to store selected time
    const [selectedDate, setSelectedDate] = useState(new Date()); // State to store selected date
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();





    const handleSubmit = () => {
        // If selectedTime is not set, set an error message and do not proceed
        if (!selectedTime) {
            setErrorMessage("Please select a time before proceeding.");
            return;
        }

        // Clear any previous error message
        setErrorMessage("");

        // Format the date as a string in "YYYY-MM-DD" format
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        // You can use formattedDate and selectedTime in your submission
        const formData = {
            date: formattedDate,
            time: selectedTime,
        };

        // Dispatch the form data to Redux
        dispatch(updateInputData({ formName: 'fourthform', inputData: formData }));

        setTimeout(() => {
            nextStep();
        }, 2000);
    };


    return (
        <>
            <div id="sec_wiz_4" className="section">
                <div className="input_group" style={{ textAlign: "center" }}>
                    <label className="static" style={{ fontSize: "17px" }} htmlFor="">
                        <b>WHEN WOULD YOU LIKE IT?</b>
                    </label>

                    {/* Date picker */}
                    <div style={{ display: "inline-block" }} id="datepicker">
                        <Calendar
                            onChange={(date) => setSelectedDate(date)}
                            value={selectedDate}
                            minDate={new Date()}
                        />
                    </div>

                    {/* Time selection dropdown */}
                    <select
                        style={{ width: "auto", display: "inline-block", padding: "0px 15px" }}
                        className="input"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    >
                        <option value="">Select Time</option>
                        <option value="8:00 am">8:00 am</option>
                        <option value="8:30 am">8:30 am</option>
                        <option value="9:00 am">9:00 am</option>
                        <option value="9:30 am">9:30 am</option>
                        <option value="10:00 am">10:00 am</option>
                        <option value="10:30 am">10:30 am</option>
                        <option value="11:00 am">11:00 am</option>
                        <option value="11:30 am">11:30 am</option>
                        <option value="12:00 pm">12:00 pm</option>
                        <option value="12:30 pm">12:30 pm</option>
                        <option value="1:00 pm">1:00 pm</option>
                        <option value="1:30 pm">1:30 pm</option>
                        <option value="2:00 pm">2:00 pm</option>
                        <option value="2:30 pm">2:30 pm</option>
                        <option value="3:00 pm">3:00 pm</option>
                        <option value="3:30 pm">3:30 pm</option>
                        <option value="4:00 pm">4:00 pm</option>
                        <option value="4:30 pm">4:30 pm</option>
                        <option value="5:00 pm">5:00 pm</option>
                        <option value="5:30 pm">5:30 pm</option>
                        <option value="6:00 pm">6:00 pm</option>
                        <option value="6:30 pm">6:30 pm</option>
                        <option value="7:00 pm">7:00 pm</option>
                        <option value="7:30 pm">7:30 pm</option>
                        <option value="8:00 pm">8:00 pm</option>
                        <option value="8:30 pm">8:30 pm</option>
                        <option value="9:00 pm">9:00 pm</option>
                        <option value="9:30 pm">9:30 pm</option>
                        <option value="10:00 pm">10:00 pm</option>
                    </select>
                    <div className="error-message">{errorMessage}</div>

                    {/* Button to submit */}
                    <button className="button" type="button" onClick={handleSubmit}>
                        Next
                    </button>
                </div>

                <center>
                    <a className='small' href='/'>&larr; Back to Home</a>
                </center>
            </div>
        </>
    );
};

export default FourForm;
