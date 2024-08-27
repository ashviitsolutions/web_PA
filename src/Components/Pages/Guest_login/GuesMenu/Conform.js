import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IP } from '../../../../Constant';
import './style.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { updateInputData } from '../../Redux/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import vectorImg from "../../../assets/img/6212029.jpg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserRegistration } from '../../../../Helpers/Hooks/Hooks';
import Post from '../../Profile/Hook/Hook';
import Loader from '../../Loader';


const Conform = () => {
    const { totalPrice } = useParams();

    // console.log("numbernumber", totalPrice)
    const [termsAccepted, setTermsAccepted] = useState(false);
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.counter.formData);
    const calculatedData = Array.isArray(selector?.calculatedData) && selector.calculatedData.length > 0 ? selector.calculatedData[0] : [];

    const membershipLevel = localStorage.getItem("membership")
    const { getUserGiftCards, user } = useUserRegistration();

    const nav = useNavigate()
    const location = useLocation();

    const addon_id = location.state?.addon_id || "";
    const add_ons_details = location.state?.add_ons_details || "";
    const servicename = location.state?.servicename || "";
    const service_name = location.state?.servicename || "";

    const locationName = location.state?.locationForm?.location || "";

    const { provider_id } = useParams();

    const userid = localStorage.getItem("userid");

    const { address, first_name, last_name, arrivalInstructions, mobile, confirmpassword, password, email } = location?.state?.fifthform || "";

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

    const handleAccept = () => {
        setTermsAccepted(!termsAccepted);
    };


    const [selectedGiftCards, setSelectedGiftCards] = useState([]);
    const [senedGiftCardAmount, setSenedGiftCardAmount] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loader, setLoder] = useState(false)


    const [error, setError] = useState(false);
    const [giftCardAmount, setGiftCardAmount] = useState(0);


    const [coupon, setCoupon] = useState("")
    const [coupon_amount, setCouponAmount] = useState(0)
    const [giftcardValuedataId, setGiftcardvaluedataid] = useState([])

    const [pay, setPay] = useState(false);

    const amount_off = coupon_amount?.amount_off;
    const percent_off = coupon_amount?.percent_off;



    // const updatedGiftCardAmount = selectedGiftCards.reduce((acc, curr) => acc + curr, 0);
    // const summationGiftcardAmount = Number(updatedGiftCardAmount).toFixed(2);



    console.log("formattedDiscountAmountformattedDiscountAmount", giftcardValuedataId)

    console.log("coupon_amount ,selectedGiftCards", senedGiftCardAmount)
    // Calculate the total gift card amount


    var serviceDetails = {
        ...(userid ? {
            user: userid,
            customer_email: email,
        } : {
            email: email,
            password: password,
            confirm_password: confirmpassword
        }),
        location: locationName,

        user_amount_calculation: calculatedData?.user_amount_calculation,
        provider_amount_calculation: calculatedData?.provider_amount_calculation,
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




    const handleCheckout = async () => {
        setLoading(true);
        // setPay(true)

        if (!calculatedData.totalAmountWithTax) {
            setLoading(false);
            return false;
        }

        try {

            const response = await axios.post(`${IP}/createCheckoutSession`, {
                service_details: serviceDetails,
                price: calculatedData?.totalAmountWithTax,
                userId: userid
            });

            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            setLoading(false);
        }
    };





    const handleGiftCardChangesssss = (giftdata) => {
        const amount = giftdata?.amount;
        const giftcardValueId = giftdata?.offerId?._id;

        // Manage selected gift card amounts
        const updatedSelectedGiftCards = [...selectedGiftCards];
        const amountIndex = updatedSelectedGiftCards.indexOf(amount); // Use amount to check for presence

        if (amountIndex === -1) {
            // If the amount is not already selected, add it to the list
            updatedSelectedGiftCards.push(amount);
        } else {
            // If the amount is already selected, remove it from the list
            updatedSelectedGiftCards.splice(amountIndex, 1);
        }

        // Calculate the total gift card amount
        const updatedGiftCardAmount = updatedSelectedGiftCards.reduce((acc, curr) => acc + Number(curr), 0); // Ensure conversion to number
        const formattedDiscountAmount = Number(updatedGiftCardAmount).toFixed(2);

        // Manage selected gift card IDs
        const updatedGiftcardValuedataId = [...giftcardValuedataId];
        const idIndex = updatedGiftcardValuedataId.indexOf(giftcardValueId);

        if (idIndex === -1) {
            // If the ID is not already selected, add it to the list
            updatedGiftcardValuedataId.push(giftcardValueId);
        } else {
            // If the ID is already selected, remove it from the list
            updatedGiftcardValuedataId.splice(idIndex, 1);
        }

        // Update the gift card amount based on the total price
        const newGiftCardAmount = formattedDiscountAmount >= totalPrice ? totalPrice : formattedDiscountAmount;
        setGiftCardAmount(Number(newGiftCardAmount)); // Ensure it's a number

        // Update the state with new selected gift cards and IDs
        setSelectedGiftCards(updatedSelectedGiftCards);
        setGiftcardvaluedataid(updatedGiftcardValuedataId);
        setSenedGiftCardAmount(Number(newGiftCardAmount))
    };


    const handleGiftCardChange = (giftdata) => {
        const amount = giftdata?.amount;
        const giftcardValueId = giftdata?.offerId?._id;
    
        // Clear previous selections
        const updatedSelectedGiftCards = [amount];
        const updatedGiftcardValuedataId = [giftcardValueId];
    
        // Calculate the total gift card amount
        const updatedGiftCardAmount = updatedSelectedGiftCards.reduce((acc, curr) => acc + Number(curr), 0); // Ensure conversion to number
        const formattedDiscountAmount = Number(updatedGiftCardAmount).toFixed(2);
    
        // Update the gift card amount based on the total price
        const newGiftCardAmount = formattedDiscountAmount >= totalPrice ? totalPrice : formattedDiscountAmount;
        setGiftCardAmount(Number(newGiftCardAmount)); // Ensure it's a number
    
        // Update the state with new selected gift cards and IDs
        setSelectedGiftCards(updatedSelectedGiftCards);
        setGiftcardvaluedataid(updatedGiftcardValuedataId);
        setSenedGiftCardAmount(Number(newGiftCardAmount));
    };
    




    const onCoupon = async () => {


        try {
            const res = await axios.post(`${IP}/coupon/check_coupon`, { code: coupon });
            console.log(res);

            if (res.status === 200) {
                const { amount_off, percent_off } = res.data;

                if ((amount_off && amount_off > calculatedData?.totalAmountWithTax) || (percent_off && percent_off > calculatedData?.totalAmountWithTax)) {
                    // Notify the user that applying this coupon would exceed the total amount
                    toast.error("Applying this coupon would exceed the total amount.", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                    return; // Exit the function, preventing further execution
                }
                setCouponAmount(res.data); // Assuming the coupon amount is returned in the response data
            }
        } catch (error) {
            console.error('Error checking coupon:', error);
            toast.error("Error applying coupon. Please try again later.", {
                position: "top-right",
                autoClose: 2000,
            });
        }
    };



    useEffect(() => {

        getUserGiftCards();
    }, []);


    useEffect(() => {
        const calculateBooking = async () => {
            setLoder(true)
            try {
                // console.log("mera name giftcard id hai", giftcardValuedataId)
                // Ensure giftcardDiscountAmount is a number
                const giftcardDiscountAmount = Number(giftCardAmount) || 0;
                // Now safely apply toFixed
                // const formattedDiscountAmount = giftcardDiscountAmount.toFixed(2);

                // setLoading(true);
                const response = await Post.createCalculation({
                    service_id: location.state?.secondform?.service_ids,
                    massage_for: massage_for,
                    service_time: location.state?.secondform?.service_time,
                    giftCardAmount: giftcardDiscountAmount,
                    giftcardId: giftcardValuedataId,
                    add_ons_details: location.state?.add_ons_details,
                    coupon_amount: amount_off,
                    coupon_percentage: percent_off,
                    // selectedGiftCards: selectedGiftCards,
                    selectedGiftCards: senedGiftCardAmount,
                    selectedGiftId: giftcardValuedataId
                });

                // console.log("response calculation data", response)
                dispatch(updateInputData({ formName: 'calculatedData', inputData: response?.data?.calculatedata }));
                setLoder(false)

            } catch (error) {
                console.error('Error calculating booking:', error);
                setError('Error calculating booking. Please try again later.');
            } finally {
                // setLoading(false);
            }
        };

        calculateBooking();
    }, [giftCardAmount, giftcardValuedataId, selectedGiftCards, coupon_amount, percent_off, location.state?.secondform?.service_ids, location.state?.secondform?.service_time, location.state?.add_ons_details, dispatch]);


    console.log("calculartion data", calculatedData)

    // calculation of data



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
                            {loader ? "..." : null}
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
                                            {user.filter(cur => cur.amount > 0).map((cur, index) => (
                                                <div className="gift-card-section" key={index}>
                                                    <label htmlFor={`use-gift-card-${index}`} className="ml-2"></label>
                                                    <div className="form-group row justify-content-center mb-0">
                                                        <div className="col-md-12 px-3 mt-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`use-gift-card-${index}`}
                                                                checked={selectedGiftCards.includes(cur?.amount)} // Check if the current card is selected
                                                                onChange={() => handleGiftCardChange(cur)}
                                                            />
                                                            <label htmlFor={`use-gift-card-${index}`} className="ml-2">
                                                                <span className='title'> Use your ${cur?.amount} gift card</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {
                                                user?.length === 0 ? (
                                                    <span className="title">Gift Card not purchased</span>
                                                ) : (
                                                    <span className="title">Gift Card loading...</span>
                                                )
                                            }
                                        </>
                                    )}
                                </div>
                                

                                    {loader ? (
                                        <Loader

                                        />) : (
                                        <>




                                            <div className="price" style={{ display: 'block', lineHeight: '10px' }}>
                                                <p className="prices" style={{ fontSize: '17px' }}>
                                                    <span className='value'>
                                                        Total Service:  ${totalPrice}
                                                    </span></p>

                                                <p className="prices" style={{ fontSize: '17px' }}>
                                                    <span className='value'>
                                                        Gratuity: ${calculatedData?.tipAmount?.toFixed(2)}
                                                    </span></p>
                                                <p className="prices" style={{ fontSize: '17px' }}>
                                                    <span className='value'>
                                                        Sales Tax(6.625%): ${calculatedData?.taxAmount?.toFixed(2)}
                                                    </span></p>

                                                {

                                                }

                                                {amount_off || percent_off ? (
                                                    <p className="prices" style={{ fontSize: '17px' }}>
                                                        <span className='value'>
                                                            Coupon Discount: -${calculatedData?.couponDiscountAmount.toFixed(2)}
                                                        </span>
                                                    </p>
                                                ) : null}

                                                {giftCardAmount ? (
                                                    <p className="prices" style={{ fontSize: '17px' }}>
                                                        <span className='value'>
                                                            Gift Card Applied: -${calculatedData?.giftcardDiscountAmount}
                                                        </span>
                                                    </p>
                                                ) : null}

                                                {
                                                    calculatedData?.membershipDiscountAmount > 0 && (
                                                        <p className="prices" style={{ fontSize: '17px' }}>
                                                            <span className='value'>
                                                                Membership Discount: ${calculatedData?.membershipDiscountAmount}

                                                            </span></p>
                                                    )
                                                }


                                                <p className="prices" style={{ fontSize: '17px' }} >
                                                    <span className='value'>Total Balance: ${calculatedData?.totalAmountWithTax?.toFixed(2)}
                                                    </span></p>

                                            </div>
                                        </>
                                    )

                                    }





                                </li>
                            </ul>

                            {!loader && (
                                <div>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={termsAccepted}
                                                onChange={handleAccept}
                                            />{"  "}
                                            I agree to the{" "}
                                            <a
                                                href='http://productivealliance.com/agreemnet'
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                terms and conditions of the agreemnet!
                                            </a>
                                        </label>
                                    </div>

                                    <div style={{ textAlign: 'center' }}>
                                        <button className={`${termsAccepted ? "button" : "disabled-button"}`} disabled={!termsAccepted} onClick={handleCheckout}>{loading ? "Loading..." : `Proceed to Pay ${calculatedData?.totalAmountWithTax?.toFixed(2)}`}</button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div >
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>
            }
        </>













    );
};

export default Conform;
