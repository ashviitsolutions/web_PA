// // import React, { useState, useEffect } from "react";
// // import { Button, Form, Row } from "react-bootstrap";
// // import DocumentFileInput from "./DocumentFileInput";
// // import { IP } from "../../../Constant";

// // const ThirdForm = (props) => {
// //   let saveAndContinue = (e) => {
// //     e.preventDefault();
// //     props.nextStep();
// //   };
// //   let previousStep = (e) => {
// //     e.preventDefault();
// //     props.previousStep();
// //   };

// //   const [upload, setUpload] = useState(true);
// //   const [license, setLicense] = useState(null);
// //   const [insurance, setInsurance] = useState(null);
// //   const [drivingLicense, setDrivingLicense] = useState(null);

// //   const token = localStorage.getItem("providertoken")

// //   const handleFormSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const bodyFormData = new FormData();
// //       bodyFormData.append("license", license);
// //       bodyFormData.append("insurance", insurance);
// //       bodyFormData.append("drivinglicense", drivingLicense);
// //       const response = await fetch(`${IP}/provider/documents`, {
// //         method: 'PUT',
// //         headers: {
// //           Authorization: token,
// //         },
// //         body: bodyFormData
// //       });
// //       setUpload(true);
// //       console.log("image pdf", response);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };




// //   // useEffect(() => {
// //   //   handleFileChange()
// //   // }, [])


// //   return (
// //     <div>
// //       <Form className="col-md-8 mx-auto" style={{}} onSubmit={handleFormSubmit}>

// //         {upload ? <Row id="upload" style={{ minHeight: "70vh", alignContent: "center" }}>

// //           <DocumentFileInput
// //             title="license"
// //             type="file"
// //             accept=".pdf"
// //             value={license}
// //             onChange={(e) => setLicense(e.target.files[0])}
// //           />

// //           <div className="text-center" id="isurancecard">
// //             <Form.Group className="mb-3 mt-3 col-md-4 mx-auto">
// //               <Form.Control type="file" accept=".pdf" onChange={(e) => setLicense(e.target.files[0])} />
// //             </Form.Group>
// //           </div>

// //           <DocumentFileInput
// //             title="insurance Insurance"
// //             type="file"
// //             accept=".pdf"
// //             value={insurance}
// //             onChange={(e) => setInsurance(e.target.files[0])}
// //           />

// //           <div className="text-center" id="isurancecard">
// //             <Form.Group className="mb-3 mt-3 col-md-4 mx-auto">
// //               <Form.Control type="file" accept=".pdf" onChange={(e) => setInsurance(e.target.files[0])} />
// //             </Form.Group>
// //           </div>



// //           <DocumentFileInput
// //             title="Driving License"
// //             type="file"
// //             accept=".pdf"
// //             value={drivingLicense}
// //             onChange={(e) => setDrivingLicense(e.target.files[0])}
// //           />

// //           <div className="text-center" id="isurancecard">
// //             <Form.Group className="mb-3 mt-3 col-md-4 mx-auto">
// //               <Form.Control type="file" accept=".pdf" onChange={(e) => setDrivingLicense(e.target.files[0])} />
// //             </Form.Group>
// //           </div>



// //         </Row> : <div className="content" style={{
// //           height: "70vh", display: 'flex', flexDirection: 'column',
// //           justifyContent: 'center',
// //         }}>
// //           <h2 className="text-center">Form Submitted Successfully</h2>
// //         </div>}


// //         <div className="text-center"><Button type="submit">Upload</Button></div>
// //         <Row style={{ justifyContent: "space-between", padding: '10px' }}>
// //           <Button
// //             style={{ width: "auto" }}
// //             variant="primary"
// //             onClick={previousStep}
// //             type="submit"
// //           >
// //             Previous
// //           </Button>
// //           <Button
// //             className="button small"
// //             variant="primary"
// //             onClick={saveAndContinue}
// //             type="submit"
// //           >
// //             Next
// //           </Button>
// //         </Row>
// //       </Form>
// //     </div>
// //   );
// // };

// // export default ThirdForm;








// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useState } from "react";
// import { Button, Form, Row } from "react-bootstrap";
// import TimePicker from "./TimePicker";
// import { IP } from '../../../Constant'




