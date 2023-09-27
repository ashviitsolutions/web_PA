import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [toggle, setToggle] = useState(false)
    const loginguser = localStorage.getItem("token")
    const nav = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem("token")
        if (auth) {
            nav('/userProfile')
        }
    })
    // const nav=useNavigate()
    const initialValues = {
        email: "",
        password: "",

    };
    const SignupSchema = Yup.object().shape({
        email: Yup.string().required("Required"),
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

        resetForm({ values: "" });
        let data = { "email": values.email, "password": values.password }
        try {
            const resp = await fetch("http://45.13.132.197:5000/api/user/login", {
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
                localStorage.setItem("users", JSON.stringify(result));
                localStorage.setItem("token", token);
                nav("/userProfile")
            } else {
                setToggle(true)
            }

        } catch (error) {
            console.log("Error show", error)

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

                                </div>
                                <Link to="#" style={{ background: 0, color: "#707070" }}>forget password ?</Link>

                                <div className="input_group" style={{ textDecoration: "none", paddingTop: "1px" }}>
                                    <button className="button" type="submit"

                                    >sign in</button>
                                    <span >Don't have an account? <Link to="/sign_up" className="anchor" >Sign Up</Link> </span>

                                    <button className="button gmail_login" > <span className="ico"></span> Sign In with Gmail</button>
                                    {
                                        toggle ? (
                                            <div id="notification_holder">
                                                {!loginguser ? (
                                                    <div className='notificatioerror'>
                                                        <h3 id='errorshow'>Invalid credentials</h3>
                                                    </div>
                                                ) : (<h3>Success</h3>)
                                                }
                                            </div>
                                        ) : null
                                    }
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