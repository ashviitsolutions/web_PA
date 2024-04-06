import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IP } from '../../../../Constant';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import openEye from "../../../../Components/assets/img/iconoir_eye.png"
import closeEye from "../../../../Components/assets/img/codicon_eye-closed.png"
import logo from "../../../../Components/assets/img/logo_home_navbar.png"

function Login() {
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false);
    const loginguser = localStorage.getItem("tokenadmin")
    const nav = useNavigate()

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        const auth = localStorage.getItem("tokenadmin")
        if (auth) {
            nav('/admin')
        }
    },)
    // const nav=useNavigate()
    const initialValues = {
        email: "",
        password: "",

    };
    const SignupSchema = Yup.object().shape({
        email: Yup.string().required("required"),
        password: Yup.string().required("required")
        // .required("required")
        // .min(6, "atlist 8 character password is required")
        // .matches(
        //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        // ),


    });
    const onSubmit = async (values, { resetForm }) => {
        console.log(values)
        setLoading(true)
        resetForm({ values: "" });
        let data = { "email": values.email, "password": values.password }
        try {
            const resp = await fetch(`http://localhost:5000/api/admin/login`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(resp)
            const token = resp.headers.get('Authorization');
            const result = await resp.json();
            console.log(result)



            if (resp.status === 200) {
                setLoading(false)
                localStorage.setItem("usersadmin", JSON.stringify(result));
                localStorage.setItem("tokenadmin", token);
                nav("/admin/dashboard")
            } else {
                setToggle(true)
            }

        } catch (error) {
            setLoading(false)
            console.log("Error show", error)

        }



    };

    return (
        <div id="login">
            <div className="background">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-4">
                            <div className="head" style={{ textAlign: "center" }}>
                                <img src={logo} style={{maxWidth:"350px", width: "100%"}} />
                                {/* <h3>welcome !</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" >
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-4">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={onSubmit}
                        >
                            {({ errors, touched, }) => (
                                <Form id="login_form" className="loginpage">
                                    <div className="card padded layer2">
                                        <div className="card_wrapper">
                                            <div className="input_group">
                                                <div className="headinghomes">
                                                    <h3 style={{ fontWeight: "700" }}>Admin Login</h3>
                                                    <p>enter your credentials to login</p>
                                                </div>
                                            </div>
                                            <div className="input_group">
                                                <Field
                                                    className="input"
                                                    name="email"
                                                    type="text"
                                                />
                                                <label for="">username</label>
                                                {errors.email && touched.email ? (
                                                    <div>{errors.email}</div>
                                                ) : null}


                                            </div>
                                            <span className="small_marg"></span>

                                            <div className="input_group">
                                                <Field
                                                    className="input"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                />
                                                <label for="">password</label>
                                                <button className='eye_button' type="button" onClick={handleTogglePassword}>
                                                    {showPassword ? <img src={closeEye} alt='' /> : <img src={openEye} alt='' />}
                                                </button>
                                                {errors.password && touched.password ? (
                                                    <div>{errors.password}</div>
                                                ) : null}

                                                <span className="highlight"></span>
                                            </div>
                                            <span className="small_marg"></span>

                                            <div className="input_group">
                                                <button className="button lazy primary" type="submit"

                                                >{loading ? "Loading..." : "sign in"}</button>
                                                {
                                                    toggle ? (
                                                        <div id="notification_holder">
                                                            {!loginguser ? (
                                                                <div className='notificatioerror'>
                                                                    <p id='errorshow'>Invalid credentials</p>
                                                                </div>
                                                            ) : (<h3>Success</h3>)
                                                            }
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                    </div>


                                </Form>
                            )}
                        </Formik>

                    </div>
                    
                </div>
                
                <p style={{textAlign:"center", width:"100%", margin: "20px 0"}} ><a className='small' href='/'>&larr; Back to Home</a></p>
            </div>
        </div>
    )
}

export default Login