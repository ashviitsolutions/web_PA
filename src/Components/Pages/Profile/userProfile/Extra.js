// import React, { useState, useEffect } from 'react';
// import "./Profile.css";
// import img1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
// import Hook from "../Hook/Hook";

// function Overview() {
//   const username = localStorage.getItem("username");
//   const [posts, setPosts] = useState([]);
//   const [eventStates, setEventStates] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const handleToggle = (id) => {
//     setEventStates((prevState) => ({
//       ...prevState,
//       [id]: !prevState[id],
//     }));
//   }

//   const isEventOpen = (id) => {
//     return eventStates[id] || false;
//   }

//   useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         const response = await Hook.getPost();
//         setPosts(response.data);
//         setIsLoading(false);
//         console.log("get response", response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchBooking();
//   }, []);

//   console.log("fetching overview data:", posts);

//   // Filter the appointments with status "completed"
//   const filteredAppointments = posts.filter((post) => post.service_status === "completed");

//   // Calculate the index range for the current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   // Get the data for the current page
//   const currentData = filteredAppointments.slice(startIndex, endIndex);

//   return (
//     <>
//       <div className="inner">
//         <div className='gutter'>
//           <h3 className='profile_heading'>{username}</h3>
//         </div>
//         <div className='gutter'>
//           <h3 className='small_heading'>UPCOMING BOOKINGS</h3>
//         </div>

//         <div id="my_appointments">
//           {isLoading ? (
//             <h1 style={{ color: "#162b3c" }}>Loading...</h1>
//           ) : (
//             <div className="container-fluid">
//               <div className="row" id='overview_page_container'>
//                 {currentData.length === 0 ? ( // Check if there are no bookings
//                   <p>No Booking found</p>
//                 ) : (
//                   // Removed extra curly braces and fixed the mapping
//                   currentData.map((post, index) => (
//                     <div className="col-sm-6" key={index}>
//                       <div className="gutter">
//                         <div className="appointment card" onClick={() => handleToggle(`app${index + 1}`)}>
//                           <span className="ripple"></span>
//                           <div className="relative_time float_wrapper">
//                             <h3 className="pull-left">{post.scheduled_timing}</h3>
//                             <h4 className="pull-right">1 day 20 hours</h4>
//                           </div>
//                           <div className="absolute_time float_wrapper">
//                             <h4 className="pull-left">{post.scheduled_date}</h4>
//                           </div>
//                           <div className="profile">
//                             <span className="avatar">
//                               <img src={img1} width={60} height={60} alt="Avatar" />
//                             </span>
//                             <div className="text">
//                               <h3>{post?.service_id?.title}</h3>
//                               <p>{post.service_time}</p>
//                             </div>
//                           </div>
//                           {isEventOpen(`app${index + 1}`) && (
//                             <div className="more_detail">
//                               <div className="address float_wrap">
//                                 <p>{post.address}</p>
//                                 <button className="button_direction">Get Directions</button>
//                               </div>
//                               <hr />
//                               <div className="host">
//                                 <div className="avatar"></div>
//                                 <p>Appointment with <b>{post.host}john</b></p>
//                               </div>
//                               <div className="billing float_wrapper">
//                                 <p className="pull-left">$ {post?.service_id?.price}</p>
//                                 <p className="paid pull-right">{post.service_status}</p>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//               {/* Pagination controls */}
//               <div className="overview_user_page_pagination">
//                 {Array.from({ length: Math.ceil(filteredAppointments.length / itemsPerPage) }, (_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={currentPage === i + 1 ? "active" : ""}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Overview;


// import React from 'react';
// import "./Profile.css";
// import image1 from "../../../img/uploads/8.-sad-girls-facebook-profile-pictures.jpg"

