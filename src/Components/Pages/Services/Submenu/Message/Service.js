import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IP } from "../../../../../Constant";
function Service() {
	const [activeCardIndex, setActiveCardIndex] = useState(null);

	const handleReadMoreClick = (index) => {
		setActiveCardIndex(index);
	};

	const [users, setUsers] = useState([]);
	const [img, setImg] = useState("");

	console.log(" image vaklue ", img);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${IP}/service/category?type=on demand`);
				const data = await res.json();
				setUsers(data);
				const imageUrls = data.map(async (item) => {
					const res = await fetch(`${IP}/file/${item.attachments}`);
					const imageBlob = await res.blob();
					const imageObjectURL = URL.createObjectURL(imageBlob);
					return imageObjectURL;
				});
				Promise.all(imageUrls).then((urls) => setImg(urls));
				console.log("get data", data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<div id="types">
				<div className="container">
					<div className="row">
						<div className="gutter">
							<div className="heading">
								<h3>Massage services</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 col-sm-offset-1">
							<div className="container-fluid">
								<div className="row">
									{users.map((user, index) => (
										<div className="col-sm-4 col-xs-12" key={user._id}>
											<div className="item_wrapper">
												<div className="item " id="items">
													<div
														className="bg"
														style={{
															backgroundImage: `url(${IP}/file/${user.attachments})`,
															borderRadius: "7px",
														}}
													></div>
													<div className="text content">
														<h3>{user.title}</h3>
														<p
															dangerouslySetInnerHTML={{
																__html:
																	index === activeCardIndex
																		? user.description
																		: user.description.slice(0, 138) +
																		  (user.description.length > 138
																				? "...."
																				: ""),
															}}
														/>

														<div className="text">
															{index === activeCardIndex ? (
																<button
																	onClick={() => handleReadMoreClick(null)}
																	className="Read_More"
																>
																	Show less
																</button>
															) : (
																<button
																	onClick={() => handleReadMoreClick(index)}
																	className="Read_More"
																>
																	Read more
																</button>
															)}
															<Link to="#" className="anchor" id="anchors">
																book now
															</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Service;
