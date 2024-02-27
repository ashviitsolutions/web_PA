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
    console.log("formData", formData)
    console.log("formData", formData?.fifthform[0]?.name || "")
    const customer_user = formData?.fifthform[0]?.name || ""
    const addressUser = formData.locationForm?.[0]?.address || "";
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

    const add_ons_details = formData.add_ons_details && formData.add_ons_details[0] ? formData.add_ons_details[0] : "";

    


    const email = formData.fifthform?.[0]?.email || "";
    const address = formData.fifthform?.[0]?.address || "";
    const arrivalInstructions = formData.fifthform?.[0]?.arrivalInstructions || "";
    const confirmpassword = formData.fifthform?.[0]?.confirmpassword || "";
    const password = formData.fifthform?.[0]?.password || "";
    const mobile=formData.fifthform[0]?.mobile || "";
    console.log("mobile", mobile)
    const [selectedGiftCards, setSelectedGiftCards] = useState([]);
    const [paymentIntentId, setPaymentIntentId] = useState('');
    const [client_secret, setClientSecret] = useState();
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [tax, setTax] = useState(0);
    const [tip, setTip] = useState(0);
    const [error, setError] = useState(false);
    const [giftCardAmount, setGiftCardAmount] = useState(0);
    const [user, setUser] = useState([]);
    const [membership, setMembershipLevel] = useState();
    const [originalprice, setOriginalprice] = useState()

    let mebershiplevel = localStorage.getItem("membership")

    // membership

    useEffect(() => {
        const getUserMembership = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`${IP}/user/membership-details`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });


                const data = await response.json();


                setMembershipLevel(data.membershipType);




            } catch (error) {
                console.error("Error:", error);
            }
        };

        getUserMembership();
    }, [totalPrice]);



    useEffect(() => {
        // Define default values for tip and tax rate
        const tip = 31.5;
        const taxRate = 0.06625;
        // Initialize membership discount rate
        let membershipDiscountRate = 0;

        // Check if membership is Silver or Gold
        if (membership === "Silver") {
            // If Silver membership is selected, apply a 5% discount
            membershipDiscountRate = 0.05;
        } else if (membership === "Gold") {
            // If Gold membership is selected, apply a 10% discount
            membershipDiscountRate = 0.10;
        }

        // Calculate tax amount
        const calculatedTax = (totalPrice * 100 * taxRate) / 100;
        // Calculate total amount without membership discount
        const totalAmountWithoutDiscount = totalPrice * 1 + tip + calculatedTax;
        // Calculate total amount after applying membership discount
        const totalAmount = totalAmountWithoutDiscount * (1 - membershipDiscountRate);

        // Update state variables
        setTax(calculatedTax);
        setTip(tip);
        setTotalAmount(totalAmount);
        setOriginalprice(totalAmountWithoutDiscount)
    }, [totalPrice, membership, formData.fifthform]);










    const makePayment = async () => {
        try {
            const response = await axios.post(`${IP}/create-payment-intent`, {
                amount: totalAmount - giftCardAmount,
                returnUrl: 'http://productivealliance.com/userProfile/payment/success/:paymentId'
            });
            setPaymentIntentId(response?.data?.paymentIntent?.id);
            setClientSecret(response.data.client_secret);
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };

    useEffect(() => {
        if (totalAmount) {
            makePayment();
        }
    }, [totalAmount, giftCardAmount]);




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
                    mobile: mobile,

                    instructions: arrivalInstructions,
                    add_ons: addon_id,

                    add_ons_details: add_ons_details


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
                            // nav(`/userProfile/payment/success/${paymentId}`);
                        },

                    });
                    setLoading(false)
                } else {
                    // Show error notification if the API response is not successful
                    toast.success("Your Booking Successfully", {
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



    //megift card

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                };

                const res = await fetch(`${IP}/user/my-giftCards`, config);
                const data = await res.json();
                setUser(data?.data);


            } catch (error) {

            }
        };

        fetchData();
    }, []);
    console.log("user/my-giftCards", user);

    const handleGiftCardChange = (amount) => {
        if (amount > totalAmount) {
            // Notify the user that deselecting this gift card would exceed the total amount
            toast.error("Deselecting this gift card would exceed the total amount.", {
                position: "top-right",
                autoClose: 2000,
            });
            return; // Exit the function, preventing further execution
        }

        // Calculate the total gift card amount including the new amount
        const updatedSelectedGiftCards = [...selectedGiftCards];
        const index = updatedSelectedGiftCards.indexOf(amount);
        if (index === -1) {
            // If the amount is not already selected, add it to the list
            updatedSelectedGiftCards.push(amount);
        } else {
            // If the amount is already selected, remove it from the list
            updatedSelectedGiftCards.splice(index, 1);
        }

        // Calculate the total gift card amount based on selected gift cards
        const updatedGiftCardAmount = updatedSelectedGiftCards.reduce((acc, curr) => acc + curr, 0);

        // Update the state with new selected gift cards and total gift card amount
        setSelectedGiftCards(updatedSelectedGiftCards);
        setGiftCardAmount(updatedGiftCardAmount);
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
                                <div>
                                    <li>
                                        <span className="title">Date</span>
                                        <span className="value">{formData.fourthform?.[0]?.date}</span>
                                    </li>
                                    <li>
                                        <span className="title">Time</span>
                                        <span className="value">{formData.fourthform?.[0]?.time}</span>
                                    </li>
                                    <li>
                                        <span className="title">Service Time</span>
                                        <span className="value">{service_time}</span>
                                    </li>
                                </div>

                                <li>
                                    <span className="title">Personal Details</span>
                                    <spam className="value">Full Name : {customer_user}</spam>
                                    <span className="value">Address : {addressUser}</span>
                                    <span className="value">Gender : {gender}</span>
                                </li>
                                <li>

                                    <span className="title">Booking Details</span>
                                    <span className="value">{formData.servicename[0] || ""} {service_time} - {massage_for}
                                    </span>
                                    <span className="title">Arrival Instructions : </span><span className='value'>{arrivalInstructions}</span>
                                    <span className="value">Booking Type: {location_type}</span>
                                </li>
                                <li>
                                    <div className="form-group row mb-3">
                                        <div className="col-7 mb-0 px-0 pr-2">
                                            <input id="e-mail" type="text" placeholder="Have a coupon code ?" className="form-control input-box rm-border text-left" />
                                        </div>
                                        <div className='col-1 px-0'>{" "}</div>
                                        <div className="col-2 px-0">
                                            <button type="submit" className="button" >Apply!</button>
                                        </div>
                                    </div>


                                    <div>
                                        {user.length > 0 ? (
                                            <>
                                                <span className="title">Choose Gift Card:</span>
                                                {user.map((cur, index) => (
                                                    <div className="gift-card-section" key={index}>
                                                        <label htmlFor={`use-gift-card-${index}`} className="ml-2"></label>
                                                        <div className="form-group row justify-content-center mb-0">
                                                            <div className="col-md-12 px-3 mt-2">
                                                                <input type="checkbox" id={`use-gift-card-${index}`} onChange={() => handleGiftCardChange(cur?.offerId?.offerValue)} />
                                                                <label htmlFor={`use-gift-card-${index}`} className="ml-2"> <span className='title'> Use your ${cur?.offerId?.offerValue} gift card</span></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <span className="title">Gift Card not purchased</span>
                                        )}
                                    </div>



                                    <div className="price" style={{ display: 'block', lineHeight: '10px' }}>
                                        <p className="prices" style={{ fontSize: '17px' }}>
                                            <span className='value'>
                                                Amount: ${formData.secondform?.[0]?.totalPrice}
                                            </span></p>
                                        <p className="prices" style={{ fontSize: '17px' }}>
                                            <span className='value'>
                                                18% Tip: ${tip}
                                            </span></p>
                                        <p className="prices" style={{ fontSize: '17px' }}>
                                            <span className='value'>
                                                6.625% Taxes: ${tax.toFixed(2)}
                                            </span></p>
                                        {membership === "Silver" && (
                                            <p className="prices" style={{ fontSize: '17px' }}>
                                                <span className='value'>
                                                    5% Silver Membership Discount: ${(originalprice * 0.05).toFixed(2)}

                                                </span></p>
                                        )}
                                        {membership === "Gold" && (
                                            <p className="prices" style={{ fontSize: '17px' }}>
                                                <span className='value'>
                                                    10% Gold Membership Discount: ${(originalprice * 0.10).toFixed(2)}
                                                </span></p>
                                        )}
                                        <p className="prices" style={{ fontSize: '17px' }} >
                                            <span className='value'>Total: ${totalAmount.toFixed(2)}
                                            </span></p>
                                    </div>

                                </li>
                            </ul>

                            <StripeCheckout
                                amount={(totalAmount - giftCardAmount) * 100}
                                token={onSubmit}
                                client_secret={client_secret}
                                currency="USD"
                                stripeKey="pk_test_51MXmewLnVrUYOeK2PN2SexCsPAi8lsw8dIt7Pw04DUCsoCsv7a0VReRlGhbUuDOKYqbp1PEDWRWklwSvEsUD0NZ400sa7PXdfg"
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <button className="button"> Proceed to Pay ${(totalAmount - giftCardAmount).toFixed(2)}</button>
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
