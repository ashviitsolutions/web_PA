import React, { useState, useEffect } from "react";
import stars from "../../assets/img/stars.png";
import bg11 from "../../assets/img/bg11.jpg";
import { IP } from "../../../Constant";

function Testimonials() {
	const postIds = [
		"6410da91ff3c39ffa38f4919",
		"641013caff3c39ffa38f15f3",
		"641013e4ff3c39ffa38f1607",
	];
	const [users1, setUsers1] = useState([]);
	const [img, setImg] = useState("");

	const [users2, setUsers2] = useState([]);

	console.log("tesnominia", img);

	useEffect(() => {
		async function fetchData() {
			const responses = await Promise.all(
				postIds.map(async (id) => {
					const res = await fetch(`${IP}/post/fetch/${id}`);
					return res.json();
				})
			);
			setUsers1(responses);
			// setUsers2(responses[1]);
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
	console.log(users1, users2);
	return (
		<>
			<div id="testimonials">
				<div className="container">
					<div className="row">
						<div className="heading" style={{ textAlign: "center" }}>
							<h3>Testimonials</h3>
							{/* <p>people who changed their lives</p> */}
							<p>Your feedback means the world to us</p>
						</div>
					</div>
					<div className="row">
						<div className="userRatings row">
							{users1.map((user) => (
								<div className="col-sm-4" align="center" key={user._id}>
									<div
										className="userImg"
										style={{
											backgroundImage: `url(${IP}/file/${user.attachments})`,
											backgroundPosition: "",
											backgroundSize: "100%",
										}}
									></div>
									<div className="content">
										<div className="inner">
											<h3>{user.title}</h3>
											<p
												dangerouslySetInnerHTML={{ __html: user.description }}
											/>
											<p align="center">
												<img src={stars} />
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Testimonials;
