import React, { useEffect, useState } from "react";
import "./style.css";
import postServices from "../Services/postServices";
import { useParams, useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';


const Conform = () => {
    // const {totalPrice}=useParams()

    const { userId, totalPrice } = useParams()
    const [posts, setPosts] = useState(null);

    const nav = useNavigate()

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

    console.log("get props id", userId);
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
                            <span className="value">{posts?.scheduled_date}</span>
                        </li>
                        <li>
                            <span className="title">Personal Details</span>
                            <span className="value">{posts?.massage_pressure}</span>
                        </li>
                        <li>
                            <span className="title">Massage Pressure</span>
                            <span className="value">{posts?.address}</span>
                        </li>
                        <li>
                            <span className="title">Appointments</span>
                            <span className="value">Sarah's Massage <small>{posts?.service_time} min swedish massage</small> </span>
                            <span className="price" style={{ fontSize: "20px" }}>${totalPrice}</span>
                        </li>
                    </ul>



                    <StripeCheckout
                        amount={totalPrice * 100}
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