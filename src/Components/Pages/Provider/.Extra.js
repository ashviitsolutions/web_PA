import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IP } from "../../../Constant";
import Benifit from "./Benifit";
import Form from "./Form";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../Redux/counterSlice';
import { fetchPostData } from '../../Hooks/Hooks';
import Loader from '../Loader';

function Banner() {
	const servicesTabsRef = useRef(null);
	const postIds = ["6407358aad080eddce51f5ae"];
	const users = useSelector((state) => state?.counter?.formData?.provider_banner);
	const img = useSelector((state) => state?.counter?.formData?.provider_banner_image);
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
				dispatch(updateInputData({ formName: 'provider_banner', inputData: fetchedUser }));

				// If fetched user has attachments, fetch and update image URL
				if (fetchedUser && fetchedUser.attachments) {
					const imageResponse = await fetch(`${IP}/file/${fetchedUser.attachments}`);
					const imageBlob = await imageResponse.blob();
					const imageURL = URL.createObjectURL(imageBlob);
					dispatch(updateInputData({ formName: 'provider_banner_image', inputData: imageURL }));
				}
			} catch (error) {
				// Handle errors by logging them to the console
				console.error('Error fetching data and navigating:', error);
			}
		};

		// Call the asynchronous function to fetch data and navigate
		getDataAndNavigate();
	}, [dispatch]); // Dependencies array to ensure useEffect runs only once


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
				style={{ backgroundImage: `url(${img})` }}
			>
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className="head">
								{users && users.map((user, index) => (
									<div key={index}>
										<h1>{user.title} <span>{user.excerpt}</span></h1>
										<h3 dangerouslySetInnerHTML={{ __html: user.description }} style={{ fontWeight: "500", fontSize: "15px" }} />
									</div>
								))}
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
