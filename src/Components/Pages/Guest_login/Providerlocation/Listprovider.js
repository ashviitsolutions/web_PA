import React, { useEffect, useState } from 'react';
import './Listprovider.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';
import { IP } from "../../../../Constant";

function Listprovider() {
    const nav = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const latitude = currentLocation?.latitude;
                const longitude = currentLocation?.longitude;

                const res = await fetch(`${IP}/user/nearrestproviders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ latitude, longitude }),
                });

                const data = await res.json();

                if (data && data.data) {
                    console.log('Data fetched successfully:', data.data);
                    setUsers(data.data);
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (currentLocation) {
            fetchData();
        }
    }, [currentLocation]);

    useEffect(() => {
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation({ latitude, longitude });
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        fetchLocation();
    }, []);

    const filteredUsers = (users || []).filter((cur) => {
        const fullName = `${cur.first_name} ${cur.last_name}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    const handleSelect = (provider_Id) => {
        nav(`/book/${provider_Id}`);
    };

    return (
        <div className='provider-list-container'>
            {/* Search Bar */}
            <div className='search_bar_Listprovider'>
                <input
                    type="text"
                    placeholder="Search providers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <Loader />
            ) : (
                filteredUsers.length > 0 ? (
                    <div className='Provider_List'>
                        {filteredUsers.filter((data) => data.application_status >= 3).map((cur) => (
                            <div key={cur._id} className='provider_card'>
                                <div className='image'>
                                    <img src={`http://45.13.132.197:5000/api/file/${cur.images}`} alt='' />
                                </div>
                                <div className='content'>
                                    <p>Provider Name: {cur.first_name} {cur.last_name.charAt(0)}.</p>
                                    <p><strong>{cur.averageRating}★</strong></p>
                                </div>

                                <div className='decription'>
                                    {/*<p>Available Service: {cur?.areas_of_expertise?.on_demand?.join(', ')}</p> */}
                                    <p>Service Location:  {cur?.mailing_address?.city}, {cur?.mailing_address?.state} {cur?.mailing_address?.postal_code}</p>
                                    {/* <p>Address: {cur?.mailing_address?.address} {cur?.mailing_address?.country} {cur?.mailing_address?.postal_code}</p> */}
                                    {/*<p>Distance from you: {cur?.dist?.calculatedInKilometers}</p> */}
                                </div>
                                <div className='Listprovider_button'>
                                    <button className='button' onClick={() => handleSelect(cur._id)}>Select</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-center'><strong>No stores found within 10 kilometers of the specified location</strong></p>
                )
            )}
        </div>
    );
}

export default Listprovider;
