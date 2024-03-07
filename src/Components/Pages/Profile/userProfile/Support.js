import React, { useState } from "react";
import "./UserProfileStyle.css";
import { IP } from "../../../../Constant";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import support from "../../../../Components/assets/img/support.jpg";

const Support = () => {
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(false); // State to track loading status
	const token = localStorage.getItem("token");
	const username = localStorage.getItem("user_name");
	const user_email = localStorage.getItem("user_email");

	const onSubmit = async () => {
		setLoading(true); // Set loading to true when the button is clicked
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};
		try {
			const response = await axios.post(
				`${IP}/user/sendSupportEmail`,
				{
					email: user_email,
					name: username,
					mobile: "",
					message: text,
				},
				config
			);

			console.log(response.data);
			toast.success(`${response.data.message}`, {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} catch (err) {
			console.log(err);
			toast.error("An error occurred. Please try again.", {
				position: "top-right",
				autoClose: 3000,
			});
		} finally {
			setLoading(false); // Set loading back to false after API call completes
		}
	};

	return (
		<div className="progressbar_userpannel profileSpace">
		<div className="container__view" style={{ marginTop: 30 }}>
			<div className="row supportSection">
				<div className="col-md-4">
					<img src={support} className="careImg" alt="Support" />
				</div>
				<div className="col-md-8">
					<h3>Please describe your concern to us below</h3>
					<p>We will get back to you within 24 hours</p>
					<p>
						<textarea
							name=""
							id=""
							className="support__input col-md-12"
							rows={9}
							onChange={(e) => setText(e.target.value)}
						></textarea>
					</p>
					<p>
						<button className="support__button" disabled={!text || loading} onClick={onSubmit}>
							{loading ? "Sending..." : "Submit"} {/* Show loading text when loading is true */}
						</button>
					</p>
					<ToastContainer closeOnClick newestOnTop autoClose={true} />
				</div>
			</div>
		</div>
		</div>
		
	);
};

export default Support;
