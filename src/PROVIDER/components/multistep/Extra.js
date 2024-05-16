// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useState } from "react";
// import { Button, Form, Row } from "react-bootstrap";
// import TimePicker from "./TimePicker";
// import { IP } from '../../../Constant';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// const FirstForm = (props) => {
//   const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
//   const [images, setImages] = useState(null);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState("");
//   const token = localStorage.getItem("providertoken");
//   const [user, setUser] = useState({});
//   const [services, setServices] = useState([]);
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");
//   const [ssn, setSsn] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [DOB, setDOB] = useState("");
//   const [address, setAddress] = useState("");
//   const [zip, setZip] = useState("");
//   const [country, setCountry] = useState("");
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedPrivateEvents, setSelectedPrivateEvents] = useState([]);
//   const [selectedCorporateEvents, setSelectedCorporateEvents] = useState([]);
//   const [workingShift, setWorkingShift] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [selectedOption, setSelectedOption] = useState(""); // initialize state with empty string
//   const [ref1Name, setRef1Name] = useState("");
//   const [ref1Phone, setRef1Phone] = useState("");
//   const [ref2Name, setRef2Name] = useState("");
//   const [ref2Phone, setRef2Phone] = useState("");
//   const [submitDate, setSubmitDate] = useState("");
//   const [availabilityHours, setAvailabilityHours] = useState([
//     { day: "Monday", start: "", end: "" },
//     { day: "Tuesday", start: "", end: "" },
//     { day: "Wednesday", start: "", end: "" },
//     { day: "Thursday", start: "", end: "" },
//     { day: "Friday", start: "", end: "" },
//     { day: "Saturday", start: "", end: "" },
//     { day: "Sunday", start: "", end: "" },
//   ]);
//   const [workingInformation, setWorkingInformation] = useState([]);

//   const handleSelect = async (value) => {
//     try {
//       const results = await geocodeByAddress(value);
//       const ll = await getLatLng(results[0]);
//       console.log(ll);
//       setAddress(value);
//       setCoordinates(ll);
//     } catch (error) {
//       console.error("Error selecting location:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const resp = await fetch(`${IP}/provider/profile`, {
//           headers: { Authorization: token },
//         });
//         const data = await resp.json();
//         console.log("provider profile", data);
//         setUser(data);
//         setCountry(data?.mailing_address?.country);
//         setZip(data?.mailing_address?.postal_code);
//         setFname(data?.first_name);
//         setLname(data?.last_name);
//         setEmail(data?.email);
//         setPhone(data?.phone);
//         setSsn(data?.ssn);
//         setDOB(data?.DOB);
//         setAddress(data?.Address?.current_address);
//         setRef1Name(data?.professional_references?.ref_1_name);
//         setRef1Phone(data?.professional_references?.ref_1_phone);
//         setRef2Name(data?.professional_references?.ref_2_name);
//         setRef2Phone(data?.professional_references?.ref_2_phone);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const resp = await fetch(`${IP}/service/view-services`);
//         const data = await resp.json();
//         setServices(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleAvailabilityHoursChange = (index, field, value) => {
//     const updatedAvailabilityHours = [...availabilityHours];
//     updatedAvailabilityHours[index][field] = value;
//     setAvailabilityHours(updatedAvailabilityHours);
//   };

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value); // update state with selected value
//   };

//   const handleInputChange = (e) => {
//     setDOB(e.target.value);
//   };

//   const handleShiftChange = (e) => {
//     setWorkingShift(e.target.value);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleRef1NameChange = (e) => {
//     setRef1Name(e.target.value);
//   };

//   const handleRef1PhoneChange = (e) => {
//     setRef1Phone(e.target.value);
//   };

//   const handleRef2NameChange = (e) => {
//     setRef2Name(e.target.value);
//   };

//   const handleRef2PhoneChange = (e) => {
//     setRef2Phone(e.target.value);
//   };

//   const handleSubmitDateChange = (e) => {
//     setSubmitDate(e.target.value);
//   };

//   const ondemand = services.filter((service) => service.category === 'on demand').map((service) => ({ id: service._id, title: service.title }));
//   const privateEvents = services.filter((service) => service.category === 'private events').map((service) => ({ id: service._id, title: service.title }));
//   const corporateEvents = services.filter((service) => service.category === 'corporate events').map((service) => ({ id: service._id, title: service.title }));

