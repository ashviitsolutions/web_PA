import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import "./UserProfileStyle.css";
import axios from "axios";
import { IP } from "../../../../Constant";
import image from "../../../assets/img/fav.jpeg";

const Favorites = () => {
	const token = localStorage.getItem("token");
	const username = localStorage.getItem("user_name");
	const user_id = localStorage.getItem("user_id");
	const [loading, setLoading] = useState(false);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		setLoading(true);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};
		axios
			.get(`${IP}/user/getfavrate/${user_id}`, config)
			.then((response) => {
				if (response.status === 200) {
					console.log("my fav", response.data);

					const { data } = response.data;

					setFavorites(data);
					setLoading(false);
					// setRefreshing(false);
				}
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				// setRefreshing(false);
			});
	}, []);

	return (
		<div className="container__view">
			<Avatar name={username} />
			<h3>Favorites</h3>
			<img src={image} alt="" />
			<h4>No Favorite Providers</h4>
		</div>
	);
};

export default Favorites;
