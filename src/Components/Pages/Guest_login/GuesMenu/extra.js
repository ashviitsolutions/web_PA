import React, { useEffect, useState } from "react";
import "./style.css";
import postServices from "../Services/postServices";
import { useParams, useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';


const Conform = () => {
    const useremail = localStorage.getItem("user_email")
    const username = localStorage.getItem("user_name")
    const formData = useSelector((state) => state.counter.formData);
    console.log("formData corm page", formData)
    const { userId, totalPrice } = useParams()
    const [posts, setPosts] = useState(null);
    const nav = useNavigate()

    const [totalAmount, setTotalAmount] = useState()



    const service_time = formData.secondform && formData.secondform[0] ? formData.secondform[0].service_time : "";
    const massage_pressure = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].massage_pressure : "";
    const scheduled_date = formData.fourthform && formData.fourthform[0] ? formData.fourthform[0].date : "";
    const adressuser = formData.locationForm?.[0]?.address || "";
    console.log("adress", adressuser)

    useEffect(() => {
        const taxRate = 0.18; // 18% tax rate
        const totalPriceWithTax = (totalPrice * 100 + totalPrice * 100 * taxRate) / 100;
        console.log("totalPriceWithTax", totalPriceWithTax);
        setTotalAmount(totalPriceWithTax)
    }, []);









    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await postServices.getPost(userId);
                setPosts(response.data);
                console.log("get data", response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (userId) {
            fetchPosts();
        }
    }, [userId]);

    console.log("get userId id", userId);
    console.log("totalPrice", totalPrice);

    const onSubmit = () => {
        nav("/userProfile")

    }
    return (
        <>

            <div id="sec_wiz_6" className="section">

                <div id="employees">
                    <label style={{ textAlign: "center", fontSize: "18px" }} className="as_title" htmlFor="">Review</label>
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

                            <div className="price" style={{ display: "block", lineHeight: "10px" }}>
                                <p className="prices" style={{ fontSize: "17px" }}>amount: ${totalPrice}</p>
                                <p className="prices" style={{ fontSize: "17px" }}>Taxes: 18%</p>
                                <p className="prices" style={{ fontSize: "17px" }}>Total Pay: ${totalAmount} </p>

                            </div>
                        </li>

                    </ul>



                    <StripeCheckout
                        amount={totalAmount * 100}
                        userId={userId}
                        token={onSubmit}
                        currency='USD'
                        stripeKey="pk_test_51MXmewLnVrUYOeK2PN2SexCsPAi8lsw8dIt7Pw04DUCsoCsv7a0VReRlGhbUuDOKYqbp1PEDWRWklwSvEsUD0NZ400sa7PXdfg"
                    >
                        <div style={{ textAlign: "center" }}>
                            <button className="button">checkout</button>
                        </div>
                    </StripeCheckout>






                </div>
            </div>


        </>
    )
}

export default Conform