//   const areasofexpertise = { ondemand, privateevents: privateEvents, corporateevents: corporateEvents };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("fname", fname);
//     formData.append("lname", lname);
//     formData.append("phone", phone);
//     formData.append("email", email);
//     formData.append("DOB", DOB);
//     formData.append("address", address);
//     formData.append("postal_code", zip);
//     formData.append("country", country);
//     formData.append("on_demand", selectedItems);
//     formData.append("private_events", selectedPrivateEvents);
//     formData.append("corporate_events", selectedCorporateEvents);
//     formData.append("working_shift", workingShift);
//     formData.append("start_date", startDate);
//     formData.append("working_information", JSON.stringify(availabilityHours));
//     formData.append("previous_employee", selectedOption);
//     formData.append("ref_1_name", ref1Name);
//     formData.append("ref_1_phone", ref1Phone);
//     formData.append("ref_2_name", ref2Name);
//     formData.append("ref_2_phone", ref2Phone);
//     formData.append("submission_Date", submitDate);
//     formData.append("office", images);
//     formData.append("ssn", ssn);
//     formData.append("longitude", coordinates.lng);
//     formData.append("latitude", coordinates.lat);

//     try {
//       const resp = await fetch(`${IP}/provider/update-details`, {
//         method: "PUT",
//         headers: { Authorization: token },
//         body: formData,
//       });

//       const result = await resp.json();
//       console.log("result Services:", result);
//       toast.success("Your Registration successfully!", { position: "top-right", autoClose: 3000 });
//       props.nextStep();
//     } catch (error) {
//       console.error("Error show", error);
//       toast.error("An error occurred. Please try again.", { position: "top-right", autoClose: 3000 });
//     }
//   };

//   return (
//     <>
//       <div className="formprovider">
//         <h2 className="text-center mt-2">Application Form</h2>

//         <Form method="post" className="col-md-8 mx-auto mb-2" onSubmit={handleSubmit}>
//           <h5>Personal Information</h5>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Name</Form.Label>
//             <Row>
//               <div className="col-md-6 mb-2">
//                 <Form.Control
//                   required
//                   name="fname"
//                   type="text"
//                   placeholder="First Name"
//                   value={fname}
//                   onChange={(e) => setFname(e.target.value)}
//                 />
//               </div>
//               <div className="col-md-6">
//                 <Form.Control
//                   required
//                   name="lname"
//                   type="text"
//                   placeholder="Last Name"
//                   value={lname}
//                   onChange={(e) => setLname(e.target.value)}
//                 />
//               </div>
//             </Row>
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               required
//               type="email"
//               name="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               name="phone"
//               placeholder="Enter Phone Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Date of Birth</Form.Label>
//             <Form.Control
//               required
//               type="date"
//               name="DOB"
//               placeholder="Enter Date of Birth"
//               value={DOB}
//               onChange={handleInputChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>SSN</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               name="ssn"
//               placeholder="Enter SSN"
//               value={ssn}
//               onChange={(e) => setSsn(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Address</Form.Label>
//             <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
//               {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//                 <div>
//                   <Form.Control
//                     {...getInputProps({
//                       placeholder: "Enter Address",
//                       className: "location-search-input",
//                     })}
//                   />
//                   <div className="autocomplete-dropdown-container">
//                     {loading && <div>Loading...</div>}
//                     {suggestions.map((suggestion) => {
//                       const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
//                       const style = suggestion.active
//                         ? { backgroundColor: "#fafafa", cursor: "pointer" }
//                         : { backgroundColor: "#ffffff", cursor: "pointer" };
//                       return (
//                         <div {...getSuggestionItemProps(suggestion, { className, style })}>
//                           <span>{suggestion.description}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </PlacesAutocomplete>
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Postal Code</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               name="postal_code"
//               placeholder="Enter Postal Code"
//               value={zip}
//               onChange={(e) => setZip(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Country</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               name="country"
//               placeholder="Enter Country"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//             />
//           </Form.Group>

