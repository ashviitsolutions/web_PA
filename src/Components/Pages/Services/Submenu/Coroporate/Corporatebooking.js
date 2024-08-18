import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IP } from '../../../../../Constant';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Corporatebooking() {
    const { service_id } = useParams();
    const useremail = localStorage.getItem("user_email");
    const username = localStorage.getItem("user_name");
    const [ loading , setLoading]=useState(false)
    const nav = useNavigate();

    const [name, setName] = useState(username);
    const [companyName, setCompanyName] = useState("");
    const [service, setService] = useState(service_id);
    const [hours, setHours] = useState(0);
    const [numPeople, setNumPeople] = useState(0);
    const [email, setEmail] = useState(useremail);
    const [contactNo, setContactNo] = useState("");
    const [address, setAddress] = useState("");
    const [arrivalInstructions, setArrivalInstructions] = useState("");

    const handleSelect = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const ll = await getLatLng(results[0]);
            console.log(ll);
            setAddress(value);
        } catch (error) {
            console.error("Error selecting location:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response = await fetch(`${IP}/user/sendbookingemail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    companyName,
                    service,
                    hours,
                    numPeople,
                    contactNo,
                    address,
                    arrivalInstructions,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setLoading(false)
                toast.success("Booking successful. A confirmation SMS will be sent shortly!", {
                    position: "top-right",
                    autoClose: 2000,
                    onClose: () => {
                        nav('/services');
                    },
                });

            } else {
                setLoading(false)
                const errorResult = await response.json();
                console.error(errorResult);
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 2000,
                });
                // Handle error response here
            }
        } catch (error) {
            setLoading(false)
            console.error("Error sending booking email:", error);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
            // Handle general error here
        }
    };
    return (
        <>
            <ToastContainer />
            <div className='new_book'>
                <div className="review_page" id="corporate_form" style={{ marginTop: "300px" }}>
                    <form onSubmit={handleSubmit}>
                        

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="form-group half">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group half">
                            <label htmlFor="name">Company Name:</label>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Your Service:</label>
                            <input
                                type="text"
                                name="service"
                                placeholder="Enter service name"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                required
                            />
                        </div>
                        

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="form-group half">
                                <label htmlFor="name">No. of hours:</label>
                                <input
                                    type="number"
                                    name="hours"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group half">
                                <label htmlFor="name">No. of People :</label>
                                <input
                                    type="number"
                                    name="numPeople"
                                    value={numPeople}
                                    onChange={(e) => setNumPeople(e.target.value)}
                                    required
                                />
                            </div>
                            </div>
                            

                        <div style={{ display: "flex", justifyContent: "space-between" }}>

                        <div className="form-group half">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group half">
                            <label htmlFor="address">Contact No.:</label>
                            <input
                                type="text"
                                name="contactNo"
                                placeholder="Enter contact Number"
                                value={contactNo}
                                onChange={(e) => setContactNo(e.target.value)}
                                required
                            />
                        </div>
                        </div>


                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
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



                        <div className="form-group">
                            <label htmlFor="bio">Any Additional Instruction:</label>
                            <textarea
                                name="arrivalInstructions"
                                rows="4"
                                value={arrivalInstructions}
                                onChange={(e) => setArrivalInstructions(e.target.value)}
                            />
                        </div>
                        <p style={{ textAlign: "center" }}>
                            <button type="submit" className="button">
                            {!loading ? "Submit Inquiry":"Loading"}
                                
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </>

    );
}

export default Corporatebooking;
