import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IP } from '../../../../Constant';
import './style.css';
import postServices from '../Services/postServices';
import { useParams, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import vectorImg from "../../../assets/img/6212029.jpg";
import { useDispatch, useSelector } from 'react-redux';

const Conform = () => {
    const tokenuser = localStorage.getItem("token")
    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(null);

    const formData = useSelector((state) => state.counter.formData);

    const { userId, totalPrice } = useParams();
    const nav = useNavigate();

    const [totalAmount, setTotalAmount] = useState(0);
    const [tax, setTax] = useState(0);
    const [tip, setTip] = useState(0);

    const service_time = formData.secondform && formData.secondform[0] ? formData.secondform[0].service_time : "";
    const massage_pressure = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].massage_pressure : "";
    const scheduled_date = formData.fourthform && formData.fourthform[0] ? formData.fourthform[0].date : "";
    const adressuser = formData.locationForm?.[0]?.address || "";

    useEffect(() => {
        const tip = 31.5;
        const taxRate = 0.06625;
        const calculatedTax = (totalPrice * 100 * taxRate) / 100;
        const totalAmount = (totalPrice * 100 + tip * 100 + calculatedTax * 100) / 100;

        setTax(calculatedTax);
        setTip(tip);
        setTotalAmount(totalAmount);
    }, [totalPrice]);


    const makePayment = async () => {
        try {
            const response = await axios.post(`${IP}/payment/pay`, {
                amount: 100,
                booking_id: userId,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: tokenuser,
                },
            });

            setClientSecret(response.data.client_secret);
        } catch (error) {
            setError(error.response?.data?.msg || "An error occurred during payment initiation.");
        }
    };


    useEffect(() => {
        makePayment()
    }, [])


    console.log("secret key", clientSecret)



    const onSubmit = async (token) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                    "Stripe-Secret": clientSecret,
                },
            };

            // Make the actual payment using the obtained clientSecret and the token from Stripe
            const paymentResult = await axios.post(
                `${IP}/user/service_book`,
                { stripe_token: token.id },
                config
            );

            // Check the payment result from the server
            if (paymentResult.status === 200) {
                // Extract the token from the payment result
                const generatedToken = paymentResult.data.generated_token;

                // Navigate to the success page with the generated token
                nav(`/userProfile/payment/success/${generatedToken}`);
            }
        } catch (error) {
            // Handle any errors that occur during the payment process
            console.error("Error during payment:", error.message);
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
                                    <span className="value">[Massage title here] <small>{service_time}</small> </span>
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

                                </li>
                            </ul>
                            <StripeCheckout
                                amount={totalAmount * 100}
                                clientSecret={clientSecret}
                                token={onSubmit}
                                currency="USD"
                                // stripeKey="pk_live_51MXmewLnVrUYOeK2XZC0Pjqc0o2JPx72nyy5Y0edFTT2sh9Gi5rQs8hw0WgkbLzZXMRGTka0fuZdeEX4DqaAkle200VfQQlgLN"
                                stripeKey="pk_test_51JBJeESHxW2w2d1F3r7rquTjNelMikBIUwzhbXiF7kI35KAulSfKKVVhK5FmoqW5shtpHcmtoJuPTWxWCJr3jyj400V6VICyhS"
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <button className="button">Proceed to Pay</button>
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
