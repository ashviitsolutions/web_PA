import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Sinup.css"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from '../../../Constant';

function Login() {


    const nav = useNavigate()


    // const nav=useNavigate()
    const initialValues = {

        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
        Confirm_Password: "",
    };
    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        first_name: Yup.string()
            .required("First name is required"),
        password: Yup.string()
            .required("required password")
            .min(8, "atleast 8 character password is required")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase,Lowercase,Number and one special case Character"
            ),

        Confirm_Password: Yup.string()
            .required("required conform_password")
            .oneOf([Yup.ref("password"), ""], "password does not match"),

    });


    const onSubmit = async (values, { resetForm }) => {
        console.log(values);

        try {
            const data = {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                mobile: values.mobile,
                password: values.password,
                confirm_password: values.Confirm_Password,
            };

            const res = await axios.post(`${IP}/user/register`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(res);

            if (res.status === 200) {
                resetForm({ values: "" });
                // Show success notification and navigate to '/login'
                toast.success("Registration successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        nav("/login")
                    },
                });
            } else if (res.status === 400) {
                // Show error notification if the API response is not successful
                toast.error("email or mobile number already used", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }

        } catch (error) {
            console.error(error);
            toast.error("email or mobile number already used", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };


    return (
        <>
            <div id="login_page">
                <div className="container">
                    <div className="row" style={{ textAlign: "center" }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={onSubmit}
                        >
                            {({ errors, touched, }) => (
                                <Form className="sign_in_form">
                                    <div className="heading">
                                        <h3 id='signtexxt'>Sign Up</h3>
                                    </div>

                                    <div className="input_group">
                                        <Field
                                            className="input"
                                            name="first_name"
                                            type="text"
                                            placeholder=""
                                        />
                                        {errors.first_name && touched.first_name ? (
                                            <div>{errors.first_name}</div>
                                        ) : null}
                                        <label htmlFor="">First Name</label>
                                        <span className="highlight"></span>
                                    </div>
                                    <div style={{ height: "5px" }}>
                                    </div>
                                    <div className="input_group">
                                        <Field
                                            className="input"
                                            name="last_name"
                                            type="text"
                                            placeholder=""
                                        />
                                        {errors.last_name && touched.last_name ? (
                                            <div>{errors.last_name}</div>
                                        ) : null}
                                        <label htmlFor="">Last Name</label>
                                        <span className="highlight"></span>
                                    </div>
                                    <div style={{ height: "5px" }}>
                                    </div>
                                    <div className="input_group">
                                        <Field
                                            className="input"
                                            name="email"
                                            type="email"
                                            placeholder=""
                                        />
                                        {errors.email && touched.email ? (
                                            <div>{errors.email}</div>
                                        ) : null}
                                        <label htmlFor="">E-mail</label>
                                        <span className="highlight"></span>
                                    </div>
                                    <div style={{ height: "5px" }}>
                                    </div>
                                    <div className="input_group">
                                        <Field
                                            className="input"
                                            name="mobile"
                                            type="number"
                                            placeholder=""
                                        />
                                        {errors.mobile && touched.mobile ? (
                                            <div>{errors.mobile}</div>
                                        ) : null}
                                        <label htmlFor="">Mobile</label>
                                        <span className="highlight"></span>
                                    </div>
                                    <div style={{ height: "5px" }}>
                                    </div>

                                    <div className="input_group">
                                        <Field
                                            className="input"
                                            name="password"
                                            type="password"
                                            placeholder=""
                                        />
                                        {errors.password && touched.password ? (
                                            <div>{errors.password}</div>
                                        ) : null}
                                        <label htmlFor="">password</label>
                                        <span className="highlight"></span>
                                    </div>
                                    <div style={{ height: "5px" }}>
                                    </div>
                                    <div className="input_group">
                                        <Field
                                            className="input"
                                            name="Confirm_Password"
                                            type="password"
                                            placeholder=""
                                        />
                                        {errors.Confirm_Password && touched.Confirm_Password ? (
                                            <div>{errors.Confirm_Password}</div>
                                        ) : null}
                                        <label htmlFor="">confirm password</label>
                                        <span className="highlight"></span>
                                    </div>
                                    <div style={{ height: "5px" }}>
                                    </div>


                                    <div className="input_group" style={{ textDecoration: "none", paddingTop: "1px" }}>
                                        <button type="submit" className="button">sign Up</button>
                                        <span>already have an account? <Link to="/login" className="anchor">Sign In</Link> </span>



                                    </div>



                                </Form>
                            )}
                        </Formik>


                    </div>
                </div>
            </div>
            <ToastContainer />
        </>

    )
}

export default Login