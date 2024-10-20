import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';
import openEye from "../../../Components/assets/img/iconoir_eye.png";
import closeEye from "../../../Components/assets/img/codicon_eye-closed.png";

function AddClient() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        password: '',
        Confirm_Password: '',
        created_by:"admin"
    };

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email address').required('Email is required'),
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
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
        console.log("Form submitted with values:", values);
        resetForm();

        try {
            const res = await axios.post(`${IP}/user/register`, values);

            if (res.status === 200) {
                navigate('/admin/clients');
            } else {
                setError('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                                            <h3>Add Client</h3>
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
                                                        <Field className="input" name="password" type={showPassword ? "text" : "password"} />
                                                        <label htmlFor="">Password</label>
                                                        <button className='eye_button' type="button" onClick={handleTogglePassword}>
                                                            {showPassword ? <img src={closeEye} alt='Hide' /> : <img src={openEye} alt='Show' />}
                                                        </button>
                                                        {errors.password && touched.password && <div>{errors.password}</div>}
                                                        <span className="highlight"></span>
                                                    </div>
                                                    <div className="input_group">
                                                        <Field className="input" name="Confirm_Password" type={showConfirmPassword ? "text" : "password"} />
                                                        <label htmlFor="">Confirm Password</label>
                                                        <button className='eye_button' type="button" onClick={handleToggleConfirmPassword}>
                                                            {showConfirmPassword ? <img src={closeEye} alt='Hide' /> : <img src={openEye} alt='Show' />}
                                                        </button>
                                                        {errors.Confirm_Password && touched.Confirm_Password && <div>{errors.Confirm_Password}</div>}
                                                        <span className="highlight"></span>
                                                    </div>
                                                    {error && <div className="error">{error}</div>}
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
