// // import React, {useState, useEffect} from 'react'


// // function Banner() {
// //     const id='63f0cad81e627c34fc1b58e9'
// //     const [ images, setImages]=useState([])
// //     const [img, setImg] = useState();

// //     const [user , setuser]=useState([])
  
// //     console.log("img" , img)
// //     console.log("img path" , images)


// //     useEffect(() => {
// //         fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`).then((res) => {
// //             return res.json();
// //         }).then((data) => {
// //             console.log("data", data)
// //             setImages(data.attachments[0])
// //             setuser(data)
           
// //         })
// //     }, [id])

// //     const fetchImage = async () => {
// //         const res = await fetch(`http://45.13.132.197:4000/api/file/${images}`);
// //         const imageBlob = await res.blob();
// //         const imageObjectURL = URL.createObjectURL(imageBlob);
// //         setImg(imageObjectURL);
// //       };
    
// //       useEffect(() => {
// //         fetchImage();
// //       },[images]);


// //     return (
// //         <>
// //             <div id="banner" style={{ backgroundImage: `url(${img})` }}>       
// //                 <div className="container">
// //                     <div className="row">
// //                         <div className="head" >
// //                             <h1>{user.title} </h1>
// //                             <h3 dangerouslySetInnerHTML={{__html:user.description}}/>
// //                             <button className="primary button small" type="button" >get started</button>
// //                             <button className="hollow button small" type="button" >services</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <div className="arrow_down">
// //                 </div>
// //             </div>

           
            
        

// //         </>
// //     )
// // }

// // export default Banner











// import React,{useEffect,useState} from 'react'
// import { Link } from 'react-router-dom';
// import Imge1 from "../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
// import Imge2 from "../../assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg";
// import Imge3 from "../../assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg"
// // import Imge4 from "../../assets/img/pexels-andrea-piacquadio-3764568.jpg"


// function Corporate() {

//     const postIds = ['63f89ed75a71849662bd1bb7', '63f89f065a71849662bd1bdd', '63f8a05e5a71849662bd1c05'];

// const [users, setUsers] = useState([]);
// const [images, setImages] = useState([]);
// const [img, setImg] = useState('');

// useEffect(() => {
//     async function fetchData() {
//         const responses = await Promise.all(
//             postIds.map(async id => {
//                 const res = await fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
//                 return res.json();
//             })
//         );
//         setUsers(responses);
//         setImages(responses.flatMap(response => response.attachments));
//     }
//     fetchData();
// }, []);

// useEffect(() => {
//     async function fetchImages() {
//         const imageObjects = await Promise.all(
//             images.map(async image => {
//                 const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
//                 const imageBlob = await res.blob();
//                 return URL.createObjectURL(imageBlob);
//             })
//         );
//         setImg(imageObjects); // Set the first image URL as the state value
//     }
//     if (images.length > 0) {
//         fetchImages();
//     }
// }, [images]);

    

//     return (
//         <>
//             <div id="types" >
//                 <div className="container" >
//                     <div className="row">
//                         <div className="gutter">
//                             <div className="heading">
//                                 <h3 >corporate event services</h3>
//                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                             </div>
//                         </div>
//                     </div>
                   
//                     <div className="row">
//                         <div className="col-sm-10 col-sm-offset-1">
//                             <div className="container-fluid">
//                                 <div className="row">
//                                     <div className="col-sm-4 col-xs-12">
//                                         <div className="item_wrapper">
//                                             <div className="item">
//                                                 <div className="bg" style={{ backgroundImage: `url(${img})` ,borderRadius:"7px"}} >
//                                                 </div>
//                                                 <div className="text content">
//                                                     <h3>Title Goes here</h3>
//                                                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
//                                                     <div className="text">
//                                                         <Link to="#" className="anchor" id='anchors'>book now</Link>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-sm-4 col-xs-6">
//                                         <div className="item_wrapper">
//                                             <div className="item">
//                                                 <div className="bg" style={{ backgroundImage: `url(${img})` ,borderRadius:"7px"}} >
//                                                 </div>
//                                                 <div className="text content">
//                                                     <h3>Title Goes here</h3>
//                                                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
//                                                     <div className="text">
//                                                         <Link to="#" className="anchor" id='anchors'>book now</Link>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-sm-4 col-xs-6">
//                                         <div className="item_wrapper">
//                                             <div className="item">
//                                                 <div className="bg" style={{ backgroundImage: `url(${img})` ,borderRadius:"7px"}} >
//                                                 </div>
//                                                 <div className="text content">
//                                                     <h3>Title Goes here</h3>
//                                                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
//                                                     <div className="text">
//                                                         <Link to="#" className="anchor" id='anchors'>book now</Link>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
                                    
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>




