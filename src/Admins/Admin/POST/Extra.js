// import React, { useEffect, useRef,useState } from 'react'
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import axios from 'axios';
// import JoditEditor from 'jodit-react';
// import "./style.css"
// import { useNavigate } from 'react-router-dom';
// import Sidebar from "../../Sidebar/Sidebar"
// import { useParams } from 'react-router-dom';
// function Editpost() {
//     const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
//     let params=useParams();
//     let {id}=params;
  
//     const [url , setUrl]=useState("")
//     const [user , setUser]=useState([])
//     const [formValue , setFormValue]=useState(null)

//     const [ images, setImages]=useState([])
//     const nav=useNavigate()
//     const editor = useRef(null);
//   console.log(images)
// // alert(url)
//     const initialValues = {
//         title:"",
//         body: "",
//         excerpt: "",
//         image: "",
//         description: "",
//     };
 
//     const SignupSchema = Yup.object().shape({
//         title: Yup.string().required("Required"),
//         body: Yup.string().required("Required"),
//         excerpt: Yup.string().required("Required"),
      

//     });
//     const onSubmit = async(values, { setValues, resetForm }) => {
//         console.log(values);
//         try {
//           const bodyFormData = new FormData();
//           bodyFormData.append("title", values.title);
//           bodyFormData.append("body", values.body);
//           bodyFormData.append("excerpt", values.excerpt);
//           bodyFormData.append("postImages", values.image);
//           bodyFormData.append("description", values.description);
//           let token = localStorage.getItem("token");
//           if (!token) {
//             throw new Error("Token not found in local storage");
//           }
//           console.log(token);
//           let res = await axios.post(`http://45.13.132.197:4000/api/post/update-post/${id}`, bodyFormData, {
//             headers: {
//               Authorization:token
//             }
//           });
//           console.log(res);                       
//           if (res.status === 200) {
//             setValues({});
//             resetForm("");
//             nav("/getpost");
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       };
      
//     const config = {
//         readonly: false,
//         height: 400,
                                                 
//     }

//     useEffect(() => {
//         fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`).then((res) => {
//             return res.json();
//         }).then((data) => {
//             console.log(data)
//             setUser(data)
//             setImages(data.attachments[0])
//             const updatedSavedValues = {
//                 title: data.title,
//                 body: data.body,
//                 excerpt: data.excerpt,
//                 image: data.image,
//                 description: data.description,
//             };
//             setFormValue(updatedSavedValues);
//         })
//     }, [id])


//     useEffect(() => {
//         axios.get(`http://45.13.132.197:4000/api/file/${images}`)
//         .then((res)=>{
//             console.log("Hiiiii" , res)
//             setUrl(res.data)
//         })
           
     

//     }, [images])


//     return (
//         <>
//         <Sidebar/>
//             <div id="content">
//                 <div className="container-fluid">          
//                     <div className="row">
//                         <Formik
//                             initialValues={formValue || initialValues}
//                             validationSchema={SignupSchema}
//                             onSubmit={onSubmit}
//                             enableReinitialize

//                         >

//                             {({ errors, touched, setFieldValue  }) => (

//                                 <Form>
//                                     <div className="">
//                                         <div className="heading float_wrapper">
//                                             <div className="gutter pull-left" >
//                                                 <h3>Edit post</h3>
//                                             </div>
//                                             <span className="toggle_sidebar" ></span>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-sm-8">
//                                             <div className="gutter">
//                                                 <div className="card layer1">
//                                                     <div className="inner">
//                                                         <label className="card_label" htmlFor="">General InhtmlFormation</label>
//                                                         <div className="input_group">
//                                                             <Field
                                                            
//                                                                 className="input"
//                                                                 name="title"
//                                                                 type="text"
//                                                                 placeholder=" New Update Title"
                                                                
//                                                             />
                                                          
//                                                             {errors.title && touched.title ? (
//                                                                 <div>{errors.title}</div>
//                                                             ) : null}
//                                                             <span className="highlight"></span>
//                                                         </div>
//                                                         <div className="input_group">
//                                                             <div className="input_group">
//                                                                 <Field
                                                                 
//                                                                     className="input"
//                                                                     name="body"
//                                                                     type="text"
//                                                                     placeholder=" New Update  Excerpt"
//                                                                 />
                                                            