// const FirstForm = (props) => {
//   const [images, setImages] = useState(null);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState("");
//   const token = localStorage.getItem("providertoken")
//   const [user, setUser] = useState({})
//   const [services, setServices] = useState([])
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState('');
//   const [ssn, setSsn] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [DOB, setDOB] = useState("");
//   const [address, setAddress] = useState("");
//   const [zip, setZip] = useState("");
//   const [country, setCountry] = useState("");
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState([]);
//   const [workingShift, setWorkingShift] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [selectedOption, setSelectedOption] = useState(''); // initialize state with empty string
//   const [ref1Name, setRef1Name] = useState('');
//   const [ref1Phone, setRef1Phone] = useState('');
//   const [ref2Name, setRef2Name] = useState('');
//   const [ref2Phone, setRef2Phone] = useState('');
//   const [submitDate, setSubmitDate] = useState("")
//   // const [images, setImages] = useState('')

//   const [availabilityHours, setAvailabilityHours] = useState({
//     mon_Start_time: "",
//     tue_Start_time: "",
//     wed_Start_time: "",
//     thu_Start_time:"",
//     fri_Start_time: "",
//     sat_Start_time: "",
//     sun_Start_time: "",


//     mon_End_time: "",
//     tue_End_time: "",
//     wed_End_time: "",
//     thu_End_time:"",
//     fri_End_time: "",
//     sat_End_time: "",
//     sun_End_time: "",
//   });


//   const handleAvailabilityHoursChange = (id, value) => {
//     setAvailabilityHours((prevState) => ({
//       ...prevState,
//       [id]: value,
//     }));
//   };


//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value); // update state with selected value
//   }
//   const handleInputChange = (e) => {
//     setDOB(e.target.value);
//   };

//   const handleShiftChange = (e) => {
//     setWorkingShift(e.target.value);
//   }


//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   }


//   const handleRef1NameChange = (e) => {
//     setRef1Name(e.target.value);
//   }

//   const handleRef1PhoneChange = (e) => {
//     setRef1Phone(e.target.value);
//   }

//   const handleRef2NameChange = (e) => {
//     setRef2Name(e.target.value);
//   }

//   const handleRef2PhoneChange = (e) => {
//     setRef2Phone(e.target.value);
//   }


//   const handleSubmitDateChange = (e) => {
//     setSubmitDate(e.target.value);
//   }


//   useEffect(() => {
//     fetch(`${IP}/provider/profile`, {
//       headers: {
//         'Authorization': token
//       }
//     }).then((resp) => {
//       return resp.json()
//     }).then((data) => {
//       setUser(data)
//       setFname(data.first_name)
//       setLname(data.last_name)
//       setEmail(data.email)
//       setPhone(data.phone)
//       setSsn(data.ssn)
//       setDOB(data.DOB)
//       setAddress(data.Address.current_address)
//       setZip(data.Address.zip)
//       setCountry(data.Address.country)
//       setRef1Name(data.professional_references.ref_1_name)
//       setRef1Phone(data.professional_references.ref_1_phone)
//       setRef2Name(data.professional_references.ref_2_name)
//       setRef2Phone(data.professional_references.ref_2_phone)
//     }).catch((error) => {
//       console.log(error)
//     })
//   }, [])


//   //fetch list of services
//   useEffect(() => {
//     fetch(`${IP}/service/view-services`)
//       .then((resp) => {
//         return resp.json()
//       }).then((data) => {
//         setServices(data)
//       }).catch(err => {
//         console.log(err)
//       })
//   }, [])

//   //filters on demand services
//   let ondemand = services.filter((service) => service.category === 'on demand').map((service) => {
//     return service.title
//   })

//   //filter corporate and private services
//   let corporate = services.filter((service) => service.category === 'corporate events' || service.category === 'private events')
//     .map((service) => {
//       return service.title
//     })


//   let areasofexpertise = {
//     ondemand: ondemand,
//     privatecorpevts: corporate
//   };


//   // const handleSubmit = async (event) => {
//   //   console.log("handleSubmit ran");
//   //   event.preventDefault(); // 👈️ prevent page refresh
//   //   let datas = {
//   //     "fname": fname,
//   //     "lname": lname,
//   //     "phone": phone,
//   //     "email": email,
//   //     "DOB": DOB,
//   //     "current_address": address,
//   //     "zip": zip,
//   //     "country": country,
//   //     "on_demand": selectedItems,
//   //     "private_events": selectedItem,
//   //     "working_shift": workingShift,
//   //     "start_date": startDate,
//   //     "working_information": availabilityHours,
//   //     "previous_employee": selectedOption,
//   //     "ref1name": ref1Name,
//   //     "ref1phone": ref1Phone,
//   //     "ref2name": ref2Name,
//   //     "ref2phone": ref2Phone,
//   //     "submission_Date": submitDate,
//   //     "office": images,
//   //     "ssn": ssn

