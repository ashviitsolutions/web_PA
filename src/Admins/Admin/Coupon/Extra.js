
import React, { useRef, useState, useEffect } from 'react'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import JoditEditor from 'jodit-react';
// import "./style.css"
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';


const PreviewImage = ({ imagePreviewUrl }) => {
    return (
        <div style={{ width: "20vh", heigh: "10vh" }} className="previwimage">
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ height: '29vh' }} />}
        </div>
    );
};
function EditCoupon() {
    let params = useParams();
    let { id } = params;
    const nav = useNavigate()
    const editor = useRef(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [type, setType] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    console.log(type)

    const initialValues = {
        title: "",
        type: "",
        couponImages: "",
        description: "",
        amount_off: "",
        percent_off: "",
        is_active: "",
        coupon_code: "",
        max_redemptions: ""
    };
    const SignupSchema = Yup.object().shape({
        // title: Yup.string().required("Required"),
        // excerpt: Yup.string().required("Required"),
        // type: Yup.string().required("Required"),
        // amount_off: Yup.number(),
        // percent_off: Yup.number(),


    });

    const validate = (values) => {
        const errors = {};

        // Check if both fields are filled
        if (values.amount_off && values.percent_off) {
            errors.amount_off = 'Please fill in only one of the fields';
            errors.percent_off = 'Please fill in only one of the fields';
        }

        return errors;
    };


    const [showPercentOff, setShowPercentOff] = useState('');
    const [showAmountOff, setShowAmountOff] = useState("");
    const [user, setUser] = useState([])
    const [images, setImages] = useState([])
    const [formValue, setFormValue] = useState(null)













    // In onSubmit function
    const onSubmit = async (values, { setValues, resetForm }) => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.append("title", values.title);
            bodyFormData.append("type", "coupon");
            bodyFormData.append("is_active", values.is_active);
            bodyFormData.append("max_redemptions", values.max_redemptions);
            bodyFormData.append("amount_off", showAmountOff);
            bodyFormData.append("percent_off", showPercentOff);
            bodyFormData.append("coupon_code", values.coupon_code);
            bodyFormData.append("expired_by", selectedDate);
            bodyFormData.append("couponImages", values.couponImages);
            bodyFormData.append("description", values.description);
            let token = localStorage.getItem("tokenadmin");

            // Don't set amount_off and percent_off based on showAmountOff and showPercentOff here

            // Send request to update endpoint
            const res = await axios.put(`http://localhost:5000/api/coupon/update/${id}`, bodyFormData, {
                headers: {
                    Authorization: token
                }
            });

            if (res.status === 200) {
                setValues({});
                resetForm();

                // Show success notification and navigate to '/admin/Gift'
                toast.success("Coupon card created successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        nav("/admin/coupon");
                    },
                });
            } else {
                // Show error notification if the API response is not successful
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }

            // Handle response accordingly
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };



    useEffect(() => {
        fetch(`http://localhost:5000/api/coupon/fetch/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setImages(data.attachments);
                // Check the structure of data to ensure correct property names are used

                console.log("data: data", data);
                // Assuming the data structure matches the expected initialValues structure
                const updatedSavedValues = {
                    title: data.title,
                    type: data.type, // Is this correct? Shouldn't it be data.type?
                    attachments: data.attachments,
                    description: data.description,
                    amount_off: data.amount_off,
                    percent_off: data.percent_off,
                    is_active: data.is_active,
                    coupon_code: data.coupon_code,
                    max_redemptions: data.max_redemptions,
                };
                console.log("Fetched Data: percent_off", updatedSavedValues);
                setFormValue(updatedSavedValues);
                // console.log("Form Value:", updatedSavedValues);
            })
            .catch((error) => console.error("Fetch Error:", error));
    }, [id]);

    console.log("Fetched Data: percent_off formValue", formValue);











    return (
        <>

            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <Formik
                            initialValues={formValue || initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={onSubmit}
                            validate={validate}
                            enableReinitialize

                        >

                            {({ errors, touched, setFieldValue, values }) => (

                                <Form>
                                    <div className="">
                                        <div className="headings float_wrapper">
                                            <div className="gutter pull-left" >
                                                <h3>Edit Coupon  Card</h3>
                                            </div>
                                            <span className="toggle_sidebar" ></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <div className="gutter">
                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label className="card_label" htmlFor="">General InhtmlFormation</label>
                                                        <div className="input_group">
                                                            <Field
                                                                className="input"
                                                                name="title"
                                                                type="text"
                                                                placeholder="Title"
                                                            />
                                                            {errors.title && touched.title ? (
                                                                <div>{errors.title}</div>
                                                            ) : null}
                                                            <span className="highlight"></span>
                                                        </div>

                                                        <div className="input_group">
                                                            <label htmlFor="" className="static">Description</label>
                                                            <div className='editor' style={{ marginTop: "4vh" }}>

                                                                <Field
                                                                    className="input"
                                                                    name="description"
                                                                    type="text"
                                                                // placeholder="Description"
                                                                />
                                                                {errors.description && touched.description ? (
                                                                    <div>{errors.description}</div>
                                                                ) : null}

                                                                <span class="highlight"></span>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="input_group" style={{ marginTop: "3rem" }}>
                                                <Field
                                                    className="input"
                                                    name="coupon_code"
                                                    type="text"
                                                />
                                                {errors.coupon_code && touched.coupon_code ? (
                                                    <div>{errors.coupon_code}</div>
                                                ) : null}
                                                <label htmlFor="">Coupon code</label>
                                                <span class="highlight"></span>
                                            </div>


                                            <div className="content mt-3">
                                                {!showAmountOff && (
                                                    <div className="input_group" style={{ marginTop: '3rem' }}>
                                                        <input
                                                            className="input"
                                                            name="percent_off"
                                                            type="number"
                                                            onChange={(e) => setShowPercentOff(e.target.value)}
                                                        />
                                                        <label htmlFor="">% off</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                )}

                                                {!showPercentOff && (
                                                    <div className="input_group" style={{ marginTop: '3rem' }}>
                                                        <input
                                                            className="input"
                                                            name="amount_off"
                                                            type="number"
                                                            onChange={(e) => setShowAmountOff(e.target.value)}
                                                        />
                                                        <label htmlFor="">Amount off</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                )}
                                            </div>


                                        </div>





                                        <div className="col-sm-4">
                                            <div className="gutter">


                                                <div class="input_group" style={{ marginTop: "3rem" }}>
                                                    <Field
                                                        className="input"
                                                        name="max_redemptions"
                                                        type="number"
                                                    />
                                                    {errors.max_redemptions && touched.max_redemptions ? (
                                                        <div>{errors.max_redemptions}</div>
                                                    ) : null}
                                                    <label htmlFor="">Max redemptions</label>
                                                    <span class="highlight"></span>
                                                </div>



                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label class="card_label" htmlFor="">Select Marketplace</label>
                                                        <div className="input_group">
                                                            <Field name="is_active" as="select" className="input">
                                                                <option value="" >Select Status</option>

                                                                <option value="true">Active </option>
                                                                <option value="false">Inactive </option>

                                                            </Field>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label className="card_label" htmlFor="couponImages">Attachments</label>
                                                        <input
                                                            name="couponImages"
                                                            type="file"
                                                            placeholder="Excerpt"
                                                            onChange={(e) => {
                                                                let reader = new FileReader();
                                                                let file = e.target.files[0];

                                                                reader.onloadend = () => {
                                                                    setImagePreviewUrl(reader.result);
                                                                };

                                                                reader.readAsDataURL(file);
                                                                setFieldValue('couponImages', file); // Change this line to setFieldValue('couponImage', file)
                                                            }}
                                                        />
                                                        {errors.couponImages && touched.couponImages ? (
                                                            <div>{errors.couponImages}</div>
                                                        ) : null}
                                                    </div>
                                                    <div className="preview">
                                                        <PreviewImage imagePreviewUrl={imagePreviewUrl} />
                                                    </div>
                                                </div>


                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label className="card_label" htmlFor="">Select Expiry Date and Time</label>
                                                        <div className="input_group">
                                                            <DatePicker
                                                                inline
                                                                selected={selectedDate}
                                                                onChange={handleDateChange}
                                                                showTimeSelect
                                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                            />

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card layer1">
                                                    <div className="inner" id=''>
                                                        <label className="card_label" htmlFor="">Post Actions</label>
                                                        <div className="input_group">
                                                            <button id="publish_btn"
                                                                className="primary square button" type="submit"
                                                                name="button">publish</button>
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
    )
}

export default EditCoupon 