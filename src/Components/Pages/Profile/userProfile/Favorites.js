import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import "./UserProfileStyle.css";
import axios from "../../../../axios";
import { IP } from "../../../../Constant";
import image from "../../../assets/img/fav.jpeg";
// import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import "./UserProfileStyle.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

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
			.get(`/user/getfavrate/${user_id}`, { shouldAddAuth: true })
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
			{loading ? (
				<FallingLines
					color="#03a9f4"
					width="150"
					visible={true}
					ariaLabel="falling-circles-loading"
				/>
			) : favorites.length == 0 ? (
				<>
					<img
						src={image}
						alt=""
						style={{
							borderRadius: "100%",
							width: 200,
							height: 200,
							marginBottom: 20,
						}}
					/>
					<h4>You haven't marked any favorite providers</h4>
				</>
			) : (
				favorites.map((f) => (
					<div className="favorite__item">
						<img
							src={`http://45.13.132.197:5000/api/file/${f.images}`}
							alt=""
							className="favorite__itemImage"
						/>
						<div className="">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<h3>{f.first_name + " " + f.last_name}</h3>
								<span className="favorite__itemRating">
									<StarRoundedIcon sx={{ color: "#03a9f4" }} />
									<p>{f.averageRating}</p>
								</span>
							</div>
							<p style={{ opacity: 0.7 }}>
								Available Services - {f.areas_of_expertise.on_demand}
							</p>
							<p>
								{f.mailing_address.address}, {f.mailing_address.postal_code}
							</p>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default Favorites;