//                                                                 {errors.body && touched.body ? (
//                                                                     <div>{errors.body}</div>
//                                                                 ) : null}
//                                                                 <span className="highlight"></span>
//                                                             </div>
//                                                         </div>
//                                                         <div className="input_group">
//                                                             <label htmlFor="" className="static">Description</label>
//                                                             <div className='editor' style={{ marginTop: "4vh", height: "40vh" }}>
//                                                                 <Field name="description" as="texarea">
//                                                                     <JoditEditor
//                                                                     name="description"
//                                                                     ref={editor}
//                                                                     value={user.description}    
//                                                                     config={config}
//                                                                     onBlur={(newContent) => {
//                                                                         setFieldValue('description', newContent);
//                                                                     }}
//                                                                     onChange={(newContent) => {
//                                                                         setFieldValue('description', newContent);
//                                                                     }}
//                                                                     />
//                                                                 </Field>

//                                                             </div>

//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-4">
//                                             <div className="gutter">
//                                                 <div className="card layer1">
//                                                     <div className="inner">
//                                                         <label className="card_label" htmlFor="">Post Actions</label>
//                                                         <div className="input_group">
//                                                             <button id="publish_btn"
//                                                                 className="primary square button" type="submit"
//                                                                 name="button">publish</button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="card layer1">
//                                                     <div className="inner">
                                                   
//                                                         <label className="card_label" htmlFor="">Select Type</label>
//                                                         <div className="input_group">
//                                                         <Field name="excerpt" as="select" className="input" >
//                                                         <option value="">Select Type</option>
//                                                         <option value="Home">Home</option>
//                                                         <option value="Banner">Banner</option>
//                                                         <option value="Offer Post">Offer Post</option>
//                                                         <option value="Join Our Team">Join Our Team</option>
//                                                         <option value="Corporate Events">Corporate Events</option>
//                                                         <option value="Private Events">Private Events</option>
//                                                         <option value="Massage On Demand">Massage On Demand</option>
//                                                         <option value="Policies">Policies</option>
//                                                         <option value="Become a Member">Become a Member</option>
//                                                       </Field>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="card layer1">
//                                                     <div className="inner">
//                                                         <label htmlFor="" className="card_label">Attachments</label>
//                                                         <input
//                                                            name='image'
//                                                             type="file"
//                                                             placeholder="Excerpt"
//                                                             onChange={(e) => {
//                                                                 let reader = new FileReader();
//                                                                 let file = e.target.files[0];
                                                        
//                                                                 reader.onloadend = () => {
//                                                                     setImagePreviewUrl(reader.result);
//                                                                 };
                                                        
//                                                                 reader.readAsDataURL(file);
//                                                                 setFieldValue('image', file)
//                                                             }
//                                                             }
//                                                         />


//                                                     </div>
//                                                     {url && <img src={url} alt="Preview" />}

//                                                 </div>
                                                
//                                             </div>
//                                         </div>
//                                     </div>



//                                 </Form>
//                             )}

//                         </Formik>







//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Editpost

// <div className="card layer1">
// <div className="inner">
//     <label className="card_label" htmlFor="type">
//         Select Type
//     </label>
//     <div className="input_group">
//         <Field name="excerpt" as="select" className="input">
//             <option value="">Select Type</option>
//             {type.map((cur) => (
//                 <option key={cur._id} value={cur._id}>
//                     {cur.name}
//                 </option>
//             ))}
//         </Field>
//     </div>
// </div>
// </div>



// import React, { useEffect, useState, useMemo } from 'react'
// import { Link } from 'react-router-dom'
// import Sidebar from "../../Sidebar/Sidebar"
// import ReactPaginate from 'react-paginate';
// import "./style.css"

// const PreviewImage = ({ attachments }) => {
//   const [imageObjectURL, setImageObjectURL] = useState(null);

//   useEffect(() => {
//     const fetchImage = async () => {
//       const res = await fetch(`http://45.13.132.197:4000/api/file/${attachments}`);
//       const imageBlob = await res.blob();
//       const objectURL = URL.createObjectURL(imageBlob);
//       setImageObjectURL(objectURL);
//     };

//     fetchImage();
//   }, [attachments]);

//   return (
//     <div style={{ width: "100%", height: "10vh", backgroundSize: "cover" }} className="previewimage">
//       {imageObjectURL && <img src={imageObjectURL} alt="Preview" style={{ height: '20vh' }} />}
//     </div>
//   );
// };

// function Getpost() {
//   const [type, setType] = useState([]);
//   const [selectedType, setSelectedType] = useState("");

