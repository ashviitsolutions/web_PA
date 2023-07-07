import React from 'react'
import { Link } from 'react-router-dom'
import Image from "../../assets/img/sg.svg"
import "./style.css"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
function GuestLogin() {
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
      <div id="over_banner">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-sm-offset-1">
              <div className="card sign_in_forms" style={{ zIndex: 9, maxWidth: "100%" }}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="as_guest gutter" style={{ textAlign: "center" }}>
                        <div className="heading gutter" style={{ maxWidth: "400px", display: "inline-block" }}>
                          <h3 style={{ fontSize: "18px" }}>Don't have an account ?</h3>
                          <img src={Image} alt="" />
                          <div className="input_group">
                            <Link to="/select_location_type">
                              <button className="small button lazy" type="button" >continue as guest</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={SignupSchema}
                        onSubmit={onSubmit}
                      >

                        {({ errors, touched, setFieldValue, values }) => (

                          <Form className="" style={{ zIndex: 9 }}>
                            <div className="heading">
                              <h3>Sign In</h3>
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
                                <button className="button" type="button" >sign in</button>
                            </div>
                            <span>Don't have an account? <Link to="/sign_up" className="anchor" style={{textDecoration:"none"}}>Sign Up</Link> </span>

                            <button className="button gmail_login d-block" type="button" id="gmaillogin"> <span className="ico"></span> Sign In with Gmail</button>
                          </Form>
                        )}

                      </Formik>



                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GuestLogin