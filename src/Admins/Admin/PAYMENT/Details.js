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

    const [loading, setLoading] = useState(null);


    const handleReleasePaymentClick = () => {
        navigator(`/admin/payments/details/Release/${id}`, { state: { apidata } });
    };



    console.log("apidata , ", apidata)
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

                                    <td >

                                        <span>{moment(service.createdAt).format("MMMM Do YYYY")}</span>
                                    </td>
                                    <td >

                                        <span>{moment(service.createdAt).format("LT")}</span>
                                    </td>
                                    <td className="block-td">
                                        <span>{service.service_name}</span>
                                        <span>Single/Partner</span>
                                        <span>Duration: {service.service_time}</span>
                                        <span>Charges: {apidata.total_service_price}$</span>
                                        <span>Comm. {service.provider_amount_calculation.service_price}$</span>
                                    </td>


                                    <td>
                                        <td className="block-td">
                                            {service.add_ons_details.map((addon, idx) => (
                                                <div key={idx}>
                                                    <span>{addon.title}</span>
                                                    <span>{addon.price}$</span>
                                                </div>
                                            ))}
                                            <span>Charges: {apidata.total_add_on_price}$</span>
                                            <span>Comm; {service?.provider_amount_calculation?.amount_addon?.toFixed(2)}$</span>
                                        </td>
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
