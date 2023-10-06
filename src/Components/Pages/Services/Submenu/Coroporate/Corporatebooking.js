import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Corporatebooking() {
    const user_id = useParams()
    const useremail = localStorage.getItem("user_email")
    const username = localStorage.getItem("user_name")
    const nav = useNavigate();
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState(useremail);
    const [arrivalInstructions, setArrivalInstructions] = useState("");
    const [name, setName] = useState(username)


    const handleSubmit = async (e) => {

        e.preventDefault(); // Corrected the typo
        nav("/userProfile")

        // try {
        //     // Create a new FormData object
        //     const formData = new FormData();

        //     formData.append("address", address);
        //     formData.append("email", email);
        //     formData.append("name", name);
        //     formData.append("arrival_instructions", arrivalInstructions);
        //     formData.append("password", password);
        //     formData.append("confirmpassword", confirmpassword);

        //     // Make an API request to create a post with the form data
        //     const token = localStorage.getItem("token");
        //     const url = "http://45.13.132.197:5000/api/user/service_book";
        //     const config = {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: token,
        //         },
        //     };

        //     const res = await axios.post(url, formData, config);


        //     const userId = res.data.ref;


        //     nav(`/book/${userId}`);
        //     console.log("Response:", res);
        // } catch (error) {
        //     console.error("Error:", error);

        // }
    };


    return (
        <div className="review_page" id='corporate_form' style={{ marginTop: "300px" }}>
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
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        name="bio"
                        rows="4"
                        value={arrivalInstructions}
                        onChange={(e) => setArrivalInstructions(e.target.value)}
                    />
                </div>


                <button type="submit"
                    className="button"
                >Book</button>
            </form>
        </div>
    )
}

export default Corporatebooking