// function Invoices() {
//   const username = localStorage.getItem("username")
//   return (
//     <div className='overview' id='invoices'>
//       <div className='overview_container'>
//         <div className='heading'>
//           <h3>{username}</h3>
//         </div>
//         <div className='title'>
//           <h3>INVOICES</h3>
//         </div>
//         <div className='overview_card'>
//           <div className='overview_input'>
//             <div className='image_text'>
//               <img src={image1} width={150} height={130} alt='...' />
//               <div className='text-item'>
//                 <h3>Appointment With John Doe</h3>
//                 <p>#Paid</p>
//                 <div id='dateofpara'>
//                   <p>17-10-2022</p>
//                   <p style={{ fontWeight: "700" }}>08:00 PM</p>
//                 </div>
//                 <p id='dateofaddresswc'>15480 Annapolis Rd #202, Bowie, Maryland</p>
//               </div>
//             </div>
//             <div className='time_date'>
//               <h3>$70</h3>
//               <p>+$15 Tip</p>
//               <h3>Total = $85</h3>
//               <button>Downoad Invoices</button>
//             </div>
//           </div>
//           <div className='overview_input'>
//             <div className='image_text'>
//               <img src={image1} width={150} height={130} alt='...' />
//               <div className='text-item'>
//                 <h3>Appointment With John Doe</h3>
//                 <p>#Paid</p>
//                 <div id='dateofpara'>
//                   <p>17-10-2022</p>
//                   <p style={{ fontWeight: "700" }}>08:00 PM</p>
//                 </div>
//                 <p id='dateofaddresswc'>15480 Annapolis Rd #202, Bowie, Maryland</p>
//               </div>
//             </div>
//             <div className='time_date'>
//               <h3>$70</h3>
//               <p>+$15 Tip</p>
//               <h3>Total = $85</h3>
//               <button>Downoad Invoices</button>
//             </div>
//           </div>
//           <div className='overview_input'>
//             <div className='image_text'>
//               <img src={image1} width={150} height={130} alt='...' />
//               <div className='text-item'>
//                 <h3>Appointment With John Doe</h3>
//                 <p>#Paid</p>
//                 <div id='dateofpara'>
//                   <p>17-10-2022</p>
//                   <p style={{ fontWeight: "700" }}>08:00 PM</p>
//                 </div>
//                 <p id='dateofaddresswc'>15480 Annapolis Rd #202, Bowie, Maryland</p>
//               </div>
//             </div>
//             <div className='time_date'>
//               <h3>$70</h3>
//               <p>+$15 Tip</p>
//               <h3>Total = $85</h3>
//               <button>Downoad Invoices</button>
//             </div>
//           </div>
//           <div className='overview_input'>
//             <div className='image_text'>
//               <img src={image1} width={150} height={130} alt='...' />
//               <div className='text-item'>
//                 <h3>Appointment With John Doe</h3>
//                 <p>#Paid</p>
//                 <div id='dateofpara'>
//                   <p>17-10-2022</p>
//                   <p style={{ fontWeight: "700" }}>08:00 PM</p>
//                 </div>
//                 <p id='dateofaddresswc'>15480 Annapolis Rd #202, Bowie, Maryland</p>
//               </div>
//             </div>
//             <div className='time_date'>
//               <h3>$70</h3>
//               <p>+$15 Tip</p>
//               <h3>Total = $85</h3>
//               <button>Downoad Invoices</button>
//             </div>
//           </div>
//           <div className='overview_input'>
//             <div className='image_text'>
//               <img src={image1} width={150} height={130} alt='...' />
//               <div className='text-item'>
//                 <h3>Appointment With John Doe</h3>
//                 <p>#Paid</p>
//                 <div id='dateofpara'>
//                   <p>17-10-2022</p>
//                   <p style={{ fontWeight: "700" }}>08:00 PM</p>
//                 </div>
//                 <p id='dateofaddresswc'>15480 Annapolis Rd #202, Bowie, Maryland</p>
//               </div>
//             </div>
//             <div className='time_date'>
//               <h3>$70</h3>
//               <p>+$15 Tip</p>
//               <h3>Total = $85</h3>
//               <button>Downoad Invoices</button>
//             </div>
//           </div>

//         </div>

//       </div>
//     </div>
//   )
// }

// export default Invoices