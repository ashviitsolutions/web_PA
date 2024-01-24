import React, { useState, useEffect } from "react";
import Hook from "../Hook/Hook";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from "../../../../Constant";



function Setting() {
	const token = localStorage.getItem("token");
	const nav = useNavigate();
	const username = localStorage.getItem("user_name");
	const [posts, setPosts] = useState([]);
	const [name, setName] = useState(username);
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [toggle, setToggle] = useState(false);
	const [message, setMessage] = useState("");
	const [passwordError, setPasswordError] = useState("");

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await Hook.getProfile();
				setPosts(response.data);
				setEmail(response.data.email);
				setPhone(response.data.phone);
				setName(response.data.name);
				localStorage.setItem("user_id", response.data._id);
				console.log("get setting", response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchPosts();
	}, []);

	const handleHandle = () => {
		setToggle(!toggle);
	};

	const isPasswordValid = () => {
		return password.length >= 8;
	};

	const handleUpdatePassword = () => {
		if (!isPasswordValid()) {
			setPasswordError("Password must be at least 8 characters");
			return;
		}

		const data = {
			password: password,
			confirm_password: confirmPassword,
		};

		fetch(`${IP}/user/change-pass`, {
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

					toast.success("Your Application successfully!", {
						position: "top-right",
						autoClose: 3000,
						onClose: () => {
							nav(`/userProfile`);
						},
					});
					return response.json();
				} else {
					toast.error("An error occurred. Please try again.", {
						position: "top-right",
						autoClose: 2000,
					});
					throw new Error("Password update failed");
				}
			})
			.then((data) => {
				setMessage("Password updated successfully");
				setPasswordError("");
				// You can perform any additional actions upon a successful update here
			})
			.catch((error) => {
				toast.error("An error occurred. Please try again.", {
					position: "top-right",
					autoClose: 2000,
				});
				setMessage("Password update failed");
				// Handle the error or show an error message to the user
			});
	};

	const handleUpdateData = () => {
		const data = {
			name: name,
			email: email,
			phone: phone,
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
					toast.success("Your profile Update successfully!", {
						position: "top-right",
						autoClose: 3000,
						onClose: () => {
							nav(`/userProfile`);
						},
					});
					return response.json();
				} else {
					toast.error("An error occurred. Please try again.", {
						position: "top-right",
						autoClose: 2000,
					});
					throw new Error("Password update failed");
				}
			})
			.then((data) => {
				setMessage("Password updated successfully");
				setPasswordError("");
				// You can perform any additional actions upon a successful update here
			})
			.catch((error) => {
				toast.error("An error occurred. Please try again.", {
					position: "top-right",
					autoClose: 2000,
				});
				setMessage("Password update failed");
				// Handle the error or show an error message to the user
			});
	};

	return (
		<>
			<div id="profile_page">
				<div className="profile__avatar">
					<p className="profile__avatarInitial">
						{username.slice(0, 1).toUpperCase()}
					</p>
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
						{/* <div className="gutter">
				<h3 className="profile_heading">{username}</h3>
			</div> */}

						<div className="gutter">
							<h3 className="small_heading">Profile Setting</h3>
						</div>

						<div className="profile_info">
							<div className="input_group">
								<label htmlFor="" className="static">
									Your Name
								</label>
								<input
									type="text"
									className="input"
									value={name}
									required
									onChange={(e) => setName(e.target.value)}
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
									value={phone}
									className="input"
									required
									onChange={(e) => setPhone(e.target.value)}
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
						{/* <div className="gutter">
				<h3 className="profile_heading">{username}</h3>
			</div> */}

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
										// value={confirmPassword}
										className="input"
										required
										// onChange={(e) => setConfirmPassword(e.target.value)}
									/>
									<span className="highlight"></span>
								</div>
								<div className="input_group">
									<label htmlFor="" className="static">
										New Password
									</label>
									<input
										type="password"
										value={password}
										className="input"
										required
										onChange={(e) => setPassword(e.target.value)}
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
										value={confirmPassword}
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
										onClick={handleUpdatePassword}
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
		</>

	);
}

export default Setting;
