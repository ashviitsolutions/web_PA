import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IP } from '../../../../Constant';
import './style.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import vectorImg from "../../../assets/img/6212029.jpg";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserRegistration } from '../../../../Helpers/Hooks/Hooks';

const Conform = () => {
    const membershipLevel = localStorage.getItem("membership")
    // const { getUserMembership, membershipLevels } = useUserRegistration();
    const { getUserGiftCards, user } = useUserRegistration();
    const [memberhsipDiscount, setMembershipDiscountRate] = useState("")
    const nav = useNavigate()
    const location = useLocation();

    const addon_id = location.state?.addon_id || "";
    const add_ons_details = location.state?.add_ons_details || "";
    const servicename = location.state?.servicename || "";
    const service_name = location.state?.servicename || "";

    const locationName = location.state?.locationForm?.location || "";
    const formData = useSelector((state) => state.counter.formData);
    const { totalPrice } = useParams();
    const { provider_id } = useParams();

    const booking_id = localStorage.getItem("booking_id");
    const username = localStorage.getItem("user_name");
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");





    const customerdetails = location?.state?.fifthform || "";
    const { address, first_name, last_name, arrivalInstructions, mobile, confirmpassword, password, email } = location?.state?.fifthform || "";
    // const addressUser = location.locationForm?.address || "";
    const location_type = location.state?.location_type || "";


    const gender = location?.state?.secondform?.gender || "";
    const gender1 = location?.state?.secondform?.gender[0] || "";
    const gender2 = location?.state?.secondform?.gender[1] || "";
    const service_id = location?.state?.secondform?.service_ids || "";
    const service_time = location?.state?.secondform?.service_time || "";
    const areas_of_concern = location?.state?.thirdform?.areas_of_concern || "";
    const health_conditions = location?.state?.thirdform?.health_conditions || "";
    const massage_body_part = location?.state?.thirdform?.massage_body_part || "";
    const massage_pressure = location?.state?.thirdform?.massage_pressure || "";
    const special_considerations = location?.state?.thirdform?.special_considerations || "";
    const scheduled_date = location?.state?.fourthform?.date || "";
    const scheduled_timing = location?.state?.fourthform?.time || "";
    const massage_for = location?.state?.firstForm || "";

    const gendercheck = location?.firstForm || "";




    console.log("areas_of_concernareas_of_concernareas_of_concern", areas_of_concern)





    const [selectedGiftCards, setSelectedGiftCards] = useState([]);
    const [paymentIntentId, setPaymentIntentId] = useState('');
    const [client_secret, setClientSecret] = useState();
    const [loading, setLoading] = useState(false);

    const [tax, setTax] = useState(0);
    const [tip, setTip] = useState(0);
    const [error, setError] = useState(false);
    const [giftCardAmount, setGiftCardAmount] = useState(0);
    // const [user, setUser] = useState(userGiftCards);
    const [membership, setMembershipLevel] = useState(membershipLevel);
    const [originalprice, setOriginalprice] = useState()
    const [bookingid, setBookingId] = useState(null)

    const [amountAddon, setAmountAddon] = useState(0);
    const [coupon, setCoupon] = useState("")
    const [coupon_amount, setCouponAmount] = useState(0)

    const [amount_addon, setAddsAmount] = useState(0)

    const [price_provider, setTotalPrice] = useState()
    const [provider_addon, setProvuideraddon] = useState()
    const [serviceprice, setProvider_service] = useState()
    const [meberhsip_provider_price, setMembership] = useState()


    const [totalAmount, setTotalAmount] = useState(0);
    const [serviceDetails, setServiceDetails] = useState({
        price: 0,
        service_name: ""
    });

    const amount_off = coupon_amount.amount_off
    const percent_off = coupon_amount.percent_off

    console.log("coupon amount originalpriceoriginalpriceoriginalpriceoriginalprice", originalprice)
    console.log("percent_off amount charge", percent_off)



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
        // getUserMembership();
        getUserGiftCards();
    }, []);
    console.log("userGiftCards userGiftCards", user)





    useEffect(() => {
        // Define default values for tip and tax rate
        // const tip = 31.5;
        const taxRate = 0.06625;
        const percent_offRate = 0.06625;


        // Initialize membership discount rate
        let membershipDiscountRate = 0;
        let couponDiscountRate = 0;

        // Check if membership is Silver or Gold
        if (membershipLevel === "Silver") {
            // If Silver membership is selected, apply a 5% discount
            membershipDiscountRate = 0.05;
        } else if (membershipLevel === "Gold") {
            // If Gold membership is selected, apply a 10% discount
            membershipDiscountRate = 0.10;
        }

        if (amount_off) {
            couponDiscountRate = amount_off;
        }

        const servicePricewithmemberhsip = 135 * (1 - membershipDiscountRate);
        const membershipDiscountprice = 135 - servicePricewithmemberhsip;
        const adds_onprice = (totalPrice - 135);
        const tip = (servicePricewithmemberhsip + adds_onprice) * 0.18;
        const Tax = (servicePricewithmemberhsip + adds_onprice) * taxRate;
        const percent_ofDis = (servicePricewithmemberhsip * percent_offRate) / 100;
        const totalAmounts = servicePricewithmemberhsip + adds_onprice + tip + Tax - couponDiscountRate - percent_ofDis;

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
        setMembershipDiscountRate(membershipDiscountprice)
    }, [totalPrice, membershipLevel, formData.fifthform, amount_off, percent_off]);







    useEffect(() => {
        let tax = tip;
        let addonsprice = amount_addon;
        const time_status = service_time;
        const memberhsip = memberhsipDiscount;
        let basePrice = 70; // Initial base price

        // console.log("amount_addon amount_addonamount_addon", amount_addon)

        // Adjust base price based on service time
        if (time_status === "90 minutes") {
            basePrice += 35;
        } else if (time_status === "120 minutes") {
            basePrice += 70;
        }

        // Double the base price if gender is 'partner'
        if (massage_for === "partner") {
            basePrice *= 2;
        }


        // Add 14% of total add-ons price to totalPrice
        let totalPriceAddons = addonsprice;

        const calculateaadon = totalPriceAddons * 0.14;

        //total value after adding adsonprice
        let totalPriceWithAddons = basePrice + calculateaadon;



        // Add tax amount to totalPrice
        totalPriceWithAddons += tax;
        setProvuideraddon(calculateaadon)
        setMembership(memberhsip)
        setProvider_service(basePrice)
        setTotalPrice(totalPriceWithAddons);
    }, [service_time, massage_for, amount_addon]);





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
            amount_membership_discount: memberhsipDiscount,
            total_amount: totalPrice,
        },


        provider_amount_calculation: {
            service_price: serviceprice,

            amount_addon: provider_addon,
            gift_cart_amount: giftCardAmount,

            amount_tip: tip,
            amount_membership_discount: memberhsipDiscount,
            total_amount: price_provider,
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

    console.log("provider_addonprovider_addonprovider_addonprovider_addonprovider_addon",bookingData)


    const handleCheckout = async () => {
        setLoading(true);

        if (!booking_id && !bookingid  && !provider_addon) {
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
        const sendBookingData = async () => {
            try {

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
    }, [bookingData?.amount_calculation?.amount_tip, provider_addon, giftCardAmount, loading]); // Trigger when bookingData changes




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



    const onCoupon = async () => {
        console.log("coupon amount charge", coupon)

        try {
            const res = await axios.post(`${IP}/coupon/check_coupon`, { code: coupon });
            console.log(res);

            if (res.status === 200) {
                setCouponAmount(res.data); // Assuming the coupon amount is returned in the response data
            }
        } catch (error) {
            console.error(error);
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
                                <div>
                                    <li>
                                        <span className="title">Date of service:</span>
                                        <span className="value">{scheduled_date}</span>
                                    </li>
                                    <li>
                                        <span className="title">Time of service:</span>
                                        <span className="value">{scheduled_timing}</span>
                                    </li>
                                    <li>
                                        <span className="title">Duration of service:</span>
                                        <span className="value">{service_time}</span>
                                    </li>
                                    <li>
                                        <span className="title">Name of service:</span>
                                        <span className="value">{servicename} ({massage_for}) </span>
                                    </li>
                                    <li>
                                        <span className="title">Addons:</span>
                                        {add_ons_details.length > 0 ? (
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
                                    <li>
                                        <span className="title">Booking type:</span>
                                        <span className="value">Massage on demand</span>
                                    </li>

                                    <li>
                                        <span className="title">Areas of concern:</span>
                                        {areas_of_concern.length > 0 ? (
                                            <span className="value">
                                                {areas_of_concern.map((addon, index) => (
                                                    <span key={index}>
                                                        {addon}
                                                        {index !== areas_of_concern.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </span>
                                        ) : (
                                            <span className="value">No Areas of concern selected</span>
                                        )}
                                    </li>

                                    <li>
                                        <span className="title">Health conditions:</span>
                                        {health_conditions.length > 0 ? (
                                            <span className="value">
                                                {health_conditions.map((addon, index) => (
                                                    <span key={index}>
                                                        {addon}
                                                        {index !== health_conditions.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </span>
                                        ) : (
                                            <span className="value">No health conditions selected</span>
                                        )}
                                    </li>



                                    <li>
                                        <span className="title">Special considerations:</span>
                                        {special_considerations.length > 0 ? (
                                            <span className="value">
                                                {special_considerations.map((addon, index) => (
                                                    <span key={index}>
                                                        {addon}
                                                        {index !== special_considerations.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </span>
                                        ) : (
                                            <span className="value">No special considerations selected</span>
                                        )}
                                    </li>
                                    <li>
                                        <span className="title">Massage body part:</span>
                                        {massage_body_part.length > 0 ? (
                                            <span className="value">
                                                {massage_body_part.map((addon, index) => (
                                                    <span key={index}>
                                                        {addon}
                                                        {index !== massage_body_part.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </span>
                                        ) : (
                                            <span className="value">No massage body part selected</span>
                                        )}
                                    </li>
                                    <li>
                                        <span className="title">Massage pressure:</span>
                                        {massage_pressure.length > 0 ? (
                                            <span className="value">
                                                {massage_pressure}
                                            </span>
                                        ) : (
                                            <span className="value">No massage pressure selected</span>
                                        )}
                                    </li>
                                </div>

                                <li>
                                    <span className="title">Personal Details</span>
                                    <spam className="value">Full Name : {first_name} {last_name}</spam>
                                    <span className="value">Address : {address}</span>

                                    {
                                        gendercheck === "partner" ? (
                                            <>
                                                <span className="value">Gender Preference : Partner 1 : {gender1} Partner 2 : {gender2} </span>

                                            </>
                                        ) : <span className="value">Gender Preference : {gender}</span>
                                    }

                                </li>
                                {/* <li>

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
                                </li> */}
                                <li>
                                    <div className="form-group row mb-3">
                                        <div className="col-7 mb-0 px-0 pr-2">
                                            <input id="e-mail" type="text"
                                                onChange={(e) => setCoupon(e.target.value)}
                                                value={coupon}

                                                placeholder="Have a coupon code ?"
                                                className="form-control input-box rm-border text-left"
                                            />
                                        </div>
                                        <div className='col-1 px-0'>{" "}</div>
                                        <div className="col-2 px-0">
                                            <button type="submit" className="button" onClick={onCoupon} >Apply!</button>
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



                                        {amount_off && (
                                            <p className="prices" style={{ fontSize: '17px' }}>
                                                <span className='value'>
                                                    Coupon Discount:${amount_off.toFixed(2)}

                                                </span></p>
                                        )}
                                        {percent_off && (
                                            <p className="prices" style={{ fontSize: '17px' }}>
                                                <span className='value'>
                                                    %Coupon Discount: ${percent_off / 100}%
                                                </span></p>
                                        )}







                                        {membershipLevel === "Silver" && (
                                            <p className="prices" style={{ fontSize: '17px' }}>
                                                <span className='value'>
                                                    5% Silver Membership Discount: ${memberhsipDiscount}

                                                </span></p>
                                        )}
                                        {membershipLevel === "Gold" && (
                                            <p className="prices" style={{ fontSize: '17px' }}>
                                                <span className='value'>
                                                    10% Gold Membership Discount: ${memberhsipDiscount}
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
