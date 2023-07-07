import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Formik, Form, Field, yupToFormErrors } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { IP } from '../../../Constant';
import { useNavigate } from 'react-router-dom';


const PreviewImage = ({ imagePreviewUrl }) => {
    return (
        <div style={{ width: "10vh", heigh: "5vh" }} className="previwimage">
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ height: '10vh', borderRadius: "20px" }} />}
        </div>
    );
};






function FormPage(props) {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [user, setuser] = useState({})
    const postIds = ['64007d3561c43a17d60e9662'];
    const [users, setUsers] = useState([]);
    const [img, setImg] = useState('');
    const [toggle, setToggle] = useState(false)
    const nav = useNavigate()

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

    console.log(users)
    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        image: "",
        zip: "",
        city: "",
        password: "",
        confirm_password: "",
        country:"",
        state:""
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
        try {
            const bodyFormData = new FormData();
            bodyFormData.append("email", values.email);
            bodyFormData.append("first_name", values.first_name);
            bodyFormData.append("city", values.city);
            bodyFormData.append("postal_code", values.zip);
            bodyFormData.append("state", values.state);
            bodyFormData.append("country", values.country);
            bodyFormData.append("confirm_password", values.confirm_password);
            bodyFormData.append("last_name", values.last_name);
            bodyFormData.append("phone", values.phone);
            bodyFormData.append("address", values.address);
            bodyFormData.append("password", values.password);
            bodyFormData.append("profile_pic", values.image);


            const res = await axios.post(`http://45.13.132.197:4000/api/provider/registration`, bodyFormData, {
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                // },
            });
            console.log(res);
            if (res.status === 200) {
                nav('/providers/login')
            }
        } catch (error) {
            setToggle(true)
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
            <div className="container" ref={props.servicesTabsRef}>
                <div className="row">
                    <div className="col-sm-6">

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validate}
                            onSubmit={onSubmit}
                        >

                            {({ errors, touched, setFieldValue, values }) => (

                                <Form className="card layer1"  onClick={()=>setToggle(false)}>


                                    <div id="member_form" className="member_form_wrap">
                                        <div className="heading">
                                            <h3 style={{ fontSize: "20px" }}>Join Our Team</h3>
                                            <p>Nationwide Wellness Platform</p>
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
                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <Field
                                                            className="input"
                                                            name="state"
                                                            type="text"
                                                            placeholder=""
                                                        />
                                                        {errors.state && touched.state ? (
                                                            <div>{errors.zip}</div>
                                                        ) : null}
                                                        <label htmlFor="">state</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>


                                                <div className="col-sm-6">
                                                    <div className="input_group">
                                                        <Field
                                                            className="input"
                                                            name="country"
                                                            type="text"
                                                            placeholder=""
                                                        />
                                                        {errors.country && touched.country ? (
                                                            <div>{errors.country}</div>
                                                        ) : null}
                                                        <label htmlFor="">Country</label>
                                                        <span className="highlight"></span>
                                                    </div>
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

                                            <div className="input_group">
                                                <input
                                                    name='image'
                                                    type="file"
                                                    onChange={(e) => {
                                                        let reader = new FileReader();
                                                        let file = e.target.files[0];

                                                        reader.onloadend = () => {
                                                            setImagePreviewUrl(reader.result);
                                                        };

                                                        reader.readAsDataURL(file);
                                                        setFieldValue('image', file)
                                                    }
                                                    }
                                                />

                                                {errors.image && touched.image ? (
                                                    <div>{errors.image}</div>
                                                ) : null}
                                                <span className="highlight"></span>
                                            </div>
                                            <div className='preview' >
                                                <PreviewImage imagePreviewUrl={imagePreviewUrl} />

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

                    <div className="col-sm-6">
                        <div className="gutter" >
                            <div className="member_form_wrap_bg" style={{ backgroundImage: `url(${img})` }}>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    toggle ? (
                        <div className='emailduplicate'>
                            <div className='textemail'>
                                <h6 >Email does not Exist</h6>
                            </div>
                        </div>
                    ) : null
                }

            </div>
        </>
    )
}

export default FormPage