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
        <div style={{ width: "18vw", height: "22vh", backgroundSize: "cover" }} >
            {imageObjectURL && <img src={imageObjectURL} alt="Preview" className="previewimage" />}
        </div>
    );
};

const SecondForm = ({ step, nextStep }) => {
    const [user, setUser] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [priceservice, setPerice] = useState(0);
    const [priceadon, setPriceadon] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState({
        service_ids: "", // Initialize service_ids with an empty string or a default value
        gender: "",
        service_time: "",
        serviceid_adon: "",
        totalPrice: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/service/view-services`);
                const data = await res.json();
                setUser(data);

                console.log("get data", data)
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    const dispatch = useDispatch();
    const selector = useSelector((state) => state.counter.formData);
    console.log("selector", selector);

    const [service_id, setService_id] = useState();
    const [serviceid_adon, setServiceid_adon] = useState();

    const handleId = (id) => {
        setService_id(id);
    };

    const handlePrice = (price) => {
        setPerice(price);
    };

    const handleAdonPrice = (adonprice) => {
        setPriceadon((prevPrice) => prevPrice + adonprice);
    };

    useEffect(() => {
        // Calculate the total price by adding priceservice and priceadon
        const total = priceservice + priceadon;

        // Set the total price in the state
        setTotalPrice(total);

        // You can also format the total price as a string if needed
        // setTotalPrice(`${total}`);
    }, [priceservice, priceadon]);

    useEffect(() => {
        setFormData({
            ...formData,
            service_ids: service_id !== undefined ? service_id : "",
        });
    }, [service_id]);

    const handleAdonId = (adonid) => {
        setServiceid_adon(adonid);
    };

    const handleSubmit = async () => {
        const selectedServiceIds = selectedItems.join(',');

        setFormData({
            ...formData,
            service_ids: selectedServiceIds,
            totalPrice: totalPrice
        });
        
        dispatch(updateInputData({ formName: 'secondform', inputData: formData }));
        dispatch(updateInputData({ formName: 'totalPrice', inputData: formData }));

        setTimeout(() => {
            nextStep();
        }, 2000);
    };

    const handleGenderSelect = (selectedGenderValue) => {
        setFormData({ ...formData, gender: selectedGenderValue });
    };

    const handleServiceTimeSelect = (selectedTime) => {
        setFormData({ ...formData, service_time: selectedTime });
    };

    const handleSelectItem = (itemId) => {
        const itemIndex = selectedItems.indexOf(itemId);

        if (itemIndex === -1) {
            setSelectedItems([...selectedItems, itemId]);
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
                                            <div className={`item ${service_id === `${cur._id}` ? "selected" : ""}`} onClick={() => handleId(cur._id)}  >
                                                <div className="bg" style={{ width: "100%", height: "20vh", backgroundSize: "cover" }}>
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
                    <div className="gen_heading">
                        <h3>Gender Preference</h3>
                    </div>
                    <ul className="time_options">
                        <li
                            id="g_male"
                            className={`gender time_option ${formData.gender === "Male" ? "selected" : ""}`}
                            onClick={() => handleGenderSelect("Male")}
                        >
                            Male
                        </li>
                        <li
                            id="g_female"
                            className={`gender time_option ${formData.gender === "Female" ? "selected" : ""}`}
                            onClick={() => handleGenderSelect("Female")}
                        >
                            Female
                        </li>
                        <li
                            id="g_either"
                            className={`gender time_option ${formData.gender === "Either" ? "selected" : ""}`}
                            onClick={() => handleGenderSelect("Either")}
                        >
                            Either
                        </li>
                    </ul>
                    <div className="gen_heading">
                        <h3>Select Time</h3>
                    </div>
                    <ul className="time_options">
                        <li
                            id="min_45"
                            className={`time_option ${formData.service_time === "60min" ? "selected" : ""}`}
                            onClick={() => handleServiceTimeSelect("60min")}
                        >
                            60 min
                        </li>
                        <li
                            id="min_60"
                            className={`time_option ${formData.service_time === "90min" ? "selected" : ""}`}
                            onClick={() => handleServiceTimeSelect("90min")}
                        >
                            90 min
                        </li>
                        <li
                            id="min_90"
                            className={`time_option ${formData.service_time === "120min" ? "selected" : ""}`}
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
                                        <div className="item_wrapper" key={index} >
                                            <div className={`item ${selectedItems.includes(cur._id) ? "selected" : ""}`} onClick={() => handleSelectItem(cur._id)}  >
                                                <div className="bg" style={{ width: "100%", height: "22vh", backgroundSize: "cover" }} onClick={() => handleAdonPrice(cur.price)}>
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
                    <p>Total Price: ${totalPrice}</p>
                    <button className="button lazy" type="submit" onClick={handleSubmit}>next</button>
                </div>
            </div>
        </div>
    );
}

export default SecondForm;
