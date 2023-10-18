import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Corporatebooking() {
    const user_id = useParams();
    const useremail = localStorage.getItem("user_email");
    const username = localStorage.getItem("user_name");
    const nav = useNavigate();

    const [name, setName] = useState(username);
    const [companyName, setCompanyName] = useState("");
    const [service, setService] = useState("");
    const [hours, setHours] = useState(0);
    const [numPeople, setNumPeople] = useState(0);
    const [email, setEmail] = useState(useremail);
    const [contactNo, setContactNo] = useState("");
    const [address, setAddress] = useState("");
    const [arrivalInstructions, setArrivalInstructions] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        nav("/userProfile");
        // Your form submission logic here
    };

    return (
        <div className="review_page" id="corporate_form" style={{ marginTop: "300px" }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Company Name:</label>
                    <input
                        type="text"
                        name="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Your Service:</label>
                    <input
                        type="text"
                        name="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="form-group">
                        <label htmlFor="name">No. of hours:</label>
                        <input
                            type="number"
                            name="hours"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
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

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Contact No.:</label>
                    <input
                        type="text"
                        name="contactNo"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
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

                <button type="submit" className="button">
                    Book
                </button>
            </form>
        </div>
    );
}

export default Corporatebooking;
