import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IP } from '../../../Constant';

function ViewServices() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [userlist, setUserlist] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const token = localStorage.getItem('tokenadmin');

    useEffect(() => {
        setLoading(true);
        fetch(`${IP}/admin/allusers`, {
            headers: {
                'Authorization': token
            }
        }).then(resp => resp.json())
            .then(result => {
                setUserlist(result);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }, [token]);

    const filteredUsers = userlist.filter(user => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        return fullName.includes(searchText.toLowerCase()) || user.mobile.includes(searchText);
    });

    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
        console.log("Selected User ID:", userId);
    };

    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper">
                                <div className="gutter pull-left" style={{ paddingLeft: '0' }}>
                                    <h3><span className='cursor title backarrow' onClick={() => navigate(-1)}>&larr;</span>Client Services Details</h3>
                                </div>
                                <div className="gutter pull-right"><small className='sub'>* Click on client to view details</small></div>
                                <span className="toggle_sidebar"></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="gutter">
                                <div className="card layer1 filters">
                                    <div className="input_group pull-right" style={{ maxWidth: "20%" }}>
                                        <input 
                                            type="text" 
                                            className="input" 
                                            placeholder="Search by name or mobile.." 
                                            onChange={e => setSearchText(e.target.value)} 
                                            value={searchText} 
                                        />
                                        <span className="highlight"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 card-right" id="card-right">
                        <div className="gutter">
                            <div id="about_user_card" className="card layer2">
                                <h3 className="inner_title">User List</h3>
                                <ul>
                                    {loading ? (
                                        <li>Loading...</li>
                                    ) : (
                                        filteredUsers.length > 0 ? (
                                            filteredUsers.map(user => (
                                                <li key={user._id} onClick={() => handleUserClick(user._id)}>
                                                    <p><b>First Name:</b> {user.first_name}</p>
                                                    <p><b>Last Name:</b> {user.last_name}</p>
                                                    <p><b>Mobile:</b> {user.mobile}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <li>No users found.</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewServices;
