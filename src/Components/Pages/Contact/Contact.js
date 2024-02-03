import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { IP } from '../../../Constant';
import "./Contact.css"
import Faq from "../Home/Faq";

function Contact() {
    const postIds = ['64007afb61c43a17d60e95b4'];
    const [users, setUsers] = useState([]);
    const [img, setImg] = useState('');

    useEffect(() => {
        async function fetchData() {
            const responses = await Promise.all(
                postIds.map(async id => {
                    const res = await fetch(`${IP}/post/fetch/${id}`);
                    return res.json();

                })
            );
            setUsers(responses[0]);
            setImg(
                await Promise.all(
                    responses.flatMap(response => response.attachments).map(async image => {
                        const res = await fetch(`${IP}/file/${image}`);
                        const imageBlob = await res.blob();
                        return URL.createObjectURL(imageBlob);
                    })
                )
            );
        }
        fetchData();
    }, [])

    console.log("contact fform", users)

    const initialValues = {
        name: "",
        contact_number: "",
        email: "",
        message: "",
    };
    const SignupSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        excerpt: Yup.string().required("Required"),
        type: Yup.string().required("Required"),


    });
    const onSubmit = async (values, { setValues, resetForm }) => {
        console.log(values);
        try {
            const bodyFormData = new FormData();
            bodyFormData.append("title", values.name);
            bodyFormData.append("excerpt", values.contact_number);
            bodyFormData.append("type", values.email);
            bodyFormData.append("postImages", values.image);
            bodyFormData.append("description", values.message);
            const res = await axios.post("", bodyFormData);
            console.log(res);

        } catch (error) {
            console.error(error);
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
                                    <h3 className='big_heading'>Any  Questions ?</h3>
                                    <p>fill this form and our expert will be in touch with you soon.</p>
                                </div>
                                <div className="content">
                                    {/* <div className="">
                                        <p>you can call us on </p>
                                        <Link to="tel: 9876543210"><span className="phones">{users.title}</span></Link>
                                    </div> */}
                                    <div className="">
                                        <p>write to us on </p>
                                        <Link to="mailto:info@productivealliance.com"><span className="phones">{users.excerpt}</span></Link>
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

                                    {({ errors, touched, setFieldValue, values }) => (

                                        <Form className="card layer1" >

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
                                                            {errors.name && touched.name ? (
                                                                <div>{errors.name}</div>
                                                            ) : null}
                                                            <label for="">your name</label>
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
                                                            {errors.contact_number && touched.contact_number ? (
                                                                <div>{errors.contact_number}</div>
                                                            ) : null}
                                                            <label for="">your contact number</label>
                                                            <span className="highlight"></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
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
                                                            <label for="">your email</label>
                                                            <span className="highlight"></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input_group">
                                                            <label className="static" for="">your query</label>
                                                            <textarea id='textareacontactpage' className="input" name="message" rows="3" cols="80"></textarea>
                                                            <span className="highlight"></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="input_group">
                                                            <button style={{ width: "100%" }} className="button" type="submit" name="button">send</button>
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
    )
}

export default Contact