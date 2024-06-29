import React, { useState, useEffect } from "react";
import Hook from "../Hook/Hook";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from "../../../../Constant";
import { useDispatch, useSelector } from 'react-redux';



function Setting() {
	const dispatch = useDispatch();
	const selector = useSelector((state) => state.counter.formData);
	const profiledata = Array.isArray(selector?.profiledata) && selector.profiledata.length > 0 ? selector.profiledata[0] : [];
	const token = localStorage.getItem("token");
	const nav = useNavigate();

	const username = localStorage.getItem("user_name");

	const [toggle, setToggle] = useState(false);
	const [message, setMessage] = useState("");
	const [passwordError, setPasswordError] = useState("");




	const [first_name, setFirstname] = useState("");
	const [last_name, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");

	const [new_password, setNew_password] = useState("");
	const [old_password, setOld_password] = useState("");
	const [confirm_password, setConfirmPassword] = useState("");

	useEffect(() => {
		setFirstname(profiledata.first_name);
		setLastname(profiledata.last_name);
		setEmail(profiledata.email);
		setMobile(profiledata.mobile);
		localStorage.setItem("user_id", profiledata._id);
		console.log("get setting", profiledata.data);
	}, []);





	const handleUpdateData = () => {
		const data = {
			first_name: first_name,
			last_name: last_name,
			email: email,
			mobile: mobile,
			new_password: new_password,
			old_password: old_password,
			confirm_password: confirm_password
		};

		fetch(`${IP}/user/update`, {
			method: "PUT",
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (response.status === 200) {
					setToggle(false);
					setMessage("Profile updated successfully");

					setTimeout(() => {
						setMessage("");
					}, 1000); // Remove message after 2 seconds

					setPasswordError("");
					return response.json();
				} else {
					setMessage("Profile update failed");

					setTimeout(() => {
						setMessage("");
					}, 1000); // Remove message after 2 seconds

					setPasswordError("");
				}
			})
			.catch((error) => {
				setMessage("Profile update failed");

				setTimeout(() => {
					setMessage("");
				}, 1000); // Remove message after 2 seconds

				setPasswordError("");
				// Handle the error or show an error message to the user
			});
	};


	return (
		<>
			<div className="progressbar_userpannel profileSpace">
				<div id="profile_page">
					<div className="profile__avatar">
						<p className="profile__avatarInitial">
							{username.slice(0, 1).toUpperCase()}

						</p>
					</div>
					<div className="gutter">
						<p className="profile_heading">{message}</p>
					</div>
					<div
						className="profile__divs"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<div className="settings_form">


							<div className="gutter">
								<h3 className="small_heading">Profile Setting</h3>
							</div>

							<div className="profile_info">
								<div className="input_group">
									<label htmlFor="" className="static">
										Your First Name
									</label>
									<input
										type="text"
										className="input"
										value={first_name}
										required
										onChange={(e) => setFirstname(e.target.value)}
									/>
									<span className="highlight"></span>
								</div>
								<div className="input_group">
									<label htmlFor="" className="static">
										Your Last Name
									</label>
									<input
										type="text"
										className="input"
										value={last_name}
										required
										onChange={(e) => setLastname(e.target.value)}
									/>
									<span className="highlight"></span>
								</div>
								<div className="input_group">
									<label htmlFor="" className="static">
										Your Email
									</label>
									<input
										type="email"
										value={email}
										className="input"
										required
										onChange={(e) => setEmail(e.target.value)}
									/>
									<span className="highlight"></span>
								</div>
								<div className="input_group">
									<label htmlFor="" className="static">
										Your Contact Number
									</label>
									<input
										type="number"
										value={mobile}
										className="input"
										required
										onChange={(e) => setMobile(e.target.value)}
									/>
									<span className="highlight"></span>
								</div>

								<div className="input_group">
									<button
										type="submit"
										className="button__small"
										onClick={handleUpdateData}
									>
										Update
									</button>
								</div>
							</div>
						</div>
						<div className="settings_form">


							<div className="gutter">
								<h3 className="small_heading">Change Password</h3>
							</div>

							<div className="profile_info">

								<>
									<div className="input_group">
										<label htmlFor="" className="static">
											Old Password
										</label>
										<input
											type="password"
											value={old_password}
											className="input"
											required
											onChange={(e) => setOld_password(e.target.value)}
										/>
										<span className="highlight"></span>
									</div>
									<div className="input_group">
										<label htmlFor="" className="static">
											New Password
										</label>
										<input
											type="password"
											value={new_password}
											className="input"
											required
											onChange={(e) => setNew_password(e.target.value)}
										/>
										<span className="highlight"></span>
										<p className="error-message">{passwordError}</p>
									</div>
									<div className="input_group">
										<label htmlFor="" className="static">
											Confirm New Password
										</label>
										<input
											type="password"
											value={confirm_password}
											className="input"
											required
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
										<span className="highlight"></span>
									</div>
									<div className="input_group">
										<button
											type="submit"
											className="button__small"
											onClick={handleUpdateData}
										>
											Update
										</button>
									</div>
								</>
								{/* )} */}
							</div>
						</div>
					</div>
				</div>
				<ToastContainer />
			</div>

		</>

	);
}

export default Setting;
