import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import openEye from "../../../Components/assets/img/iconoir_eye.png";
import closeEye from "../../../Components/assets/img/codicon_eye-closed.png";
import { IP } from '../../../Constant';

function UpdateClient() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const apidata = location.state.client;
    const [formValue, setFormValue] = useState(null);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const token = localStorage.getItem('tokenadmin');

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        password: '',
        Confirm_Password: '',
    };

    const SignupSchema = Yup.object().shape({
        // Define your validation schema here
    });

    const onSubmit = async (values, { resetForm }) => {
        console.log(values);
        try {
            const bodyFormData = new FormData();
            bodyFormData.append("first_name", values.first_name);
            bodyFormData.append("last_name", values.last_name);
            bodyFormData.append("email", values.email);
            bodyFormData.append("mobile", values.mobile);
            bodyFormData.append("password", values.password);
            bodyFormData.append("confirm_password", values.Confirm_Password);

            const res = await axios.post(`${IP}/admin/update/${id}`, bodyFormData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });

            if (res.status === 200) {
                toast.success("Update successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        navigate('/admin/clients');
                    },
                });
            } else {
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    useEffect(() => {
        const updatedSavedValues = {
            first_name: apidata.first_name,
            last_name: apidata.last_name,
            email: apidata.email,
            mobile: apidata.mobile,
        };
        setFormValue(updatedSavedValues);
    }, [apidata]);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <Formik
                            initialValues={formValue || initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={onSubmit}
                            enableReinitialize
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
            <ToastContainer />
        </>
    );
}

export default UpdateClient;
