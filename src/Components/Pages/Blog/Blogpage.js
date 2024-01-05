import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IP } from "../../../Constant";
import ReactPaginate from "react-paginate";

function Blogpage() {
	const [data, setData] = useState(1);
	const [count, setCount] = useState(0);
	const [activeCardIndex, setActiveCardIndex] = useState(null);

	const handleReadMoreClick = (index) => {
		setActiveCardIndex(index);
	};

	const [users, setUsers] = useState([]);
	const [img, setImg] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${IP}/post/term?type=home page blog`);
				const data = await res.json();
				setUsers(data);
				setCount(data.length);
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
	}, [data]);

	const handlePageClick = (data) => {
		setData(data.selected + 1);
	};

	return (
		<>
			<div id="blog" style={{ marginTop: 40 }}>
				<div className="container">
					<div className="row">
						<div className="heading content">
							<h3 className="dancing">Latest in Wellness!</h3>
							<p>
								<small>
									Feeling healthy and feeling good about yourself is not a
									luxury, it's an absolute necessity!
								</small>
							</p>
							<span className="eff"></span>
						</div>
					</div>

					<div className="row">
						<div id="types">
							<div className="container">
								<div className="row">
									<div className="col-sm-12 col-sm-offset-1">
										<div className="container-fluid">
											<div className="row">
												{users.map((user, index) => (
													<div className="col-sm-4" key={user._id}>
														<div className="item_wrapper">
															<div className="item">
																<Link to={`/detailblog/${user._id}`}>
																	<div
																		className="bg"
																		style={{
																			backgroundImage: `url(${img[index]})`,
																			borderRadius: "7px",
																		}}
																	></div>
																	<div className="content">
																		<h3>{user.title}</h3>
																		<p
																			dangerouslySetInnerHTML={{
																				__html:
																					index === activeCardIndex
																						? user.description
																						: user.description.slice(0, 185) +
																						  (user.description.length > 185
																								? "..."
																								: ""),
																			}}
																		/>
																	</div>
																</Link>
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
					</div>
				</div>
			</div>
			<div className="pagination">
				<ReactPaginate
					itemsPerPage={10}
					previousLabel={"Previous"}
					nextLabel={"Next"}
					breakLabel={"..."}
					pageCount={Math.ceil(count / 10)}
					marginPagesDisplayed={3}
					pageRangeDisplayed={2}
					onPageChange={handlePageClick}
					// css apply on pagination
					containerClassName={"pagination justify-content-center py-3"}
					pageClassName={"page-item"}
					pageLinkClassName={"page-link"}
					previousClassName={"page-item"}
					previousLinkClassName={"page-link"}
					nextClassName={"page-item"}
					nextLinkClassName={"page-link"}
					breakClassName={"page-item"}
					breakLinkClassName={"page-link"}
					activeClassName={"active"}
				/>
			</div>
		</>
	);
}

export default Blogpage;
