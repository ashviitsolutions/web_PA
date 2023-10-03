import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IP } from '../../../../Constant';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [toggle, setToggle] = useState(false)
    const loginguser = localStorage.getItem("tokenadmin")
    const nav = useNavigate()

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
        resetForm({ values: "" });
        let data = { "email": values.email, "password": values.password }
        try {
            const resp = await fetch(`${IP}/admin/login`, {
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
                localStorage.setItem("usersadmin", JSON.stringify(result));
                localStorage.setItem("tokenadmin", token);
                nav("/admin")
            } else {
                setToggle(true)
            }

        } catch (error) {
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
                                <h3>welcome !</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.</p>
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
                                                    <h3 style={{ fontWeight: "700" }}>Sign in</h3>
                                                    <p>enter your credentials to enter</p>
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
                                                    type="password"
                                                />
                                                <label for="">password</label>
                                                {errors.password && touched.password ? (
                                                    <div>{errors.password}</div>
                                                ) : null}

                                                <span className="highlight"></span>
                                            </div>
                                            <span className="small_marg"></span>

                                            <div className="input_group">
                                                <button className="button lazy primary" type="submit"

                                                >sign in</button>
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
            </div>
        </div>
    )
}

export default Login