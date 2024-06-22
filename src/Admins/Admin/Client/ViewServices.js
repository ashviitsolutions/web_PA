import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import { IP } from '../../../Constant';

function ViewServices() {
    const navigate = useNavigate();
    const location = useLocation();
    const startDates = location.state ? location.state.startDate : "";
    const endDates = location.state ? location.state.endDate : "";
    const username = location.state ? location.state.name : "";
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");
    const [startDate, setStartDate] = useState(startDates || storedStartDate);
    const [endDate, setEndDate] = useState(endDates || storedEndDate);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(null);
    const [totalTip, setTotalTip] = useState(0);
    const [user, setUser] = useState([]);
    const [status, setStatus] = useState("");
    const [alldata, setAlladata] = useState("");
    const [serachToggle, setAerachToggle] = useState(true);
    const [membershipDetails, setMembershipDetails] = useState([]);
    const [giftcarddetails, setGiftcarddetails] = useState([]);
    const [userid, setUserId] = useState('');
    const [selectedUserName, setSelectedUserName] = useState(""); // New state to store selected user name
    const [selectedUserEmail, setSelectedUserEmail] = useState(""); // New state to store selected user email
    const [selectedUserMobile, setSelectedUserMobile] = useState(""); // New state to store selected user mobile
    const [selectedAddress, setSelectedUserAddress] = useState("")
    const [userlist, setUserlist] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(username);
    const token = localStorage.getItem('tokenadmin');

    useEffect(() => {
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
    }, [startDate, endDate]);



    useEffect(() => {
        let updatedTotalTip = 0;
        user.forEach(provider => {
            provider.services.forEach(service => {
                updatedTotalTip += service.amount_calculation.amount_tip || 0;
            });
        });
        setTotalTip(updatedTotalTip);
    }, [user]);

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
                setLoading(false);
            });
    }, [token]);

    useEffect(() => {
        if (selectedUserId) {
            setLoading(true);
            fetch(`${IP}/provider/get-all-service?userId=${selectedUserId}`)
                .then(resp => resp.json())
                .then(result => {
                    setUser(result.allData.servicesByProvider);
                    setMembershipDetails(result.allData.membershipDetails);
                    setGiftcarddetails(result.allData.giftcarddetails);
                    setAlladata(result.finalcalculation);
                    console.log("Fetched data", result);

                    // Update selected user details upon fetching services data
                    const selectedUser = userlist.find(user => user._id === selectedUserId);
                    console.log("user details of selected", selectedUser);
                    if (selectedUser) {
                        setSelectedUserName(`${selectedUser.first_name} ${selectedUser.last_name}`);
                        setUserId(selectedUser);
                        setSelectedUserEmail(selectedUser.email);
                        setSelectedUserMobile(selectedUser.mobile);
                        setSelectedUserAddress(selectedUser.address);
                    }
                })
                .catch(err => console.error("Error fetching data:", err))
                .finally(() => setLoading(false));
        }
    }, [selectedUserId]);

    const filteredUsers = userlist.filter(user => {
        const fullName = `${user.first_name ?? ''} ${user.last_name ?? ''}`.toLowerCase();
        const email = user.email ?? '';
        return fullName.includes(searchText.toLowerCase()) || email.includes(searchText.toLowerCase());
    });

    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
        setAerachToggle(false)
        setSearchText("")
        console.log("Selected User ID:", userId);
    };

    useEffect(() => {
        setSelectedUserId(selectedUserId);
    }, [selectedUserId])

    const handleFilter = () => {
        const filteredData = user.filter(event => {
            const eventDate = moment(event.services[0].createdAt, 'YYYY-MM-DD');
            const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));
            return isWithinDateRange;
        });

        let totalServices = 0;
        let totalServicePrice = 0;
        let totalAddOns = 0;
        let totalAddOnPrice = 0;
        let totalTipAmount = 0;
        let totalAdminAmount = 0;
        let totalProviderAmount = 0;
        let amount_tax = 0;

        filteredData.forEach(cur => {
            totalServices += cur.total_services || 0;
            totalServicePrice += cur.total_service_price || 0;
            totalAddOns += cur.total_add_ons || 0;
            totalAddOnPrice += cur.total_add_on_price || 0;
            amount_tax += cur.service?.amount_calculation?.amount_tax || 0;
            totalTipAmount += cur.service?.amount_calculation?.amount_tip || 0;
            totalAdminAmount += cur.total_admin_amount || 0;
            totalProviderAmount += cur.total_provider_amount || 0;

            cur.services.forEach(service => {
                amount_tax += service?.amount_calculation?.amount_tax || 0;
                totalTipAmount += service?.amount_calculation?.amount_tip || 0;
            });
        });

        return {
            filteredData,
            aggregatedValues: {
                totalServices,
                totalServicePrice,
                totalAddOns,
                totalAddOnPrice,
                amount_tax,
                totalTipAmount,
                totalAdminAmount,
                totalProviderAmount
            }
        };
    };

    const { filteredData: memoizedUser, aggregatedValues } = handleFilter();

    const handleMembership = () => {
        const filteredData = membershipDetails.filter(event => {
            if (event && event.userDetails && event.userDetails.name) {
                const eventDate = moment(event.createdAt, 'YYYY-MM-DD');
                const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                    (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));
                const isSearched = !searchText || event.userDetails.name.toLowerCase().includes(searchText.toLowerCase());
                return isWithinDateRange && isSearched;
            } else {
                return false;
            }
        });

        let totalMembershipPrice = 0;
        filteredData.forEach(cur => {
            totalMembershipPrice += cur.membershipPrice;
        });

        return { filteredData, totalMembershipPrice };
    };

    const { filteredData: filteredMembershipData, totalMembershipPrice } = handleMembership();
    console.log("Membership data", filteredMembershipData);

    const handleGiftcard = () => {
        const filteredGiftData = giftcarddetails.filter(event => {
            const eventDate = moment(event.giftCards[0].createdAt, 'YYYY-MM-DD');
            const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));
            const isSearched = !searchText || event.name.toLowerCase().includes(searchText.toLowerCase());
            return isWithinDateRange && isSearched;
        });

        let totalGiftPrice = 0;
        filteredGiftData.forEach(cur => {
            if (cur.giftCards && Array.isArray(cur.giftCards)) {
                cur.giftCards.forEach(card => {
                    totalGiftPrice += card.offerValue || 0;
                });
            }
        });

        return { filteredGiftData, totalGiftPrice };
    };

    const { filteredGiftData, totalGiftPrice } = handleGiftcard();

    const totalAdminAmount = parseFloat(aggregatedValues.totalAdminAmount || 0);
    const totalProviderAmount = parseFloat(aggregatedValues.totalProviderAmount || 0);
    const finalAmount = totalAdminAmount + totalProviderAmount;


    const handleRowClick = (client) => {
        console.log("cur", client); // Check the structure of cur
        navigate(`/admin/clients/edit_client/${client._id}`, { state: { client } });
    };

    return (
        <>
            <div id="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings float_wrapper">
                                <div className="gutter pull-left" style={{ paddingLeft: '0' }}>
                                    <h3><span className='cursor title backarrow' onClick={() => navigate(-1)}>&larr;</span> Client Services Details</h3>
                                </div>
                                <div className="gutter pull-right">
                                    <small className='sub'>
                                        <p>* Search client and click on client name to view purchase history</p>
                                        <p>* Click on Edit link after the client name to edit client details</p>
                                        <p>* Click on provider name to view provider service history</p>
                                    </small>
                                </div>
                                <span className="toggle_sidebar"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="gutter">
                                <div class="card layer1 filters">
                                    <div class="input_group">
                                        <input type="date" class="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                                        <span class="highlight"></span>
                                    </div>
                                    <span class="highlight"> From </span>
                                    <div class="input_group">
                                        <input type="date" class="input" placeholder="End Date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                                        <span class="highlight"></span>
                                    </div>

                                    <div class="input_group pull-right" style={{ maxWidth: "20%" }}>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Search by name or mobile.."
                                            onChange={e => setSearchText(e.target.value)}
                                            value={searchText}
                                        />
                                        <span class="highlight"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* User List */}
                    {searchText && (
                        <div className="col-sm-4 pull-right searchResult" id="">
                            <div className="gutter">
                                <div id="about_user_card" className=" layer2">
                                    <h3 className="inner_title">User List</h3>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        filteredUsers.length > 0 ? (
                                            filteredUsers.map(user => (
                                                <div className='card gutter mt-2 link'>
                                                    <small key={user._id} onClick={() => handleUserClick(user._id)}>
                                                        <p><b>Name:</b> {user.first_name} {user.last_name}</p>
                                                        <p><b>Email:</b> {user.email}</p>
                                                        <p><b>Mobile:</b> {user.mobile}</p>
                                                    </small>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No users found.</p>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}




                    {
                        memoizedUser.length > 0 ? (
                            <div className="col-sm-12 card-right" id="card-right">
                                <div className="gutter">
                                    <div id="about_user_card" className="card layer2">
                                        <h3 className="inner_title">Purchase History</h3>
                                        <table className='smallDetails'>
                                            <tr>
                                                <td><b>Name:</b></td>
                                                <td>{selectedUserName} (<span className='link title' onClick={() => handleRowClick(userid)} >Edit</span>)</td>
                                                <td><b>Email:</b></td>
                                                <td>{selectedUserEmail}</td>
                                                <td><b>Mobile:</b></td>
                                                <td>{selectedUserMobile}</td>

                                            </tr>
                                        </table>
                                        <div className='vspace50'></div>

                                        {memoizedUser.length > 0 ? (
                                            <>
                                                <p><b>Service Booking:</b></p>
                                                <table className='smallDetails'>
                                                    <thead>
                                                        <tr>
                                                            <th>Service/Addons Name</th>
                                                            <th>Billing Amount</th>
                                                            <th>Provided by</th>
                                                            <th>Date/Time</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {memoizedUser.map((cur, index) => (
                                                            <React.Fragment key={index}>

                                                                {cur.services.map((service, serviceIndex) => (
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <div key={serviceIndex}>
                                                                                <h6>{service.service_name}</h6>
                                                                                {service.add_ons_details && service.add_ons_details.length > 0 && (
                                                                                    <p><b>Addons-</b></p>
                                                                                )}
                                                                                {service.add_ons_details.map((addon, addonIndex) => (
                                                                                    <p key={addonIndex}>{addon.title}</p>
                                                                                ))}
                                                                            </div>

                                                                        </td>
                                                                        <td>
                                                                            <p>{service?.amount_calculation?.total_amount}$</p>
                                                                        </td>

                                                                        <td>
                                                                            <p className='link title'>{service?.provider_details?.name}</p>
                                                                        </td>

                                                                        <td>
                                                                            <p key={`createdAt-${serviceIndex}`}>
                                                                                {moment(service.createdAt).format('DD-MM-YYYY hh:mm A')}
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </React.Fragment>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </>
                                        ) : (
                                            <p>No service bookings found.</p>
                                        )}

                                        {filteredGiftData.length > 0 ? (
                                            <>

                                                <div className='vspace50'></div>
                                                <p><b>Gift card purchases:</b></p>
                                                <table className='smallDetails'>
                                                    <thead>
                                                        <tr>
                                                            <th>Gift Card Name</th>
                                                            <th>Billing Amount</th>
                                                            <th>Date/Time</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredGiftData.map((giftData, index) => (
                                                            giftData.giftCards.map((giftCard, cardIndex) => (
                                                                <tr key={`giftcard-${index}-${cardIndex}`}>
                                                                    <td>{giftCard.giftcard_name}</td>
                                                                    <td>{giftCard.offerValue}$</td>
                                                                    <td>{moment(giftCard.createdAt).format('DD-MM-YYYY hh:mm A')}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </>

                                        ) : (
                                            <p>No gift card purchases found.</p>
                                        )}

                                        {filteredMembershipData.length > 0 ? (
                                            <>

                                                <div className='vspace50'></div>
                                                <p><b>Membership purchase/renewals:</b></p>
                                                <table className='smallDetails'>
                                                    <thead>
                                                        <tr>
                                                            <th>Name of Plan</th>
                                                            <th>Billing Amount</th>
                                                            <th>Date/Time</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredMembershipData.map((membership, index) => (
                                                            <tr key={`membership-${index}`}>
                                                                <td>
                                                                    {membership.membershipType}
                                                                    <p><b>Expiring on-</b>{moment(membership.lastRenewalPaymentDate).format('DD-MM-YYYY hh:mm A')}</p>
                                                                </td>
                                                                <td>{membership.membershipPrice}$</td>
                                                                <td>{moment(membership.createdAt).format('DD-MM-YYYY hh:mm A')}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </>

                                        ) : (
                                            <p>No membership purchases found.</p>
                                        )}

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No data found please select the provider</p>
                        )
                    }


                </div>
            </div>
        </>
    );
}

export default ViewServices;

