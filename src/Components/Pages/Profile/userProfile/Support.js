import React, { useState } from "react";
import "./UserProfileStyle.css";
import { IP } from "../../../../Constant";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import support from "../../../../Components/assets/img/support.jpg"

const Support = () => {
	const [text, setText] = useState("");
	const token = localStorage.getItem("token");
	const username = localStorage.getItem("user_name");
	const user_email = localStorage.getItem("user_email");
	const onSubmit = async () => {
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
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",

				// transition: "zoom",
			});
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="container__view" style={{ marginTop: 30 }}>
			<div className="row supportSection">
				<div className="col-md-4">
					<img src={support} className="careImg" />
				</div>
				<div className="col-md-8">
					<h3>Please describe your concern to us bellow</h3>
					<p>We will get back to you within 24 hours</p>
					<p>
						<textarea
						name=""
						id=""
						className="support__input col-md-12"
						rows={10}
						onChange={(e) => setText(e.target.value)}
					></textarea>
					</p>
					<p>
					<button className="support__button" disabled={!text} onClick={onSubmit}>
						Submit
					</button>
					</p>
					<ToastContainer closeOnClick newestOnTop autoClose={true} />
				</div>
			</div>
		</div>
	);
};

export default Support;
