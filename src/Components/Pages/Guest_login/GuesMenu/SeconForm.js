import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import { IP } from "../../../../Constant";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from "react";
import PreviewImage from './PreviewImage'; // Update the path accordingly
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from 'react-router-dom';





const SeconForm = ({ step, nextStep }) => {
    const nav = useNavigate()
    const location = useLocation();
    const locationType = location.state?.location_type || "";
    const locationForm = location.state?.locationForm || "";
    const firstForm = location.state?.firstForm || "";
    // console.log("locationForm second form", locationForm);
    // console.log("locationType second form", locationType);
    // console.log("firstForm form data", firstForm)
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.counter.formData);
    // const gendercheck = selector?.firstForm[0]; 
    const gendercheck = location.state?.firstForm || "";
    const service_id = selector?.service_id && selector.service_id.length > 0 ? selector.service_id[0] : "";
    const user = selector?.booking_service && selector.booking_service.length > 0 ? selector.booking_service[0] : "";

    // console.log("selector service_id", service_id)

    const [users, setUser] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedGender, setSelectedGender] = useState([]);
    const [selectedGender1, setSelectedGender1] = useState([]);
    const [selectedGender2, setSelectedGender2] = useState([]);
    const [selectedServiceTime, setSelectedServiceTime] = useState("");
    const [service_ids, setService_id] = useState(service_id);
    const [priceservice, setPerice] = useState(0);
    const [priceadon, setPriceadon] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState();
    const [genderPreferences, setGenderPreferences] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [servicename, setServicename] = useState()
    const [showInfo, setShowInfo] = useState({});
    const [loading, setLoading] = useState(false)




    console.log("gendercheckgendercheck", gendercheck)



    const handleInfoIconClick = (id) => {
        setShowInfo(prevState => ({
            ...prevState,
            [id]: !prevState[id] // Toggle the state for the clicked card
        }));
    };









    useEffect(() => {
        const formData = {
            service_ids,
            gender: genderPreferences,
            service_time: selectedServiceTime,
            selectedItems: selectedItems,
            totalPrice: priceservice + priceadon,
        };

        setFormData(formData);
    }, [selectedItems, service_ids, genderPreferences, selectedServiceTime, priceservice, priceadon]);










    useEffect(() => {
        let total = priceservice + priceadon;
        const time_status = selectedServiceTime;

        if (time_status === "90 minutes") {
            total += 45;
        } else if (time_status === "120 minutes") {
            total += 80;
        }

        // Halve the priceservice if gendercheck is "partner"
        if (firstForm === "partner") {
            const modifiedPriceService = priceservice / 2; // Halve the priceservice
            total -= priceservice; // Subtract the original priceservice from total
            total += modifiedPriceService; // Add the modified priceservice to total
            total *= 2; // Double the total if gendercheck is "partner"
        }

        setTotalPrice(total);
        setFormData({ ...formData, totalPrice: total });
    }, [priceservice, priceadon, selectedServiceTime, gendercheck]);







    const handleGenderSelect = (selectedGenderValue) => {
        setFormData({ ...formData, gender: selectedGenderValue });
        setSelectedGender(selectedGenderValue);
        setGenderPreferences([selectedGenderValue]);
    };



    const handleServiceTimeSelect = (selectedTime) => {
        setFormData({ ...formData, service_time: selectedTime });
        setSelectedServiceTime(selectedTime);
    };

    const handleId = (id) => {
        setService_id(id);
        setFormData({ ...formData, service_ids: id });
    };

    const handlePrice = (data) => {
        console.log("servce proce", data.title)
        setPriceadon(data.price);
        setServicename(data.title);
    };







    const handleSelectItem = (itemId) => {
        const itemIndex = selectedItems.indexOf(itemId);

        if (itemIndex === -1) {
            setSelectedItems([...selectedItems, itemId]);
            setFormData({ ...formData, selectedItems: itemId });
            const selectedItem = users.find(item => item._id === itemId);
            if (selectedItem) {
                setPerice(prevPrice => prevPrice + selectedItem.price);
            }
        } else {
            const updatedItems = selectedItems.filter(id => id !== itemId);
            setSelectedItems(updatedItems);
            const selectedItem = users.find(item => item._id === itemId);
            if (selectedItem) {
                setPerice(prevPrice => prevPrice - selectedItem.price);
            }
        }
    };

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/service/view-services?page=1&limit=50`);
                const data = await res.json();
                setUser(data);
                if (data.status === 200) {
                    setLoading(false)

                }
                console.log("view service", data)
                // dispatch(updateInputData({ formName: 'booking_service', inputData: data }));
            } catch (error) {
                setLoading(false)
                // Handle errors
            }
        };

        fetchData();
    }, []);


    console.log("user booking selectedItems", selectedItems)


    const handleSubmit = async () => {
        // Check if both genders are selected if gendercheck is "partner", and if one gender is selected otherwise
        if (gendercheck === "partner") {
            if ((!selectedGender1 || !selectedGender2 || !["male", "female", "either"].includes(selectedGender1) || !["male", "either", "female"].includes(selectedGender2)) || (!selectedServiceTime || !service_ids)) {
                setErrorMessage("Please select both genders (male or female), a service, and a time before proceeding.");
                return;
            }
        } else {
            if (!selectedGender || !["male", "female", "either"].includes(selectedGender) || !selectedServiceTime || !service_ids) {
                setErrorMessage("Please select a gender (male or female), a service, and a time before proceeding.");
                return;
            }
        }

        // Clear any previous error message  
        setErrorMessage("");

        // Extract add-on IDs and their prices
        const selectedAddonsData = users
            .filter(item => selectedItems.includes(item._id)) // Filter selected add-ons
            .map(item => ({ id: item._id, title: item.title, price: item.price })); // Map to an array of objects with ID, title, and price

        // // Dispatch selected add-on IDs and prices
        // dispatch(updateInputData({ formName: 'secondform', inputData: formData }));
        // dispatch(updateInputData({ formName: 'addon_id', inputData: selectedItems }));
        // dispatch(updateInputData({ formName: 'add_ons_details', inputData: selectedAddonsData }));
        // dispatch(updateInputData({ formName: 'servicename', inputData: servicename }));
        // dispatch(updateInputData({ formName: 'booking_service', inputData: user }));

        nav(`/book`, {
            state: {
                firstForm: firstForm,
                location_type: locationType,
                locationForm: locationForm,
                secondform: formData,
                addon_id: selectedItems,
                add_ons_details: selectedAddonsData,
                servicename: servicename,


            }
        });
        nextStep();

    };










    const handleGenderSelect1 = (selectedGenderValue) => {
        setSelectedGender1(selectedGenderValue);
        setGenderPreferences(prevPreferences => [selectedGenderValue, ...prevPreferences.filter(gender => gender !== selectedGenderValue)]);
    };

    const handleGenderSelect2 = (selectedGenderValue) => {
        setSelectedGender2(selectedGenderValue);
        setGenderPreferences(prevPreferences => [selectedGenderValue, ...prevPreferences.filter(gender => gender !== selectedGenderValue)]);
    };




    return (
        <>
            {gendercheck === "partner" ? (
                <>
                    <div id="sec_wiz_2" className="sections sec_wiz_2">
                        <p className="title">Gender Preference</p>
                        <ul className="time_options">
                            <li
                                id="g_male"
                                className={`gender time_option ${selectedGender1 === "male" ? "selected" : ""}`}
                                onClick={() => handleGenderSelect1("male")}
                            >
                                Male
                            </li>
                            <li
                                id="g_female"
                                className={`gender time_option ${selectedGender1 === "female" ? "selected" : ""}`}
                                onClick={() => handleGenderSelect1("female")}
                            >
                                Female
                            </li>
                            <li
                                id="g_either"
                                className={`gender time_option ${selectedGender1 === "either" ? "selected" : ""}`}
                                onClick={() => handleGenderSelect1("either")}
                            >
                                Either
                            </li>
                        </ul>
                    </div>
                    <div id="sec_wiz_2" className="sections sec_wiz_2">
                        <p className="title">Gender Preference</p>
                        <ul className="time_options">
                            <li
                                id="g_male"
                                className={`gender time_option ${selectedGender2 === "male" ? "selected" : ""}`}
                                onClick={() => handleGenderSelect2("male")}
                            >
                                Male
                            </li>
                            <li
                                id="g_female"
                                className={`gender time_option ${selectedGender2 === "female" ? "selected" : ""}`}
                                onClick={() => handleGenderSelect2("female")}
                            >
                                Female
                            </li>
                            <li
                                id="g_either"
                                className={`gender time_option ${selectedGender2 === "either" ? "selected" : ""}`}
                                onClick={() => handleGenderSelect2("either")}
                            >
                                Either
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <div id="sec_wiz_2" className="sections sec_wiz_2">
                        <p className="title">Gender Preference</p>
                        <ul className="time_options">
                            <li
                                id="g_male"
                                className={`gender time_option ${selectedGender === "male" ? "selected" : ""}`}
                                onClick={() => handleGenderSelect("male")}
                            >
                                Male
                            </li>
                            <li
                                id="g_female"
                                className={`gender time_option ${selectedGender === "female" ? "selected" : ""}`}
                                onClick={() => handleGenderSelect("female")}
                            >
                                Female
                            </li>
                            <li
                                id="g_either"
                                className={`gender time_option ${selectedGender === "either" ? "selected" : ""}`}
                                onClick={() => handleGenderSelect("either")}
                            >
                                Either
                            </li>
                        </ul>
                    </div>
                </>
            )}
            {/* <div className="gen_heading">
                <h3>Select Duration</h3>
            </div> */}
            <div id="sec_wiz_2" className="sections sec_wiz_2">
                <p className="title">Select Duration</p>
                <ul className="time_options">
                    <li
                        id="min_45"
                        className={`time_option ${selectedServiceTime === "60 minutes" ? "selected" : ""}`}
                        onClick={() => handleServiceTimeSelect("60 minutes")}
                    >
                        60 minutes.
                    </li>
                    <li
                        id="min_60"
                        className={`time_option ${selectedServiceTime === "90 minutes" ? "selected" : ""}`}
                        onClick={() => handleServiceTimeSelect("90 minutes")}
                    >
                        90 minutes.
                    </li>
                    <li
                        id="min_90"
                        className={`time_option ${selectedServiceTime === "120 minutes" ? "selected" : ""}`}
                        onClick={() => handleServiceTimeSelect("120 minutes")}
                    >
                        120 minutes.
                    </li>
                </ul>
            </div>







            <div id="sec_wiz_2" className="sections sec_wiz_2">
                <div id="page_service_selects">
                    <p className="title">Select Service</p>
                    <div className="second_form_book_container">
                        {
                            Array.isArray(users) && users.length > 0 &&
                            users.filter((user) => user.category === "on demand").map((cur, index) => {
                                return (
                                    <div
                                        className={`second_form_book ${service_ids === `${cur._id}` ? "selected" : ""}`}
                                        key={index}
                                        onClick={() => handlePrice(cur)}
                                    >
                                        <div onClick={() => handleId(cur._id)} className="item">
                                            <PreviewImage attachments={cur.attachments} />
                                            <div className="book-details">
                                                <h2 className="book-title">{cur.title}</h2>
                                                <div className="info_icon" onClick={() => handleInfoIconClick(cur._id)}>
                                                    <FontAwesomeIcon icon={faInfo} />
                                                </div>
                                                {/* <p className="book-description" dangerouslySetInnerHTML={{ __html: cur.description.slice(0, 50) }} /> */}
                                                <span className="book-title">Price: ${cur.price}</span>
                                                {showInfo[cur._id] && (
                                                    <div className="info_box" dangerouslySetInnerHTML={{ __html: cur.description }}></div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>









            <div id="sec_wiz_2" className="sections sec_wiz_2 addoList">
                <p className="title">Popular addons to consider</p>


                <div className="second_form_book_container">
                    {
                        Array.isArray(users) && users.length > 0 &&
                        users.filter((user) => user.category === "addons").map((cur, index) => {
                            return (

                                <div className={`second_form_book ${selectedItems.includes(cur._id) ? "selected" : ""}`} key={index}>
                                    <div className="item" onClick={() => handleSelectItem(cur._id)}>
                                        <PreviewImage attachments={cur.attachments} />
                                        <div className="book-details">
                                            <h2 className="book-title">{cur.title}</h2>
                                            {/* <p className="book-description" dangerouslySetInnerHTML={{ __html: cur.description.slice(0, 50) }} /> */}
                                            <span className="book-title">Price: ${cur.price}</span>
                                            {/*  <div className="info_icon"><FontAwesomeIcon icon={faInfo}></FontAwesomeIcon></div>
                            <div className="info_box" dangerouslySetInnerHTML={{ __html: cur.description }}></div> */}



                                            <div className="info_icon" onClick={() => handleInfoIconClick(cur._id)}>
                                                <FontAwesomeIcon icon={faInfo} />
                                            </div>
                                            {showInfo[cur._id] && (
                                                <div className="info_box" dangerouslySetInnerHTML={{ __html: cur.description }}></div>
                                            )}




                                        </div>
                                    </div>

                                </div>


                            );
                        })
                    }



                </div>
                {
                    gendercheck === "guest" ? (
                        <p className="mt-2">Total Price(2 x {priceadon + priceservice}): ${totalPrice}</p>
                    ) : (
                        <p className="mt-2">Total Price: ${totalPrice}</p>
                    )
                }
                <div className="error-message">{errorMessage}</div>
                <button className="button lazy" type="submit" onClick={handleSubmit}>next</button>
                <center><a className='small' href='/'>&larr; Back to Home</a></center>
            </div>
        </>
    );
}

export default SeconForm;
