import React, { useState, useEffect } from "react";
import { IP } from "../../../Constant";
import { Link } from "react-router-dom";

function Banner() {
	const postIds = ["640ab764ad080eddce5217dd"];
	const [users, setUsers] = useState([]);
	const [img, setImg] = useState("");

	useEffect(() => {
		async function fetchData() {
			const responses = await Promise.all(
				postIds.map(async (id) => {
					const res = await fetch(`${IP}/post/fetch/${id}`);
					return res.json();
				})
			);
			setUsers(responses[0]);
			setImg(
				await Promise.all(
					responses
						.flatMap((response) => response.attachments)
						.map(async (image) => {
							const res = await fetch(`${IP}/file/${image}`);
							const imageBlob = await res.blob();
							return URL.createObjectURL(imageBlob);
						})
				)
			);
		}
		fetchData();
	}, []);

	console.log("users", users);

	return (
		<>
			<div
				id="small_banner"
				style={{ backgroundImage: `url(${img})` }}
			>
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6 col-sm-offset-6">
							<div className="head" id="bannerservices">
								<h1>{users.title}</h1>
								<h3
									dangerouslySetInnerHTML={{ __html: users.description }}
									style={{ fontWeight: "500", fontSize: "15px" }}
								/>

								<Link to="/guest_login">
									<button className="button" type="button">
										book now
									</button>
								</Link>

								<button className="button negative" type="button">
									book for event
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Banner;