//   const [user, setUser] = useState([]);
//   const [data, setData] = useState(1);
//   const [count, setCount] = useState(0);

//   const fetchData = async () => {
//     try {
//       const res = await fetch("http://45.13.132.197:4000/api/post/fetch");
//       const data = await res.json();
//       setUser(data);
//       setCount(data.length);
//       console.log(" get Data", data)
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   useEffect(() => {
//     fetchData();
//   }, [data]);

//   const handlePageClick = (data) => {
//     setData(data.selected + 1);
//   };

//   const memoizedUser = useMemo(() => {
//     return user.slice((data - 1) * 10, data * 10);
//   }, [user, data]);


//   useEffect(() => {
//     fetch(`http://45.13.132.197:4000/api/terms/fetch`)
//       .then((res) => res.json())
//       .then((data) => {
//         setType(data);
//         console.log(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);


//   return (
//     <>
//       <Sidebar />
//       <div id="content">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="">
//               <div className="heading float_wrapper">
//                 <div className="gutter pull-left" >
//                   <h3>all posts</h3>
//                   <p>list of all add posts</p>
//                 </div>
//                 <div className="gutter pull-left">
//                   <Link to="/addpost">
//                     <button className="button small primary"
//                       type="button" name="button">Add New</button>
//                   </Link>
//                 </div>
//                 <span className="toggle_sidebar" ></span>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="gutter">
//               <div className="card layer1 filters">
//                 <div className="input_group">
//                   <select name="" id="" className="input">
//                     <option value="">status</option>
//                     <option value="">draft</option>
//                     <option value="">published</option>
//                     <option value="">trashed</option>
//                   </select>
//                   <span className="highlight"></span>
//                 </div>
//                 <div className="input_group">
//                   <select
//                     id="select-type"
//                     value={selectedType}
//                     onChange={(e) => setSelectedType(e.target.value)}
//                     className="input"
//                   >
//                     <option value="">select type</option>
//                     {type.map((cur) => (
//                       <option key={cur._id} value={cur._id}>
//                         {cur.name}
//                       </option>
//                     ))}
//                   </select>
//                   <span className="highlight"></span>
//                 </div>
//                 <div className="input_group">
//                   <input type="date" className="input" placeholder="Start Date" />
//                   <span className="highlight"></span>
//                 </div>
//                 <div className="input_group pull-right" >
//                   <input type="text" className="input" placeholder="search here.." />
//                   <span className="highlight"></span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="gutter">
//               <table className="table-responsive ultra_responsive">
//                 <thead>
//                   <tr>
//                     <th>
//                       <div className="md-checkbox">
//                         <input id="i3" type="checkbox" />
//                         <label htmlFor="i3"></label>
//                       </div>
//                     </th>
//                     <th>Image</th>
//                     <th>Title</th>
//                     <th>Description</th>
//                     <th>Type</th>
//                   </tr>
//                 </thead>






//                 {memoizedUser.map((cur, index) => {
//                   return (
//                     <tr key={index}>
//                       <td>
//                         <div className="md-checkbox">
//                           <input id={`i${index}`} type="checkbox" />
//                           <label htmlFor={`i${index}`}></label>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="card layer1">
//                           <div className="inner">
//                             <label htmlFor="" className="card_label"></label>
//                             <div className='preview' style={{ width: "100%", height: "20vh" }}>
//                               <PreviewImage attachments={cur.attachments} />
//                             </div>
//                           </div>
//                         </div>





//                       </td>
//                       <td>
//                         <div className="content">
//                           <Link to={`/editpage/${cur._id}`}>
//                             <span className="title">{cur.title}</span>
//                           </Link>
//                         </div>
//                       </td>
//                       <td dangerouslySetInnerHTML={{ __html: cur.description }} />
//                       <td>{cur.type.name}</td>



//                     </tr>
//                   )
//                 })}

//               </table>

//               <div className='pagination'  >
//                 <ReactPaginate
//                   itemsPerPage={10}
//                   previousLabel={'Previous'}
//                   nextLabel={'Next'}
//                   breakLabel={"..."}
//                   pageCount={Math.ceil(count / 10)}
//                   marginPagesDisplayed={3}
//                   pageRangeDisplayed={2}
//                   onPageChange={handlePageClick}
//                   // css apply on pagination
//                   containerClassName={'pagination justify-content-center py-3'}
//                   pageClassName={'page-item'}
//                   pageLinkClassName={'page-link'}
//                   previousClassName={'page-item'}
//                   previousLinkClassName={'page-link'}
//                   nextClassName={'page-item'}
//                   nextLinkClassName={'page-link'}
//                   breakClassName={'page-item'}
//                   breakLinkClassName={'page-link'}
//                   activeClassName={'active'}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>



//     </>
//   )
// }

// export default Getpost





import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from "../../Sidebar/Sidebar"
import ReactPaginate from 'react-paginate';
import "./style.css"

const PreviewImage = ({ attachments }) => {
  const [imageObjectURL, setImageObjectURL] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`http://45.13.132.197:4000/api/file/${attachments}`);
      const imageBlob = await res.blob();
      const objectURL = URL.createObjectURL(imageBlob);
      setImageObjectURL(objectURL);
    };

    fetchImage();
  }, [attachments]);

  return (
    <div  >
      {imageObjectURL && <img src={imageObjectURL} alt="Preview" className="previewimage" />}
    </div>
  );
};




