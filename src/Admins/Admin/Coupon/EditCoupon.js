import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const PreviewImage = ({ imagePreviewUrl }) => {
    return (
        <div style={{ width: "20vh", height: "10vh" }} className="previwimage">
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ height: '29vh' }} />}
        </div>
    );
};

function EditCoupon() {
    let params = useParams();
    let { id } = params;
    const nav = useNavigate();
    const editor = useRef(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [img, setImg] = useState();
    const [formValue, setFormValue] = useState(null);
    const [showPercentOff, setShowPercentOff] = useState(true);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

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
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        coupon_code: Yup.string().required("Required"),
        max_redemptions: Yup.number().required("Required")
    });

    const validate = (values) => {
        const errors = {};

        if (values.amount_off && values.percent_off) {
            errors.amount_off = 'Please fill in only one of the fields';
            errors.percent_off = 'Please fill in only one of the fields';
        }

        return errors;
    };

    const onSubmit = async (values, { setValues, resetForm }) => {
        try {
            const bodyFormData = new FormData();
            bodyFormData.append("title", values.title);
            bodyFormData.append("type", "coupon");
            bodyFormData.append("is_active", values.is_active);
            bodyFormData.append("max_redemptions", values.max_redemptions);
            bodyFormData.append("amount_off", values.amount_off || "");
            bodyFormData.append("percent_off", values.percent_off || "");
            bodyFormData.append("coupon_code", values.coupon_code);
            bodyFormData.append("expired_by", selectedDate);
            bodyFormData.append("couponImages", values.couponImages);
            bodyFormData.append("description", values.description);
            let token = localStorage.getItem("tokenadmin");

            const res = await axios.put(`${IP}/coupon/update/${id}`, bodyFormData, {
                headers: {
                    Authorization: token
                }
            });

            if (res.status === 200) {
                setValues({});
                resetForm();
                toast.success("Coupon card updated successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        nav("/admin/coupon");
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
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/coupon/fetch/${id}`);
                const data = await res.json();
                const updatedSavedValues = {
                    title: data.title,
                    type: data.type,
                    couponImages: data.attachments,
                    description: data.description,
                    amount_off: data.amount_off,
                    coupon_code: data.coupon_code,
                    percent_off: data.percent_off,
                    is_active: data.is_active,
                    max_redemptions: data.max_redemptions,
                };
                setFormValue(updatedSavedValues);
                // setSelectedDate(new Date(data.expired_by));
                setShowPercentOff(!!data.percent_off);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchImage = async () => {
            if (formValue && formValue.couponImages) {
                const res = await fetch(`${IP}/file/${formValue.couponImages}`);
                const imageBlob = await res.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImg(imageObjectURL);
            }
        };
        fetchImage();
    }, [formValue]);

    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <Formik
                            initialValues={formValue || initialValues}
                            validationSchema={SignupSchema}
                            validate={validate}
                            onSubmit={onSubmit}
                            enableReinitialize
                        >
                            {({ errors, touched, setFieldValue, values }) => (
                                <Form>
                                    <div className="">
                                        <div className="headings float_wrapper">
                                            <div className="gutter pull-left">
                                                <h3>Edit Coupon Card</h3>
                                            </div>
                                            <span className="toggle_sidebar"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <div className="gutter">
                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label className="card_label" htmlFor="">General Information</label>
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
                                                            <Field
                                                                className="input"
                                                                name="description"
                                                                type="text"
                                                            />
                                                            {errors.description && touched.description ? (
                                                                <div>{errors.description}</div>
                                                            ) : null}
                                                            <span className="highlight"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input_group" style={{ marginTop: "3rem" }}>
                                                <Field
                                                    className="input"
                                                    name="coupon_code"
                                                    type="text"
                                                />
                                                {errors.coupon_code && touched.coupon_code ? (
                                                    <div>{errors.coupon_code}</div>
                                                ) : null}
                                                <label htmlFor="">Coupon code</label>
                                                <span className="highlight"></span>
                                            </div>
                                            <div className="content mt-3">
                                                {showPercentOff ? (
                                                    <div className="input_group" style={{ marginTop: '3rem' }}>
                                                        <input
                                                            className="input"
                                                            name="percent_off"
                                                            type="number"
                                                            value={values.percent_off}
                                                            onChange={(e) => {
                                                                setFieldValue('percent_off', e.target.value);
                                                                setFieldValue('amount_off', '');
                                                                setShowPercentOff(true);
                                                            }}
                                                        />
                                                        <label htmlFor="">% off</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                ) : (
                                                    <div className="input_group" style={{ marginTop: '3rem' }}>
                                                        <input
                                                            className="input"
                                                            name="amount_off"
                                                            type="number"
                                                            value={values.amount_off}
                                                            onChange={(e) => {
                                                                setFieldValue('amount_off', e.target.value);
                                                                setFieldValue('percent_off', '');
                                                                setShowPercentOff(false);
                                                            }}
                                                        />
                                                        <label htmlFor="">Amount off</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="gutter">
                                                <div className="input_group" style={{ marginTop: "3rem" }}>
                                                    <Field
                                                        className="input"
                                                        name="max_redemptions"
                                                        type="number"
                                                    />
                                                    {errors.max_redemptions && touched.max_redemptions ? (
                                                        <div>{errors.max_redemptions}</div>
                                                    ) : null}
                                                    <label htmlFor="">Max redemptions</label>
                                                    <span className="highlight"></span>
                                                </div>
                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label className="card_label" htmlFor="">Select Status</label>
                                                        <div className="input_group">
                                                            <Field name="is_active" as="select" className="input">
                                                                <option value="" >Select Status</option>
                                                                <option value="true">Active</option>
                                                                <option value="false">Inactive</option>
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
                                                            onChange={(e) => {
                                                                let reader = new FileReader();
                                                                let file = e.target.files[0];
                                                                reader.onloadend = () => {
                                                                    setImagePreviewUrl(reader.result);
                                                                };
                                                                reader.readAsDataURL(file);
                                                                setFieldValue('couponImages', file);
                                                            }}
                                                        />
                                                        {errors.couponImages && touched.couponImages ? (
                                                            <div>{errors.couponImages}</div>
                                                        ) : null}
                                                    </div>
                                                    <div className='preview' style={{ width: "100%" }}>
                                                        <PreviewImage imagePreviewUrl={imagePreviewUrl || img} />
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
                                                                name="button">Publish</button>
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

export default EditCoupon;
