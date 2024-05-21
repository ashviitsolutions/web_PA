// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { IP } from '../../../Constant';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../Redux/counterSlice';
import { fetchPostData } from '../../Hooks/Hooks';
import Loader from '../Loader';

// Define the Banner component
function Banner() {
	// Select user data and image URL from Redux state
	const users = useSelector((state) => state?.counter?.formData?.home_banner);
	const img = useSelector((state) => state?.counter?.formData?.home_banner_image);
	const dispatch = useDispatch();

	// Define post IDs to fetch data
	const postIds = ["63f0cad81e627c34fc1b58e9"];

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
				dispatch(updateInputData({ formName: 'home_banner', inputData: fetchedUser }));

				// If fetched user has attachments, fetch and update image URL
				if (fetchedUser && fetchedUser.attachments) {
					const imageResponse = await fetch(`${IP}/file/${fetchedUser.attachments}`);
					const imageBlob = await imageResponse.blob();
					const imageURL = URL.createObjectURL(imageBlob);
					dispatch(updateInputData({ formName: 'home_banner_image', inputData: imageURL }));
				}
			} catch (error) {
				// Handle errors by logging them to the console
				console.error('Error fetching data and navigating:', error);
			}
		};

		// Call the asynchronous function to fetch data and navigate
		getDataAndNavigate();
	}, [dispatch]); // Dependencies array to ensure useEffect runs only once


	// if (!users) {
	// 	return <Loader />
	// }

	// Render the component JSX
	return (
		<div id="banner" style={{ backgroundImage: `url(${img})` }}>
			<div className="container">
				<div className="row">
					<div className="head">
						{/* Conditional check before mapping over users */}
						{users && users.map((user, index) => (
							<div key={index}>
								<h1>{user.title} <span>{user.excerpt}</span></h1>
								<h3 dangerouslySetInnerHTML={{ __html: user.description }} style={{ fontWeight: "500", fontSize: "15px" }} />
							</div>
						))}
						<Link to="/guest_login">
							<button className="primary button small" type="button">
								get started
							</button>
						</Link>
						<Link to="/services">
							<button className="hollow button small" type="button">
								services
							</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="arrow_down"></div>
		</div>
	);
}

// Export the Banner component as default
export default Banner;
