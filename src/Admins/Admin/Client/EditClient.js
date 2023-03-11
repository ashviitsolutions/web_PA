import React, { useState } from 'react'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
const PreviewImage = ({ imagePreviewUrl }) => {
    return (
      <div style={{ width: "20vh", heigh: "10vh" }} className="previwimage">
        {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ height: '29vh' }} />}
      </div>
    );
  };
function EditClient() {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
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
            const res = await axios.post(`/service/add`, bodyFormData, {
                headers: {
                    //   Authorization: `${token}`
                    Authorization: token
                }
            });
            console.log(res);

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>

            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={onSubmit}

                        >

                            {({ errors, touched, setFieldValue, values }) => (

                                <Form>
                                    <div className="">
                                        <div className="headings float_wrapper">
                                            <div className="gutter pull-left" style={{ paddingLeft: "0" }}>
                                                <h3>Add Client</h3>
                                            </div>
                                            <span className="toggle_sidebar" ></span>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="gutter">
                                                <div className="card layer1">
                                                    <div className="inner">
                                                        <label className="card_label" htmlFor="">Personal InhtmlFormation</label>
                                                        <div className="input_group">
                                                            <Field
                                                                className="input"
                                                                name="title"
                                                                type="text"
                                                            />
                                                            <label htmlFor=''>Name</label>
                                                            {errors.title && touched.title ? (
                                                                <div>{errors.title}</div>
                                                            ) : null}
                                                            <span className="highlight"></span>
                                                        </div>

                                                        <div className="container-fluid">
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <div className="input_group">
                                                                        <Field
                                                                            className="input"
                                                                            name="Email"
                                                                            type="text"
                                                                        />
                                                                        <label htmlFor=''>Email</label>
                                                                        {errors.title && touched.title ? (
                                                                            <div>{errors.title}</div>
                                                                        ) : null}
                                                                        <span className="highlight"></span>
                                                                    </div>

                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="input_group">
                                                                        <Field
                                                                            className="input"
                                                                            name="Phone"
                                                                            type="text"
                                                                        />
                                                                        <label htmlFor=''>Phone</label>
                                                                        {errors.title && touched.title ? (
                                                                            <div>{errors.title}</div>
                                                                        ) : null}
                                                                        <span className="highlight"></span>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-4">
                                                                    <div className="input_group">
                                                                        <select name="" id="" className="input">
                                                                            <option value="">select gender</option>
                                                                            <option value="">male</option>
                                                                            <option value="">female</option>
                                                                        </select>
                                                                        <label htmlFor="">gender</label>
                                                                        <span className="highlight"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">

                                                                <label className="card_label" htmlFor="">City You would like to work in</label>

                                                                <div className="col-sm-6">

                                                                    <div className="input_group">
                                                                        <Field
                                                                            className="input"
                                                                            name="Email"
                                                                            type="text"
                                                                        />
                                                                        <label htmlFor=''>Zip Code</label>
                                                                        {errors.title && touched.title ? (
                                                                            <div>{errors.title}</div>
                                                                        ) : null}
                                                                        <span className="highlight"></span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                <div className="input_group">
                                                                <Field
                                                                    className="input"
                                                                    name="Email"
                                                                    type="text"
                                                                />
                                                                <label htmlFor=''>City</label>
                                                                {errors.title && touched.title ? (
                                                                    <div>{errors.title}</div>
                                                                ) : null}
                                                                <span className="highlight"></span>
                                                            </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <label className="card_label" htmlFor="">Profile Picture</label>

                                                        <div id="post_attachments" className="input_group float_wrapper">
                                                            <div className="attachment_wrapper">
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
                                                            <div className='preview' >
                                                            <PreviewImage imagePreviewUrl={imagePreviewUrl} />
                                
                                                          </div>
                                                        </div>
                                                        <div className="input_group">
                                                            <button className="button primary square lazy">Save Client</button>
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

export default EditClient