//   //   }
//   //   console.log("updates profile data",datas)
//   //   try {
//   //     const resp = await fetch(`${IP}/provider/update-details`, {
//   //       method: "PUT",
//   //       headers: {
//   //         'Authorization': token,
//   //         'Accept': 'application/json',
//   //         'Content-Type': 'application/json',
//   //       },

//   //       body: JSON.stringify(datas)
//   //     })

//   //     const result = await resp.json()
//   //     console.log("time value first form", result)
//   //     console.log(result)
//   //     props.nextStep();
//   //   } catch (error) {
//   //     console.log("Error show", error)
//   //   }


//   // };


//   const handleSubmit = async (event) => {
//     console.log("handleSubmit ran");
//     event.preventDefault();
  
//     const formData = new FormData();
//     formData.append("fname", fname);
//     formData.append("lname", lname);
//     formData.append("phone", phone);
//     formData.append("email", email);
//     formData.append("DOB", DOB);
//     formData.append("current_address", address);
//     formData.append("zip", zip);
//     formData.append("country", country);
//     formData.append("on_demand", selectedItems);
//     formData.append("private_events", selectedItem);
//     formData.append("working_shift", workingShift);
//     formData.append("start_date", startDate);
//     formData.append("working_information", availabilityHours);
//     formData.append("previous_employee", selectedOption);
//     formData.append("ref1name", ref1Name);
//     formData.append("ref1phone", ref1Phone);
//     formData.append("ref2name", ref2Name);
//     formData.append("ref2phone", ref2Phone);
//     formData.append("submission_Date", submitDate);
//     formData.append("office", images);
//     formData.append("ssn", ssn);
  
//     try {
//       const resp = await fetch(`${IP}/provider/update-details`, {
//         method: "PUT",
//         headers: {
//           Authorization: token,
//         },
//         body: formData,
//       });
  
//       const result = await resp.json();
//       console.log("time value first form", result);
//       console.log(result);
//       props.nextStep();
//     } catch (error) {
//       console.log("Error show", error);
//     }
//   };
  


//   return (
//     <div className="formprovider">
//       <h2 className="text-center mt-2">Application Form</h2>

//       <Form
//         method="post"
//         className="col-md-8 mx-auto mb-2"
//         style={{}}
//         onSubmit={handleSubmit}
//       >
//         <h5>Personal Information</h5>

//         <Form.Group className="mb-3 mt-3">
//           <Form.Label>Name</Form.Label>
//           <Row>
//             <div className="col-md-6 mb-2">
//               <Form.Control
//                 name="fname"
//                 type="text"
//                 placeholder="First Name"
//                 value={fname}
//               />
//             </div>

//             <div className="col-md-6">
//               <Form.Control
//                 name="lname"
//                 type="text"
//                 placeholder="Last Name"
//                 value={lname}
//               />
//             </div>
//           </Row>
//         </Form.Group>


//         <Form.Group className="mb-3 mt-3">
//           <Row>
//             <div className="col-md-6 mb-2">
//               <Form.Label>Social Security</Form.Label>
//               <Form.Control
//                 name="ssn"
//                 type="text"
//                 placeholder="Social Security"
//                 onChange={(e) => setSsn(e.target.value)}
//                 value={ssn}
//               />
//             </div>
//             <div className="col-md-6">
//               <Form.Label htmlFor="DOB">Date of Birth</Form.Label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Date of Birth"
//                 value={DOB}
//                 onChange={handleInputChange}
//                 onFocus={(e) => (e.target.type = "date")}
//                 onBlur={(e) => (e.target.type = "text")}
//               />
//             </div>
//           </Row>
//         </Form.Group>




//         <Form.Group className="mb-3 mt-3">
//           <Row>
//             <div className="col-md-12 mb-2">
//               <Form.Label>E-Mail</Form.Label>
//               <Form.Control
//                 name="email"
//                 type="email"
//                 placeholder="E-Mail"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </Row>
//         </Form.Group>