//           <h5>Areas of Expertise</h5>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>On Demand Services</Form.Label>
//             <div className="mb-3">
//               {areasofexpertise.ondemand.map((service) => (
//                 <Form.Check
//                   inline
//                   key={service.id}
//                   label={service.title}
//                   value={service.id}
//                   checked={selectedItems.includes(service.id)}
//                   onChange={(e) => {
//                     if (e.target.checked) {
//                       setSelectedItems([...selectedItems, service.id]);
//                     } else {
//                       setSelectedItems(selectedItems.filter((id) => id !== service.id));
//                     }
//                   }}
//                 />
//               ))}
//             </div>
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Private Events</Form.Label>
//             <div className="mb-3">
//               {areasofexpertise.privateevents.map((service) => (
//                 <Form.Check
//                   inline
//                   key={service.id}
//                   label={service.title}
//                   value={service.id}
//                   checked={selectedPrivateEvents.includes(service.id)}
//                   onChange={(e) => {
//                     if (e.target.checked) {
//                       setSelectedPrivateEvents([...selectedPrivateEvents, service.id]);
//                     } else {
//                       setSelectedPrivateEvents(selectedPrivateEvents.filter((id) => id !== service.id));
//                     }
//                   }}
//                 />
//               ))}
//             </div>
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Corporate Events</Form.Label>
//             <div className="mb-3">
//               {areasofexpertise.corporateevents.map((service) => (
//                 <Form.Check
//                   inline
//                   key={service.id}
//                   label={service.title}
//                   value={service.id}
//                   checked={selectedCorporateEvents.includes(service.id)}
//                   onChange={(e) => {
//                     if (e.target.checked) {
//                       setSelectedCorporateEvents([...selectedCorporateEvents, service.id]);
//                     } else {
//                       setSelectedCorporateEvents(selectedCorporateEvents.filter((id) => id !== service.id));
//                     }
//                   }}
//                 />
//               ))}
//             </div>
//           </Form.Group>

//           <h5>Availability</h5>
//           {availabilityHours.map((item, index) => (
//             <div key={index} className="mb-3">
//               <Row>
//                 <div className="col-md-4 mb-2">
//                   <Form.Label>{item.day}</Form.Label>
//                 </div>
//                 <div className="col-md-4 mb-2">
//                   <TimePicker
//                     value={item.start}
//                     onChange={(value) => handleAvailabilityHoursChange(index, "start", value)}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <TimePicker
//                     value={item.end}
//                     onChange={(value) => handleAvailabilityHoursChange(index, "end", value)}
//                   />
//                 </div>
//               </Row>
//             </div>
//           ))}

//           <h5>Additional Information</h5>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Previous Employee?</Form.Label>
//             <Form.Check
//               type="radio"
//               label="Yes"
//               name="previous_employee"
//               value="yes"
//               checked={selectedOption === "yes"}
//               onChange={handleOptionChange}
//             />
//             <Form.Check
//               type="radio"
//               label="No"
//               name="previous_employee"
//               value="no"
//               checked={selectedOption === "no"}
//               onChange={handleOptionChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Working Shift</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               name="working_shift"
//               placeholder="Enter Working Shift"
//               value={workingShift}
//               onChange={handleShiftChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Start Date</Form.Label>
//             <Form.Control
//               required
//               type="date"
//               name="start_date"
//               placeholder="Enter Start Date"
//               value={startDate}
//               onChange={handleStartDateChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Professional References</Form.Label>
//             <Row>
//               <div className="col-md-6 mb-2">
//                 <Form.Control
//                   required
//                   type="text"
//                   name="ref_1_name"
//                   placeholder="Reference 1 Name"
//                   value={ref1Name}
//                   onChange={handleRef1NameChange}
//                 />
//               </div>
//               <div className="col-md-6 mb-2">
//                 <Form.Control
//                   required
//                   type="text"
//                   name="ref_1_phone"
//                   placeholder="Reference 1 Phone"
//                   value={ref1Phone}
//                   onChange={handleRef1PhoneChange}
//                 />
//               </div>
//               <div className="col-md-6 mb-2">
//                 <Form.Control
//                   required
//                   type="text"
//                   name="ref_2_name"
//                   placeholder="Reference 2 Name"
//                   value={ref2Name}
//                   onChange={handleRef2NameChange}
//                 />
//               </div>
//               <div className="col-md-6 mb-2">
//                 <Form.Control
//                   required
//                   type="text"
//                   name="ref_2_phone"
//                   placeholder="Reference 2 Phone"
//                   value={ref2Phone}
//                   onChange={handleRef2PhoneChange}
//                 />
//               </div>
//             </Row>
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Submission Date</Form.Label>
//             <Form.Control
//               required
//               type="date"
//               name="submission_date"
//               placeholder="Enter Submission Date"
//               value={submitDate}
//               onChange={handleSubmitDateChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Office Image</Form.Label>
//             <Form.Control
//               type="file"
//               name="office"
//               onChange={(e) => {
//                 setImages(e.target.files[0]);
//               }}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3 mt-3">
//             <Form.Label>Comments</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="comments"
//               rows={3}
//               placeholder="Enter Comments"
//               value={comments}
//               onChange={(e) => setComments(e.target.value)}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//       </Container>
//     </div>
//   );
// };

// export default ProfessionalOnboardingForm;