function Getpost() {
  const [search, setSearch] = useState("")
  const [Delete, setDelete] = useState([])



  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const [user, setUser] = useState([]);
  const [data, setData] = useState(1);
  const [count, setCount] = useState(0);

  // alert(selectedType)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://45.13.132.197:4000/api/post/fetch?type=${selectedType || search}`);
        const data = await res.json();
        setUser(data);
        setCount(data.length);
        console.log(" get Data", data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data, search, selectedType]);


  const handlePageClick = (data) => {
    setData(data.selected + 1);
  };

  const memoizedUser = useMemo(() => {
    return user.slice((data - 1) * 10, data * 10);
  }, [user, data]);



  useEffect(() => {
    fetch(`http://45.13.132.197:4000/api/terms/fetch`)
      .then((res) => res.json())
      .then((data) => {
        setType(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    let token = localStorage.getItem("token");
    fetch(`http://45.13.132.197:4000/api/post/${id}/remove_post`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setDelete(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
      <Sidebar />
      <div id="content">
        <div className="container-fluid">
          <div className="row">
            <div className="">
              <div className="heading float_wrapper">
                <div className="gutter pull-left" >
                  <h3>all posts</h3>
                  <p>list of all add posts</p>
                </div>
                <div className="gutter pull-left">
                  <Link to="/addpost">
                    <button className="button small primary"
                      type="button" name="button">Add New</button>
                  </Link>
                </div>
                <span className="toggle_sidebar" ></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="gutter">
              <div className="card layer1 filters">

                <div className="input_group">
                  <select
                    id="select-type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="input"
                  >
                    <option value="">select type</option>
                    {type.map((cur) => (
                      <option key={cur._id} value={cur._id}>
                        {cur.name}
                      </option>
                    ))}
                  </select>
                  <span className="highlight"></span>
                </div>

                <div className="input_group pull-right" >
                  <input type="text" className="input" placeholder="search here.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                  <span className="highlight"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="gutter">
              <table className="table-responsive ultra_responsive">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title/Description</th>
                    <th>Type</th>
                  </tr>
                </thead>






                {memoizedUser.map((cur, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="card layer1">
                          <div className="inner">
                            <label htmlFor="" className="card_label"></label>
                            <div className='preview' style={{ width: "100%", height: "20vh", backgroundSize: "cover" }}>
                              <PreviewImage className="PreviewImage" attachments={cur.attachments} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="content">
                          <span className="title " id='headingtitle'>{cur.title}</span>
                          <p className="description" dangerouslySetInnerHTML={{ __html: cur.description }} />
                        </div>
                      </td>

                      <td>
                        <div className='typefield' >
                          <span style={{ display: "block" }}> {cur.type.name}</span>
                          <Link to={`/editpage/${cur._id}`} >
                            <span className="Edit mt-3">Edit Page</span>

                          </Link>
                        </div>


                      </td>
                    </tr>
                  )
                })}

              </table>

              <div className='pagination'  >
                <ReactPaginate
                  itemsPerPage={10}
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  breakLabel={"..."}
                  pageCount={Math.ceil(count / 10)}
                  marginPagesDisplayed={3}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  // css apply on pagination
                  containerClassName={'pagination justify-content-center py-3'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link'}
                  breakClassName={'page-item'}
                  breakLinkClassName={'page-link'}
                  activeClassName={'active'}
                />
              </div>
            </div>
          </div>
        </div>

      </div>



    </>
  )
}

export default Getpost