import { useState, useEffect } from "react";
import "./style.css";

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
    //get value from Redux

    const dispatch = useDispatch();
    const selector = useSelector((state) => state.counter.formData);
    console.log("selector", selector);
    //End 

    const [user, setUser] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedServiceTime, setSelectedServiceTime] = useState("");
    const [service_ids, setService_id] = useState();
    // const [serviceid_adon, setServiceid_adon] = useState();
    //price
    const [priceservice, setPerice] = useState(0);
    const [priceadon, setPriceadon] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const [formData, setFormData] = useState();

    useEffect(() => {
        const formData = {
            service_ids,
            gender: selectedGender,
            service_time: selectedServiceTime,
            selectedItems: selectedItems,
            // selectedItems: selectedItems.join(','), // Convert the array to a comma-separated string
            totalPrice: priceservice + priceadon, // Calculate the total price based on selected items and addons
        };

        setFormData(formData);
    }, [selectedItems, service_ids, selectedGender, selectedServiceTime, priceservice, priceadon]);

    console.log("selectedItems", selectedItems)


    //gender slected
    const handleGenderSelect = (selectedGenderValue) => {
        setFormData({ ...formData, gender: selectedGenderValue });
        setSelectedGender(selectedGenderValue); // Set the selected gender
    };

    const handleServiceTimeSelect = (selectedTime) => {
        setFormData({ ...formData, service_time: selectedTime });
        setSelectedServiceTime(selectedTime); // Set the selected service time
    };


    //Get service id
    // Inside the handleId function
    const handleId = (id) => {
        setService_id(id); // Update the service_id state with the selected ID
        setFormData({ ...formData, service_ids: id }); // Also update the formData state if needed
    };

    //Get service id
    // Inside the handleId function
    // const handleId = (id) => {
    //     setService_id(id); // Update the service_id state with the selected ID
    //     setFormData({ ...formData, service_ids: id }); // Also update the formData state if needed
    // };


    //Sertvice price

    const handlePrice = (price) => {
        setPriceadon(price);
    }



    //Addon service id and prices

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






    //Total price calculate

    useEffect(() => {
        const total = priceservice + priceadon; // Calculate total price based on priceservice and priceadon
        setTotalPrice(total); // Update the totalPrice state
        setFormData({ ...formData, totalPrice: total }); // Update the formData state if needed
    }, [priceservice, priceadon]);



    //Dispatch the function or value           

    const handleSubmit = async () => {
        dispatch(updateInputData({ formName: 'secondform', inputData: formData }));
        dispatch(updateInputData({ formName: 'addon_id', inputData: selectedItems }));
        setTimeout(() => {
            nextStep();
        }, 2000)
    };



    //Api calling

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
                                            <div className={`item ${service_ids === `${cur._id}` ? "selected" : ""}`} onClick={() => handleId(cur._id)}  >
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
                                            <div className={`item ${selectedItems.includes(cur._id) ? "selected" : ""}`} onClick={() => handleSelectItem(cur._id)}  >
                                                <div className="bg" style={{ width: "100%", height: "22vh", backgroundSize: "cover" }} >
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
