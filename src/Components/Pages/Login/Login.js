import React, { useEffect, useState } from 'react';
import './Login.css';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import openEye from "../../assets/img/iconoir_eye.png"
import closeEye from "../../assets/img/codicon_eye-closed.png"

function Login() {
    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginguser = localStorage.getItem('token');
    const nav = useNavigate();





    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };







    useEffect(() => {
        const auth = localStorage.getItem('token');
        if (auth) {
            nav('/userProfile');
        }
    }, [nav]);

    const initialValues = {
        email: '',
        password: '',
    };

    const SignupSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().required('required'),
    });

    const onSubmit = async () => {
        const data = { email, password };

        try {
            const resp = await fetch(`${IP}/user/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const token = resp.headers.get('Authorization');
            const result = await resp.json();

            if (resp.status === 200) {
                localStorage.setItem('users', JSON.stringify(result));
                localStorage.setItem('userid', result?.user_info?._id);
                localStorage.setItem('user_name', result?.user_info?.fullName);
                localStorage.setItem('user_email', result?.user_info?.email);
                localStorage.setItem('token', token);
                toast.success("Logged in successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    onClose: () => {
                        nav('/userProfile');
                    },
                });

            } else {
                setToggle(true);

                toast.error("Invalid credentials", {
                    position: "top-right",
                    autoClose: 3000,
                });

            }
        } catch (error) {
            console.log('Error show', error);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const forGet = async () => {
        if (!email) {
            // Add  check to ensure email is not empty
            toast.error('Please enter your email before requesting a password reset.', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        try {
            const data = { email };
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
                console.log('result', result);

                toast.success('Password reset email sent. Check your inbox.', {
                    position: 'top-right',
                    autoClose: 3000,
                    onClose: () => {
                        nav('/login');
                    },
                });
            } else {
                const errorResult = await resp.json();
                toast.error(`${errorResult.message}`, {
                    position: 'top-right',
                    autoClose: 3000,
                    onClose: () => {
                        nav('/login');
                    },
                });
                console.log('errorResult', errorResult);
            }
        } catch (error) {
            console.log('Error:', error);
            toast.error('An error occurred. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };





    return (
        <>
            <div id="login_page">
                <div className="container">
                    <div className="row" style={{ textAlign: 'center' }}>
                        <div className="sign_in_form">
                            <div className="heading">
                                <h3 id="signtexxt">Sign In</h3>
                            </div>

                            <div className="input_group">
                                <input
                                    className="input"
                                    name="email"
                                    type="email"
                                    placeholder=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="">E-mail</label>
                                <span className="highlight"></span>
                            </div>
                            <div style={{ height: '5px' }}></div>
                            <div className="input_group">
                                <input
                                    className="input"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder=""
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="">Password</label>
                                <button className='eye_button' type="button" onClick={handleTogglePassword}>
                                    {showPassword ? <img src={closeEye} alt='' /> : <img src={openEye} alt='' />}
                                </button>
                            </div>
                            <p style={{ background: 0, color: '#707070', cursor: "pointer" }} onClick={forGet}>
                                forget password ?
                            </p>

                            <div className="input_group" style={{ textDecoration: 'none', paddingTop: '1px' }}>
                                <button className="button" type="button" onClick={onSubmit}>
                                    sign in
                                </button>
                                <span>
                                    Don't have an account? <Link to="/sign_up" className="anchor">
                                        SignUp
                                    </Link>
                                </span>

                                {/*   {toggle ? (
                                    <div id="notification_holder">
                                        {!loginguser ? (
                                            <div className="notificatioerror">
                                                <h3 id="errorshow">Invalid credentials</h3>

                                            </div>
                                        ) : (
                                            <h3>Success</h3>
                                        )}
                                    </div>
                                        ) : null}   */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>


    );
}

export default Login;
