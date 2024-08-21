import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../../../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../../Redux/counterSlice';
import Loader from '../../../Loader';
import Card from '../../../Modal/Card';
import Header from '../../../Modal/Header';

function Service() {

	const navigate = useNavigate()

	const dispatch = useDispatch();
	const formData = useSelector((state) => state?.counter?.formData);
	const selector = useSelector((state) => state.counter.selector);
	const users = formData.massagdemand_service && formData.massagdemand_service[0] ? formData.massagdemand_service[0] : "";
	const imgs = formData.service_on_demand_image && formData.service_on_demand_image[0] ? formData.service_on_demand_image[0] : "";

	console.log("selector", users)

	const [activeCardIndex, setActiveCardIndex] = useState(null);



	const handleReadMoreClick = (index) => {
		setActiveCardIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	const handleViewMoreClick = (navigateTo) => {
		navigate(navigateTo);
	};


	// const [users, setUsers] = useState([]);
	const [img, setImg] = useState(imgs);

	console.log(" image vaklue ", img);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${IP}/service/category?type=on demand`);
				const data = await res.json();
				// setUsers(data);
				dispatch(updateInputData({ formName: 'massagdemand_service', inputData: data }));
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



	const handleSubmit = async (service_id) => {
		dispatch(updateInputData({ formName: 'service_id', inputData: service_id }));


	};


	useEffect(() => {
		if (img.length > 0) {
			dispatch(updateInputData({ formName: 'service_on_demand_image', inputData: img }));
		}
	}, [img, dispatch]);


	if (!users) {
		return <Loader />;
	}

	return (
		<div id="types_card" className='marketplace'>
			<div className="container">

				<Header
					heading_Text="Massage services"
					sub_Text="Select your desired service"
				/>
				<div className="row">
					{Array.isArray(users) && users.length > 0 && users.map((user, index) => (
						<Card
							key={user._id}
							user={user}
							image={img[index] || ''}
							index={index}
							isActive={index === activeCardIndex}
							onReadMoreClick={() => handleReadMoreClick(index)}
							onViewMoreClick={() => handleViewMoreClick(`/guest_login`)}
							btnlabel="Book Now"
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Service;
