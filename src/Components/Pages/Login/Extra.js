import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
function Login() {
    const initialValues = {

        email: "",
        password: "",

    };
    const SignupSchema = Yup.object().shape({
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required"),


    });
    const onSubmit = async (values, { setValues, resetForm }) => {
        console.log(values);
        alert("hii")
        try {
            const bodyFormData = new FormData();
            bodyFormData.append("email", values.email);
            bodyFormData.append("password", values.password);

            const res = await axios.post("http://45.13.132.197:4000/login", bodyFormData);
            console.log(res);

        } catch (error) {
            console.error(error);
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

                            {({ errors, touched, setFieldValue, values }) => (

                                <Form className="sign_in_form">
                                    <div className="heading">
                                        <h3 id='signtexxt'>Sign In</h3>
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
                                            type="text"
                                            placeholder=""
                                        />
                                        {errors.password && touched.password ? (
                                            <div>{errors.password}</div>
                                        ) : null}
                                        <label htmlFor="">password</label>
                                        <span className="highlight"></span>
                                    </div>
                                    <Link to="#" style={{ background: 0, color: "#707070" }}>forget password ?</Link>
                       
                                        <div className="input_group">
                                            <button type="submit" className="button">sign in</button>
                                        </div>
                
                                    <span>Don't have an account? <Link to="/sign_up" className="anchor" style={{ textDecoration: "none" }}>Sign Up</Link> </span>

                                    <button className="button gmail_login" > <span className="ico"></span> Sign In with Gmail</button>
                                </Form>
                            )}

                        </Formik>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login