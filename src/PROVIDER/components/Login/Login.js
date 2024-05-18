import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import openEye from "../../../Components/assets/img/iconoir_eye.png"
import closeEye from "../../../Components/assets/img/codicon_eye-closed.png"

function LoginProvider() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toggle, setToggle] = useState(false);
    const token = localStorage.getItem('providertoken');
    const approvaltoken = localStorage.getItem('approvaluser');
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };


    const onSubmit = async () => {
        setLoading(true)
        try {
            const data = { email, password };
            const resp = await fetch(`${IP}/provider/login`, {
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
                setLoading(false)
                const time = new Date().getTime();
                localStorage.setItem('providertoken', token);
                localStorage.setItem('provider_id', result?.user_info?._id);
                localStorage.setItem('providerlogintime', time);
                if (approvaltoken === 'approval') {
                    nav('/providers');
                } else {
                    nav('/providers/waiting');
                }
            } else {
                setToggle(true);
            }
            console.log('provider Login', result);
        } catch (error) {
            setLoading(false)
            console.log('Error show', error);
        }
    };

    const forGet = async () => {
        try {
            const data = { email };
            const resp = await fetch(`${IP}/user/forgate-password`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
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
                        // nav('/login');
                    },
                });
            } else {
                const errorResult = await resp.json();
                toast.error(`${errorResult.message}`, {
                    position: 'top-right',
                    autoClose: 3000,

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
            <div id="login_pages">
                <div className="container">
                    <div className="row" style={{ textAlign: 'center' }}>
                        <div className="sign_in_form">
                            <div className="heading">
                                <h3 id="signtexxt">Sign In</h3>
                            </div>

                            <div className="input_group">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div style={{ height: '5px' }}></div>
                            <div className="input_group">
                                <input
                                    className="input"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className='eye_button' type="button" onClick={handleTogglePassword}>
                                {showPassword ? <img src={closeEye} alt='' /> : <img src={openEye} alt='' />}
                            </button>
                            <p
                                style={{
                                    background: 0,
                                    color: '#707070',
                                    cursor: 'pointer',
                                }}
                                onClick={forGet}
                            >
                                Forget password?
                            </p>

                            <div
                                className="input_group"
                                style={{ textDecoration: 'none', paddingTop: '1px' }}
                            >
                                <button className="button" type="button" onClick={onSubmit}>

                                    {loading ? "Loading..." : "sign in"}
                                </button>
                                {toggle ? (
                                    <div id="notification_holder" style={{ paddingRight: '20px' }}>
                                        {!token ? (
                                            <div className="notificatioerror">
                                                <h3 id="errorshow" style={{ paddingRight: '50px' }}>
                                                    Invalid credentials
                                                </h3>
                                            </div>
                                        ) : (
                                            <h3>Success</h3>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

export default LoginProvider;
