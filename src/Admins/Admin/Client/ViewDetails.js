import React, { useState, useEffect } from 'react';

import { useParams, useLocation } from 'react-router-dom';
import "./style.css"; // Assuming you have this file for styling

function ViewDetails() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const location = useLocation();









    return (
        <>
            <div className="col-sm-6 card-right" id="card-right">
                <div className="gutter">
                    <div id="about_user_card" className="card layer2">
                        <h3 className="inner_title">Service Details</h3>
                        <ul className="true">
                            <li><b>Service Booking:</b></li>
                            <p style={{ paddingLeft: "30px" }}>Swedish Massage ,Couples/Partners Massage,Therapeutic Massage</p>
                            <li><b>Addons Booking:</b> </li>
                            <p style={{ paddingLeft: "30px" }}>CBD Botanical Massage Oil,Biofreeze Patches,Aromatherapy</p>
                            <li><b>Memberhsip Purchase:</b>Gold memberhsip</li>
                            <li><b>Giftcard Purchase:</b></li>
                            <p style={{ paddingLeft: "30px" }}>Therapeutic Massage Gift Card ,Sports Massage Gift Card</p>

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewDetails;
