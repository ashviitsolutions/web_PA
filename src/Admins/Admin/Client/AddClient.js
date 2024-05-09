import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';

function AddClient() {
    const [error, setError] = useState(null); // Added state for error
    const navigate = useNavigate();

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        password: '',
        Confirm_Password: '',
    };

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email address').required('Email is required'),
        name: Yup.string().required('Name is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'Must contain 8 characters, one uppercase, one lowercase, one number and one special character'
            ),
        Confirm_Password: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
    });

    const onSubmit = async (values, { resetForm }) => {
        console.log(values);
        resetForm({ values: '' });

        try {
            const bodyFormData = new FormData();
            bodyFormData.append("first_name", values.first_name);
            bodyFormData.append("last_name", values.last_name);
            bodyFormData.append("email", values.email);
            bodyFormData.append("mobile", values.mobile);
            bodyFormData.append("password", values.password);
            bodyFormData.append("confirm_password", values.Confirm_Password);

            const res = await axios.post(`${IP}/user/register`, bodyFormData, {
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            if (res.status === 200) {
                navigate('/admin/clients');
            } else {
                setError('An error occurred. Please try again.'); // Set error message
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.'); // Set error message
        }
    };

    return (
        <div id="content">
            <div className="container-fluid">
                <div className="row">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignupSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="">
                                    <div className="headings float_wrapper">
                                        <div className="gutter pull-left" style={{ paddingLeft: '0' }}>
                                            <h3>Edit Client</h3>
                                        </div>
                                        <span className="toggle_sidebar"></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="gutter">
                                            <div className="card layer1">
                                                <div className="inner">
                                                    <label className="card_label" htmlFor="">
                                                        Personal Information
                                                    </label>
                                                    <div className="input_group">
                                                        <Field className="input" name="first_name" type="text" />
                                                        <label htmlFor="">First Name</label>
                                                        {errors.first_name && touched.first_name && <div>{errors.first_name}</div>}
                                                        <span className="highlight"></span>
                                                    </div>
                                                    <div className="input_group">
                                                        <Field className="input" name="last_name" type="text" />
                                                        <label htmlFor="">Last Name</label>
                                                        {errors.last_name && touched.last_name && <div>{errors.last_name}</div>}
                                                        <span className="highlight"></span>
                                                    </div>
                                                    <div className="input_group">
                                                        <Field className="input" name="email" type="text" />
                                                        <label htmlFor="">Email</label>
                                                        {errors.email && touched.email && <div>{errors.email}</div>}
                                                        <span className="highlight"></span>
                                                    </div>
                                                    <div className="input_group">
                                                        <Field className="input" name="mobile" type="text" />
                                                        <label htmlFor="">Mobile</label>
                                                        {errors.mobile && touched.mobile && <div>{errors.mobile}</div>}
                                                        <span className="highlight"></span>
                                                    </div>
                                                    <div className="input_group">
                                                        <Field className="input" name="password" type="password" />
                                                        <label htmlFor="">Password</label>
                                                        {errors.password && touched.password && <div>{errors.password}</div>}
                                                        <span className="highlight"></span>
                                                    </div>
                                                    <div className="input_group">
                                                        <Field
                                                            className="input"
                                                            name="Confirm_Password"
                                                            type="password"
                                                        />
                                                        <label htmlFor="">Confirm Password</label>
                                                        {errors.Confirm_Password && touched.Confirm_Password && (
                                                            <div>{errors.Confirm_Password}</div>
                                                        )}
                                                        <span className="highlight"></span>
                                                    </div>
                                                    {error && <div className="error">{error}</div>} {/* Display error message */}
                                                    <div className="input_group">
                                                        <button type="submit" className="button primary square lazy">
                                                            Save Client
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default AddClient;
