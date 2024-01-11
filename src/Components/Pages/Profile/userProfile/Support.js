import React, { useState } from "react";
import "./UserProfileStyle.css";
import { IP } from "../../../../Constant";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
			<h3>Describe your issue below and we will get back to you</h3>
			<textarea
				name=""
				id=""
				className="support__input"
				rows={10}
				onChange={(e) => setText(e.target.value)}
			></textarea>
			<button className="support__button" disabled={!text} onClick={onSubmit}>
				Submit
			</button>
			<ToastContainer closeOnClick newestOnTop autoClose={true} />
		</div>
	);
};

export default Support;
