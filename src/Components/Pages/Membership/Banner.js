import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IP } from "../../../Constant";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../Redux/counterSlice';
import { fetchPostData } from '../../Hooks/Hooks';
import Loader from '../Loader';

function Banner() {
	const postIds = ["64073ef5ad080eddce51fae5"];
	const [loading, setLoading] = useState(false);
	const users = useSelector((state) => state?.counter?.formData?.contact_banner);
	const img = useSelector((state) => state?.counter?.formData?.contact_banner_image);
	const dispatch = useDispatch();



	// useEffect hook to fetch data and navigate
	useEffect(() => {
		const getDataAndNavigate = async () => {
			try {
				// Fetch data for all specified IDs
				const responses = await Promise.all(
					postIds.map(async (id) => {
						const data = await fetchPostData(id);
						return data;
					})
				);
				const fetchedUser = responses[0];
				dispatch(updateInputData({ formName: 'contact_banner', inputData: fetchedUser }));

				// If fetched user has attachments, fetch and update image URL
				if (fetchedUser && fetchedUser.attachments) {
					const imageResponse = await fetch(`${IP}/file/${fetchedUser.attachments}`);
					const imageBlob = await imageResponse.blob();
					const imageURL = URL.createObjectURL(imageBlob);
					dispatch(updateInputData({ formName: 'contact_banner_image', inputData: imageURL }));
				}
			} catch (error) {
				// Handle errors by logging them to the console
				console.error('Error fetching data and navigating:', error);
			}
		};

		// Call the asynchronous function to fetch data and navigate
		getDataAndNavigate();
	}, [dispatch]); // Dependencies array to ensure useEffect runs only once


	return (
		<>
			<div id="small_banners" style={{ backgroundImage: `url(${img})` }}>
				<div className="container">
					<div className="row">
						<div className="col-sm-6 col-sm-offset-3">
							<div className="heads" style={{ textAlign: "center" }}>
								{users && users.map((user, index) => (
									<div key={index}>
										<h1>{user.title} <span>{user.excerpt}</span></h1>
										<h3 dangerouslySetInnerHTML={{ __html: user.description }} style={{ fontWeight: "500", fontSize: "15px" }} />
									</div>
								))}
								<Link
									// to="/guest_login"
									to="/login"
								>
									<button
										className="button"
										type="button"
										name="button"
									// onClick={() => alert("yes")}
									>
										Get Started
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Banner;
