import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import moment from "moment";

function Details() {
    const location = useLocation();
    const apidata = location.state.cur;

    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [loading, setLoading] = useState(null);

    console.log("cur value", apidata);

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
                            <button className="btn btn-primary">Release Payment</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="gutter">
                            <div className="card layer1 filters">
                                <span className="highlight"> from </span>
                                <div className="input_group">
                                    <input type="date" className="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                                    <span className="highlight"></span>
                                </div>
                                <span className="highlight"> to </span>
                                <div className="input_group">
                                    <input type="date" className="input" placeholder="End Date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                                    <span className="highlight"></span>
                                </div>
                            </div>
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
                                            <span>{apidata.total_add_on_price}$</span>
                                            <span>{service?.provider_amount_calculation?.amount_addon?.toFixed(2)}$</span>
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
