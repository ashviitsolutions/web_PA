import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Faq from '../Home/Faq';
import { IP } from '../../../Constant';
import './Contact.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../Redux/counterSlice';
import { fetchPostData } from '../../Hooks/Hooks';
import Loader from '../Loader';

function Contact() {
    const postIds = ['64007afb61c43a17d60e95b4'];
    const [loading, setLoading] = useState(false);
    const users = useSelector((state) => state?.counter?.formData?.contact_banner);
    const img = useSelector((state) => state?.counter?.formData?.contact_banner_image);
    const dispatch = useDispatch();



    // useEffect hook to fetch data and navigate
    useEffect(() => {
        const getDataAndNavigate = async () => {
            try {
                // Fetch data for all specified IDs
                const responses = await Promise.all(
                    postIds.map(async (id) => {
                        const data = await fetchPostData(id);
                        return data;
                    })
                );
                const fetchedUser = responses[0];
                dispatch(updateInputData({ formName: 'contact_banner', inputData: fetchedUser }));

                // If fetched user has attachments, fetch and update image URL
                if (fetchedUser && fetchedUser.attachments) {
                    const imageResponse = await fetch(`${IP}/file/${fetchedUser.attachments}`);
                    const imageBlob = await imageResponse.blob();
                    const imageURL = URL.createObjectURL(imageBlob);
                    dispatch(updateInputData({ formName: 'contact_banner_image', inputData: imageURL }));
                }
            } catch (error) {
                // Handle errors by logging them to the console
                console.error('Error fetching data and navigating:', error);
            }
        };

        // Call the asynchronous function to fetch data and navigate
        getDataAndNavigate();
    }, [dispatch]); // Dependencies array to ensure useEffect runs only once


    // if (!users) {
    // 	return <Loader />
    // }

    const initialValues = {
        name: '',
        contact_number: '',
        email: '',
        message: '',
    };

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        contact_number: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        message: Yup.string().required('Required'),
    });

    const onSubmit = async (values, { setSubmitting }) => { // Destructure setSubmitting from Formik
        setLoading(true); // Set loading to true when form is submitted
        try {
            const response = await axios.post(
                `${IP}/user/sendSupportEmail`,
                {
                    email: values.email,
                    name: values.name,
                    mobile: values.contact_number,
                    message: values.message,
                }
            );
            console.log(response.data);
            toast.success(`${response.data.message}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            console.error('Error submitting form:', err);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false); // Set loading to false after form submission completes
            setSubmitting(false); // Set Formik's submitting state to false
        }
    };

    return (
        <>
            <div id="contact_us" style={{ backgroundImage: `url(${img})`, backgroundAttachment: 'fixed' }}>
                <div className="container">
                    <div className="contact-container">
                        <div className="contact-item">
                            <div className="card_wrapper">
                                <div className="heading">
                                    <h3 className='big_heading'>Any Questions?</h3>
                                    <p>Fill out this form and our expert will be in touch with you soon.</p>
                                </div>
                                <div className="content">
                                    <div className="">
                                        <p>Write to us:</p>
                                        <Link to="mailto:info@productivealliance.com"><span className="phones">info@productivealliance.com</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="card_wrapper">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={SignupSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ isSubmitting }) => ( // Destructure isSubmitting from Formik
                                        <Form className="card layer1">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="input_group">
                                                            <Field
                                                                className="input"
                                                                name="name"
                                                                type="text"
                                                                placeholder=""
                                                            />
                                                            <ErrorMessage name="name" component="div" className="error-message" />
                                                            <label htmlFor="">Your name</label>
                                                            <span className="highlight"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="input_group">
                                                            <Field
                                                                className="input"
                                                                name="contact_number"
                                                                type="text"
                                                                placeholder=""
                                                            />
                                                            <ErrorMessage name="contact_number" component="div" className="error-message" />
                                                            <label htmlFor="">Phone number</label>
                                                            <span className="highlight"></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input_group">
                                                            <Field
                                                                className="input"
                                                                name="email"
                                                                type="email"
                                                                placeholder=""
                                                            />
                                                            <ErrorMessage name="email" component="div" className="error-message" />
                                                            <label htmlFor="">Email address</label>
                                                            <span className="highlight"></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input_group">

                                                            <Field
                                                                as="textarea"
                                                                id="textareacontactpage"
                                                                className="input"
                                                                name="message"
                                                                rows="3"
                                                                cols="80"
                                                                placeholder="Type your message here"
                                                            />
                                                            <ErrorMessage name="message" component="div" className="error-message" />
                                                            <span className="highlight"></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input_group">
                                                            <button
                                                                style={{ width: "100%" }}
                                                                className="button"
                                                                type="submit"
                                                                name="button"
                                                                disabled={isSubmitting || loading} // Disable button while submitting or loading
                                                            >
                                                                {loading ? 'Loading...' : 'Send'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        <Faq />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
