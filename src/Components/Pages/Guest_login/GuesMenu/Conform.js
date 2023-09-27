import React, { useEffect, useState } from "react";
import "./style.css";
import postServices from "../Services/postServices";
import { useParams ,useNavigate } from "react-router-dom";


const Conform = () => {
    const {userId}=useParams()
    const [posts, setPosts] = useState(null);
   
    const nav=useNavigate()

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

    const onSubmit=()=>{
        nav("/userProfile/payment/success")
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
                            <span className="price" style={{ fontSize: "20px" }}>${posts?.amount_charged}</span>
                        </li>
                    </ul>

                    <div style={{ textAlign: "center" }}>
                        <button className="button" type="button" name="button" onClick={onSubmit}>checkout</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Conform