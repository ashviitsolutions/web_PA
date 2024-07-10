import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from "../../../../Constant";
import { useSelector } from 'react-redux';

function Setting() {
    const selector = useSelector((state) => state.counter.formData);
    const profiledata = Array.isArray(selector?.profiledata) && selector.profiledata.length > 0 ? selector.profiledata[0] : [];
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user_name");

    const [toggle, setToggle] = useState(false);
    const [message, setMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        new_password: "",
        old_password: "",
        confirm_password: ""
    });

    useEffect(() => {
        setFormData({
            first_name: profiledata.first_name,
            last_name: profiledata.last_name,
            email: profiledata.email,
            mobile: profiledata.mobile,
            new_password: "",
            old_password: "",
            confirm_password: ""
        });
        localStorage.setItem("user_id", profiledata._id);
    }, [profiledata]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateData = () => {
        fetch(`${IP}/user/update_user_profile`, {
            method: "PUT",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(errorData.msg || "Network response was not ok");
                });
            }
            return response.json();
        })
        .then((data) => {
            setToggle(false);
            setMessage(data.msg);
            setTimeout(() => setMessage(""), 1000);
            setPasswordError("");
        })
        .catch((error) => {
            setMessage(error.message);
            setTimeout(() => setMessage(""), 2000);
            setPasswordError("");
        });
    };

    const renderInput = (label, type, name) => (
        <div className="input_group">
            <label className="static">{label}</label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                className="input"
                required
                onChange={handleInputChange}
            />
            <span className="highlight"></span>
        </div>
    );

    return (
        <>
            <div className="progressbar_userpannel profileSpace">
                <div id="profile_page">
                    <div className="profile__avatar">
                        <p className="profile__avatarInitial">{username.slice(0, 1).toUpperCase()}</p>
                    </div>
                    <div className="gutter">
                        <p className="profile_heading">{message}</p>
                    </div>
                    <div className="profile__divs" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <div className="settings_form">
                            <div className="gutter">
                                <h3 className="small_heading">Profile Setting</h3>
                            </div>
                            <div className="profile_info">
                                {renderInput("Your First Name", "text", "first_name")}
                                {renderInput("Your Last Name", "text", "last_name")}
                                {renderInput("Your Email", "email", "email")}
                                {renderInput("Your Contact Number", "number", "mobile")}
                                <div className="input_group">
                                    <button type="submit" className="button__small" onClick={handleUpdateData}>Update</button>
                                </div>
                            </div>
                        </div>
                        <div className="settings_form">
                            <div className="gutter">
                                <h3 className="small_heading">Change Password</h3>
                            </div>
                            <div className="profile_info">
                                {renderInput("Old Password", "password", "old_password")}
                                {renderInput("New Password", "password", "new_password")}
                                {renderInput("Confirm New Password", "password", "confirm_password")}
                                <div className="input_group">
                                    <button type="submit" className="button__small" onClick={handleUpdateData}>Update</button>
                                </div>
                                <p className="error-message">{passwordError}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Setting;
