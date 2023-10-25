import React, { useEffect, useRef, useState } from 'react'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import JoditEditor from 'jodit-react';
// import "./style.css"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IP } from '../../../Constant';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PreviewImage = ({ imagePreviewUrl }) => {
    return (
        <div style={{ width: "100%", heigh: "10vh", backgroundSize: "cover" }} className="previwimage">
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ height: '29vh' }} />}
        </div>
    );
};
function EditGift() {
    let params = useParams();
    let { id } = params;
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [user, setUser] = useState([])
    const [formValue, setFormValue] = useState(null)
    const [type, setType] = useState([])

    const [images, setImages] = useState([])
    const nav = useNavigate()
    const editor = useRef(null);
    const [img, setImg] = useState();

    console.log("img", type)
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const initialValues = {
        title: "",
        type: "",
        couponImage: "",
        description: "",
        amount_off: "",
        percent_off: "",
        is_active: ""
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
            bodyFormData.append("type", values.type);
            bodyFormData.append("is_active", values.is_active);
            bodyFormData.append("max_redemptions", "23");
            bodyFormData.append("amount_off", values.amount_off);
            bodyFormData.append("percent_off", values.percent_off);
            bodyFormData.append("expired_by", selectedDate);
            bodyFormData.append("couponImages", values.couponImage);
            bodyFormData.append("description", values.description);
            let token = localStorage.getItem("tokenadmin");
            if (!token) {
                throw new Error("Token not found in local storage");
            }
            console.log(token);
            let res = await axios.put(`${IP}/coupon/${id}/update`, bodyFormData, {
                headers: {
                    Authorization: token,
                    // 'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
            if (res.status === 200) {
                setValues({});
                resetForm("");
                nav("/admin/gift");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const config = {
        readonly: false,
        height: 400,

    }

    useEffect(() => {
        fetch(`${IP}/service/fetch/${id}`).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data)
            setUser(data)
            setImages(data.attachments)
            const updatedSavedValues = {
                title: data.title,
                excerpt: data.excerpt,
                category: data.category,
                image: data.image,
                description: data.description,
                price: data.price
            };
            setFormValue(updatedSavedValues);
        })
    }, [id])



    useEffect(() => {
        const fetchImage = async () => {
            const res = await fetch(`${IP}/file/${images}`);
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
        };
        fetchImage();
    }, [images]);




    useEffect(() => {
        fetch(`${IP}/service/market_place`).then((res) => {
            return res.json();
        }).then((data) => {
            setType(data)
            console.log("type", data)

        })
    }, [])




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
                                                            <div className='editor' style={{ marginTop: "4vh", height: "40vh" }}>
                                                                <Field name="description" as="texarea">
                                                                    <JoditEditor
                                                                        name="description"
                                                                        ref={editor}
                                                                        value={values.description}
                                                                        config={config}
                                                                        onBlur={(newContent) => {
                                                                            setFieldValue('description', newContent);
                                                                        }}
                                                                        onChange={(newContent) => {
                                                                            setFieldValue('description', newContent);
                                                                        }}
                                                                    />
                                                                </Field>

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


                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label class="card_label" htmlFor="">Select Marketplace</label>
                                                        <div className="input_group">
                                                            <Field name="type" as="select" className="input">
                                                                <option value="" >Select Status</option>

                                                                <option value="gift_card">gift_card </option>
                                                                <option value="coupon">coupon </option>

                                                            </Field>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label class="card_label" htmlFor="">Select Marketplace</label>
                                                        <div className="input_group">
                                                            <Field name="is_active" as="select" className="input">
                                                                <option value="" >Select Status</option>

                                                                <option value="true">true </option>
                                                                <option value="false">false </option>

                                                            </Field>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label htmlFor="" className="card_label">Attachments</label>
                                                        <input
                                                            name='couponImages'
                                                            type="file"
                                                            placeholder="couponImages"
                                                            onChange={(e) => {
                                                                let reader = new FileReader();
                                                                let file = e.target.files[0];

                                                                reader.onloadend = () => {
                                                                    setImagePreviewUrl(reader.result);
                                                                };

                                                                reader.readAsDataURL(file);
                                                                setFieldValue('couponImages', file)
                                                            }
                                                            }
                                                        />
                                                        {errors.couponImage && touched.couponImage ? (
                                                            <div>{errors.couponImage}</div>
                                                        ) : null}



                                                    </div>
                                                    <div className='preview' >
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
        </>
    )
}

export default EditGift