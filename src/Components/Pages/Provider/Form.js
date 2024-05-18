import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { IP } from '../../../Constant';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imagepath from '../../assets/img/43547063_s.jpg';
import openEye from '../../assets/img/iconoir_eye.png';
import closeEye from '../../assets/img/codicon_eye-closed.png';

const PreviewImage = ({ imagePreviewUrl }) => {
    return (
        <div style={{ width: '10vh', height: '10vh' }} className="previwimage">
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ height: '10vh', borderRadius: '20px' }} />}
        </div>
    );
};

function FormPage(props) {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [user, setUser] = useState({});
    const postIds = ['64007d3561c43a17d60e9662'];
    const [users, setUsers] = useState([]);
    const [img, setImg] = useState('');
    const [toggle, setToggle] = useState(false);
    const nav = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        async function fetchData() {
            const responses = await Promise.all(
                postIds.map(async (id) => {
                    const res = await fetch(`${IP}/post/fetch/${id}`);
                    return res.json();
                })
            );
            setUsers(responses[0]);
            setImg(
                await Promise.all(
                    responses.flatMap((response) => response.attachments).map(async (image) => {
                        const res = await fetch(`${IP}/file/${image}`);
                        const imageBlob = await res.blob();
                        return URL.createObjectURL(imageBlob);
                    })
                )
            );
        }
        fetchData();
    }, []);

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        profile_pic: '',
        zip: '',
        city: '',
        password: '',
        confirm_password: '',
        country: '',
        state: '',
    };

    const validate = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email address').required('Email is required'),
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        phone: Yup.number().required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        password: Yup.string()
            .required('Please enter your password')
            .min(8, 'At least an 8-character password is required')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Must Contain 8 Characters, One Uppercase, Lowercase, Number and one special case Character '),
        confirm_password: Yup.string().required('required confirm password').oneOf([Yup.ref('password'), ''], 'password does not match'),
    });

    const onSubmit = async (values, { setValues, resetForm }) => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.append('email', values.email);
            bodyFormData.append('first_name', values.first_name);
            bodyFormData.append('city', values.city);
            bodyFormData.append('postal_code', values.zip);
            bodyFormData.append('state', values.state);
            bodyFormData.append('country', values.country);
            bodyFormData.append('confirm_password', values.confirm_password);
            bodyFormData.append('last_name', values.last_name);
            bodyFormData.append('phone', values.phone);
            bodyFormData.append('address', values.address);
            bodyFormData.append('password', values.password);
            bodyFormData.append('profile_pic', values.profile_pic);

            const res = await axios.post(`${IP}/provider/registration`, bodyFormData, {
                headers: {
                    Accept: 'application/json',
                },
            });
            console.log(res);

            if (res.status === 200) {
                toast.success('Your Registration successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    onClose: () => {
                        nav('/providers/login');
                    },
                });
            } else {
                toast.error('An error occurred. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    useEffect(() => {
        fetch(`${IP}/terms/fetch`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
            })
            .catch((error) => { });
    }, []);

    return (
        <>
            <div className="container" ref={props.servicesTabsRef} id="provideregister">
                <div className="contact-container">
                    <div className="contact-item">
                        <Formik initialValues={initialValues} validationSchema={validate} onSubmit={onSubmit}>
                            {({ errors, touched, setFieldValue, values }) => (
                                <Form onClick={() => setToggle(false)}>
                                    <div>
                                        <div className="heading">
                                            <h3 style={{ fontSize: '20px' }}>Join Our Team</h3>
                                            <p>Nationwide Wellness Platform</p>
                                        </div>

                                        <div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <Field className="input" name="first_name" type="text" placeholder="" />
                                                        <label htmlFor="">First name</label>
                                                        {errors.first_name && touched.first_name ? <div>{errors.first_name}</div> : null}
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <Field className="input" name="last_name" type="text" placeholder="" />
                                                        {errors.last_name && touched.last_name ? <div>{errors.last_name}</div> : null}
                                                        <label htmlFor="">Last name</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input_group">
                                                    <Field className="input" name="email" type="text" placeholder="" />
                                                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                                    <label htmlFor="">Email</label>
                                                    <span className="highlight"></span>
                                                </div>
                                                <div className="input_group">
                                                    <Field className="input" name="phone" type="text" placeholder="" />
                                                    {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
                                                    <label htmlFor="">Phone</label>
                                                    <span className="highlight"></span>
                                                </div>

                                                <div className="input_group">
                                                    <Field className="input" name="address" type="text" placeholder="" />
                                                    {errors.address && touched.address ? <div>{errors.address}</div> : null}
                                                    <label htmlFor="">Address</label>
                                                    <span className="highlight"></span>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <Field className="input" name="zip" type="text" placeholder="" />
                                                        {errors.zip && touched.zip ? <div>{errors.zip}</div> : null}
                                                        <label htmlFor="">Zip code</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <Field className="input" name="city" type="text" placeholder="" />
                                                        {errors.city && touched.city ? <div>{errors.city}</div> : null}
                                                        <label htmlFor="">City</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <Field className="input" name="state" type="text" placeholder="" />
                                                        {errors.state && touched.state ? <div>{errors.state}</div> : null}
                                                        <label htmlFor="">State</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <Field className="input" name="country" type="text" placeholder="" />
                                                        {errors.country && touched.country ? <div>{errors.country}</div> : null}
                                                        <label htmlFor="">Country</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="input_group">
                                                        <Field className="input" name="password" type={showPassword ? 'text' : 'password'} placeholder="" />
                                                        {errors.password && touched.password ? <div>{errors.password}</div> : null}
                                                        <label htmlFor="">Create password</label>
                                                        <button className="eye_button" type="button" onClick={handleTogglePassword}>
                                                            {showPassword ? <img src={closeEye} alt="" /> : <img src={openEye} alt="" />}
                                                        </button>
                                                        <span className="highlight"></span>
                                                    </div>

                                                    <div className="input_group">
                                                        <Field className="input" name="confirm_password" type={showPassword ? 'text' : 'password'} placeholder="" />
                                                        {errors.confirm_password && touched.confirm_password ? <div>{errors.confirm_password}</div> : null}
                                                        <label htmlFor="">Confirm Password</label>
                                                        <button className="eye_button" type="button" onClick={handleTogglePassword}>
                                                            {showPassword ? <img src={closeEye} alt="" /> : <img src={openEye} alt="" />}
                                                        </button>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="input_group">
                                                <input
                                                    name="profile_pic"
                                                    type="file"
                                                    onChange={(e) => {
                                                        let reader = new FileReader();
                                                        let file = e.target.files[0];

                                                        reader.onloadend = () => {
                                                            setImagePreviewUrl(reader.result);
                                                        };

                                                        reader.readAsDataURL(file);
                                                        setFieldValue('profile_pic', file);
                                                    }}
                                                />

                                                {errors.profile_pic && touched.profile_pic ? <div>{errors.profile_pic}</div> : null}
                                                <span className="highlight"></span>
                                            </div>
                                            <div className="preview">
                                                <PreviewImage imagePreviewUrl={imagePreviewUrl} />
                                            </div>

                                            <div className="faqbutton">
                                                <button className="button lazy" type="submit" style={{ maxWidth: '150px' }}>
                                                    submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    <div className="contact-item">
                        <div className="gutter">
                            <div className="member_form_wrap_bg" style={{ backgroundImage: `url(${imagepath})` }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default FormPage;
