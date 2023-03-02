// import React from 'react'
// import { Link } from 'react-router-dom'
// import "./Sinup.css"
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import axios from 'axios';

// function Sinup() {
//     const initialValues = {

//         name: "",
//         email: "",
//         password: "",
//         Confirm_Password: "",

//     };
//     const SignupSchema = Yup.object().shape({
//         password: Yup.string()
//             .required("required"),
//         // .min(6, "atlist 8 character password is required")
//         // .matches(
//         //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
//         //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
//         // ),
//         // .matches(/[a-z]+/, "One lowercase character")
//         // .matches(/[A-Z]+/, "One uppercase character")
//         // .matches(/[@$!%*#?&]+/, "One special character")
//         // .matches(/\d+/, "One number"),
//         conformpassword: Yup.string()
//             .required("required")
//             .oneOf([Yup.ref("password"), ""], "password does not match"),
//         email: Yup.string().email("Invalid email").required("Required"),
//         name: Yup.string().required("Required")


//     });
//     const onSubmit = async (values, { setValues, resetForm }) => {
//         console.log(values);
//         alert("hii")
//         try {
//             const bodyFormData = new FormData();
//             bodyFormData.append("name", values.name);
//             bodyFormData.append("email", values.email);
//             bodyFormData.append("password", values.password);
//             bodyFormData.append("Confirm_Password", values.Confirm_Password);

//             const res = await axios.post("http://45.13.132.197:4000/register", bodyFormData);
//             console.log(res);

//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <>

//             <div id="login_page">
//                 <div className="container">
//                     <div className="row" style={{ textAlign: "center" }}>


//                         <Formik
//                             initialValues={initialValues}
//                             validationSchema={SignupSchema}
//                             onSubmit={onSubmit}
//                         >

//                             {({ errors, touched }) => (

//                                 <Form className="sign_in_form">
//                                     <div className="heading">
//                                         <h3>Sign Up</h3>
//                                     </div>
//                                     <div className="input_group">
//                                         <Field
//                                             className="input"
//                                             name="name"
//                                             type="text"
//                                             placeholder=""
//                                         />
//                                         {errors.name && touched.name ? (
//                                             <div>{errors.name}</div>
//                                         ) : null}
//                                         <label htmlFor="">Name</label>
//                                         <span className="highlight"></span>
//                                     </div>
//                                     <div style={{ height: "5px" }}>
//                                     </div>
//                                     <div className="input_group">
//                                         <Field
//                                             className="input"
//                                             name="email"
//                                             type="text"
//                                             placeholder=""
//                                         />
//                                         {errors.email && touched.email ? (
//                                             <div>{errors.email}</div>
//                                         ) : null}
//                                         <label htmlFor="">E-mail</label>
//                                         <span className="highlight"></span>
//                                     </div>
//                                     <div style={{ height: "5px" }}>
//                                     </div>
//                                     <div className="input_group">
//                                         <Field
//                                             className="input"
//                                             name="password"
//                                             type="text"
//                                             placeholder=""
//                                         />
//                                         {errors.password && touched.password ? (
//                                             <div>{errors.password}</div>
//                                         ) : null}
//                                         <label htmlFor="">password</label>
//                                         <span className="highlight"></span>
//                                     </div>
//                                     <div style={{ height: "5px" }}>
//                                     </div>
//                                     <div className="input_group">
//                                         <Field
//                                             className="input"
//                                             name="Confirm_Password"
//                                             type="text"
//                                             placeholder=""
//                                         />
//                                         {errors.Confirm_Password && touched.Confirm_Password ? (
//                                             <div>{errors.Confirm_Password}</div>
//                                         ) : null}
//                                         <label htmlFor="">confirm password</label>
//                                         <span className="highlight"></span>
//                                     </div>
//                                     <div style={{ height: "5px" }}>
//                                     </div>
//                                     <div className="input_group">
//                                     <button className="button" type="button" >sign up</button>
//                                   </div>
//                                     <span>already have an account? <Link to="/login">Sign In</Link> </span>
//                                 </Form>
//                             )}

//                         </Formik>

