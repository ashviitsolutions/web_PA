import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import openEye from "../../assets/img/iconoir_eye.png";
import closeEye from "../../assets/img/codicon_eye-closed.png";
import Btn from "../../../Helpers/Btn/Btn";
import InputField from "../../../Helpers/Filed/InputField";
import { useUserRegistration } from '../../../Helpers/Hooks/Hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToast from '../../../Helpers/useToast'; // Assuming useToast is defined here
import { IP } from '../../../Constant'; // Ensure IP is imported correctly

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { loginUser, loading } = useUserRegistration();
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast(); // Ensure useToast is imported correctly

    useEffect(() => {
        const auth = localStorage.getItem('token');
        if (auth) {
            navigate('/userProfile');
        }
    }, [navigate]);

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
            const res = await loginUser(formData);

            if (res.status === 200) {
              
                navigate('/userProfile');
            }
        } catch (error) {
            console.error("Login error", error);
        }
    };

    const handleForgetPassword = async () => {
        if (!formData.email) {
            showError('Please enter your email before requesting a password reset.');
            return;
        }

        try {
            const data = { email: formData.email };
            const resp = await fetch(`${IP}/user/forgate-password`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (resp.status === 200) {
                const result = await resp.json();
                showSuccess('Password reset email sent. Check your inbox.', {
                    onClose: () => {
                        navigate('/login');
                    },
                });
            } else {
                const errorResult = await resp.json();
                showError(`${errorResult.message}`, {
                    onClose: () => {
                        navigate('/login');
                    },
                });
            }
        } catch (error) {
            showError('An error occurred. Please try again.');
        }
    };

    const inputFields = [
        { id: 1, label: "E-mail", name: "email", type: "email", placeholder: "Enter Email" },
        { id: 2, label: "Password", name: "password", type: showPassword ? 'text' : 'password', placeholder: "Enter Password" },
    ];

    return (
        <>
            <div id="login_page">
                <div className="container">
                    <div className="row" style={{ textAlign: 'center' }}>
                        <form className="sign_in_form" onSubmit={handleSubmit}>
                            <div className="heading">
                                <h3 id="signtexxt">Sign In</h3>
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
                                    {field.name === "password" && (
                                        <button className='eye_button' type="button" onClick={handleTogglePassword}>
                                            {showPassword ? <img src={closeEye} alt="Hide" /> : <img src={openEye} alt="Show" />}
                                        </button>
                                    )}
                                </div>
                            ))}

                            <p style={{ background: 0, color: '#707070', cursor: "pointer" }} onClick={handleForgetPassword}>
                                Forget password ?
                            </p>

                            <div className="input_group" style={{ textDecoration: 'none', paddingTop: '1px' }}>
                                <Btn title={loading ? "Loading..." : "Sign In"} />
                                <span>
                                    Don't have an account? <Link to="/sign_up" className="anchor">Sign Up</Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;
