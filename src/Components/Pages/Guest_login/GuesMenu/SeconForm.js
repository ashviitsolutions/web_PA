import { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateInputData } from '../../Redux/counterSlice';
import { IP } from "../../../../Constant";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from "react";

const PreviewImage = ({ attachments }) => {
    const [imageObjectURL, setImageObjectURL] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            const res = await fetch(`${IP}/file/${attachments}`);
            const imageBlob = await res.blob();
            const objectURL = URL.createObjectURL(imageBlob);
            setImageObjectURL(objectURL);
        };

        fetchImage();
    }, [attachments]);

    return (
        <div style={{ width: "18vw", height: "22vh", backgroundSize: "cover" }}>
            {imageObjectURL && <img src={imageObjectURL} alt="Preview" className="previewimage" />}
        </div>
    );
};

const SeconForm = ({ step, nextStep }) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.counter.formData);
    // const gendercheck = selector?.firstForm[0];
    const gendercheck = selector?.firstForm && selector.firstForm.length > 0 ? selector.firstForm[0] : "";


    const [user, setUser] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedGender, setSelectedGender] = useState([]);
    const [selectedGender1, setSelectedGender1] = useState([]);
    const [selectedGender2, setSelectedGender2] = useState([]);
    const [selectedServiceTime, setSelectedServiceTime] = useState("");
    const [service_ids, setService_id] = useState();
    const [priceservice, setPerice] = useState(0);
    const [priceadon, setPriceadon] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState();
    const [Price, setPrice] = useState(0);

    useEffect(() => {
        const formData = {
            service_ids,
            gender: selectedGender,
            service_time: selectedServiceTime,
            selectedItems: selectedItems,
            totalPrice: priceservice + priceadon,
        };

        setFormData(formData);
    }, [selectedItems, service_ids, selectedGender, selectedServiceTime, priceservice, priceadon]);

    // useEffect(() => {
    //     let total = priceservice + priceadon;
    //     setPrice(total)

    //     if (gendercheck === "guest") {
    //         total *= 2;
    //     }

    //     setTotalPrice(total);
    //     setFormData({ ...formData, totalPrice: total });
    // }, [priceservice, priceadon, gendercheck, formData]);

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
    };

    const handleGenderSelect1 = (selectedGenderValue) => {
        setFormData({ ...formData, gender: selectedGenderValue });
        setSelectedGender1(selectedGenderValue);
    };

    const handleGenderSelect2 = (selectedGenderValue) => {
        setFormData({ ...formData, gender: selectedGenderValue });
        setSelectedGender2(selectedGenderValue);
    };

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
        <div id="sec_wiz_2" className="section">
            <div id="page_service_select">
                <span className="title">Select Service</span>
                <div className="content" style={{ padding: "0 25px" }}>
                    <div id="service_collection" className="product_collector big">
                        <div id="select_service_carousel" className="owl-carousel owl-theme products">
                            {
                                user.filter((filter) => filter.category === "on demand").map((cur, index) => {
                                    return (
                                        <div className="item_wrapper" key={index} onClick={() => handlePrice(cur.price)}>
                                            <div className={`item ${service_ids === `${cur._id}` ? "selected" : ""}`} onClick={() => handleId(cur._id)}>
                                                <div className="bg" style={{ width: "100%", height: "19vh", backgroundSize: "cover" }}>
                                                    <PreviewImage attachments={cur.attachments} />
                                                </div>
                                                <div className="content" >
                                                    <span className="title">{cur.title}</span>
                                                    <p className="excerpt" dangerouslySetInnerHTML={{ __html: cur.description.slice(0, 50) }} />
                                                    <span className="rates">
                                                        <i></i> <span className="coloreds"></span>  <b>${cur.price}</b>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            <div className="gen_heading" style={{ marginBottom: "20px" }}></div>
                        </div>
                    </div>
                    {gendercheck === "guest" ? (
                        <>
                            <div className="gen_heading">
                                <h3>Gender Preference 1</h3>
                            </div>
                            <ul className="time_options">
                                <li
                                    id="g_male"
                                    className={`gender time_option ${selectedGender1 === "male1" ? "selected" : ""}`}
                                    onClick={() => handleGenderSelect1("male1")}
                                >
                                    Male
                                </li>
                                <li
                                    id="g_female"
                                    className={`gender time_option ${selectedGender1 === "female1" ? "selected" : ""}`}
                                    onClick={() => handleGenderSelect1("female1")}
                                >
                                    Female
                                </li>
                                <li
                                    id="g_either"
                                    className={`gender time_option ${selectedGender1 === "either1" ? "selected" : ""}`}
                                    onClick={() => handleGenderSelect1("either1")}
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
                                    className={`gender time_option ${selectedGender2 === "male2" ? "selected" : ""}`}
                                    onClick={() => handleGenderSelect2("male2")}
                                >
                                    Male
                                </li>
                                <li
                                    id="g_female"
                                    className={`gender time_option ${selectedGender2 === "female2" ? "selected" : ""}`}
                                    onClick={() => handleGenderSelect2("female2")}
                                >
                                    Female
                                </li>
                                <li
                                    id="g_either"
                                    className={`gender time_option ${selectedGender2 === "either2" ? "selected" : ""}`}
                                    onClick={() => handleGenderSelect2("either2")}
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
                    <div className="product_collector">
                        <div id="addons_carousel" className="owl-carousel owl-theme products">
                            {
                                user.filter((filter) => filter.category === "addons").map((cur, index) => {
                                    return (
                                        <div className="item_wrapper" key={index}>
                                            <div className={`item ${selectedItems.includes(cur._id) ? "selected" : ""}`} onClick={() => handleSelectItem(cur._id)}>
                                                <div className="bg" style={{ width: "100%", height: "19vh", backgroundSize: "cover" }}>
                                                    <PreviewImage attachments={cur.attachments} />
                                                </div>
                                                <div className="content">
                                                    <span className="title">{cur.title}</span>
                                                    <span className="rates">
                                                        <i></i> <span className="coloreds"></span> <b>${cur.price}</b>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
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
            </div>
        </div>
    );
}

export default SeconForm;