//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Sinup
// import React from 'react'
// import { Link } from 'react-router-dom'
// import "./Sinup.css"
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import axios from 'axios';
// function Sinup() {
//     const initialValues = {

//         name: "",
//         email: "",
//         password: "",
//         Confirm_Password: "",
//     };
//     const SignupSchema = Yup.object().shape({
//         password: Yup.string()
//         .required("required"),
//     // .min(6, "atlist 8 character password is required")
//     // .matches(
//     //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
//     //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
//     // ),
//     // .matches(/[a-z]+/, "One lowercase character")
//     // .matches(/[A-Z]+/, "One uppercase character")
//     // .matches(/[@$!%*#?&]+/, "One special character")
//     // .matches(/\d+/, "One number"),
//     conformpassword: Yup.string()
//         .required("required")
//         .oneOf([Yup.ref("password"), ""], "password does not match"),
//     email: Yup.string().email("Invalid email").required("Required"),
//     name: Yup.string().required("Required")



//     });
//     const onSubmit = async (values, { setValues, resetForm }) => {
//         console.log(values);
//         alert("hii")
//         try {
//             const bodyFormData = new FormData();
//             bodyFormData.append("name", values.name);
//             bodyFormData.append("email", values.email);
//             bodyFormData.append("password", values.password);
//             bodyFormData.append("Confirm_Password", values.Confirm_Password);

//             const res = await axios.post("http://45.13.132.197:4000/register", bodyFormData);
//             console.log(res);

//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <>

//             <div id="login_page">
//                 <div className="container">
//                     <div className="row" style={{ textAlign: "center" }}>


//                         <Formik
//                             initialValues={initialValues}
//                             validationSchema={SignupSchema}
//                             onSubmit={onSubmit}
//                         >

//                             {({ errors, touched}) => (

//                                 <Form className="sign_in_form">
//                                     <div className="heading">
//                                         <h3 id='signtexxt'>Sign Up</h3>
//                                     </div>
//                                     <div className="input_group">
//                                     <Field
//                                         className="input"
//                                         name="name"
//                                         type="text"
//                                         placeholder=""
//                                     />
//                                     {errors.name && touched.name ? (
//                                         <div>{errors.name}</div>
//                                     ) : null}
//                                     <label htmlFor="">Name</label>
//                                     <span className="highlight"></span>
//                                 </div>
//                                 <div style={{ height: "5px" }}>
//                                 </div>
//                                 <div className="input_group">
//                                     <Field
//                                         className="input"
//                                         name="email"
//                                         type="text"
//                                         placeholder=""
//                                     />
//                                     {errors.email && touched.email ? (
//                                         <div>{errors.email}</div>
//                                     ) : null}
//                                     <label htmlFor="">E-mail</label>
//                                     <span className="highlight"></span>
//                                 </div>
//                                 <div style={{ height: "5px" }}>
//                                 </div>
//                                 <div className="input_group">
//                                     <Field
//                                         className="input"
//                                         name="password"
//                                         type="text"
//                                         placeholder=""
//                                     />
//                                     {errors.password && touched.password ? (
//                                         <div>{errors.password}</div>
//                                     ) : null}
//                                     <label htmlFor="">password</label>
//                                     <span className="highlight"></span>
//                                 </div>
//                                 <div style={{ height: "5px" }}>
//                                 </div>
//                                 <div className="input_group">
//                                     <Field
//                                         className="input"
//                                         name="Confirm_Password"
//                                         type="text"
//                                         placeholder=""
//                                     />
//                                     {errors.Confirm_Password && touched.Confirm_Password ? (
//                                         <div>{errors.Confirm_Password}</div>
//                                     ) : null}
//                                     <label htmlFor="">confirm password</label>
//                                     <span className="highlight"></span>
//                                 </div>
//                                 <div style={{ height: "5px" }}>
//                                 </div>
//                                     <Link to="#" style={{ background: 0, color: "#707070" }}>forget password ?</Link>
                       
//                                         <div className="input_group">
//                                             <button type="submit" className="button">sign Up</button>
//                                         </div>
                
//                                         <span>already have an account? <Link to="/login">Sign In</Link> </span>

//                                 </Form>
//                             )}

//                         </Formik>

//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Sinup