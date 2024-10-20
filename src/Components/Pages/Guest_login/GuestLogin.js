import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../assets/img/sg.svg';
import { IP } from '../../../Constant';
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import openEye from "../../assets/img/iconoir_eye.png"
import closeEye from "../../assets/img/codicon_eye-closed.png"

function GuestLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const loginguser = localStorage.getItem('token');



  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };









  useEffect(() => {
    if (!loginguser) {
      nav('/guest_login');
    } else {
      nav('/select_location_type');
    }
  }, [loginguser, nav]);




  const forGet = async () => {
    if (!email) {
      // Add a check to ensure email is not empty
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

      const token = resp.headers.get('Authorization');

      if (resp.status === 200) {
        const result = await resp.json();
        console.log('result', result);




        toast.success('Password reset email sent. Check your inbox.', {
          position: 'top-right',
          autoClose: 3000,

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


  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await axios.post(`${IP}/user/login`, data);

      if (response.status === 200) {
        setLoading(false)
        const token = response.headers.authorization;
        const user = response.data;
        if (response?.data?.user_info?.name) {
          localStorage.setItem("user_name", response?.data.user_info?.name);
        } else {
          const fullName = `${response?.data.user_info?.first_name} ${response?.data?.last_name}`;
          localStorage.setItem("user_name", fullName);
        }

        localStorage.setItem("token", token);
        localStorage.setItem("userid", response?.data?.user_info?._id);
        localStorage.setItem("first_name", response?.data?.user_info?.first_name);
        localStorage.setItem("last_name", response?.data?.user_info?.last_name);
        localStorage.setItem("user_email", response?.data?.user_info?.email);
        localStorage.setItem("mobile", response?.data?.user_info?.mobile);
        nav('/select_location_type');
      } else {
        setToggle(true);
      }
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error);
      setToggle(true);
    }
  };

  return (
    <>
      <ToastContainer />
      <div id="over_banner">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-sm-offset-1">
              <div className="card sign_in_forms" style={{ zIndex: 9, maxWidth: '100%' }}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="as_guest gutter" style={{ textAlign: 'center' }}>
                        <div className="heading gutter" style={{ maxWidth: '400px', display: 'inline-block' }}>
                          <h3 style={{ fontSize: '18px' }}>Don't have an account ?</h3>
                          <img className='sign_in_icon' src={Image} alt="" />
                          <div className="input_group">
                            <Link to="/select_location_type">
                              <button className="small button lazy" type="button">
                                Continue as guest
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <form onSubmit={onSubmit}>
                        <div className="heading">
                          <h3>Sign In</h3>
                        </div>
                        <div className="input_group">
                          <input
                            required
                            className="input"
                            name="email"
                            type="text"
                            placeholder=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label htmlFor="email">E-mail</label>
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
                          <label htmlFor="password">Password</label>
                          <button className='eye_button' type="button" onClick={handleTogglePassword}>
                            {showPassword ? <img src={closeEye} alt='' /> : <img src={openEye} alt='' />}
                          </button>
                          <span className="highlight"></span>
                        </div>
                        <p style={{ background: 0, color: '#707070', cursor: "pointer" }} onClick={forGet}>
                          Forgot password ?
                        </p>
                        <div className="input_group">
                          <button className="button" type="submit">
                            {loading ? "Loading..." : "sign in"}
                          </button>
                        </div>
                        <span>
                          Register with us!{' '}
                          <Link to="/sign_up" className="anchor" style={{ textDecoration: 'none' }}>
                            Sign Up
                          </Link>{' '}
                        </span>
                        {toggle ? (
                          <div id="notification_holder">
                            {!loginguser ? (
                              <div className="notificatioerror">
                                <h3 id="errorshow">Invalid credentials</h3>
                              </div>
                            ) : (
                              <h3>Success</h3>
                            )}
                          </div>
                        ) : null}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GuestLogin;
