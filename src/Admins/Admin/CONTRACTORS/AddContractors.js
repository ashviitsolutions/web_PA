import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { IP } from '../../../Constant';
import { useNavigate } from 'react-router-dom';

function AddContractors() {
    const nav = useNavigate()
    const [user, setuser] = useState([])
    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        zip: "",
        city: "",
        gender: "",
        password: "",
        confirm_password: "",
    };

    const validate = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),

        first_name: Yup.string()
            .required("First name is required"),
        last_name: Yup.string()
            .required("Last name is required"),
        phone: Yup.number()
            .required("Phone number is required"),
        address: Yup.string()
            .required("Address is required"),
        gender: Yup.string()
            .required("Gender is required"),

        password: Yup.string()
            .required("Please enter your password")
            .min(8, "At least an 8-character password is required")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase,Lowercase,Number and one special case Character "
            ),

        confirm_password: Yup.string()
            .required("required confirm_password")
            .oneOf([Yup.ref("password"), ""], "password does not match"),
    });





    const onSubmit = async (values, { setValues, resetForm }) => {
        // console.log(values);
        let data = {
            "email": values.email, "first_name": values.first_name, "city": values.city, "zip": values.zip, "confirm_password": values.confirm_password,
            "last_name": values.last_name, "phone": values.phone, "address": values.address, "gender": values.gender, "password": values.password
        }
        try {
            const resp = await fetch(`${IP}/provider/registration`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(data)
            })
            const result = await resp.json()
            console.log(result)

            if (resp.status === 200) {
                nav('/admin/contractors')
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetch(`${IP}/terms/fetch`)
            .then((res) => res.json())
            .then((data) => {
                setuser(data);
            })
            .catch((error) => {
            });
    }, []);
    return (
        <>
            <div  id="content">
                <div className="row">
                    <div className="col-sm-6">

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validate}
                            onSubmit={onSubmit}
                        >

                            {({ errors, touched, setFieldValue, values }) => (

                                <Form className="card layer1">


                                    <div id="member_form" className="member_form_wrap">
                                        <div className="heading">
                                            <h3 style={{ fontSize: "20px" }}>Membership form</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                        </div>


                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <Field
                                                            className="input"
                                                            name="first_name"
                                                            type="text"
                                                            placeholder=""
                                                        />
                                                        <label htmlFor="">first name</label>
                                                        {errors.first_name && touched.first_name ? (
                                                            <div>{errors.first_name}</div>
                                                        ) : null}
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
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
                                                        <label htmlFor="">last name</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
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
                                                    <label htmlFor="">email</label>
                                                    <span className="highlight"></span>
                                                </div>
                                                <div className="input_group">
                                                    <Field
                                                        className="input"
                                                        name="phone"
                                                        type="text"
                                                        placeholder=""
                                                    />
                                                    {errors.phone && touched.phone ? (
                                                        <div>{errors.phone}</div>
                                                    ) : null}
                                                    <label htmlFor="">phone</label>
                                                    <span className="highlight"></span>
                                                </div>


                                                <div className="input_group">
                                                    <Field
                                                        className="input"
                                                        name="address"
                                                        type="text"
                                                        placeholder=""
                                                    />
                                                    {errors.address && touched.address ? (
                                                        <div>{errors.address}</div>
                                                    ) : null}
                                                    <label htmlFor="">address</label>
                                                    <span className="highlight"></span>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <Field
                                                            className="input"
                                                            name="zip"
                                                            type="text"
                                                            placeholder=""
                                                        />
                                                        {errors.zip && touched.zip ? (
                                                            <div>{errors.zip}</div>
                                                        ) : null}
                                                        <label htmlFor="">zip code</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>


                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <Field
                                                            className="input"
                                                            name="city"
                                                            type="text"
                                                            placeholder=""
                                                        />
                                                        {errors.city && touched.city ? (
                                                            <div>{errors.city}</div>
                                                        ) : null}
                                                        <label htmlFor="">City</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="input_group">
                                                    <Field name="gender" as="select" className="input" >
                                                        <option value="">Select Type</option>
                                                        <option value="male">male</option>
                                                        <option value="female">female</option>
                                                    </Field>
                                                    <span className="highlight"></span>
                                                </div>
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

                                            <div className="input_group">
                                                <Field
                                                    className="input"
                                                    name="confirm_password"
                                                    type="password"
                                                    placeholder=""
                                                />
                                                {errors.confirm_password && touched.confirm_password ? (
                                                    <div>{errors.confirm_password}</div>
                                                ) : null}
                                                <label htmlFor="">confirm Password</label>
                                                <span className="highlight"></span>
                                            </div>


                                            <div className="row">
                                                <button className="button lazy" type="submit">submit</button>
                                            </div>

                                        </div>


                                    </div>



                                </Form>
                            )}

                        </Formik>
                    </div>


                </div>
            </div>
        </>
    )
}

export default AddContractors