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
//   const [activeCardIndex, setActiveCardIndex] = useState(null);

//   const handleReadMoreClick = (index) => {
//     setActiveCardIndex(index);
//   };

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
//                         <div className="col-sm-4 col-xs-12" key={user._id}>
//                           <div className="item_wrapper">
//                             <div className="item">
//                               <div
//                                 className="bg"
//                                 style={{
//                                   backgroundImage: `url(${img[index]})`,
//                                   borderRadius: '7px',
//                                 }}
//                               ></div>
//                               <div className="text content">
//                                 <h3>{user.title}</h3>
//                                 <p dangerouslySetInnerHTML={{ __html: index === activeCardIndex
//                                   ? user.description
//                                   : user.description.slice(0, 138) + (user.description.length > 138 ? "...." : "") }} />


//                                 <div className="text">
//                                   {index === activeCardIndex ? (
//                                     <button onClick={() => handleReadMoreClick(null)}  className="Read_More">
//                                       Show less
//                                     </button>
//                                   ) : (
//                                     <button onClick={() => handleReadMoreClick(index)} className="Read_More">
//                                       Read more
//                                     </button>
//                                   )}
//                                   <Link to="#" className="anchor" id="anchors">
//                                     book now
//                                   </Link>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
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