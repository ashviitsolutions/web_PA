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
    const [selectedCheckboxes, setSelectedCheckboxes] = useState(apidata ? apidata.services.map(service => service._id) : []);
    const [totalPrice, setTotalPrice] = useState(apidata ? apidata.total_provider_amount : 0);
    const [totalAdminPrice, setAdminPrice] = useState(apidata ? apidata.total_admin_amount : 0);

    const handleCheckboxChange = (event, checkboxId, servicePrice, addonCommission, amount_tip, adminAmount) => {
        let updatedTotalPrice = totalPrice;
        let updatedAdminTotalPrice = totalAdminPrice;
        if (event.target.checked) {
            setSelectedCheckboxes(prevState => [...prevState, checkboxId]);
            updatedTotalPrice += servicePrice + addonCommission + amount_tip;
            updatedAdminTotalPrice += adminAmount;
        } else {
            setSelectedCheckboxes(prevState => prevState.filter(id => id !== checkboxId));
            if (selectedCheckboxes.length === 1) { // Last checkbox unchecked
                updatedTotalPrice = 0; // Reset total price to 0
                updatedAdminTotalPrice = 0;
            } else {
                updatedTotalPrice -= servicePrice + addonCommission + amount_tip;
                updatedAdminTotalPrice -= adminAmount;
            }
        }
        setTotalPrice(updatedTotalPrice);
        setAdminPrice(updatedAdminTotalPrice);
    };



    const handleReleasePaymentClick = () => {
        navigator(`/admin/payments/details/Release/${id}/${totalPrice}`, { state: { selectedCheckboxes } });
    };

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
                        <div className="col-auto mt-6">
                            <p>{apidata.provider_details.first_name} {apidata.provider_details.first_name}</p>
                            <p>{apidata.provider_details.email}</p>
                            <p>{apidata.provider_details.phone}</p>
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
                                <th>Service Name</th>
                                <th>Addons</th>
                                <th>Gratuity(18%)</th>
                                <th>Total Charges</th>
                                <th>Total Pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apidata && apidata.services.map((service, index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="checkbox"
                                            onChange={(event) => handleCheckboxChange(
                                                event, service._id,
                                                service.provider_amount_calculation.service_price,
                                                service.provider_amount_calculation.amount_addon,
                                                service.provider_amount_calculation.amount_tip,

                                                service.amount_calculation.total_amount,


                                            )} checked={selectedCheckboxes.includes(service._id)}
                                        />
                                    </td>
                                    <td className="">
                                        <p><span>{moment(service.createdAt).format("MMMM Do YYYY")}</span></p>
                                        <span>{moment(service.createdAt).format("LT")}</span>
                                    </td>

                                    <td className="">
                                        <p><span>{service.service_name}</span></p>
                                        <p><span>Single/Partner</span></p>
                                        <p><span>Duration: {service.service_time}</span></p>
                                        <p><span>Charges: {service.amount_calculation.amount_service}$</span></p>
                                        <p><span>Comm. {service.provider_amount_calculation.service_price}$</span></p>
                                    </td>
                                    <td className="">
                                        {service.add_ons_details.map((addon, idx) => (
                                            <div key={idx}>
                                                <p><span>{addon.title}</span> <span>({addon.price}$)</span></p>
                                            </div>
                                        ))}
                                        <p><span>Charges: {service.amount_calculation.amount_addon}$</span></p>
                                        <p><span>Comm. {service?.provider_amount_calculation?.amount_addon?.toFixed(2)}$</span></p>
                                    </td>
                                    <td>{service?.provider_amount_calculation?.amount_tip?.toFixed(2)}$</td>
                                    <td>{service.amount_calculation.amount_widthout_tax.toFixed(2)}$</td>
                                    <td>{service?.provider_amount_calculation?.total_amount?.toFixed(2)}$</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} style={{textAlign:"right"}}><strong>Total</strong></td>
                                <td>250$</td>
                                <td>{totalAdminPrice.toFixed(2)}$</td>
                                <td>{totalPrice.toFixed(2)}$</td>
                            </tr>
                            <tr>
                                <td colSpan={4} style={{textAlign:"right"}}><strong>Profit Calculation</strong></td>
                                <td  colSpan={3} style={{textAlign:"right"}}>
                                    <p>Amount with Tax = {totalAdminPrice.toFixed(2)}$</p>
                                    <p>- Tax(es) = 250$</p>
                                    <p>- Paid to Provider(s) Including Gratuity = 300$</p>
                                    <p><strong>Profit = 400$</strong></p>
                                </td>
                            </tr>
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