//         <Form.Group className="mb-3 mt-3">
//           <Row>
//             <div className="col-md-12 mb-2">
//               <Form.Label htmlFor="phone">Phone</Form.Label>
//               <Form.Control
//                 type="phone"
//                 placeholder="Phone"
//                 id="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>
//           </Row>
//         </Form.Group>



//         <Form.Group className="mb-3 mt-3">
//           <Row>
//             <div className="col-md-12 mb-2">
//               <Form.Label htmlFor="current_address">Current Address</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 id="current_address"
//                 placeholder="Current Address"
//                 style={{ height: "100px" }}
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//             </div>
//           </Row>
//         </Form.Group>

//         <Form.Group className="mb-3 mt-3">
//           <Row>
//             <div className="col-md-12 mb-2">
//               <Form.Label htmlFor="zip">ZIP Code</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="ZIP Code"
//                 id="zip"
//                 value={zip}
//                 onChange={(e) => setZip(e.target.value)}
//               />
//             </div>
//           </Row>
//         </Form.Group>

//         <Form.Group className="mb-3 mt-3">
//           <Row>
//             <div className="col-md-12 mb-2">
//               <Form.Label htmlFor="country">Country</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Country"
//                 id="country"
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//               />
//             </div>
//           </Row>
//         </Form.Group>



//         <hr className="hr" />
//         <h5>Areas of Expertise</h5>
//         <h6>On Demand</h6>

//         {areasofexpertise.ondemand.map((item, id) => (
//           <Form.Check
//             key={id}
//             inline
//             id={id + 1}
//             label={item}
//             name="group1"
//             value={item}
//             checked={selectedItems.includes(item)}
//             onChange={(e) => {
//               const itemValue = e.target.value;
//               setSelectedItems(prevSelectedItems => {
//                 if (prevSelectedItems.includes(itemValue)) {
//                   return prevSelectedItems.filter(selectedItem => selectedItem !== itemValue);
//                 } else {
//                   return [...prevSelectedItems, itemValue];
//                 }
//               });
//             }}
//           />
//         ))}

//         <h6>Private Corporate Events</h6>

//         {areasofexpertise.privatecorpevts.map((item, id) => (
//           <Form.Check
//             key={id}
//             inline
//             id={id + 1}
//             label={item}
//             name="group1"
//             value={item}
//             checked={selectedItem.includes(item)}
//             onChange={(e) => {
//               const itemValue = e.target.value;
//               setSelectedItem(prevSelectedItems => {
//                 if (prevSelectedItems.includes(itemValue)) {
//                   return prevSelectedItems.filter(selectedItem => selectedItem !== itemValue);
//                 } else {
//                   return [...prevSelectedItems, itemValue];
//                 }
//               });
//             }}
//           />
//         ))}
//         <hr className="hr" />
//         <h5>Working Shift</h5>
//         <Form.Check
//           inline
//           id={"parttime"}
//           label={"Part Time"}
//           name="working_shift"
//           type={'radio'}
//           value="part-time"
//           checked={workingShift === "part-time"}
//           onChange={handleShiftChange}
//         />
//         <Form.Check
//           inline
//           id={"fulltime"}
//           label={"Full Time"}
//           name="workingshift"
//           type={'radio'}
//           value="full-time"
//           checked={workingShift === "full-time"}
//           onChange={handleShiftChange}
//         />


//         <hr className="hr" />
//         <h5>Working Information</h5>
//         <div className="col-md-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Start Date"
//             value={startDate}
//             onChange={handleStartDateChange}
//             onFocus={(e) => (e.target.type = "date")}
//             onBlur={(e) => (e.target.type = "text")}
//           />
//         </div>

//         <div className="dayselected" style={{ display: "flex" }}>
//           <div className="col-md-10 mb-2 timerange">
//             <p className="mt-2">Availability Hours</p>
//             <TimePicker
//               id="mon"
//               label="Monday (Start Time)"
//               value={availabilityHours.mon_Start_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("mon_Start_time", selectedTime)}
//             />

//             <TimePicker
//               id="tue"
//               label="Tuesday (Start Time)"
//               value={availabilityHours.tue_Start_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("tue_Start_time", selectedTime)}
//             />
//             <TimePicker
//               id="wed"
//               label="Wednesday (Start Time)"
//               value={availabilityHours.wed_Start_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("wed_Start_time", selectedTime)}
//             />


//             <TimePicker
//               id="thu"
//               label="Thursday (Start Time)"
//               value={availabilityHours.thu_Start_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("thu_Start_time", selectedTime)}
//             />

//             <TimePicker
//               id="fri"
//               label="Friday (Start Time)"
//               value={availabilityHours.fri_Start_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("fri_Start_time", selectedTime)}
//             />

//             <TimePicker
//               id="sat"
//               label="Saturday (Start Time)"
//               value={availabilityHours.sat_Start_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("sat_Start_time", selectedTime)}
//             />

//             <TimePicker
//               id="sun"
//               label="Sunday (Start Time)"
//               value={availabilityHours.sun_Start_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("sun_Start_time", selectedTime)}
//             />



//           </div>

//           <div className="col-md-10 mb-2 timerange" id="secondtimers">
//             <TimePicker
//               id="mon"
//               label="Monday (End Time)"
//               value={availabilityHours.mon_End_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("mon_End_time", selectedTime)}
//             />

//             <TimePicker
//               id="tue"
//               label="Tuesday (End Time)"
//               value={availabilityHours.tue_End_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("tue_End_time", selectedTime)}
//             />
//             <TimePicker
//               id="wed"
//               label="Wednesday (End Time)"
//               value={availabilityHours.wed_End_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("wed_End_time", selectedTime)}
//             />


//             <TimePicker
//               id="thu"
//               label="Thursday (End Time)"
//               value={availabilityHours.thu_End_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("thu_End_time", selectedTime)}
//             />

//             <TimePicker
//               id="fri"
//               label="Friday (End Time)"
//               value={availabilityHours.fri_End_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("fri_End_time", selectedTime)}
//             />

//             <TimePicker
//               id="sat"
//               label="Saturday (End Time)"
//               value={availabilityHours.sat_End_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("sat_End_time", selectedTime)}
//             />

//             <TimePicker
//               id="sun"
//               label="Sunday (End Time)"
//               value={availabilityHours.sun_End_time}
//               onChange={(selectedTime) => handleAvailabilityHoursChange("sun_End_time", selectedTime)}
//             />



//           </div>

//         </div>

//         <div>
//         </div>





//         <hr className="hr" />
//         <h5>Have you ever been employed with Productive Alliance LLC</h5>
//         <Form.Check
//           inline
//           id={"yes"}
//           label={"Yes"}
//           name="workwithus"
//           type={'radio'}
//           value={'yes'}
//           checked={selectedOption === 'yes'}
//           onChange={handleOptionChange}
//         />
//         <Form.Check
//           inline
//           id={"no"}
//           label={"No"}
//           name="workwithus"
//           type={'radio'}
//           value={'no'}
//           checked={selectedOption === 'no'}
//           onChange={handleOptionChange}
//         />



//         <hr className="hr" />
//         <h5>
//           Professional References
//         </h5>
//         <p> List two references who are willing to provide a professional reference (please do not include family members nor people who reside with you)</p>
//         <Form.Group className="mb-3 mt-3">
//           <Row>
//             <div className="col-md-6 mb-2">
//               <Form.Label>Reference 1 Name</Form.Label>
//               <Form.Control
//                 name="ref1name"
//                 type="text"
//                 placeholder="Reference 1 Name"
//                 value={ref1Name}
//                 onChange={handleRef1NameChange}
//               />
//             </div>
//             <div className="col-md-6 mb-2">
//               <Form.Label>Reference 1 Phone</Form.Label>
//               <Form.Control
//                 name="ref1phone"
//                 type="text"
//                 placeholder="Reference 1 Phone"
//                 value={ref1Phone}
//                 onChange={handleRef1PhoneChange}
//               />
//             </div>
//             <div className="col-md-6 mb-2">
//               <Form.Label>Reference 2 Name</Form.Label>
//               <Form.Control
//                 name="ref2name"
//                 type="text"
//                 placeholder="Reference 2 Name"
//                 value={ref2Name}
//                 onChange={handleRef2NameChange}
//               />
//             </div>
//             <div className="col-md-6 mb-2">
//               <Form.Label>Reference 2 Phone</Form.Label>
//               <Form.Control
//                 name="ref2phone"
//                 type="text"
//                 placeholder="Reference 2 Phone"
//                 value={ref2Phone}
//                 onChange={handleRef2PhoneChange}
//               />
//             </div>
//           </Row>
//         </Form.Group>




