import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Common/Header/Header';
import moment from 'moment';
import { IP } from '../../../Constant';

function ViewServices() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location?.state?.userId || "";
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [userServices, setUserServices] = useState([]);
    const [membershipDetails, setMembershipDetails] = useState([]);
    const [giftCardDetails, setGiftCardDetails] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(userId);
    const [selectedUserName, setSelectedUserName] = useState('');
    const [selectedUserEmail, setSelectedUserEmail] = useState('');
    const [selectedUserMobile, setSelectedUserMobile] = useState('');
    const [selectedUserAddress, setSelectedUserAddress] = useState('');
    const [totalMembershipPrice, setTotalMembershipPrice] = useState(0);
    const [totalServicesPrice, setTotalServicesPrice] = useState(0);



    const [totalGiftcartPrices, setTotalGiftcartPrice] = useState(0)

    console.log("selectedUserIdselectedUserId", selectedUserId)

    useEffect(() => {
        const storedStartDate = localStorage.getItem('startDate');
        const storedEndDate = localStorage.getItem('endDate');
        setStartDate(storedStartDate);
        setEndDate(storedEndDate);
    }, []);

    useEffect(() => {
        fetch(`${IP}/admin/allusers`, {
            headers: {
                Authorization: localStorage.getItem('tokenadmin'),
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
                setUserList(result);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch data
        fetch(`${IP}/provider/get-all-service?userId=${selectedUserId}`)
            .then((resp) => resp.json())
            .then((result) => {
                console.log('API Response:', result);

                const { allData, finalcalculation } = result;
                console.log('allData:', allData);
                console.log('finalcalculation:', finalcalculation);

                setUserServices(allData?.servicesByUser || []);
                setMembershipDetails(allData?.membershipDetails || []);
                setGiftCardDetails(allData?.giftcarddetails || []);

                const { totalMembershipPrice } = allData || {};
                if (totalMembershipPrice) {
                    setTotalMembershipPrice(totalMembershipPrice);
                }

                const { totalOfferValue } = allData || {};
                if (totalOfferValue) {
                    setTotalGiftcartPrice(totalOfferValue);
                }

                const { totalServiceAmount } = allData || {};
                if (totalServiceAmount) {
                    setTotalServicesPrice(totalServiceAmount);
                }

                const selectedUser = userList.find((user) => user._id === selectedUserId);
                if (selectedUser) {
                    setSelectedUserName(`${selectedUser.first_name} ${selectedUser.last_name}`);
                    setSelectedUserEmail(selectedUser.email);
                    setSelectedUserMobile(selectedUser.mobile);
                    setSelectedUserAddress(selectedUser.address);
                }
            })
            .catch((error) => {
                console.error('Error fetching services:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedUserId, userList]);


    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
        setSearchText('');
    };

    const handleFilter = () => {
        const filteredData = userServices.filter((service) => {
            const eventDate = moment(service.createdAt, 'YYYY-MM-DD');
            const isWithinDateRange =
                (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));
            const isSearched =
                !searchText ||
                service.provider_details.name.toLowerCase().includes(searchText.toLowerCase());
            return isWithinDateRange && isSearched;
        });

        const filteredMembership = membershipDetails.filter((membership) => {
            const startDateValid = !startDate || moment(startDate).isSameOrBefore(membership.startDate, 'day');
            const endDateValid = !endDate || moment(endDate).isSameOrAfter(membership.endDate, 'day');
            return startDateValid && endDateValid;
        });

        const filteredGiftCard = giftCardDetails.filter((giftcard) => {
            const eventDate = moment(giftcard?.giftCards[0]?.createdAt, 'YYYY-MM-DD');
            const isWithinDateRange =
                (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));
            return isWithinDateRange;
        });

        return { filteredData, filteredMembership, filteredGiftCard };
    };

    const { filteredData, filteredMembership, filteredGiftCard } = handleFilter();


    console.log("filteredGiftCardfilteredGiftCard", filteredGiftCard)
    console.log("giftCardDetails", giftCardDetails)

    return (
        <div id="content">
            <div className="container-fluid">

                <Header
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    searchField={true}
                    title=" Client Services Details"
                    infor={{
                        para1: "* Search client and click on client name to view purchase history",
                        para2: "* Click on Edit link after the client name to edit client details",
                        para3: "* Click on provider name to view provider service history",
                    }}
                />


                {searchText && (
                    <div className="col-sm-4 pull-right searchResult" id="">
                        <div className="gutter">
                            <div id="about_user_card" className=" layer2">
                                <h3 className="inner_title">User List</h3>
                                {userList.length > 0 ? (
                                    userList.map((user) => (
                                        <div className="card gutter mt-2 link" key={user._id}>
                                            <small onClick={() => handleUserClick(user._id)}>
                                                <p>
                                                    <b>Name:</b> {user.first_name} {user.last_name}
                                                </p>
                                                <p>
                                                    <b>Email:</b> {user.email}
                                                </p>
                                                <p>
                                                    <b>Mobile:</b> {user.mobile}
                                                </p>
                                            </small>
                                        </div>
                                    ))
                                ) : (
                                    <p>No users found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}


                <div className="col-sm-12 card-right" id="card-right">
                    <div className="gutter">
                        <div id="about_user_card" className="card layer2">
                            {
                                selectedUserName && (
                                    <>
                                        <h3 className="inner_title">Purchase History</h3>
                                        <table className="smallDetails">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <b>Name:</b>
                                                    </td>
                                                    <td>
                                                        {selectedUserName} (
                                                        <span
                                                            className="link title"
                                                            onClick={() =>
                                                                navigate(`/admin/clients/edit_client/${selectedUserId}`, {
                                                                    state: { client: selectedUserId },
                                                                })
                                                            }
                                                        >
                                                            Edit
                                                        </span>
                                                        )
                                                    </td>
                                                    <td>
                                                        <b>Email:</b>
                                                    </td>
                                                    <td>{selectedUserEmail}</td>
                                                    <td>
                                                        <b>Mobile:</b>
                                                    </td>
                                                    <td>{selectedUserMobile}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </>
                                )
                            }


                            {filteredData?.length > 0 && (
                                <>
                                    <p>
                                        <b>Service Booking:</b>
                                    </p>

                                    <table className="smallDetails">
                                        <thead>
                                            <tr>
                                                <th>Service/Addons Name</th>
                                                <th>Billing Amount</th>
                                                <th>Provided by</th>
                                                <th>Date/Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredData?.map((service, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div>
                                                            <h6>{service.service_name}</h6>
                                                            {service.add_ons_details &&
                                                                service.add_ons_details.length > 0 && (
                                                                    <p>
                                                                        <b>Addons-</b>
                                                                    </p>
                                                                )}
                                                            {service.add_ons_details &&
                                                                service.add_ons_details.map(
                                                                    (addon, addonIndex) => (
                                                                        <p key={addonIndex}>{addon.title}</p>
                                                                    )
                                                                )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>{service?.user_amount_calculation?.totalAmountWithTax?.toFixed(2)}$</p>
                                                    </td>
                                                    <td>
                                                        <p>{service?.provider_details?.first_name}  {service?.provider_details?.last_name}</p>
                                                    </td>
                                                    <td>
                                                        <p>{moment(service.createdAt).format('DD-MM-YYYY hh:mm A')}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan="2">
                                                    <b>Total Booking Price:</b>
                                                </td>
                                                <td colSpan="2">{totalServicesPrice?.toFixed(2)}$</td> {/* Ensure totalMembershipPrice is correctly accessed */}
                                            </tr>
                                        </tbody>
                                    </table>

                                </>
                            )}


                            {filteredGiftCard?.length > 0 && (
                                <>
                                    {giftCardDetails.map((giftCardDetail, index) => (
                                        <div key={index}>
                                            <div className="vspace50"></div>
                                            <p>
                                                <b>Gift Card details:</b>
                                            </p>
                                            <table className="smallDetails">
                                                <thead>
                                                    <tr>
                                                        <th>Gift Card Name</th>
                                                        <th>Amount</th>
                                                        <th>Date/Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {giftCardDetail.giftCards.map((giftCard, idx) => (
                                                        <tr key={idx}>
                                                            <td>{giftCard.giftcard_name}</td>
                                                            <td>{giftCard.offerValue}</td>
                                                            <td>{moment(giftCard.createdAt).format('DD-MM-YYYY hh:mm A')}</td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td colSpan="2">
                                                            <b>Total Giftcard Price:</b>
                                                        </td>
                                                        <td colSpan="2">{totalGiftcartPrices}$</td> {/* Ensure totalMembershipPrice is correctly accessed */}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </>

                            )}





                            {filteredMembership?.length > 0 && (
                                <>
                                    <div className="vspace50"></div>
                                    <p>
                                        <b>Membership details:</b>
                                    </p>
                                    <table className="smallDetails">
                                        <thead>
                                            <tr>
                                                <th>Membership Type</th>
                                                <th>Price</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {membershipDetails.map((membership, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <p>{membership?.membershipType}</p>
                                                    </td>
                                                    <td>
                                                        <p>{totalMembershipPrice}$</p> {/* Ensure price is correctly accessed */}
                                                    </td>
                                                    <td>
                                                        <p>{moment(membership?.createdAt).format('DD-MM-YYYY')}</p>
                                                    </td>
                                                    <td>
                                                        <p>{moment(membership?.lastRenewalPaymentDate).format('DD-MM-YYYY')}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan="2">
                                                    <b>Total Membership Price:</b>
                                                </td>
                                                <td colSpan="2">{totalMembershipPrice}$</td> {/* Ensure totalMembershipPrice is correctly accessed */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            )}

                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default ViewServices;
