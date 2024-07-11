import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import TimePicker from "./TimePicker";
import { IP } from '../../../Constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useSelector } from 'react-redux';



const FirstForm = (props) => {
  const formData = useSelector((state) => state?.counter?.formData);
  const dataprofile = formData.provider_profile && formData.provider_profile[0] ? formData.provider_profile[0] : "";
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });




  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const ll = await getLatLng(results[0]);
      console.log(ll);
      setAddress(value);
      setCoordinates(ll);
    } catch (error) {
      console.error("Error selecting location:", error);
    }
  }



  useEffect(() => {
    handleSelect();
  }, [])




  const [images, setImages] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const token = localStorage.getItem("providertoken")
  const [user, setUser] = useState([])
  const [services, setServices] = useState([])
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState('');
  const [ssn, setSsn] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [workingShift, setWorkingShift] = useState('');
  const [startDate, setStartDate] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // initialize state with empty string
  const [ref1Name, setRef1Name] = useState('');
  const [ref1Phone, setRef1Phone] = useState('');
  const [ref2Name, setRef2Name] = useState('');
  const [ref2Phone, setRef2Phone] = useState('');
  const [submitDate, setSubmitDate] = useState("")
  const [selectedPrivateEvents, setSelectedPrivateEvents] = useState([]);
  const [selectedCorporateEvents, setSelectedCorporateEvents] = useState([]);








  console.log(coordinates.lat, coordinates.lng)





  const [availabilityHours, setAvailabilityHours] = useState([
    { day: 'Monday', start_time: '', end_time: '' },
    { day: 'Tuesday', start_time: '', end_time: '' },
    { day: 'Wednesday', start_time: '', end_time: '' },
    { day: 'Thursday', start_time: '', end_time: '' },
    { day: 'Friday', start_time: '', end_time: '' },
    { day: 'Saturday', start_time: '', end_time: '' },
    { day: 'Sunday', start_time: '', end_time: '' },
  ]);

  console.log('top availabilityHours', availabilityHours)


  const handleAvailabilityHoursChange = (index, timeType, value) => {
    setAvailabilityHours(prevState => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], [timeType]: value };
      return newState;
    });
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // update state with selected value
  }
  const handleInputChange = (e) => {
    setDOB(e.target.value);
  };

  const handleShiftChange = (e) => {
    setWorkingShift(e.target.value);
  }


  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  }


  const handleRef1NameChange = (e) => {
    setRef1Name(e.target.value);
  }

  const handleRef1PhoneChange = (e) => {
    setRef1Phone(e.target.value);
  }

  const handleRef2NameChange = (e) => {
    setRef2Name(e.target.value);
  }

  const handleRef2PhoneChange = (e) => {
    setRef2Phone(e.target.value);
  }


  const handleSubmitDateChange = (e) => {
    setSubmitDate(e.target.value);
  }


  useEffect(() => {
    setUser(dataprofile)
    setCountry(dataprofile?.mailing_address?.country)
    setZip(dataprofile?.mailing_address?.postal_code)
    setCity(dataprofile?.mailing_address?.city)
    setState(dataprofile?.mailing_address?.state)
    setFname(dataprofile?.first_name)
    setLname(dataprofile?.last_name)
    setEmail(dataprofile?.email)
    setPhone(dataprofile?.phone)
    setSsn(dataprofile?.ssn)
    setDOB(dataprofile?.DOB)
    setAddress(dataprofile?.Address?.current_address)

    setRef1Name(dataprofile?.professional_references?.ref_1_name)
    setRef1Phone(dataprofile?.professional_references?.ref_1_phone)
    setRef2Name(dataprofile?.professional_references?.ref_2_name)
    setRef2Phone(dataprofile?.professional_references?.ref_2_phone)
  }, [])

  console.log(country)
  //fetch list of services
  useEffect(() => {
    fetch(`${IP}/service/view-services`)
      .then((resp) => {
        return resp.json()
      }).then((data) => {
        setServices(data)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  //filters on demand services
  // let ondemand = services.filter((service) => service.category === 'on demand').map((service) => {
  //   return service.title
  // })


  let ondemand = services
    .filter((service) => service.category === 'on demand')
    .map((service) => {
      return { id: service._id, title: service.title };
    });

  console.log("On Demand Services:", ondemand);

  // Filter private events
  let privateEvents = services
    .filter((service) => service.category === 'private events')
    .map((service) => {
      return { id: service._id, title: service.title };
    });


  console.log("On privateEvents Services:", privateEvents);
  // Filter corporate events
  let corporateEvents = services
    .filter((service) => service.category === 'corporate events')
    .map((service) => {
      return { id: service._id, title: service.title };
    });



  let areasofexpertise = {
    ondemand: ondemand,
    privateevents: privateEvents,
    corporateevents: corporateEvents,
  };




  const handleSubmit = async (event) => {

    // console.log("availabilityHoursavailabilityHoursavailabilityHours", availabilityHours)

    event.preventDefault();

    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("DOB", DOB);
    formData.append("address", address);
    formData.append("postal_code", zip);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("on_demand", selectedItems);
    formData.append("private_events", selectedPrivateEvents);
    formData.append("corporate_events", selectedCorporateEvents);
    formData.append("working_shift", workingShift);
    formData.append("start_date", startDate);
    formData.append("working_information", JSON.stringify(availabilityHours));
    formData.append("previous_employee", selectedOption);
    formData.append("ref_1_name", ref1Name);
    formData.append("ref_1_phone", ref1Phone);
    formData.append("ref_2_name", ref2Name);
    formData.append("ref_2_phone", ref2Phone);
    formData.append("submission_Date", submitDate);
    formData.append("office", images);
    formData.append("ssn", ssn);
    formData.append("longitude", coordinates.lng);
    formData.append("latitude", coordinates.lat);


    // console.log("handleSubmit ran", JSON.stringify(availabilityHours));

    try {
      const resp = await fetch(`${IP}/provider/update-details`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const result = await resp.json();

      if (resp.status === 200) {
        localStorage.setItem("applicationstatus", 1);
        console.log("result Services:", result);
        toast.success("Your Registration successfully!", {
          position: "top-right",
          autoClose: 2000,

        });
        props.nextStep();
      } else {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }



    } catch (error) {
      console.log("Error show", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };



  return (
    <>
      <div className="formprovider">
        <h2 className="text-center mt-2">Application Form</h2>

        <Form
          method="post"
          className="col-md-8 mx-auto mb-2"
          style={{}}
          onSubmit={handleSubmit}
        >
          <h5>Personal Information</h5>


          {dataprofile && (
            <>
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Name</Form.Label>
                <Row>
                  <div className="col-md-6 mb-2">
                    <Form.Control
                      required
                      name="fname"
                      type="text"
                      placeholder="First Name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <Form.Control
                      required
                      name="lname"
                      type="text"
                      placeholder="Last Name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </div>
                </Row>
              </Form.Group>



              <Form.Group className="mb-3 mt-3">
                <Row>
                  <div className="col-md-6 mb-2">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                      required
                      name="email"
                      type="email"
                      placeholder="E-Mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Label htmlFor="phone">Phone</Form.Label>
                    <Form.Control
                      required
                      type="phone"
                      placeholder="Phone"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </Row>
              </Form.Group>




              <Form.Group className="mb-3 mt-3">
                <Row>
                  <div className="col-md-6 mb-2">
                    <Form.Label htmlFor="zip">ZIP Code</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="ZIP Code"
                      id="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Label htmlFor="country">Country</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Country"
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </Row>
              </Form.Group>


              <Form.Group className="mb-3 mt-3">
                <Row>
                  <div className="col-md-6 mb-2">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      required
                      name="state"
                      type="text"
                      placeholder="Enter State"
                      onChange={(e) => setState(e.target.value)}
                      value={state}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Label htmlFor="DOB">City</Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required

                    />
                  </div>
                </Row>
              </Form.Group>

            </>
          )}












          <Form.Group className="mb-3 mt-3">
            <Row>
              <div className="col-md-6 mb-2">
                <Form.Label>Social Security</Form.Label>
                <Form.Control
                  required
                  name="ssn"
                  type="text"
                  placeholder="Social Security"
                  onChange={(e) => setSsn(e.target.value)}
                  value={ssn}
                />
              </div>
              <div className="col-md-6">
                <Form.Label htmlFor="DOB">Date of Birth</Form.Label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date of Birth"
                  value={DOB}
                  onChange={handleInputChange}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </Row>
          </Form.Group>


          <Form.Group className="mb-3 mt-3">
            <Row>
              <div className="col-md-12 mb-2">
                <Form.Label htmlFor="current_address">Current Address</Form.Label>
                <div className="input_group">
                  <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <input
                          className="input"
                          {...getInputProps()}
                          placeholder="Search for an address here..."
                        />
                        <div>
                          {loading ? <div>Loading...</div> : null}
                          {suggestions.map((suggestion) => {
                            const style = {
                              backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                            };
                            return (
                              <div {...getSuggestionItemProps(suggestion, { style })}>
                                {suggestion.description}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </div>
              </div>
            </Row>
          </Form.Group>

          {/* <hr className="hr" /> */}
          <h5>Areas of Expertise</h5>
          <h6>On Demand</h6>

          {areasofexpertise.ondemand.map((item) => (
            <Form.Check
              key={item.id}  // Use item.id directly without additional curly braces
              inline
              id={item.id}  // Assuming id is unique for each item
              label={item.title}  // Use the specific property (e.g., title) from the item object
              name="group1"
              value={item.id}  // Use the specific property (e.g., id) from the item object
              checked={selectedItems.includes(item.id)}  // Check against the specific property (e.g., id) from the item object
              onChange={(e) => {
                const itemValue = e.target.value;
                setSelectedItems((prevSelectedItems) => {
                  if (prevSelectedItems.includes(itemValue)) {
                    return prevSelectedItems.filter((selectedItem) => selectedItem !== itemValue);
                  } else {
                    return [...prevSelectedItems, itemValue];
                  }
                });
              }}
            />
          ))}

          <hr className="hr" />
          <h6>Private Events</h6>

          {areasofexpertise.privateevents.map((item) => (
            <Form.Check
              key={item.id}
              inline
              id={item.id}
              label={item.title}
              name="group1"
              value={item.id}
              checked={selectedPrivateEvents.includes(item.id)}  // Compare against item.id
              onChange={(e) => {
                const itemValue = e.target.value;
                setSelectedPrivateEvents((prevSelectedItems) => {
                  if (prevSelectedItems.includes(itemValue)) {
                    return prevSelectedItems.filter((selectedItem) => selectedItem !== itemValue);
                  } else {
                    return [...prevSelectedItems, itemValue];
                  }
                });
              }}
            />
          ))}

          <hr className="hr" />



          <h6>Corporate Events</h6>

          {areasofexpertise.corporateevents.map((item) => (
            <Form.Check
              key={item.id}
              inline
              id={item.id}
              label={item.title}
              name="group1"
              value={item.id}
              checked={selectedCorporateEvents.includes(item.id)}  // Compare against item.id
              onChange={(e) => {
                const itemValue = e.target.value;
                setSelectedCorporateEvents((prevSelectedItems) => {
                  if (prevSelectedItems.includes(itemValue)) {
                    return prevSelectedItems.filter(
                      (selectedItem) => selectedItem !== itemValue
                    );
                  } else {
                    return [...prevSelectedItems, itemValue];
                  }
                });
              }}
            />
          ))}





          <hr className="hr" />






          <h5>Working Shift *</h5>
          <Form.Check
            inline
            id={"parttime"}
            label={"Part Time"}
            name="working_shift"
            type={'radio'}
            value="part-time"
            checked={workingShift === "part-time"}
            onChange={handleShiftChange}
          />
          <Form.Check
            inline
            id={"fulltime"}
            label={"Full Time"}
            name="workingshift"
            type={'radio'}
            value="full-time"
            checked={workingShift === "full-time"}
            onChange={handleShiftChange}
          />


          <hr className="hr" />
          <h5>Working Information *</h5>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>



          <div className="dayselected">
            {availabilityHours.map(({ day, start_time, end_time }, index) => (
              <div className="col-md-10 mb-2 timerange" key={day} style={{ marginBottom: "20px" }}>
                <p className="mt-2">{day} Availability Hours</p>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <TimePicker
                    label={`${day} (Start Time)`}
                    value={start_time}
                    onChange={(selectedTime) => handleAvailabilityHoursChange(index, 'start_time', selectedTime)}
                  />
                  <TimePicker
                    label={`${day} (End Time)`}
                    value={end_time}
                    onChange={(selectedTime) => handleAvailabilityHoursChange(index, 'end_time', selectedTime)}
                  />
                </div>
              </div>
            ))}
          </div>


          <div>
          </div>





          <hr className="hr" />
          <h5>Have you ever been employed with Productive Alliance LLC</h5>
          <Form.Check
            inline
            id={"yes"}
            label={"Yes"}
            name="workwithus"
            type={'radio'}
            value={'yes'}
            checked={selectedOption === 'yes'}
            onChange={handleOptionChange}
          />
          <Form.Check
            inline
            id={"no"}
            label={"No"}
            name="workwithus"
            type={'radio'}
            value={'no'}
            checked={selectedOption === 'no'}
            onChange={handleOptionChange}
          />



          <hr className="hr" />
          <h5>
            Professional References
          </h5>
          <p> List two references who are willing to provide a professional reference (please do not include family members nor people who reside with you)</p>
          {<Form.Group className="mb-3 mt-3">
            <Row>
              <div className="col-md-6 mb-2">
                <Form.Label>Reference 1 Name</Form.Label>
                <Form.Control

                  name="ref1name"
                  type="text"
                  placeholder="Reference 1 Name"
                  value={ref1Name}
                  onChange={handleRef1NameChange}
                />
              </div>
              <div className="col-md-6 mb-2">
                <Form.Label>Reference 1 Phone</Form.Label>
                <Form.Control

                  name="ref1phone"
                  type="text"
                  placeholder="Reference 1 Phone"
                  value={ref1Phone}
                  onChange={handleRef1PhoneChange}
                />
              </div>
              <div className="col-md-6 mb-2">
                <Form.Label>Reference 2 Name</Form.Label>
                <Form.Control

                  name="ref2name"
                  type="text"
                  placeholder="Reference 2 Name"
                  value={ref2Name}
                  onChange={handleRef2NameChange}
                />
              </div>
              <div className="col-md-6 mb-2">
                <Form.Label>Reference 2 Phone</Form.Label>
                <Form.Control

                  name="ref2phone"
                  type="text"
                  placeholder="Reference 2 Phone"
                  value={ref2Phone}
                  onChange={handleRef2PhoneChange}
                />
              </div>
            </Row>
          </Form.Group>}




          <hr className="hr" />
          <h5>Office Images</h5>
          <p>Please upload your images of your office space and its  environment.</p>


          <Form.Group>
            <Form.Label>Choose an image:</Form.Label>
            <Form.Control
              required
              name="office"
              type="file"
              onChange={(e) => {
                let reader = new FileReader();
                let file = e.target.files[0];

                reader.onloadend = () => {
                  setImagePreviewUrl(reader.result);
                };

                reader.readAsDataURL(file);
                setImages(file);

              }}
            />
            {imagePreviewUrl && (
              <img src={imagePreviewUrl} alt="Preview" style={{
                width: "40%",
                borderRadius: "7px",

              }} />
            )}
          </Form.Group>

          <hr className="hr" />
          <h5>
            Submission Date <FontAwesomeIcon icon={faCalendar} />
          </h5>
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Submission Date"
              value={submitDate}
              onChange={handleSubmitDateChange}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />

          </div>
          <hr className="hr" />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </>
  );
};

export default FirstForm;
