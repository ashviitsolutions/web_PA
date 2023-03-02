import React,{useState , useEffect} from 'react'
// import { Link } from 'react-router-dom'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';

function FormPage() {
    const postIds = ['64007d3561c43a17d60e9662'];
    const [users, setUsers] = useState([]);
  const [img, setImg] = useState('');
  
  useEffect(() => {
      async function fetchData() {
        const responses = await Promise.all(
          postIds.map(async id => {
            const res = await fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
            return res.json();
            
          })
        );
        setUsers(responses[0]);
        setImg(
          await Promise.all(
            responses.flatMap(response => response.attachments).map(async image => {
              const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
              const imageBlob = await res.blob();
              return URL.createObjectURL(imageBlob);
            })
          )
        );
      }
      fetchData();
    }, [])
  
    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        zip_code: "",
        city: "",
        Gender: "",
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
            bodyFormData.append("first_name", values.first_name);
            bodyFormData.append("last_name", values.last_name);
            bodyFormData.append("email", values.email);
            bodyFormData.append("phone", values.phone);
            bodyFormData.append("address", values.address);
            bodyFormData.append("last_name", values.zip_code);
            bodyFormData.append("email", values.city);
            bodyFormData.append("phone", values.Gender);
            const res = await axios.post("http://45.13.132.197:4000/api/provider/registration", bodyFormData);
            console.log(res);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">


                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={onSubmit}
                        >

                            {({ errors, touched, setFieldValue, values }) => (

                                <Form className="card layer1" >


                                    <div id="member_form" className="member_form_wrap">
                                        <div className="heading">
                                            <h3 style={{ fontSize: "20px" }}>Membership form</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                        </div>


                                        <form className="member_form" >
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
                                                            {errors.first_name && touched.first_name ? (
                                                                <div>{errors.first_name}</div>
                                                            ) : null}
                                                            <label for="">first name</label>
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
                                                            <label for="">last name</label>
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
                                                        <label for="">email</label>
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
                                                        <label for="">phone</label>
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
                                                        <label for="">address</label>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="input_group">
                                                            <Field
                                                                className="input"
                                                                name="zip_code"
                                                                type="text"
                                                                placeholder=""
                                                            />
                                                            {errors.zip_code && touched.zip_code ? (
                                                                <div>{errors.zip_code}</div>
                                                            ) : null}
                                                            <label for="">zip code</label>
                                                            <span className="highlight"></span>
                                                        </div>
                                                    </div>


                                                    <div className="col-sm-6">
                                                        <div className="input_group">
                                                            <Field name="city" as="select" className="input" >
                                                                <option value="">City you'd like to work in</option>
                                                                <option value="Gender">city a</option>
                                                                <option value="male">city b</option>
                                                                <option value="female">city c</option>
                                                            </Field>
                                                            <span className="highlight"></span>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="row">
                                                    <div className="input_group">
                                                        <Field name="Gender" as="select" className="input" >
                                                            <option value="">Select Type</option>
                                                            <option value="Gender">Gender</option>
                                                            <option value="male">male</option>
                                                            <option value="female">female</option>
                                                            <option value="other">other</option>
                                                            <option value="Corporate Events">Corporate Events</option>
                                                            <option value="Private Events">Private Events</option>
                                                            <option value="Massage On Demand">Massage On Demand</option>
                                                            <option value="Policies">Policies</option>
                                                            <option value="Become a Member">Become a Member</option>
                                                        </Field>
                                                        <span className="highlight"></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <button className="button lazy" type="button" name="button">submit</button>
                                                </div>
                                            </div>
                                        </form>


                                    </div>



                                </Form>
                            )}

                        </Formik>
                    </div>

                    <div className="col-sm-6">
                        <div className="gutter" style={{ backgroundImage: `url(${img})` }}>
                            <div className="member_form_wrap_bg" style={{ backgroundImage: `url(${img})` }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormPage