import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IP } from '../../../Constant';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import { useLocation } from 'react-router-dom';








function Statemement() {
    const navigate = useNavigate()
    const location = useLocation();
    const endDates = location.state.endDate;
    const startDates = location.state.startDate
    const [searchText, setSearchText] = useState("");

    const [startDate, setStartDate] = useState(startDates);
    const [endDate, setEndDate] = useState(endDates);

    const [loading, setLoading] = useState(null);
    const [totalTip, setTotalTip] = useState(0);
    const [user, setUser] = useState([]);
    const [status, setStatus] = useState("");
    const [alldata, setAlladata] = useState("");

    const [membershipDetails, setMembershipDetails] = useState([]);
    const [giftcarddetails, setGiftcarddetails] = useState([]);




    useEffect(() => {

        setStartDate(startDate);
        setEndDate(endDate);
    }, []);





    console.log("membershipDetails", membershipDetails)
    console.log("giftcarddetails", giftcarddetails)
    console.log("alldata", alldata)

    useEffect(() => {
        let updatedTotalTip = 0;
        user.forEach(provider => {
            provider.services.forEach(service => {
                updatedTotalTip += service.amount_calculation.amount_tip || 0;
            });
        });
        setTotalTip(updatedTotalTip);
    }, [user]);













    const handleRowClick = (cur) => {
        console.log("cur", cur); // Check the structure of cur
        navigate(`/admin/payments/details/${cur.provider_details._id}`, { state: { cur, startDate, endDate } });
    };





    useEffect(() => {
        setLoading(true);
        fetch(`${IP}/provider/get-all-statemnet`)
            .then(resp => resp.json())
            .then(result => {
                setUser(result.allData.servicesByProvider);
                setMembershipDetails(result.allData.membershipDetails);
                setGiftcarddetails(result.allData.giftcarddetails);
                setAlladata(result.finalcalculation)
                console.log("real resuklt data", result)

            })
            .catch(err => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));
    }, []);


    console.log("provider service data", user)




    // const handleFilter = () => {

    //     const filteredData = user.filter(event => {
    //         console.log("eventDate:", event.services[0].createdAt); // Accessing the first element's createdAt property

    //         const eventDate = moment(event.services[0].createdAt, 'YYYY-MM-DD'); // Adjust the format based on the actual format of eventDate

    //         const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
    //             (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));

    //         const isSearched = !searchText || event.provider_details.first_name.toLowerCase().includes(searchText.toLowerCase());

    //         return isWithinDateRange && isSearched;
    //     });

    //     return filteredData;
    // };

    // const memoizedUser = handleFilter();





    // memberhsip filter




    const handleFilter = () => {
        const filteredData = user.filter(event => {
            const eventDate = moment(event.services[0].createdAt, 'YYYY-MM-DD');
            const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));
            const isSearched = !searchText || event.provider_details.first_name.toLowerCase().includes(searchText.toLowerCase());
            return isWithinDateRange && isSearched;
        });

        // Calculate aggregated values from filtered data
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
            amount_tax += cur.service?.amount_calculation?.amount_tax || 0; // Add conditional check
            totalAdminAmount += cur.total_admin_amount || 0;
            totalProviderAmount += cur.total_provider_amount || 0;

            // Calculate total tip amount for each user
            cur.services.forEach(service => {
                amount_tax += service?.amount_calculation?.amount_tax || 0; // Add conditional check
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

    console.log("aggregatedValues", aggregatedValues)











    const handleMemberhsip = () => {
        const filteredData = membershipDetails.filter(event => {
            console.log("eventDate:", event.createdAt); // Accessing the first element's createdAt property

            const eventDate = moment(event.createdAt, 'YYYY-MM-DD'); // Adjust the format based on the actual format of eventDate

            const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));

            const isSearched = !searchText || event.userDetails.name.toLowerCase().includes(searchText.toLowerCase());

            return isWithinDateRange && isSearched;
        });

        // Calculate total membership price from filtered data
        let totalMembershipPrice = 0;

        filteredData.forEach(cur => {
            totalMembershipPrice += cur.membershipPrice;
        });

        return { filteredData, totalMembershipPrice };
    };

    const { filteredData, totalMembershipPrice } = handleMemberhsip();



    // giftcard filter

    const handleGiftcard = () => {
        const filteredGiftData = giftcarddetails.filter(event => {
            console.log("eventDate:", event.giftCards[0].createdAt); // Accessing the first element's createdAt property

            const eventDate = moment(event.giftCards[0].createdAt, 'YYYY-MM-DD'); // Adjust the format based on the actual format of eventDate

            const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));

            const isSearched = !searchText || event.name.toLowerCase().includes(searchText.toLowerCase());

            return isWithinDateRange && isSearched;
        });

        // Calculate total gift price from filtered data
        let totalGiftPrice = 0;

        filteredGiftData.forEach(cur => {
            cur.giftCards.forEach(card => {
                totalGiftPrice += card.offerCurrentValue;
            });
        });

        return { filteredGiftData, totalGiftPrice };
    };

    const { filteredGiftData, totalGiftPrice } = handleGiftcard();




    return (
        <>
            <div id="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="">
                            <div class="headings">
                                <h3>Statement of Providers</h3>
                                <span class="toggle_sidebar" ></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="gutter">
                            <div class="card layer1 filters">
                                <span class="highlight"> from </span>
                                <div class="input_group">
                                    <input type="date" class="input" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} value={startDate} />
                                    <span class="highlight"></span>
                                </div>
                                <span class="highlight"> to </span>
                                <div class="input_group">
                                    <input type="date" class="input" placeholder="End Date" onChange={e => setEndDate(e.target.value)} value={endDate} />
                                    <span class="highlight"></span>
                                </div>

                                <div class="input_group">
                                    <select name="" id="" class="input" onChange={e => setStatus(e.target.value)} value={status}>
                                        <option value="">All</option>
                                        <option value="services">services</option>
                                        <option value="membership">membership</option>
                                        <option value="giftcard">giftcard</option>
                                    </select>
                                    <span class="highlight"></span>
                                </div>
                                <div class="input_group pull-right" style={{ maxWidth: "20%" }}>
                                    <input type="text" class="input" placeholder="search here.." onChange={e => setSearchText(e.target.value)} value={searchText} />
                                    <span class="highlight"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <table className="payments-table">
                        <thead>
                            <tr>
                                <th>Date/Time</th>
                                <th>Provider</th>
                                <th>Description</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Tax(es)</th>
                                <th>Provider's Commission</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>



                            {memoizedUser.length === 0 && (
                                <tr>
                                    <td colSpan="11">No data found</td>
                                </tr>
                            )}
                            {memoizedUser.map((cur, index) => (
                                <tr key={index}>
                                    <td className='sub ' >
                                        <span>{moment(cur.createdAt).format("MMMM Do YYYY")}</span>
                                        <p><span>{moment(cur.createdAt).format("LT")}</span></p>
                                    </td>
                                    <td className="provDet">
                                        <p className='title cursor2' onClick={() => handleRowClick(cur)} title='click on provider to view details'><span>{`${cur?.provider_details?.first_name} ${cur?.provider_details?.last_name}`}</span></p>
                                        <span className='sub'>{cur?.provider_details?.mailing_address?.address}</span>
                                        <p className='sub'>email: <span>{cur?.provider_details?.email}</span></p>
                                        <p className='sub'>phone: <span>{cur?.provider_details?.phone}</span></p>
                                    </td>
                                    <td>
                                        {cur.services.map((service, index) => (
                                            <React.Fragment key={index}>
                                                <p> {service.service_name}</p>

                                            </React.Fragment>
                                        ))}
                                    </td>


                                    <td className="provDet">
                                        {cur.user_details.reduce((uniqueUsers, userDetail) => {
                                            const isDuplicate = uniqueUsers.some(u => u.name === userDetail.name && u.email === userDetail.email);
                                            if (!isDuplicate) {
                                                uniqueUsers.push(userDetail);
                                            }
                                            return uniqueUsers;
                                        }, []).map((userDetail, index) => (
                                            <React.Fragment key={index}>
                                                <p className='title cursor2' onClick={() => handleRowClick(cur)} title='click on provider to view details'>
                                                    <span>{`${userDetail.name}`}</span>
                                                </p>
                                                <p className='sub'>email: <span>{userDetail.email}</span></p>
                                                <p className='sub'>phone: <span>{userDetail.mobile}</span></p>
                                            </React.Fragment>
                                        ))}
                                    </td>



                                    <td>{cur?.total_admin_amount?.toFixed(2)}$</td>
                                    <td>{cur?.services.total_tip_amount?.toFixed(2)}$</td>
                                    <td>{cur?.total_provider_amount?.amount_calculation?.amount_tax?.toFixed(2)}$</td>
                                    <td>{Math.max(cur.total_admin_amount  - cur?.total_provider_amount?.amount_calculation?.amount_tax?.toFixed(2) - cur.total_provider_amount, 0).toFixed(2)}$</td>


                                </tr>


                            ))}


                            {/* Membership Data */}
                            {filteredData.map((membership, index) => (
                                <tr key={`membership-${index}`}>
                                    <td className='sub'>
                                        <span>{moment(membership.createdAt).format("MMMM Do YYYY")}</span>
                                        <p><span>{moment(membership.createdAt).format("LT")}</span></p>
                                    </td>
                                    <td>-</td>
                                    <td>Membership Purchase</td>



                                    <td className="provDet">
                                        <p className='title cursor2'>{membership.userDetails.name}</p>
                                        <span className='sub'>{membership.userDetails.email}</span>
                                        <p className='sub'>email: <span>{membership.userDetails.mobile}</span></p>

                                    </td>


                                    <td>{membership.membershipPrice.toFixed(2)}$</td>
                                    <td>_</td>
                                    <td>_</td>
                                    <td>{membership.membershipPrice.toFixed(2)}$</td>
                                </tr>
                            ))}


                            {/* Giftcard Data */}
                            {filteredGiftData.map((giftData, index) => (
                                giftData.giftCards.map((giftCard, cardIndex) => (
                                    <tr key={`giftcard-${index}-${cardIndex}`}>
                                        <td className='sub'>
                                            <span>{moment(giftCard.createdAt).format("MMMM Do YYYY")}</span>
                                            <p><span>{moment(giftCard.createdAt).format("LT")}</span></p>
                                        </td>
                                        <td>_</td>
                                        <td>Giftcard Purchase</td>
                                        <td className="provDet">
                                            <p className='title cursor2'>
                                                <span>{giftData.name}</span>
                                            </p>
                                            <p className='sub'>{giftData.email}</p>
                                            <p className='sub'>{giftData.mobile}</p>
                                        </td>
                                        <td>{giftData.totalOfferValueForUser}$</td>
                                        <td>_</td>
                                        <td>_</td>
                                        <td>{giftData.totalOfferValueForUser}$</td>
                                    </tr>
                                ))
                            ))}




                            <tr>
                                <td colSpan={4} style={{ textAlign: "right" }}><strong>Profit Calculation</strong></td>
                                {memoizedUser.length > 0 && (
                                    <td colSpan={3} style={{ textAlign: "right" }} className='provDet'>
                                        <div className='sub'>
                                            <p>Service Amount = {aggregatedValues.totalAdminAmount.toFixed(2)}$</p>
                                            <p>Membership amount = {totalMembershipPrice.toFixed(2)}$</p>
                                            <p>Giftcard amount = {totalGiftPrice.toFixed(2)}$</p>
                                            <p>- Tax(es) = {aggregatedValues.amount_tax.toFixed(2)}$</p>
                                            <p>- Provider Pay = {aggregatedValues.totalProviderAmount.toFixed(2)}$</p>
                                            <p>
                                                <strong>
                                                    Net Profit = {Math.max(aggregatedValues.totalAdminAmount + totalMembershipPrice + totalGiftPrice - aggregatedValues.amount_tax - aggregatedValues.totalProviderAmount, 0).toFixed(2)}$
                                                </strong>
                                            </p>
                                        </div>
                                    </td>
                                )}
                            </tr>

                        </tbody>
                    </table>






                    {loading && (
                        <div style={{ textAlign: "center" }}>
                            <FallingLines
                                color="#03a9f4"
                                width="150"
                                visible={true}
                                ariaLabel="falling-circles-loading"
                            />
                        </div>
                    )}



                </div>

            </div>
        </>
    )
}

export default Statemement