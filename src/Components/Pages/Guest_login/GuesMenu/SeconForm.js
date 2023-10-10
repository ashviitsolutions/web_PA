import { useState, useEffect } from "react";
import "./style.css";
import image1 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
import image2 from "../../../assets/img/tender-african-woman-relaxing-enjoying-healthy-spa-massage-with-oil.jpg"
import image3 from "../../../assets/img/pexels-andrea-piacquadio-3764568.jpg"
import image4 from "../../../assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg"
import image5 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
import image6 from "../../../assets/img/masseur-doing-massage-backbone-man-body-spa-salon-beauty-treatment-concept.jpg"
import image7 from "../../../assets/img/tender-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-resort.jpg"
// import postServices from '../Services/postServices';
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









const SeconForm = ({ step, nextStep }) => {
    const [user, setUser] = useState([]);
    // const [priceservice, setPerice] = useState(0)
    // const [priceadon, setPriceadon] = useState(0)
    const [selectedItems, setSelectedItems] = useState([]);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/service/view-services`);
                const data = await res.json();
                setUser(data);

                console.log("get data", data)
            } catch (error) {
            }
        };

        fetchData();
    }, []);





    // Redux uses

    const dispatch = useDispatch();
    const selector = useSelector((state) => state.counter.formData);
    console.log("selector", selector);

    const [service_id, setService_id] = useState();
    const [serviceid_adon, setServiceid_adon] = useState();
    const [priceservice, setPerice] = useState(0);
    const [priceadon, setPriceadon] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState({
        service_ids: "", // Initialize service_ids with an empty string or a default value
        gender: "",
        service_time: "",
        serviceid_adon: "",
        serviceid_adon: "",
        totalPrice: ""
    });

    // Use useEffect to update formData.service_ids whenever service_id changes
    useEffect(() => {
        setFormData({
            ...formData,
            service_ids: service_id !== undefined ? service_id : "", // Update service_ids with the current value of service_id
        });
    }, [service_id]);

    const handleId = (id) => {
        setService_id(id);
    };



    const handlePrice = (price) => {
        setPerice(price);
    }

    const handleAdonPrice = (adonprice) => {
        setPriceadon((prevPrice) => prevPrice + adonprice);
    }

    useEffect(() => {
        // Calculate the total price by adding priceservice and priceadon
        const total = priceservice + priceadon;

        // Set the total price in the state
        setTotalPrice(total);

        // You can also format the total price as a string if needed
        // setTotalPrice(`${total}`);
    }, [priceservice, priceadon]);


    //adon id
    // Use useEffect to update formData.service_ids whenever service_id changes
    useEffect(() => {
        setFormData({
            ...formData,
            serviceid_adon: serviceid_adon !== undefined ? serviceid_adon : "", // Update service_ids with the current value of service_id
        });
    }, [serviceid_adon]);

    const handleAdonId = (adonid) => {
        setServiceid_adon(adonid);
    };








    // alert(formData.service_ids)
    // State to track the clicked gender and service time
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedServiceTime, setSelectedServiceTime] = useState("");


    const handleSubmit = async () => {
        // Dispatch the JavaScript object
        dispatch(updateInputData({ formName: 'secondform', inputData: formData }));
        setTimeout(() => {
            nextStep();


        }, 2000)
    };

    const handleGenderSelect = (selectedGenderValue) => {
        setFormData({ ...formData, gender: selectedGenderValue });
        setSelectedGender(selectedGenderValue); // Set the selected gender
    };

    const handleServiceTimeSelect = (selectedTime) => {
        setFormData({ ...formData, service_time: selectedTime });
        setSelectedServiceTime(selectedTime); // Set the selected service time
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
                            className={`gender time_option ${selectedGender === "Male" ? "selected" : ""}`}
                            onClick={() => handleGenderSelect("Male")}
                        >
                            Male
                        </li>
                        <li
                            id="g_female"
                            className={`gender time_option ${selectedGender === "Female" ? "selected" : ""}`}
                            onClick={() => handleGenderSelect("Female")}
                        >
                            Female
                        </li>
                        <li
                            id="g_either"
                            className={`gender time_option ${selectedGender === "Either" ? "selected" : ""}`}
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
                            className={`time_option ${selectedServiceTime === "60min" ? "selected" : "#000"}`}
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
                                        <div className="item_wrapper" key={index} >
                                            <div className={`item ${serviceid_adon === `${cur._id}` ? "selected" : ""}`} onClick={() => handleAdonId(cur._id)}  >
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

export default SeconForm;
