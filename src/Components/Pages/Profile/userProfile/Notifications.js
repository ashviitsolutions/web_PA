import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import "./UserProfileStyle.css";
import axios from "axios";
import { IP } from "../../../../Constant";
import { FallingLines, MagnifyingGlass } from "react-loader-spinner";
import moment from "moment";

const Notifications = () => {
	const token = localStorage.getItem("token");
	const username = localStorage.getItem("user_name");
	const user_id = localStorage.getItem("user_id");
	const [loading, setLoading] = useState(false);
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		setLoading(true);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};
		axios
			.get(`${IP}//get-all-notifications/${user_id}`, config)
			.then((res) => {
				console.log(res.data);
				setNotifications(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, []);
	return (
		<div className="container__view">
			<Avatar name={username} />
			<h3>Notifications</h3>
			<div className="notification__view">
				{loading ? (
					<FallingLines
						color="#03a9f4"
						width="150"
						visible={true}
						ariaLabel="falling-circles-loading"
					/>
				) : notifications.length > 0 ? (
					notifications.map((n) => (
						<div className="notification__item" key={n._id}>
							<div className="notification__titleView">
								<h3>{n.title}</h3>
								<h4>{moment(n.createdAt).format("LT")}</h4>
							</div>
							<p>{n.content}</p>
						</div>
					))
				) : (
					<h2>No New Notifications</h2>
				)}
			</div>
		</div>
	);
};

export default Notifications;
