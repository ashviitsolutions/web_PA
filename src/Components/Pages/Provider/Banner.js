import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IP } from "../../../Constant";
import Benifit from "./Benifit";
import Form from "./Form";
// import Image1 from "../../assets/img/treatment-finger-keep-hand-161477.jpeg"

function Banner() {
	const servicesTabsRef = useRef(null);
	const postIds = ["6407358aad080eddce51f5ae"];
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
	console.log("from banner", users);

	function handleJoinTeamClick() {
		servicesTabsRef.current.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}

	return (
		<>
			<div
				id="small_banner"
				style={{ backgroundImage: `url(${IP}/file/${users.attachments})` }}
			>
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className="head">
								<h1>
									{users.title} <span>{users.excerpt}</span>
								</h1>
								<h3
									dangerouslySetInnerHTML={{ __html: users.description }}
									style={{ fontWeight: "500", fontSize: "15px" }}
								/>

								<Link to="#">
									<button className="button" onClick={handleJoinTeamClick}>
										Join Our Team
									</button>
								</Link>
								<Link target="_blank" to="/providers/login">
									<button className="button negative">login</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Benifit />
			<Form servicesTabsRef={servicesTabsRef} />
		</>
	);
}

export default Banner;
