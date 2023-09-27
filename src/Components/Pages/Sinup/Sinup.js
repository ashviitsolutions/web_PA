import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Sinup.css"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [toggle, setToggle] = useState(false)

    const nav = useNavigate()


    // const nav=useNavigate()
    const initialValues = {

        name: "",
        email: "",
        password: "",
        Confirm_Password: "",
    };
    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),
            name: Yup.string()
            .required("First name is required"),
        password: Yup.string()
            .required("required password")
            .min(8, "atlist 8 character password is required")
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
        resetForm({ values: "" });
        try {
            const bodyFormData = new FormData();
            bodyFormData.append("name", values.name);
            bodyFormData.append("email", values.email);
            bodyFormData.append("password", values.password);
            bodyFormData.append("confirm_password", values.Confirm_Password);

            const res = await axios.post("http://45.13.132.197:5000/api/user/register", bodyFormData, {
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            console.log(res);

            if (res.status === 200) {

                nav("/")
            } else {
                setToggle(true)
            }
        } catch (error) {
            console.error(error);
            setToggle(true)
        }
    };

    return (
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
                                        name="name"
                                        type="text"
                                        placeholder=""
                                    />
                                    {errors.name && touched.name ? (
                                        <div>{errors.name}</div>
                                    ) : null}
                                    <label htmlFor="">Name</label>
                                    <span className="highlight"></span>
                                </div>
                                <div style={{ height: "5px" }}>
                                </div>
                                <div className="input_group">
                                    <Field
                                        className="input"
                                        name="email"
                                        type="text"
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
                                        type="Confirm_Password"
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
                                <Link to="#" style={{ background: 0, color: "#707070" }}>forget password ?</Link>

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
    )
}

export default Login