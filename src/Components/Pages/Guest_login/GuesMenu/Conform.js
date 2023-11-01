import React, { useEffect, useState } from 'react';
import './style.css';
import postServices from '../Services/postServices';
import { useParams, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';

const Conform = () => {
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(false);

    const formData = useSelector((state) => state.counter.formData);
    console.log('formData corm page', formData);
    const { userId, totalPrice } = useParams();
    const [posts, setPosts] = useState(null);
    const nav = useNavigate();

    const [totalAmount, setTotalAmount] = useState(0); // Initialize with 0
    const [tax, setTax] = useState(0); // Initialize with 0
    const [tip, setTip] = useState(0); // Initialize with 0

    const service_time = formData.secondform && formData.secondform[0] ? formData.secondform[0].service_time : "";
    const massage_pressure = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].massage_pressure : "";
    const scheduled_date = formData.fourthform && formData.fourthform[0] ? formData.fourthform[0].date : "";
    const adressuser = formData.locationForm?.[0]?.address || "";
    console.log("adress", adressuser)



    useEffect(() => {
        // Calculate tip (you can adjust the value accordingly)
        const tip = 31.5; // Adjust the tip value as needed

        // Calculate tax rate (you can adjust the value accordingly)
        const taxRate = 0.06625; // 6.625% tax rate (for example)

        // Calculate total price
        const calculatedTax = (totalPrice * 100 * taxRate) / 100;
        // const calculatedTax = (totalPrice * 100 * taxRate) / 100;

        const totalAmount = (totalPrice * 100 + tip * 100 + calculatedTax * 100) / 100;

        setTax(calculatedTax);
        setTip(tip);
        setTotalAmount(totalAmount);
    }, [totalPrice]);



    const applyCoupon = () => {

        if (couponCode === 'YOUR_COUPON_CODE') {
            const discount = 10; // Adjust the discount amount
            const discountedAmount = totalAmount - discount;
            setTotalAmount(discountedAmount);
            setAppliedCoupon(true);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await postServices.getPost(userId);
                setPosts(response.data);
                console.log('get data', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (userId) {
            fetchPosts();
        }
    }, [userId]);

    console.log('get userId id', userId);
    console.log('totalPrice', totalPrice);

    const onSubmit = () => {
        nav('/userProfile');
    };

    return (
        <>
            <div id="sec_wiz_6" className="section">
                <div id="employees">
                    <label style={{ textAlign: 'center', fontSize: '18px' }} className="as_title" htmlFor="">
                        Review
                    </label>
                    <ul className="review d-block">
                        <li>
                            <span className="title">Date</span>
                            <span className="value">{scheduled_date}</span>
                        </li>
                        <li>
                            <span className="title">Personal Details</span>
                            <span className="value">{adressuser}</span>
                        </li>
                        <li>
                            <span className="title">Massage Pressure</span>
                            <span className="value">{massage_pressure}</span>
                        </li>
                        <li>
                            <span className="title">Appointments</span>
                            <span className="value">Sarah's Massage <small>{service_time} min swedish massage</small> </span>
                            <div className="price" style={{ display: 'block', lineHeight: '10px' }}>
                                <p className="prices" style={{ fontSize: '17px' }}>
                                    Amount: ${totalPrice}
                                </p>
                                <p className="prices" style={{ fontSize: '17px' }}>
                                    18% Tip: ${tip}
                                </p>
                                <p className="prices" style={{ fontSize: '17px' }}>
                                    6.625% Taxes: ${tax.toFixed(2)}
                                </p>
                                <p className="prices" style={{ fontSize: '17px' }}>
                                    Total: ${totalAmount.toFixed(2)}
                                </p>
                            </div>
                            <div className="coupon-section">
                                <input
                                    type="text"
                                    placeholder="Enter Coupon Code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button className="apply-coupon-button" onClick={applyCoupon}>
                                    Apply Now
                                </button>
                            </div>
                        </li>
                    </ul>
                    <StripeCheckout
                        amount={totalAmount * 100}
                        userId={userId}
                        token={onSubmit}
                        currency="USD"
                        stripeKey="pk_test_51MXmewLnVrUYOeK2PN2SexCsPAi8lsw8dIt7Pw04DUCsoCsv7a0VReRlGhbUuDOKYqbp1PEDWRWklwSvEsUD0NZ400sa7PXdfg"
                    >
                        <div style={{ textAlign: 'center' }}>
                            <button className="button">Proceed to Pay</button>
                        </div>
                    </StripeCheckout>
                </div>
            </div>
        </>
    );
};

export default Conform;
