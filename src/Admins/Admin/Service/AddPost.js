
import React, { useRef, useState, useEffect } from 'react'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import JoditEditor from 'jodit-react';
// import "./style.css"
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';

const PreviewImage = ({ imagePreviewUrl }) => {
  return (
    <div style={{ width: "20vh", heigh: "10vh" }} className="previwimage">
      {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ height: '29vh' }} />}
    </div>
  );
};
function Addpost() {
  const nav = useNavigate()
  const editor = useRef(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [type, setType] = useState([])
  console.log(type)

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
      const res = await axios.post(`${IP}/service/add`, bodyFormData, {
        headers: {
          //   Authorization: `${token}`
          Authorization: token
        }
      });
      console.log(res);
      if (res.status === 200) {
        setValues({});
        resetForm();
        nav("/admin/services");
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
    fetch(`${IP}/service/market_place`).then((res) => {
      return res.json();
    }).then((data) => {
      setType(data)
      console.log("data type", data)

    })
  }, [])








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
                      <div className="gutter pull-left" >
                        <h3>Add Service</h3>
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
                              <div className="input_group">
                                <Field
                                  className="input"
                                  name="excerpt"
                                  type="text"
                                  placeholder="Excerpt"
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
                            <label class="card_label" for="">Select Marketplace</label>
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
                          <div className='preview' >
                            <PreviewImage imagePreviewUrl={imagePreviewUrl} />

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

export default Addpost