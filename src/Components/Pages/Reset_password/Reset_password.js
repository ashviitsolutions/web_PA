import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Reset_password.css'; // Import your CSS file
import { IP } from '../../../Constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ResetPassword() {
    const { tokenid } = useParams();
    console.log("token id", tokenid)
    const nav = useNavigate()
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChangeNow = async () => {
        try {
            if (newPassword !== confirmPassword) {
                setMessage('Password and confirm password must match');
                return;
            }

            if (!newPassword || !confirmPassword) {
                setMessage('Please fill in both password fields');
                return;
            }

            const response = await fetch(`${IP}/user/reset-password?token=${tokenid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: newPassword }), // Send password as JSON
            });

            const data = await response.json();


            if (response.ok) {

                setMessage(data.message);
                // Show success notification and navigate to '/admin/Gift'
                toast.success("Your password update successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        nav("/login");
                    },
                });
            } else {
                setMessage(data.message || 'Failed to reset password');
                // Show error notification if the API response is not successful


            }


        } catch (error) {
            console.error('Error during password reset:', error);
            setMessage('An error occurred during password reset');
        }
    };



    return (
        <>
            <div className='reset-password-container'>
                <h2>Reset Password</h2>
                <div>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleChangeNow} >Change Now</button>
                <div>{message}</div>
            </div>
            <ToastContainer />
        </>

    );
}

export default ResetPassword;
