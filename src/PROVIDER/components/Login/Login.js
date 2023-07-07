import React, { useEffect, useState } from 'react'
// import "./Login.css"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant'

function Loginprovider() {
    const [user, setUser] = useState("");
    const [toggle, setToggle] = useState(false)
    const token = localStorage.getItem("providertoken");
    const approvaltoken = localStorage.getItem("approvaluser")
    const nav = useNavigate()
   


    const initialValues = {
        email: "",
        password: "",

    };
    const SignupSchema = Yup.object().shape({
        email: Yup.string().required("Required"),
        password: Yup.string().required("required")
    


    });
    const onSubmit = async (values, { resetForm }) => {
        console.log(values)

        resetForm({ values: "" });
        let data = { "email": values.email, "password": values.password }
        try {
            const resp = await fetch(`${IP}/provider/login`, {
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
                const time = new Date().getTime()
                localStorage.setItem("providertoken", token);
                localStorage.setItem("providerlogintime", time)
                if (approvaltoken === "approval") {
                    nav("/providers");
                  } else {
                    nav("/providers/waiting");
                  }
            } else {
                setToggle(true)
            }
               console.log("provider Login", result)
        } catch (error) {
            console.log("Error show", error)
        }
    };


//   useEffect(() => {
//     if (!token) {
//       localStorage.clear(); 
//     }
//   }, [token]);






    return (
        <div id="login_pages">
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
                                        type="password"
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
                                    {
                                        toggle ? (
                                            <div id="notification_holder" style={{paddingRight:"20px"}}>
                                                {!token ? (
                                                    <div className='notificatioerror'>
                                                        <h3 id='errorshow' style={{paddingRight:"50px"}}>Invalid credentials</h3>
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

export default Loginprovider