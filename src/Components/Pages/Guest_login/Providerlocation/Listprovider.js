import React, { useEffect, useState } from 'react';
import './Listprovider.css';
import { IP } from '../../../../Constant';
import { useNavigate } from 'react-router-dom';

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
        <div>
            {imageObjectURL && <img src={imageObjectURL} alt="Preview" />}
        </div>
    );
};

function Listprovider() {
    const nav = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
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
            }
        };

        fetchData();
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

    // Initialize users with an empty array if it's undefined
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

            <div className='Provider_List'>
                {filteredUsers.filter((data) => data.application_status >= 3).map((cur) => (
                    <div key={cur.id} className='provider_card'>
                        <div className='image'>
                            <PreviewImage attachments={cur.images} />
                        </div>
                        <div className='content'>
                            <h3>{cur.first_name} {cur.last_name}</h3>
                            <p><strong>{cur.averageRating}★</strong></p>
                        </div>
                        <div className='decription'>
                            <p>Available Service: {cur?.areas_of_expertise?.on_demand}</p>
                            <p>Address: {cur?.mailing_address?.address} {cur?.mailing_address?.country} {cur?.mailing_address?.postal_code}</p>
                        </div>
                        <div className='Listprovider_button'>
                            <button className='button' onClick={() => handleSelect(cur._id)}>Select</button>
                        </div>
                    </div>
                ))}


            </div>



        </div>
    );
}

export default Listprovider;
