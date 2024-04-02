import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import Release from './Release';
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Details() {
    const { id } = useParams()
    const navigator = useNavigate()
    const location = useLocation();
    const apidata = location.state.cur;
    const releaseAmount = apidata.total_provider_amount;


    const [loading, setLoading] = useState(null);
    // const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState(apidata ? apidata.services.map(service => service._id) : []);


    const handleCheckboxChange = (event, checkboxId) => {
        if (event.target.checked) {
            setSelectedCheckboxes(prevState => [...prevState, checkboxId]);
        } else {
            setSelectedCheckboxes(prevState => prevState.filter(id => id !== checkboxId));
        }
    };










    const handleReleasePaymentClick = () => {
        navigator(`/admin/payments/details/Release/${id}/${releaseAmount}`, { state: { selectedCheckboxes } });
    };

    console.log("releaseAmount , ", releaseAmount)
    console.log("selectedCheckboxes , ", selectedCheckboxes)
    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="headings">
                                <h3>Payments</h3>
                                <span className="toggle_sidebar"></span>
                            </div>
                        </div>
                        <div className="col-auto mt-3">
                            <button className="btn btn-primary" onClick={handleReleasePaymentClick}>Release Payment</button>
                        </div>
                    </div>

                    <table className="payments-table">
                        <thead>
                            <tr>
                                <td>check box</td>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Service Name</th>
                                <th>Addons</th>
                                <th>Gratuity(14%)</th>
                                <th>Total Charges</th>
                                <th>Total Pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apidata && apidata.services.map((service, index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="checkbox" onChange={(event) => handleCheckboxChange(event, service._id)} checked={selectedCheckboxes.includes(service._id)} />
                                    </td>
                                    <td>
                                        <span>{moment(service.createdAt).format("MMMM Do YYYY")}</span>
                                    </td>
                                    <td>
                                        <span>{moment(service.createdAt).format("LT")}</span>
                                    </td>
                                    <td className="">
                                        <p><span>{service.service_name}</span></p>
                                        <p><span>Single/Partner</span></p>
                                        <p><span>Duration: {service.service_time}</span></p>
                                        <p><span>Charges: {apidata.total_service_price}$</span></p>
                                        <p><span>Comm. {service.provider_amount_calculation.service_price}$</span></p>
                                    </td>
                                    <td className="">
                                        {service.add_ons_details.map((addon, idx) => (
                                            <div key={idx}>
                                                <p><span>{addon.title}</span> <span>({addon.price}$)</span></p>
                                            </div>
                                        ))}
                                        <p><span>Charges: {apidata.total_add_on_price}$</span></p>
                                        <p><span>Comm. {service?.provider_amount_calculation?.amount_addon?.toFixed(2)}$</span></p>
                                    </td>
                                    <td>{apidata.total_tip_amount?.toFixed(2)}$</td>
                                    <td>{apidata.total_admin_amount}$</td>
                                    <td>{apidata.total_provider_amount}$</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {loading && (
                        <div style={{ textAlign: "center" }}>
                            <FallingLines
                                color="#03a9f4"
                                width="150"
                                visible={true}
                                ariaLabel="falling-circles-loading"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Details;
