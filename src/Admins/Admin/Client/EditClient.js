import React, { useState, useEffect } from 'react';
import { IP } from '../../../Constant';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import ViewDetails from './ViewDetails';
import openEye from "../../../Components/assets/img/iconoir_eye.png";
import closeEye from "../../../Components/assets/img/codicon_eye-closed.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditClient() {
    const startDate = localStorage.getItem("startDate")
    const endDates = localStorage.getItem("endDate")
    const tokenadmin = localStorage.getItem("tokenadmin");
    const { id } = useParams();
    localStorage.setItem("userid", id)
    const location = useLocation();
    const apidata = location.state.client;
    const navigate = useNavigate();


    const [formValues, setFormValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        password: '',
        confirm_password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add form submission logic here
        try {
            const response = await axios.post(`${IP}/admin/update/${id}`, formValues, {
                headers: {
                    Authorization: tokenadmin
                }
            });
            console.log(response.data);
            if (response.status === 200) {
                toast.success("Update successfully!", {
                    position: "top-right",
                    autoClose: 1000,
                    onClose: () => {
                        navigate('/admin/clients');
                    },
                });
            } else {
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    useEffect(() => {

        const updatedSavedValues = {
            first_name: apidata.first_name,
            last_name: apidata.last_name,
            email: apidata.email,
            mobile: apidata.mobile,
            password: '',
            confirm_password: ''
        };
        setFormValues(updatedSavedValues);
    }, [apidata]);

    
    const handleCardClient = (event_status) => {
        // Combine first_name and last_name
        const userid = `${apidata._id}`;

        // Navigate with the full name included in the state
        navigate(`/admin/${event_status}`, { state: { startDate, endDates, userId: userid } });
    };


    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper">
                                <div className="gutter pull-left" style={{ paddingLeft: '0' }}>
                                    <h3><span className='cursor title backarrow' onClick={() => navigate(-1)}>&larr;</span> Edit/View Client Details</h3>
                                </div>
                                <span className="toggle_sidebar"></span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="gutter">

                                <div id="user_form_card" className="card layer2">
                                    <label className="card_label" htmlFor="">
                                        Personal Information
                                    </label>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input_group">

                                            <input
                                                className="input"
                                                name="first_name"
                                                type="text"
                                                value={formValues.first_name}
                                                onChange={handleChange}
                                                placeholder='First Name'
                                            />
                                        </div>
                                        <div className="input_group">

                                            <input
                                                className="input"
                                                name="last_name"
                                                type="text"
                                                value={formValues.last_name}
                                                onChange={handleChange}
                                                placeholder='Last Name'
                                            />
                                        </div>
                                        <div className="input_group">

                                            <input
                                                className="input"
                                                name="email"
                                                type="email"
                                                value={formValues.email}
                                                onChange={handleChange}
                                                placeholder='Email'
                                            />
                                        </div>
                                        <div className="input_group">

                                            <input
                                                className="input"
                                                name="mobile"
                                                type="text"
                                                value={formValues.mobile}
                                                onChange={handleChange}
                                                placeholder='Mobile'
                                            />
                                        </div>
                                        <div className="input_group">

                                            <input
                                                className="input"
                                                name="password"
                                                type="password"
                                                value={formValues.password}
                                                onChange={handleChange}
                                                placeholder='Password'
                                            />
                                        </div>
                                        <div className="input_group">

                                            <input
                                                className="input"
                                                name="confirm_password"
                                                type="password"
                                                value={formValues.confirm_password}
                                                onChange={handleChange}
                                                placeholder='Confirm Password'
                                            />
                                        </div>
                                        <div className="input_group">
                                            <button type="submit" className="primary square button">Submit</button>
                                            <div className='link title pull-right' onClick={() => handleCardClient('clients-service-details')}>View Purchase History</div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default EditClient;
