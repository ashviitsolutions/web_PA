import React, { useState, useEffect } from "react";
// import Image1 from "../../assets/img/pexels-cottonbro-3997983.jpg"
import { IP } from "../../../Constant";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from "../Redux/counterSlice";

function Ourpage() {
	const postIds = ["63fa02a506e32e14932327bb", "63fa02df06e32e14932327d1"];
	const dispatch = useDispatch();
	const [img, setImg] = useState("");

	const formData = useSelector((state) => state?.counter?.formData);
	const users1 = formData.about_service1 && formData.about_service1[0] ? formData.about_service1[0] : "";
	const users2 = formData.about_service2 && formData.about_service2[0] ? formData.about_service2[0] : "";
	// const imgs1 = formData.service_private_image && formData.service_private_image[0] ? formData.service_private_image[0] : "";
	const imgs = formData.about_service_image && formData.about_service_image[0] ? formData.about_service_image[0] : "";
	useEffect(() => {
		async function fetchData() {
			const responses = await Promise.all(
				postIds.map(async (id) => {
					const res = await fetch(`${IP}/post/fetch/${id}`);
					return res.json();
				})
			);
			console.log(responses);
			// setUsers1(responses[0]);
			// setUsers2(responses[1]);
			dispatch(updateInputData({ formName: 'about_service1', inputData: responses[0] }));
			dispatch(updateInputData({ formName: 'about_service2', inputData: responses[1] }));
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


	useEffect(() => {
		if (img.length > 0) {
			dispatch(updateInputData({ formName: 'about_service_image', inputData: img }));
		}
	}, [img, dispatch]);


	return (
		<>
			<div id="alternate_post">
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div
								className="bg"
								style={{
									backgroundImage: `url(${imgs[0]})`,
									borderRadius: "7px",
								}}
							></div>
						</div>
						<div className="col-sm-6">
							<div className="heading">
								<h3>{users1.title}</h3>
								<p dangerouslySetInnerHTML={{ __html: users1.description }} />
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<div className="heading">
								<h3>{users2.title}</h3>
								<p dangerouslySetInnerHTML={{ __html: users2.description }} />
								
							</div>
						</div>
						<div className="col-sm-6">
							<div
								className="bg"
								style={{
									backgroundImage: `url(${imgs[1]})`,
									borderRadius: "7px",
								}}
							></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Ourpage;
