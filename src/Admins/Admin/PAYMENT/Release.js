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

    const nav = useNavigate()
    const { providerId } = useParams()
    const [paymentId, setPaymentId] = useState('');
    const [amount, setAmount] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    // const [providerId, setProviderId] = useState('');
    const [file, setFile] = useState(null);


    console.log("providerId admin page release", serviceinfo)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem("tokenadmin");

            // Create the request body object
            const requestBody = {
                paymentId,
                amount,
                serviceinfo,
                additionalInfo,
                providerId
            };

            // Make the POST request to the server
            const response = await axios.post(`${IP}/service/approve-payment/${providerId}`, requestBody, {
                headers: {
                    'Authorization': token
                }
            });

            // Handle the response
            if (response.status === 200) {
                // Show success notification and navigate to '/admin/Gift'
                toast.success("Payment processed successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        nav("/admin/payments");
                    },
                });
            } else {
                // Show error notification if the API response is not successful
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error:', error.response.data);
            // Show error notification if an error occurs
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
            <div className="payment-form-container">
                <h2>Payment Approval Form</h2>
                <form onSubmit={handleSubmit} className="payment-form">
                    <div className="form-group">
                        <label>Payment ref no:</label>
                        <input type="text" value={paymentId} onChange={(e) => setPaymentId(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Amount:</label>
                        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
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