//         <hr className="hr" />
//         <h5>Office Images</h5>
//         <p>Please upload your images of your office space and its  environment.</p>
    

//         <Form.Group>
//         <Form.Label>Choose an image:</Form.Label>
//         <Form.Control
//           name="office"
//           type="file"
//           onChange={(e) => {
//             let reader = new FileReader();
//             let file = e.target.files[0];

//             reader.onloadend = () => {
//               setImagePreviewUrl(reader.result);
//             };

//             reader.readAsDataURL(file);
//             setImages(file);

//           }}
//         />
//         {imagePreviewUrl && (
//           <img src={imagePreviewUrl} alt="Preview"  style={{
//             width: "40%",
//             borderRadius: "7px",
      
//           }} />
//         )}
//       </Form.Group>

//         <hr className="hr" />
//         <h5>
//           Submission Date <FontAwesomeIcon icon={faCalendar} />
//         </h5>
//         <div className="col-md-4 mb-2">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Submission Date"
//             value={submitDate}
//             onChange={handleSubmitDateChange}
//             onFocus={(e) => (e.target.type = "date")}
//             onBlur={(e) => (e.target.type = "text")}
//           />

//         </div>
//         <hr className="hr" />

//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default FirstForm;

// import React, { useState, useEffect } from "react";
// import { ProgressBar } from "react-bootstrap";
// import FirstForm from "./FirstForm";
// import SecondForm from "./SecondForm";
// import ThirdForm from "./ThirdForm";
// import FourthForm from "./FourthForm";
// import Satatuspage from "./Satatuspage";
// import { IP } from "../../../Constant";

