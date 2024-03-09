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

    const formData = useSelector((state) => state.counter.formData);
    const { totalPrice } = useParams();
    const { provider_id } = useParams();

    const booking_id = localStorage.getItem("booking_id");
    const username = localStorage.getItem("user_name");
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    const nav = useNavigate();


    console.log("formData", formData)

    // const customer_user = formData?.fifthform[0]?.name || ""
    // const addressUser = formData.locationForm?.[0]?.address || "";
    // Check if the necessary form data exists before accessing its properties    
    const addon_id = formData.addon_id && formData.addon_id[0] ? formData.addon_id[0] : "";
    const location = formData.locationForm && formData.locationForm[0] ? formData.locationForm[0] : null;
    // Check if location is defined before trying to access its properties
    const locationName = location ? location.location : null;


    const customer_user = formData.fifthform && formData.fifthform[0] ? formData.fifthform[0].name : "";
    const addressUser = formData.locationForm && formData.locationForm[0] ? formData.locationForm[0].address : "";
    const location_type = formData.location && formData.location[0] ? formData.location[0].location_type : "";
    const gender = formData.secondform && formData.secondform[0] ? formData.secondform[0].gender : "";
    const gender1 = formData.secondform && formData.secondform[0] ? formData.secondform[0].gender[0] : "";
    const gender2 = formData.secondform && formData.secondform[0] ? formData.secondform[0].gender[1] : "";

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
    // const massage_for = formData?.firstForm?.[0] || "";
    const massage_for = formData.firstForm && formData.firstForm[0] ? formData.firstForm[0] : "";

    const add_ons_details = formData.add_ons_details && formData.add_ons_details[0] ? formData.add_ons_details[0] : "";

    const service_name = formData.servicename && formData.servicename[0] ? formData.servicename[0] : "";





    const email = formData.fifthform && formData.fifthform[0] ? formData.fifthform[0].email : "";
    const address = formData.fifthform && formData.fifthform[0] ? formData.fifthform[0].address : "";
    const arrivalInstructions = formData.fifthform && formData.fifthform[0] ? formData.fifthform[0].arrivalInstructions : "";
    const confirmpassword = formData.fifthform && formData.fifthform[0] ? formData.fifthform[0].email : "";
    const password = formData.fifthform && formData.fifthform[0] ? formData.fifthform[0].password : "";
    const mobile = formData.fifthform && formData.fifthform[0] ? formData.fifthform[0].mobile : "";

    // const servicename = formData.servicename && formData.servicename[0] ? formData.servicename[0] || "";
    const servicename = formData.servicename && formData.servicename[0] ? formData.servicename[0] : "";

    const gendercheck = formData?.firstForm && formData.firstForm.length > 0 ? formData.firstForm[0] : "";

    console.log("add_ons_details", add_ons_details)

    // const email = formData.fifthform?.[0]?.email || "";
    // const address = formData.fifthform?.[0]?.address || "";
    // const arrivalInstructions = formData.fifthform?.[0]?.arrivalInstructions || "";
    // const confirmpassword = formData.fifthform?.[0]?.confirmpassword || "";
    // const password = formData.fifthform?.[0]?.password || "";
    // const mobile = formData.fifthform[0]?.mobile || "";
    console.log("servicename", servicename)
    const [selectedGiftCards, setSelectedGiftCards] = useState([]);
    const [paymentIntentId, setPaymentIntentId] = useState('');
    const [client_secret, setClientSecret] = useState();
    const [loading, setLoading] = useState(false);

    const [tax, setTax] = useState(0);
    const [tip, setTip] = useState(0);
    const [error, setError] = useState(false);
    const [giftCardAmount, setGiftCardAmount] = useState(0);
    const [user, setUser] = useState([]);
    const [membership, setMembershipLevel] = useState();
    const [originalprice, setOriginalprice] = useState()
    const [bookingid, setBookingId] = useState(null)

    const [amountAddon, setAmountAddon] = useState(0);
    const [amountMembershipDiscount, setAmountMembershipDiscount] = useState(0);
    const [amountTax, setAmountTax] = useState(0);
    const [amountTip, setAmountTip] = useState(0);
    const [amount_addon, setAddsAmount] = useState(0)
    const [bokingValue, setBookingData] = useState()



    const [totalAmount, setTotalAmount] = useState(0);
    const [serviceDetails, setServiceDetails] = useState({
        price: 0,
        service_name: ""
    });

    // useEffect(() => {
    //     // Calculate total price for addons
    //     const totalAddonPrice = add_ons_details.reduce((total, addon) => total + addon.price, 0);
    //     setAmountAddon(totalAddonPrice);
    // }, [add_ons_details]);

    useEffect(() => {
        // Calculate total price for addons
        if (Array.isArray(add_ons_details)) {
            const totalAddonPrice = add_ons_details.reduce((total, addon) => total + addon.price, 0);
            setAmountAddon(totalAddonPrice);
        } else {
            // If add_ons_details is not an array, set the total addon price to 0
            setAmountAddon(0);
        }
    }, [add_ons_details]);



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





    // useEffect(() => {
    //     // Define default values for tip and tax rate
    //     // const tip = 31.5;
    //     const taxRate = 0.06625;
    //     // Initialize membership discount rate
    //     let membershipDiscountRate = 0;

    //     // Check if membership is Silver or Gold
    //     if (membership === "Silver") {
    //         // If Silver membership is selected, apply a 5% discount
    //         membershipDiscountRate = 0.05;
    //     } else if (membership === "Gold") {
    //         // If Gold membership is selected, apply a 10% discount
    //         membershipDiscountRate = 0.10;
    //     }

    //     // Calculate tax amount
    //     const calculatedTax = (totalPrice * 100 * taxRate) / 100;
    //     // const tip = 135 * 0.18;
    //     const tip = totalPrice * 0.18;
    //     // Calculate total amount without membership discount
    //     const totalAmountWithoutDiscount = totalPrice * 1 + tip + calculatedTax;
    //     // Calculate total amount after applying membership discount
    //     const totalAmount = totalAmountWithoutDiscount * (1 - membershipDiscountRate);

    //     // Update state variables
    //     setServiceDetails({
    //         price: totalAmount,
    //         service_name: servicename
    //     });
    //     setTax(calculatedTax);
    //     setTip(tip);
    //     setTotalAmount(totalAmount);
    //     setOriginalprice(totalAmountWithoutDiscount)
    // }, [totalPrice, membership, formData.fifthform]);



    useEffect(() => {
        // Define default values for tip and tax rate
        // const tip = 31.5;
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

        const servicePricewithmemberhsip = 135 * (1 - membershipDiscountRate);
        const adds_onprice = (totalPrice - 135);
        const tip = (servicePricewithmemberhsip + adds_onprice) * 0.18;
        const Tax = (servicePricewithmemberhsip + adds_onprice) * taxRate;
        const totalAmounts = servicePricewithmemberhsip + adds_onprice + tip + Tax;

        // Update state variables
        setServiceDetails({
            price: totalAmounts,
            service_name: servicename
        });
        setTax(Tax);
        setTip(tip);
        setTotalAmount(totalAmounts);
        setAddsAmount(adds_onprice);
        setOriginalprice(servicePricewithmemberhsip)
    }, [totalPrice, membership, formData.fifthform]);








    var bookingData = {
        ...(userid ? {
            user: userid,
            customer_email: email,
        } : {
            email: email,
            password: password,
            confirm_password: confirmpassword
        }),
        location: locationName,

        amount_calculation: {
            amount_widthout_tax: totalAmount,
            amount_service: 135,
            amount_addon: amountAddon,
            amount_tip: tip,
            amount_tax: tax,
            amount_membership_discount: originalprice,
            total_amount: totalPrice,
        },



        // amount_service:amount_service,



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
        add_ons_details: add_ons_details,
        service_name: service_name
    };





    console.log("data all get", bookingData)







    useEffect(() => {
        const sendBookingData = async () => {
            try {
                // Check if bookingData exists
                if (!bookingData?.amount_calculation?.amount_tip) {
                    throw new Error('Booking data is missing.');
                }

                const response = await fetch(`${IP}/user/pendingbooking`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify(bookingData)
                });

                if (!response.ok) {
                    throw new Error('Failed to send booking data');
                }

                const responseData = await response.json();

                if (!responseData || !responseData._id) {
                    throw new Error('Invalid response from the server.');
                }

                // Set the booking ID in state and local storage
                setBookingId(responseData._id);
                localStorage.setItem("booking_id", responseData._id);
                console.log('Booking data sent successfully:', responseData);
            } catch (error) {
                console.error('Error sending booking data:', error.message);
                // Handle error here (e.g., show a notification to the user)
            }
        };

        // Call the function to send booking data
        sendBookingData();
    }, [bookingData?.amount_calculation?.amount_tip]); // Trigger when bookingData changes







    // const handleCheckout = async () => {
    //     setLoading(true)

    //     if (!booking_id || !bookingid) {
    //         setLoading(false)
    //         return false
    //     }

    //     try {
    //         const response = await axios.post(`${IP}/createCheckoutSession`, {
    //             service_details: serviceDetails,
    //             booking_id: bookingid || booking_id
    //         });
    //         window.location.href = response.data.url;


    //     } catch (error) {
    //         console.error('Error creating checkout session:', error);
    //         setLoading(false)
    //     }
    // };







    //megift card


    const handleCheckout = async () => {
        setLoading(true);

        if (!booking_id && !bookingid) {
            setLoading(false);
            return false;
        }

        const bookingId = bookingid || booking_id;

        try {
            const response = await axios.post(`${IP}/createCheckoutSession`, {
                service_details: serviceDetails,
                booking_id: bookingId
            });
            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            setLoading(false);
        }
    };











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

        // Calculate the adjusted service price after deducting the gift card amount
        const adjustedServicePrice = totalAmount - updatedGiftCardAmount;

        // Update the state with new selected gift cards and adjusted service price
        setSelectedGiftCards(updatedSelectedGiftCards);
        setGiftCardAmount(updatedGiftCardAmount);
        setServiceDetails({
            ...serviceDetails,
            price: adjustedServicePrice,
        });
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
                                    <li>
                                        <span className="title">Service Name</span>
                                        <span className="value">{service_time}</span>
                                    </li>

                                </div>

                                <li>
                                    <span className="title">Personal Details</span>
                                    <spam className="value">Full Name : {customer_user}</spam>
                                    <span className="value">Address : {addressUser}</span>

                                    {
                                        gendercheck === "partner" ? (
                                            <>
                                                <span className="value">Gender : Partner 1 : {gender1} Partner 2 : {gender2} </span>

                                            </>
                                        ) : <span className="value">Gender : {gender}</span>
                                    }

                                </li>
                                <li>

                                    <span className="title">Booking Details</span>
                                    <span className="value">{servicename} {service_time} - {massage_for}
                                    </span>
                                    <li>
                                        <span className="title">Add-ons</span>
                                        {add_ons_details ? (
                                            <span className="value">
                                                {add_ons_details.map((addon, index) => (
                                                    <span key={index}>
                                                        {addon.title}
                                                        {index !== add_ons_details.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </span>
                                        ) : (
                                            <span className="value">No add-ons selected</span>
                                        )}
                                    </li>
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
                                        {user?.length > 0 ? (
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
                                                Amount: ${totalPrice}
                                            </span></p>
                                        <p className="prices" style={{ fontSize: '17px' }}>
                                            <span className='value'>
                                                18% Tip: ${tip.toFixed(2)}
                                            </span></p>
                                        <p className="prices" style={{ fontSize: '17px' }}>
                                            <span className='value'>
                                                6.625% Taxes: ${tax.toFixed(2)}
                                            </span></p>
                                        {membership === "Silver" && (
                                            <p className="prices" style={{ fontSize: '17px' }}>
                                                <span className='value'>
                                                    5% Silver Membership Discount: ${6.75}

                                                </span></p>
                                        )}
                                        {membership === "Gold" && (
                                            <p className="prices" style={{ fontSize: '17px' }}>
                                                <span className='value'>
                                                    10% Gold Membership Discount: ${13.50}
                                                </span></p>
                                        )}
                                        <p className="prices" style={{ fontSize: '17px' }} >
                                            <span className='value'>Total: ${totalAmount.toFixed(2)}
                                            </span></p>

                                    </div>

                                </li>
                            </ul>

                            {serviceDetails && (
                                <div>

                                    <div style={{ textAlign: 'center' }}>
                                        <button className="button" onClick={handleCheckout}>{loading ? "Loading..." : `Proceed to Pay ${(totalAmount - giftCardAmount).toFixed(2)}`}</button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
        </>













    );
};

export default Conform;
