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




const SeconForm = ({ step, nextStep }) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.counter.formData);
    // const gendercheck = selector?.firstForm[0];
    const gendercheck = selector?.firstForm && selector.firstForm.length > 0 ? selector.firstForm[0] : "";
    const service_id = selector?.service_id && selector.service_id.length > 0 ? selector.service_id[0] : "";

    console.log("selector service_id" ,service_id)

    const [user, setUser] = useState([]);
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

        if (time_status === "90min") {
            total += 40;
        } else if (time_status === "120min") {
            total += 80;
        }

        if (gendercheck === "guest") {
            total *= 2;
        }

        setTotalPrice(total);
        setFormData({ ...formData, totalPrice: total });
    }, [priceservice, priceadon, selectedServiceTime, gendercheck]);






    const handleGenderSelect = (selectedGenderValue) => {
        setFormData({ ...formData, gender: selectedGenderValue });
        setSelectedGender(selectedGenderValue);
        setGenderPreferences([selectedGenderValue]);
    };

    const handleGenderSelect1 = (selectedGenderValue) => {
        if (!genderPreferences.includes(selectedGenderValue)) {
            setFormData({ ...formData, gender: selectedGenderValue });
            setSelectedGender1(selectedGenderValue);
            setGenderPreferences([...genderPreferences, selectedGenderValue]);
        }
    };

    const handleGenderSelect2 = (selectedGenderValue) => {
        if (!genderPreferences.includes(selectedGenderValue)) {
            setFormData({ ...formData, gender: selectedGenderValue });
            setSelectedGender2(selectedGenderValue);
            setGenderPreferences([...genderPreferences, selectedGenderValue]);
        }
    };










    // const handleGenderSelect = (selectedGenderValue) => {
    //     setFormData({ ...formData, gender: selectedGenderValue });
    //     setSelectedGender(selectedGenderValue);
    //     setGenderPreferences([...genderPreferences, selectedGenderValue]);
    // };

    // const handleGenderSelect1 = (selectedGenderValue) => {
    //     setFormData({ ...formData, gender: selectedGenderValue });
    //     setSelectedGender1(selectedGenderValue);
    // };

    // const handleGenderSelect2 = (selectedGenderValue) => {
    //     setFormData({ ...formData, gender: selectedGenderValue });
    //     setSelectedGender2(selectedGenderValue);
    // };

    const handleServiceTimeSelect = (selectedTime) => {
        setFormData({ ...formData, service_time: selectedTime });
        setSelectedServiceTime(selectedTime);
    };

    const handleId = (id) => {
        setService_id(id);
        setFormData({ ...formData, service_ids: id });
    };

    const handlePrice = (price) => {
        setPriceadon(price);
    };

    const handleSelectItem = (itemId) => {
        const itemIndex = selectedItems.indexOf(itemId);

        if (itemIndex === -1) {
            setSelectedItems([...selectedItems, itemId]);
            setFormData({ ...formData, selectedItems: itemId });
            const selectedItem = user.find(item => item._id === itemId);
            if (selectedItem) {
                setPerice(prevPrice => prevPrice + selectedItem.price);
            }
        } else {
            const updatedItems = selectedItems.filter(id => id !== itemId);
            setSelectedItems(updatedItems);
            const selectedItem = user.find(item => item._id === itemId);
            if (selectedItem) {
                setPerice(prevPrice => prevPrice - selectedItem.price);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/service/view-services`);
                const data = await res.json();
                setUser(data);
            } catch (error) {
                // Handle errors
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async () => {
        dispatch(updateInputData({ formName: 'secondform', inputData: formData }));
        dispatch(updateInputData({ formName: 'addon_id', inputData: selectedItems }));
        setTimeout(() => {
            nextStep();
        }, 2000);
    };

    return (
        <div id="sec_wiz_2" className="sections">
            <div id="page_service_selects">
                <span className="title">Select Service</span>
                <div className="second_form_book_container">
                    {
                        user.filter((filter) => filter.category === "on demand").map((cur, index) => {
                            return (

                                <div className={`second_form_book ${service_ids === `${cur._id}` ? "selected" : ""}`} key={index} onClick={() => handlePrice(cur.price)}  >
                                    <div onClick={() => handleId(cur._id)} className="item" >
                                        <PreviewImage attachments={cur.attachments} />
                                        <div className="book-details" >
                                            <h2 className="book-title">{cur.title}</h2>
                                            <p className="book-description" dangerouslySetInnerHTML={{ __html: cur.description.slice(0, 50) }} />
                                            <p className="book-price">Price: ${cur.price}</p>
                                        </div>
                                    </div>

                                </div>


                            );
                        })
                    }


                </div>










                {gendercheck === "guest" ? (
                    <>
                        <div className="gen_heading">
                            <h3>Gender Preference 1</h3>
                        </div>
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
                        <div className="gen_heading">
                            <h3>Gender Preference 2</h3>
                        </div>
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
                    </>
                ) : (
                    <>
                        <div className="gen_heading">
                            <h3>Gender Preference</h3>
                        </div>
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
                    </>
                )}
                <div className="gen_heading">
                    <h3>Select Time</h3>
                </div>
                <ul className="time_options">
                    <li
                        id="min_45"
                        className={`time_option ${selectedServiceTime === "60min" ? "selected" : ""}`}
                        onClick={() => handleServiceTimeSelect("60min")}
                    >
                        60 min
                    </li>
                    <li
                        id="min_60"
                        className={`time_option ${selectedServiceTime === "90min" ? "selected" : ""}`}
                        onClick={() => handleServiceTimeSelect("90min")}
                    >
                        90 min
                    </li>
                    <li
                        id="min_90"
                        className={`time_option ${selectedServiceTime === "120min" ? "selected" : ""}`}
                        onClick={() => handleServiceTimeSelect("120min")}
                    >
                        120 min
                    </li>
                </ul>












                <div className="gen_heading">
                    <h3>Popular to consider</h3>
                </div>

                <div className="second_form_book_container">
                    {
                        user.filter((filter) => filter.category === "addons").map((cur, index) => {
                            return (

                                <div className={`second_form_book ${selectedItems.includes(cur._id) ? "selected" : ""}`} key={index}>
                                    <div className="item" onClick={() => handleSelectItem(cur._id)}>
                                        <PreviewImage attachments={cur.attachments} />
                                        <div className="book-details">
                                            <h2 className="book-title">{cur.title}</h2>
                                            <p className="book-description" dangerouslySetInnerHTML={{ __html: cur.description.slice(0, 50) }} />
                                            <p className="book-price">Price: ${cur.price}</p>
                                        </div>
                                    </div>

                                </div>


                            );
                        })
                    }


                </div>
                {
                    gendercheck === "guest" ? (
                        <p>Total Price(2 x {priceadon + priceservice}): ${totalPrice}</p>
                    ) : (
                        <p>Total Price: ${totalPrice}</p>
                    )
                }

                <button className="button lazy" type="submit" onClick={handleSubmit}>next</button>

            </div>
        </div >
    );
}

export default SeconForm;
