import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
// import './PaymentForm.css'; 

const PaymentForm = () => {
    const location = useLocation();
    const serviceinfo = location.state.selectedCheckboxes;
    const apidata = location.state.apidata;
    const nav = useNavigate()
    const { providerId, amount } = useParams()
    const [paymentId, setPaymentId] = useState('');
    const endDate = location.state.endDate;
    const startDate = location.state.startDate
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [loading, setLoading] = useState(false)
    // const [providerId, setProviderId] = useState('');
    const [file, setFile] = useState(null);


    console.log("providerId admin page release", serviceinfo)
    console.log("providerId admin", apidata)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let token = localStorage.getItem("tokenadmin");

            const formData = new FormData();
            formData.append('paymentId', paymentId);
            formData.append('amount', amount);
            formData.append('serviceinfo', JSON.stringify(serviceinfo)); // Convert to JSON string
            formData.append('additionalInfo', additionalInfo);
            if (file) {
                formData.append('postImages', file); // Ensure the key matches the server-side expectation
            }
            formData.append('providerId', providerId);

            const response = await axios.post(`${IP}/service/approve-payment/${providerId}`, formData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data' // Ensure Content-Type is set for file upload
                }
            });

            if (response.status === 200) {
                setLoading(false);
                toast.success("Payment processed successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    onClose: () => {
                        nav("/admin/payments");
                    },
                });
            } else {
                setLoading(false);
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error.response.data);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Ensure the file is correctly set in the state
    };


    return (
        <>

            <div className='vspace70'>&nbsp;</div>
            <div className="payment-form-container">
                <div className="container provDet center">
                    <h2>Payment Approval Form</h2>
                    <p className='title'>Provider Name: {apidata.provider_details.first_name} {apidata.provider_details.first_name}</p>
                    <p className='sub'>email - {apidata.provider_details.email}</p>
                    <p className='sub'>phone- {apidata.provider_details.phone}</p>
                    <p className='sub'>{startDate}</p> to
                    <p className='sub'>{endDate}</p>
                </div>

                <form onSubmit={handleSubmit} className="payment-form">
                    <div className="form-group">
                        <label>Payment ref no:</label>
                        <input type="text" value={paymentId} onChange={(e) => setPaymentId(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Amount:</label>
                        <input type="text" value={parseFloat(amount).toFixed(2)} disabled />
                    </div>
                    <div className="form-group">
                        <label>Additional Info:</label>
                        <input type="text" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Attachment:</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </>

    );
};

export default PaymentForm;
