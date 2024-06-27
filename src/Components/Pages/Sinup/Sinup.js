import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Btn from "../../../Helpers/Btn/Btn";
import InputField from "../../../Helpers/Filed/InputField";
import openEye from "../../assets/img/iconoir_eye.png";
import closeEye from "../../assets/img/codicon_eye-closed.png";
import "./Sinup.css";
import { useUserRegistration } from "../../../Helpers/Hooks/Hooks";
import useToast from "../../../Helpers/useToast";

const Signup = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { registerUser, loading } = useUserRegistration();
    const { showSuccess, showError, ToastContainer } = useToast();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await registerUser(formData);
            if (res.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            showError(error.message);
        }
    };

    const inputFields = [
        { id: 1, label: "First Name", name: "first_name", type: "text", placeholder: "Enter First Name" },
        { id: 2, label: "Last Name", name: "last_name", type: "text", placeholder: "Enter Last Name" },
        { id: 3, label: "Email", name: "email", type: "email", placeholder: "Enter Email" },
        { id: 4, label: "Mobile", name: "mobile", type: "number", placeholder: "Enter Mobile Number" },
        { id: 5, label: "Password", name: "password", type: showPassword ? 'text' : 'password', placeholder: "Enter Password" },
        { id: 6, label: "Confirm Password", name: "confirmPassword", type: showPassword ? 'text' : 'password', placeholder: "Confirm Password" },
    ];

    return (
        <>
            <div id="login_page" className="sign_up_page">
                <div className="container">
                    <div className="row" style={{ textAlign: "center" }}>
                        <form className="sign_in_form sign_up" onSubmit={handleSubmit}>
                            <div className="heading">
                                <h3 id="signtexxt">Sign Up</h3>
                            </div>

                            {inputFields.map((field) => (
                                <div className="input_group" key={field.id}>
                                    <InputField
                                        inputdata={formData[field.name]}
                                        id={`input${field.name.charAt(0).toUpperCase() + field.name.slice(1)}`}
                                        placeholder={field.placeholder}
                                        Press={handleChange}
                                        name={field.name}
                                        type={field.type}
                                        required
                                    />
                                    {(field.name === "password" || field.name === "confirmPassword") && (
                                        <button className="eye_button" type="button" onClick={handleTogglePassword}>
                                            {showPassword ? <img src={closeEye} alt="Hide" /> : <img src={openEye} alt="Show" />}
                                        </button>
                                    )}
                                </div>
                            ))}

                            <div className="input_group" style={{ textDecoration: "none", marginTop: "-10px" }}>
                                <Btn title={loading ? "Loading..." : "Sign Up"} />
                                <span>Already have an account? <Link to="/login" className="anchor">Sign In</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Signup;
