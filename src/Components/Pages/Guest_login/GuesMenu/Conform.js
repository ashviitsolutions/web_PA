import React from "react";
import "./style.css"

const Conform = () => {
    return (
        <>

            <div id="sec_wiz_6" className="section">

                <div id="employees">
                    <label style={{ textAlign: "center", fontSize: "18px" }} className="as_title" htmlFor="">Review</label>
                    <ul className="review d-block">
                        <li>
                            <span className="title">Date</span>
                            <span className="value">Thu, May 26 at 8:00 AM</span>
                        </li>
                        <li>
                            <span className="title">Personal Details</span>
                            <span className="value">24000 El Toro Road Laguna Woods, CA 92653</span>
                        </li>
                        <li>
                            <span className="title">Massage Pressure</span>
                            <span className="value">Medium</span>
                        </li>
                        <li>
                            <span className="title">Appointments</span>
                            <span className="value">Sarah's Massage <small>90 min swedish massage</small> </span>
                            <span className="price" style={{ fontSize: "20px" }}>$109</span>
                        </li>
                    </ul>

                    <div style={{ textAlign: "center" }}>
                        <button className="button" type="button" name="button">checkout</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Conform