//         </>
//     )
// }

// export default Corporate





// import React,{useEffect,useState} from 'react'
// import { Link } from 'react-router-dom';

// // import Imge4 from "../../assets/img/pexels-andrea-piacquadio-3764568.jpg"


// function Corporate() {

// const postIds = ['63f89ed75a71849662bd1bb7', '63f89f065a71849662bd1bdd', '63f8a05e5a71849662bd1c05'];

// const [users, setUsers] = useState([]);
// const [img, setImg] = useState('');

// useEffect(() => {
//     async function fetchData() {
//       const responses = await Promise.all(
//         postIds.map(async id => {
//           const res = await fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
//           return res.json();
          
//         })
//       );
//       setUsers(responses);
//       setImg(
//         await Promise.all(
//           responses.flatMap(response => response.attachments).map(async image => {
//             const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
//             const imageBlob = await res.blob();
//             return URL.createObjectURL(imageBlob);
//           })
//         )
//       );
//     }
//     fetchData();
//   }, [])
    

//     return (
//         <>
//             <div id="types" >
//                 <div className="container" >
//                     <div className="row">
//                         <div className="gutter">
//                             <div className="heading">
//                                 <h3 >corporate event services</h3>
//                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                             </div>
//                         </div>
//                     </div>
                   
//                     <div className="row">
//                         <div className="col-sm-10 col-sm-offset-1">
//                             <div className="container-fluid">
//                                 <div className="row">
//                                 {users.map((user, index) => (
//                                     <div className="col-sm-4 col-xs-12" key={user._id}>
//                                       <div className="item_wrapper">
//                                         <div className="item">
//                                           <div
//                                             className="bg"
//                                             style={{
//                                               backgroundImage: `url(${img[index]})`,
//                                               borderRadius: '7px',
//                                             }}
//                                           ></div>
//                                           <div className="text content">
//                                             <h3>{user.title}</h3>
//                                             <p dangerouslySetInnerHTML={{ __html: user.description }} />
//                                             <div className="text">
//                                               <Link to="#" className="anchor" id="anchors">
//                                                 book now
//                                               </Link>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   ))}
                                    
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>




//         </>
//     )
// }

// export default Corporate












// import React,{useEffect,useState , useRef} from 'react'
// import "./Home.css"
// import { Link } from 'react-router-dom';
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';

// // import Imge4 from "../../assets/img/pexels-andrea-piacquadio-3764568.jpg"

// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 1,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 1,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   }
// };

// function Corporate() {

//   const postIds = ['63f89ed75a71849662bd1bb7', '63f89f065a71849662bd1bdd', '63f8a05e5a71849662bd1c05'];