// const MultiStepForm = () => {
//   const [user, setUser] = useState({});
//   const token = localStorage.getItem("providertoken");
//   useEffect(() => {
//     fetch(`${IP}/provider/profile`, {
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((resp) => {
//         return resp.json();
//       })
//       .then((data) => {
//         console.log("multistep form", data.application_status);
//         setUser(data.application_status);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [token,user]);

// console.log("application_status id",user)
//   const [now, setnow] = useState(25);
//   let nextStep = () => {
//     setnow(now < 100 ? now + 25 : now);
//   };
//   let previousStep = () => {
//     setnow(now > 26 ? now - 25 : now);
//   };
//   let form;
//   switch (now) {
//     case 25:
//       if (user === 0) {
//         form = <FirstForm step={now} nextStep={nextStep} previousStep={previousStep} />;
//       } else {
//         setnow(50);
//       }
//       break;
//     case 50:

//       if (user === 1) {
//         form = <SecondForm step={now} nextStep={nextStep} previousStep={previousStep} />;
//       } else {
//         setnow(75);
//       }
//       break;

//     case 75:
//       if (user === 2) {
//         form = <ThirdForm step={now} nextStep={nextStep} previousStep={previousStep} />;

//       } else {
//         setnow(100);

//       }
//       break;
//     case 100:
//       if (user === 3) {
//         form = <FourthForm step={now} nextStep={nextStep} previousStep={previousStep} />;

//       } else {
//         form = <Satatuspage  />;

//       }
//       break;
//     default:
//       break;
//   }

//   return (
//     <>
//       <ProgressBar className="progressbarproviders mt-4" now={now} label={`${now}%`} />
//       {form}
//     </>
//   );
// };

// export default MultiStepForm;











// import React, { useState, useEffect } from "react";
// import { ProgressBar } from "react-bootstrap";
// import FirstForm from "./FirstForm";
// import SecondForm from "./SecondForm";
// import ThirdForm from "./ThirdForm";
// import FourthForm from "./FourthForm";
// import Satatuspage from "./Satatuspage";
// import { IP } from "../../../Constant";

// const MultiStepForm = () => {
//   const [user, setUser] = useState({});
//   const token = localStorage.getItem("providertoken");
//   useEffect(() => {
//     fetch(`${IP}/provider/profile`, {
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((resp) => {
//         return resp.json();
//       })
//       .then((data) => {
//         console.log("multistep form", data.application_status);
//         setUser(data.application_status);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [token,user]);

// console.log("application_status id",user)
//   const [now, setnow] = useState(25);
//   let nextStep = () => {
//     setnow(now < 100 ? now + 25 : now);
//   };
//   let previousStep = () => {
//     setnow(now > 26 ? now - 25 : now);
//   };
//   let form;
//   switch (user) {
//     case 0:
//       form = <FirstForm step={now} nextStep={nextStep} previousStep={previousStep} />;
//       break;
//     case 1:
//       form = <SecondForm step={now} nextStep={nextStep} previousStep={previousStep} />;
//       break;
//     case 2:
//       form = <ThirdForm step={now} nextStep={nextStep} previousStep={previousStep} />;
//       break;
//     case 3:
//       form = <FourthForm step={now} nextStep={nextStep} previousStep={previousStep} />;
//       break;
//       case 4:
//         form = <Satatuspage />;

//       break;
//     default:
//       break;
//   }
  

//   return (
//     <>
//       <ProgressBar className="progressbarproviders mt-4" now={now} label={`${now}%`} />
//       {form}
//     </>
//   );
// };

// export default MultiStepForm;



// import React, { useState, useEffect } from "react";
// import { ProgressBar } from "react-bootstrap";
// import FirstForm from "./FirstForm";
// import SecondForm from "./SecondForm";
// import ThirdForm from "./ThirdForm";
// import FourthForm from "./FourthForm";
// import Satatuspage from "./Satatuspage";
// import { IP } from "../../../Constant";


// const MultiStepForm = () => {


//   const [now, setnow] = useState(25);
//   const [user, setUser] = useState({});
//   const token = localStorage.getItem("providertoken");
//   useEffect(() => {
//     fetch(`${IP}/provider/profile`, {
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((resp) => {
//         return resp.json();
//       })
//       .then((data) => {
//         console.log("multistep form", data.application_status);
//         setUser(data.application_status);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [token]);

//   let nextStep = () => {
//     setnow(now < 100 ? now + 25 : now);
//   };
//   let previousStep = () => {
//     setnow(now > 26 ? now - 25 : now);
//   };

//   let form;
//   switch (user) {
//     case 0:
//         form = <FirstForm step={now} nextStep={nextStep} previousStep={previousStep} />;
//       break;
//     case 1:
//       form = <SecondForm step={now} nextStep={nextStep} previousStep={previousStep} />;
//       break;
//     case 2:
//         form = <ThirdForm step={now} nextStep={nextStep} previousStep={previousStep} />;
//       break;
//     case 3:
//       form = <FourthForm step={now} nextStep={nextStep} previousStep={previousStep} />;
//       break;

//       case 4:
//         form = <Satatuspage step={now} nextStep={nextStep} previousStep={previousStep} />;
//         break;
//     default:
//       break;
//   }

//   return (
//     <>
//       <ProgressBar className="progressbarproviders mt-4" now={now} label={`${now}%`} />
//       {form}
//     </>
//   );
// };

// export default MultiStepForm;






import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm";
import FourthForm from "./FourthForm";
import Satatuspage from "./Satatuspage";
import { IP } from "../../../Constant";


const MultiStepForm = () => {
  const [user, setUser] = useState({});
  const [now, setnow] = useState(25);
  const token = localStorage.getItem("providertoken");
  useEffect(() => {
    fetch(`${IP}/provider/profile`, {
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log("multistep form", data.application_status);
        setUser(data);

        if(data.application_status===0){
          setnow(25)
         }else if(data.application_status===1){
          setnow(50)
         }else if(data.application_status===2){
          setnow(75)
         }else if(data.application_status===3){
          setnow(100)
         }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  
  let nextStep = () => {
    setnow(now < 100 ? now + 25 : now);
  };
  let previousStep = () => {
    setnow(now > 26 ? now - 25 : now);
  };

  let form;
  switch (user.application_status) {
    case 0:
        form = <FirstForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;
    case 1:
      form = <SecondForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;
    case 2:
        form = <ThirdForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;
    case 3:
      form = <FourthForm step={now} nextStep={nextStep} previousStep={previousStep} />;
      break;

      case 4:
        form = <Satatuspage step={now} nextStep={nextStep} previousStep={previousStep} />;
        break;
    default:
      break;
  }

  return (
    <>
      <ProgressBar className="progressbarproviders mt-4" now={now} label={`${now}%`} />
      {form}
    </>
  );
};

export default MultiStepForm;

