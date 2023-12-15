import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Reset_password.css'; // Import your CSS file
import { IP } from '../../../Constant';

function ResetPassword() {
    const { tokenid } = useParams();
    console.log("token id", tokenid)
    const nav = useNavigate()
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChangeNow = async () => {
        console.log("pass", newPassword);
        try {
            if (newPassword !== confirmPassword) {
                setMessage('Password and confirm password must match');
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
                nav("/login");
            } else {
                setMessage(data.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            setMessage('An error occurred during password reset');
        }
    };


    return (
        <div className='reset-password-container'>
            <h2>Reset Password</h2>
            <div>
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button onClick={handleChangeNow} >Change Now</button>
            <div>{message}</div>
        </div>
    );
}

export default ResetPassword;