//   const [users, setUsers] = useState([]);
//   const [img, setImg] = useState('');
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     async function fetchData() {
//       const responses = await Promise.all(
//         postIds.map(async id => {
//           const res = await fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
//           return res.json();
//         })
//       );
//       setUsers(responses);
//       setImg(
//         await Promise.all(
//           responses.flatMap(response => response.attachments).map(async image => {
//             const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
//             const imageBlob = await res.blob();
//             return URL.createObjectURL(imageBlob);
//           })
//         )
//       );
//     }
//     fetchData();
//   }, [])

//   const handleNext = () => {
//     carouselRef.current.next();
//   };

//   const handlePrevious = () => {
//     carouselRef.current.previous();
//   };

//     return (
//         <>

//             <div id="types" >
//             <GrFormPreviousLink className='left-arrow' onClick={handlePrevious} />
//             <GrFormNextLink className='right-arrow' onClick={handleNext} />
//                 <div className="container" >
//                     <div className="row">
//                         <div className="gutter">
//                             <div className="heading">
//                                 <h3 >corporate event services</h3>
//                                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                             </div>
//                         </div>
//                     </div>
          
//                     <div className="row">
                 

//                     <Carousel
//                     ref={carouselRef}
//                     swipeable={true}
//                     draggable={true}
//                     showDots={true}
//                     responsive={responsive}
//                     ssr={true} // means to render carousel on server-side.
//                     infinite={true}
//                     autoPlay={false}
//                     autoPlaySpeed={1500}
//                     keyBoardControl={true}
//                     customTransition="all .5"
//                     transitionDuration={100}
//                     containerClass="carousel-container"
//                     removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
//                     dotListClass="custom-dot-list-style"
//                     itemClass="carousel-item-padding-40-px"
//                     slidesToSlide={1} // set to 1 to slide only one image at a time
//                   >
             
//                   <div className="col-sm-10 col-sm-offset-1">
//                   <div className="container-fluid" id='showcard'>
//                       <div className="row">
//                       {users.map((user, index) => (
//                           <div className="col-sm-4 col-xs-12" key={user._id}>
//                             <div className="item_wrapper">
//                               <div className="item">
//                                 <div
//                                   className="bg"
//                                   style={{
//                                     backgroundImage: `url(${img[index]})`,
//                                     borderRadius: '7px',
//                                   }}
//                                 ></div>
//                                 <div className="text content">
//                                   <h3>{user.title}</h3>
//                                   <p dangerouslySetInnerHTML={{ __html: user.description }} />
//                                   <div className="text">
//                                     <Link to="#" className="anchor" id="anchors">
//                                       book now
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
                          
//                       </div>
//                   </div>
//               </div>
//                   </Carousel>












//                     </div>
//                 </div>
//             </div>




//         </>
//     )
// }

// export default Corporate





  import React, { useState } from 'react'
  const Data1 = [
      {
          id: 1,
          title: "Title Goes Here. ...  1here?",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda facilis neque quae reiciendis aspernatur harum consectetur voluptatibus culpa officiis voluptas alias magnam totam cum magni nemo, cumque accusantium corrupti."
      },
      
  ];

  const Data = [
    
      {
          id: 2,
          title: "Title Goes Here. ...  2here?",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda facilis neque quae reiciendis aspernatur harum consectetur voluptatibus culpa officiis voluptas alias magnam totam cum magni nemo, cumque accusantium corrupti."
      },
      {
          id: 3,
          title: "Title Goes Here. ...  3here?",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda facilis neque quae reiciendis aspernatur harum consectetur voluptatibus culpa officiis voluptas alias magnam totam cum magni nemo, cumque accusantium corrupti."
      },
      {
          id: 4,
          title: "Title Goes Here. ...  3here?",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti assumenda facilis neque quae reiciendis aspernatur harum consectetur voluptatibus culpa officiis voluptas alias magnam totam cum magni nemo, cumque accusantium corrupti."
      }
  ];

  function Faq() {
      const [toggle, setToggle] = useState(Data.map(() => false));
      const [toggle1, setToggle1] = useState(Data.map(() => false));

      const handleToggle = (index) => {
          setToggle((prev) => {
              const newToggle = [...prev];
              newToggle[index] = !newToggle[index];
              return newToggle;
          });
      };
      const handleToggle1 = (index) => {
          setToggle1((prev) => {
              const newToggle = [...prev];
              newToggle[index] = !newToggle[index];
              return newToggle;
          });
      };
      return (
          <>
              <div className="container">
                  <div className="row">
                      <div className="heading content mt-5 " id='faqtext'>
                          <h3>FAQ<small>(s)</small> </h3>
                          <p>Lorem ipsum dolor sit amet</p>
                      </div>
                  </div>
                  <div className="row">
                      <div id="faq_page" className="card layer1" style={{ padding: 0 }}>

                      {Data1.map((curElem, index) => (
                          <div className="faq" key={curElem.id} style={{ marginLeft: "10px" }}  onClick={() => handleToggle1(index)}>
                              <div style={{display:"flex"}} className="question">
                                  <span className='buttonplus' >{!toggle1[index] ? '-' : '+'}</span>
                                  <h6 id='faqitem'>{curElem.title}</h6>
                              </div>

                              <div id="ans" className="answer">
                                  {!toggle1[index] && (
                                      <div id="ans" className="answer">
                                          <p>{curElem.description}</p>
                                      </div>
                                  )}
                              </div>
                          </div>

                      ))}







                          {Data.map((curElem, index) => (
                              <div className="faq" key={curElem.id} style={{ marginLeft: "10px" }}  onClick={() => handleToggle(index)}>
                                  <div style={{display:"flex"}} className="question">
                                      <span className='buttonplus' >{toggle[index] ? '-' : '+'}</span>
                                      <h6 id='faqitem'>{curElem.title}</h6>
                                  </div>

                                  <div id="ans" className="answer">
                                      {toggle[index] && (
                                          <div id="ans" className="answer">
                                              <p>{curElem.description}</p>
                                          </div>
                                      )}
                                  </div>
                              </div>

                          ))}








                      </div>
                  </div>
              </div>
          </>
      )
  }

  export default Faq