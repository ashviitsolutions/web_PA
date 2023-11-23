
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
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PreviewImage = ({ imagePreviewUrl }) => {
    return (
        <div style={{ width: "20vh", heigh: "10vh" }} className="previwimage">
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ height: '29vh' }} />}
        </div>
    );
};
function EditGift() {
    let { id } = useParams();
    const nav = useNavigate()

    const [user, setUser] = useState([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [type, setType] = useState([])
    const [formValue, setFormValue] = useState(null)
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
        max_redemptions: ""
    };
    const SignupSchema = Yup.object().shape({
        // title: Yup.string().required("Required"),
        // excerpt: Yup.string().required("Required"),
        // type: Yup.string().required("Required"),


    });
    const onSubmit = async (values, { setValues, resetForm }) => {
        console.log(values);
        try {
            const bodyFormData = new FormData();
            bodyFormData.append("title", values.title);
            bodyFormData.append("type", "gift_card");
            bodyFormData.append("is_active", values.is_active);
            bodyFormData.append("max_redemptions", values.max_redemptions);
            bodyFormData.append("amount_off", values.amount_off);
            bodyFormData.append("percent_off", values.percent_off);
            bodyFormData.append("expired_by", selectedDate);
            bodyFormData.append("couponImages", values.couponImages);
            bodyFormData.append("description", values.description);
            let token = localStorage.getItem("tokenadmin");
            if (!token) {
                throw new Error("Token not found in local storage");
            }
            console.log(token);
            const res = await axios.put(`${IP}/coupon/update/${id}`, bodyFormData, {
                headers: {
                    //   Authorization: `${token}`
                    Authorization: token
                }
            });
            console.log(res);

            if (res.status === 200) {
                setValues({});
                resetForm();

                // Show success notification and navigate to '/admin/Gift'
                toast.success("Gift card created successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        nav("/admin/Gift");
                    },
                });
            } else {
                // Show error notification if the API response is not successful
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
                setUser(data);
                const updatedSavedValues = {
                    title: data.title,
                    type: data.type,
                    couponImages: data.attachments,
                    description: data.description,

                    amount_off: data.offerValue,
                    percent_off: data.percent_off,

                    is_active: data.is_active,
                    max_redemptions: data.max_redemptions,


                };
                setFormValue(updatedSavedValues);
                console.log("edite data", data)

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);






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

                            {({ errors, touched, setFieldValue, values }) => (

                                <Form>
                                    <div className="">
                                        <div className="headings float_wrapper">
                                            <div className="gutter pull-left" >
                                                <h3>Edit Gift Card</h3>
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
                                                    name="amount_off"
                                                    type="number"
                                                />
                                                {errors.amount_off && touched.amount_off ? (
                                                    <div>{errors.amount_off}</div>
                                                ) : null}
                                                <label htmlFor="">Price</label>
                                                <span class="highlight"></span>
                                            </div>


                                            <div class="input_group" style={{ marginTop: "3rem" }}>
                                                <Field
                                                    className="input"
                                                    name="percent_off"
                                                    type="number"
                                                />
                                                {errors.percent_off && touched.percent_off ? (
                                                    <div>{errors.percent_off}</div>
                                                ) : null}
                                                <label htmlFor="">Value in USD</label>
                                                <span class="highlight"></span>
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
                                                        <label className="card_label" htmlFor="">Select Date and Time</label>
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

export default EditGift