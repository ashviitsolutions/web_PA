import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import Release from './Release';
import moment from "moment";
import { useNavigate, useParams } from 'react-router-dom';

function Details() {
    const { id } = useParams();
    const navigator = useNavigate();
    const location = useLocation();
    const apidata = location.state.cur;
    const endDate=location.state.endDate;
    const startDate=location.state.startDate
    const releaseAmount = apidata.total_provider_amount;

    const [loading, setLoading] = useState(null);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState(apidata ? apidata.services.map(service => service._id) : []);
    const [totalPrice, setTotalPrice] = useState(apidata ? apidata.total_provider_amount : 0);
    const [totalAdminPrice, setAdminPrice] = useState(apidata ? apidata.total_admin_amount : 0);
    const [totalAmounttax, setTotalAmounttax] = useState(0);
    const [totalTip, setTotalTip] = useState(0);

    console.log("provider pay", apidata)

    useEffect(() => {
        // Calculate total amount tax whenever selected checkboxes change
        let updatedTotalAmountTax = 0;
        let updatedGratuatity = 0;
        selectedCheckboxes.forEach(checkboxId => {
            const selectedService = apidata.services.find(service => service._id === checkboxId);
            if (selectedService) {
                updatedTotalAmountTax += selectedService.amount_calculation?.amount_tax || 0;
                updatedGratuatity += selectedService.amount_calculation?.amount_tip || 0;
            }
        });
        setTotalAmounttax(updatedTotalAmountTax);
        setTotalTip(updatedGratuatity)
    }, [selectedCheckboxes, apidata.services]);




    const handleCheckboxChange = (event, checkboxId, servicePrice, addonCommission, amount_tip, adminAmount) => {
        setSelectedCheckboxes(prevState => {
            if (event.target.checked) {
                return [...prevState, checkboxId];
            } else {
                return prevState.filter(id => id !== checkboxId);
            }
        });

        setTotalPrice(prevPrice => {
            if (event.target.checked) {
                return prevPrice + servicePrice + addonCommission + amount_tip;
            } else {
                return prevPrice - servicePrice - addonCommission - amount_tip;
            }
        });

        setAdminPrice(prevAdminPrice => {
            if (event.target.checked) {
                return prevAdminPrice + adminAmount;
            } else {
                return prevAdminPrice - adminAmount;
            }
        });
    };


    // const handleReleasePaymentClick = () => {
    //     navigator(`/admin/payments/details/Release/${id}/${totalPrice}`, { state: { selectedCheckboxes , apidata } });
    // };
    const handleReleasePaymentClick = () => {
        const releaseTotalPrice = selectedCheckboxes.length > 0 ? totalPrice : 0;
        navigator(`/admin/payments/details/Release/${id}/${releaseTotalPrice}`, { state: { selectedCheckboxes, apidata ,endDate ,startDate } });
    };



    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="headings">
                                <h3><span className='link title backarrow' onClick={() => navigator(-1)}>&larr;</span> Payments</h3>
                                <p className='sub'>{startDate} to {endDate}</p>
                                <span className="toggle_sidebar"></span>
                            </div>
                        </div>
                        <div className="col-auto mt-6 provDet">
                            <p className='main title'>{apidata.provider_details.first_name} {apidata.provider_details.last_name}</p>
                            <p className='sub'>{apidata.provider_details.email}</p>
                            <p className='sub'>{apidata.provider_details.phone}</p>
                            
                        </div>
                        <div className="col-auto mt-3">
                            <button className="btn btn-primary" onClick={handleReleasePaymentClick}>Release Payment</button>
                        </div>
                    </div>

                    <table className="payments-table provDet">
                        <thead>
                            <tr>
                                <th>check box</th>
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
                                                service.amount_calculation?.amount_tax,
                                            )} checked={selectedCheckboxes.includes(service._id)}
                                        />
                                    </td>
                                    <td className="sub title">
                                        <p><span>{moment(service.createdAt).format("MMMM Do YYYY")}</span></p>
                                        <span>{moment(service.createdAt).format("LT")}</span>
                                    </td>

                                    <td className="">
                                        <p className='title'><span>{service.service_name}</span></p>
                                        <p className='sub'><span>Duration: {service.service_time}</span></p>
                                        <p className='sub title'><span>Charges: {service.amount_calculation.amount_service}$</span></p>
                                        <p className='sub title'><span>Comm. {service.provider_amount_calculation.service_price}$</span></p>
                                    </td>
                                    <td className="sub">
                                        {service.add_ons_details.map((addon, idx) => (
                                            <div key={idx}>
                                                <p><span className=''>{addon.title}</span> <span>({addon.price}$)</span></p>
                                            </div>
                                        ))}
                                        <p className='title'><span>Charges: {service.amount_calculation.amount_addon}$</span></p>
                                        <p className='title'><span>Comm. {service?.provider_amount_calculation?.amount_addon?.toFixed(2)}$</span></p>
                                    </td>
                                    <td>{service?.provider_amount_calculation?.amount_tip?.toFixed(2)}$</td>
                                    <td>{service.amount_calculation.amount_widthout_tax.toFixed(2)}$</td>
                                    <td>{service?.provider_amount_calculation?.totalAmount?.toFixed(2)}$</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} style={{ textAlign: "right" }}><strong>Total</strong></td>
                                <td>{totalTip.toFixed(2)}$</td>
                                <td>{totalAdminPrice.toFixed(2)}$</td>
                                {selectedCheckboxes.length > 0 && (
                                    <td>{totalPrice.toFixed(2)}$</td>


                                )}

                            </tr>
                            <tr>
                                <td colSpan={4} style={{ textAlign: "right" }}><strong>Profit Calculation</strong></td>
                                {selectedCheckboxes.length > 0 && (
                                    <td colSpan={3} style={{ textAlign: "right" }} className='provDet'>
                                        <div className='sub'>
                                            <p>Gross amount = {totalAdminPrice.toFixed(2)}$</p>
                                            <p>- Tax(es) = {totalAmounttax.toFixed(2)}$</p>
                                            <p>- Provider Pay = {totalPrice.toFixed(2)}$</p>
                                            <p>
                                                <strong>
                                                    Net Profit = {Math.max(totalAdminPrice - totalAmounttax - totalPrice, 0).toFixed(2)}$
                                                </strong>
                                            </p>
                                        </div>
                                    </td>
                                )}


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
