import React, { useEffect, useRef, useState } from 'react'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import JoditEditor from 'jodit-react';
// import "./style.css"
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { IP } from '../../../Constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PreviewImage = ({ imagePreviewUrl }) => {
    return (
        <div style={{ width: "100%", heigh: "10vh", backgroundSize: "cover" }} className="previwimage">
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ height: '29vh' }} />}
        </div>
    );
};
function Editpost() {
    let params = useParams();
    let { id } = params;
    const location = useLocation();
    const cur = location.state?.cur;
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [initialImage, setInitialImage] = useState(null);

    const [user, setUser] = useState([])
    const [formValue, setFormValue] = useState(null)
    const [type, setType] = useState([])

    const [images, setImages] = useState([])
    const nav = useNavigate()
    const editor = useRef(null);
    const [img, setImg] = useState();

    console.log("img", type)

    const initialValues = {
        title: "",
        excerpt: "",
        category: "",
        image: "",
        description: "",
        price: ""
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
            bodyFormData.append("excerpt", values.excerpt);
            bodyFormData.append("category", values.category);
            bodyFormData.append("price", values.price);
            bodyFormData.append("postImages", values.image);
            bodyFormData.append("description", values.description);
            let token = localStorage.getItem("tokenadmin");
            if (!token) {
                throw new Error("Token not found in local storage");
            }
            console.log(token);
            let res = await axios.put(`${IP}/service/${id}/update`, bodyFormData, {
                headers: {
                    Authorization: token,
                    // 'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
            if (res.status === 200) {
                setValues({});
                resetForm();

                // Show success notification and navigate to '/admin/Gift'
                toast.success("Your Services Upload successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        nav("/admin/services");
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
        if (cur) {
            setFormValue({
                title: cur?.title,
                excerpt: cur?.excerpt,
                category: cur?.category,
                image: cur?.image,
                description: cur?.description,
                price: cur?.price
            });
            setInitialImage(cur?.attachments);
        }
    }, [cur]);

    useEffect(() => {
        const fetchImage = async () => {
            if (initialImage) {
                const res = await fetch(`${IP}/file/${initialImage}`);
                const imageBlob = await res.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImagePreviewUrl(imageObjectURL);
            }
        };
        fetchImage();
    }, [initialImage]);





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

                            {({ errors, touched, setFieldValue }) => (

                                <Form>
                                    <div className="">
                                        <div className="headings float_wrapper">
                                            <div className="gutter pull-left" >
                                                <h3><span className='cursor title backarrow' onClick={() => nav(-1)}>&larr;</span>Edit Service</h3>
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
                                                                placeholder=" New Update Title"

                                                            />

                                                            {errors.title && touched.title ? (
                                                                <div>{errors.title}</div>
                                                            ) : null}
                                                            <span className="highlight"></span>
                                                        </div>
                                                        <div className="input_group">
                                                            <div className="input_group">
                                                                <Field

                                                                    className="input"
                                                                    name="excerpt"
                                                                    type="text"
                                                                    placeholder=" New Update  Excerpt"
                                                                />

                                                                {errors.excerpt && touched.excerpt ? (
                                                                    <div>{errors.excerpt}</div>
                                                                ) : null}
                                                                <span className="highlight"></span>
                                                            </div>
                                                        </div>
                                                        <div className="input_group">
                                                            <label htmlFor="" className="static">Description</label>
                                                            <div className='editor' style={{ marginTop: "4vh", height: "40vh" }}>
                                                                <Field name="description" as="texarea">
                                                                    <JoditEditor
                                                                        name="description"
                                                                        ref={editor}
                                                                        value={user.description}
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
                                                <div class="input_group" style={{ marginTop: "3rem" }}>
                                                    <Field
                                                        className="input"
                                                        name="price"
                                                        type="number"
                                                    />
                                                    {errors.price && touched.price ? (
                                                        <div>{errors.price}</div>
                                                    ) : null}
                                                    <label htmlFor="">price in USD</label>
                                                    <span class="highlight"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="gutter">
                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label className="card_label" htmlFor="">Post Actions</label>
                                                        <div className="input_group">
                                                            <button id="publish_btn"
                                                                className="primary square button" type="submit"
                                                                name="button">publish</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label className="card_label" htmlFor="">Select Type</label>
                                                        <div className="input_group">
                                                            <Field name="category" as="select" className="input">
                                                                <option value="">Select Type</option>
                                                                {type.map((cur) => (
                                                                    <option key={cur._id} value={cur._id}>
                                                                        {cur}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label htmlFor="" className="card_label">Attachments</label>
                                                        <input
                                                            name='image'
                                                            type="file"
                                                            placeholder="Excerpt"
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

                                                    </div>
                                                    <div className='preview' style={{ width: "100%" }}>
                                                        <PreviewImage imagePreviewUrl={imagePreviewUrl || img} />

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

export default Editpost