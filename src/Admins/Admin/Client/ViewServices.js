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
    const Startdate = localStorage.getItem("startDate")
    const Enddate = localStorage.getItem("endDate")
    const [searchText, setSearchText] = useState("");
    const [startDate, setStartDate] = useState(startDates);
    const [endDate, setEndDate] = useState(endDates);
    const [loading, setLoading] = useState(null);
    const [totalTip, setTotalTip] = useState(0);
    const [user, setUser] = useState([]);
    const [status, setStatus] = useState("");
    const [alldata, setAlladata] = useState("");
    const [serachToggle, setAerachToggle] = useState(true);
    const [membershipDetails, setMembershipDetails] = useState([]);
    const [giftcarddetails, setGiftcarddetails] = useState([]);
    const [finalAmounts, setFinalAmount] = useState(0);

    const [userlist, setUserlist] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const token = localStorage.getItem('tokenadmin');

    useEffect(() => {
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
    }, [startDate, endDate]);


    useEffect(() => {

        setStartDate(Startdate);
        setEndDate(Enddate);
    }, [endDates, endDates]);// Empty dependency array means this effect will only run once after the initial render

    useEffect(() => {
        let updatedTotalTip = 0;
        user.forEach(provider => {
            provider.services.forEach(service => {
                updatedTotalTip += service.amount_calculation.amount_tip || 0;
            });
        });
        setTotalTip(updatedTotalTip);
    }, [user]);



    // list of user sdetails



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
        setLoading(true);
        fetch(`${IP}/provider/get-all-service?userId=${selectedUserId}`)
            .then(resp => resp.json())
            .then(result => {
                setUser(result.allData.servicesByProvider);
                setMembershipDetails(result.allData.membershipDetails);
                setGiftcarddetails(result.allData.giftcarddetails);
                setAlladata(result.finalcalculation);
                console.log("Fetched data", result);
            })
            .catch(err => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));
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
        handleUserClick()
    }, [selectedUserId])




    const handleFilter = () => {
        const filteredData = user.filter(event => {
            const eventDate = moment(event.services[0].createdAt, 'YYYY-MM-DD');
            const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));;
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
    const amount_tax = parseFloat(aggregatedValues.amount_tax || 0);
    const totalMembership = parseFloat(totalMembershipPrice || 0);
    const totalGift = parseFloat(totalGiftPrice || 0);
    const finalAmount = (totalAdminAmount + totalMembership + totalGift) - (amount_tax + totalProviderAmount);

    useEffect(() => {
        if (status === "") {
            const totalAdminAmount = parseFloat(aggregatedValues.totalAdminAmount || 0);
            const totalProviderAmount = parseFloat(aggregatedValues.totalProviderAmount || 0);
            const amount_tax = parseFloat(aggregatedValues.amount_tax || 0);
            const totalMembership = parseFloat(totalMembershipPrice || 0);
            const totalGift = parseFloat(totalGiftPrice || 0);
            const finalAmount = (totalAdminAmount + totalMembership + totalGift) - (amount_tax + totalProviderAmount);
            setFinalAmount(finalAmount);
        } else if (status === "services") {
            const totalAdminAmount = parseFloat(aggregatedValues.totalAdminAmount || 0);
            const totalProviderAmount = parseFloat(aggregatedValues.totalProviderAmount || 0);
            const amount_tax = parseFloat(aggregatedValues.amount_tax || 0);
            const finalAmount = (totalAdminAmount) - (amount_tax + totalProviderAmount);
            setFinalAmount(finalAmount);
        } else if (status === "membership") {
            const totalMembership = parseFloat(totalMembershipPrice || 0);
            const finalAmount = totalMembership;
            setFinalAmount(finalAmount);
        } else if (status === "giftcard") {
            const totalGift = parseFloat(totalGiftPrice || 0);
            const finalAmount = totalGift;
            setFinalAmount(finalAmount);
        }
    }, [status, aggregatedValues.totalAdminAmount, aggregatedValues.totalProviderAmount, aggregatedValues.amount_tax, totalMembershipPrice, totalGiftPrice]);

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
                                                        <p><b>First Name:</b> {user.first_name} {user.last_name}</p>
                                                        <p><b>Mobile:</b> {user.email}</p>
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
                    )}




                    <div className="col-sm-12 card-right" id="card-right">
                        <div className="gutter">
                            <div id="about_user_card" className="card layer2">
                                <h3 className="inner_title">Purchase History</h3>

                                <ul className="true">
                                    {memoizedUser.length > 0 ? (
                                        <li><b>Service Booking:</b>
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
                                                        <tr key={index}>
                                                            <td>
                                                                {cur.services.map((service, serviceIndex) => (
                                                                    <div key={serviceIndex}>
                                                                        <h6>{service.service_name}</h6>
                                                                        {service.add_ons_details && service.add_ons_details.length > 0 && (
                                                                            <p><b>Addons-</b></p>
                                                                        )}
                                                                        {service.add_ons_details.map((addon, addonIndex) => (
                                                                            <p key={addonIndex}>{addon.title}</p>
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </td>
                                                            <td>{cur.total_service_price}</td>
                                                            <td>{cur.provider_details.name}</td>
                                                            <td>
                                                                {cur.services.map((service, serviceIndex) => (
                                                                    <p key={`createdAt-${serviceIndex}`}>
                                                                        {moment(service.createdAt).format('DD-MM-YYYY hh:mm A')}
                                                                    </p>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </li>
                                    ) : (
                                        <li>No service bookings found.</li>
                                    )}

                                    {filteredGiftData.length > 0 ? (
                                        <li><b>Gift card purchases:</b>
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
                                        </li>
                                    ) : (
                                        <li>No gift card purchases found.</li>
                                    )}

                                    {filteredMembershipData.length > 0 ? (
                                        <li><b>Membership purchase/renewals:</b>
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
                                        </li>
                                    ) : (
                                        <li>No membership purchases found.</li>
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

