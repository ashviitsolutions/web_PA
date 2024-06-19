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

    const [membershipDetails, setMembershipDetails] = useState([]);
    const [giftcarddetails, setGiftcarddetails] = useState([]);
    const [finalAmounts, setFinalAmount] = useState(0)




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













    const handleRowClick = (cur) => {
        console.log("cur", cur); // Check the structure of cur
        // navigate(`/admin/payments/details/${cur.provider_details._id}`, { state: { cur, startDate, endDate } });
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
                // console.log("real resuklt data", result)

            })
            .catch(err => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));
    }, []);








    console.log("user provider data", user)

    const handleFilter = () => {
        const filteredData = user.filter(event => {
            const eventDate = moment(event.services[0].createdAt, 'YYYY-MM-DD');
            const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));
            const isSearched = !searchText || event.provider_details.name.toLowerCase().includes(searchText.toLowerCase());
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
            amount_tax += cur.service?.amount_calculation?.amount_tax || 0;
            totalTipAmount += cur.service?.amount_calculation?.amount_tip || 0;
            totalAdminAmount += cur.total_admin_amount || 0;
            totalProviderAmount += cur.total_provider_amount || 0;

            // Calculate total tip amount for each user
            cur.services.forEach(service => {
                amount_tax += service?.amount_calculation?.amount_tax || 0; // Add conditional check
                totalTipAmount += service?.amount_calculation?.amount_tip || 0; // Add conditional check
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





    const handleMemberhsip = () => {
        const filteredData = membershipDetails.filter(event => {
            // Ensure that event and userDetails are not undefined before accessing their properties
            if (event && event.userDetails && event.userDetails.name) {
                const eventDate = moment(event.createdAt, 'YYYY-MM-DD');

                const isWithinDateRange = (!startDate || moment(startDate).isSameOrBefore(eventDate, 'day')) &&
                    (!endDate || moment(endDate).isSameOrAfter(eventDate, 'day'));

                

                return isWithinDateRange;
            } else {
                return false; // Return false for items where userDetails or name is undefined
            }
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

           

            return isWithinDateRange;
        });


        let totalGiftPrice = 0;

        filteredGiftData.forEach(cur => {
            if (cur.giftCards && Array.isArray(cur.giftCards)) {
                cur.giftCards.forEach(card => {
                    totalGiftPrice += card.offerValue || 0; // Ensure offerValue is added safely
                });
            }
        });

        return { filteredGiftData, totalGiftPrice };
    };

    const { filteredGiftData, totalGiftPrice } = handleGiftcard();


    console.log("dfghdfhfghfdgjhdfdf totalGiftPrice", totalGiftPrice)

    console.log("filteredGiftData filteredGiftData filteredGiftData", filteredGiftData)

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

            const finalAmount = (totalMembership);
            setFinalAmount(finalAmount);
        } else if (status === "giftcard") {
            const totalGift = parseFloat(totalGiftPrice || 0);

            const finalAmount = (totalGift);
            setFinalAmount(finalAmount);
        }
    }, [status, aggregatedValues.totalAdminAmount, aggregatedValues.totalProviderAmount, aggregatedValues.amount_tax]);


    console.log("filteredData", filteredData)

    return (
        <>
            <div id="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="">
                            <div class="headings">
                            <h3><span className='cursor title backarrow' onClick={() => navigate(-1)}>&larr;</span>Statement</h3>
                                
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
                                <th>Gratuity</th>
                                <th>Provider's Commission</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                (status === "services" || status === "") && (
                                    <>
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
                                                    <p className='title cursor2' onClick={() => handleRowClick(cur)} title='click on provider to view details'><span>{`${cur?.provider_details?.name}`}</span></p>
                                                    <span className='sub'>{cur?.provider_details?.mailing_address?.address}</span>
                                                    <p className='sub'><span>{cur?.provider_details?.email}</span></p>
                                                    <p className='sub'><span>{cur?.provider_details?.phone}</span></p>
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
                                                            <p className='sub'><span>{userDetail.email}</span></p>
                                                            <p className='sub'><span>{userDetail.mobile}</span></p>
                                                        </React.Fragment>
                                                    ))}
                                                </td>



                                                <td>{cur?.total_admin_amount?.toFixed(2)}$</td>
                                                <td>{cur?.total_tax_amount?.toFixed(2)}$</td>
                                                <td>{cur?.total_gratuity_amount?.toFixed(2)}$</td>
                                                <td>{cur?.total_provider_amount?.toFixed(2)}$</td>
                                                <td>{Math.max(cur?.total_admin_amount - (cur?.total_tax_amount || 0) - cur?.total_provider_amount, 0).toFixed(2)}$</td>



                                            </tr>


                                        ))}

                                    </>
                                )
                            }

                            {
                                (status === "membership" || status === "") && (
                                    <>
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
                                                    <p className='sub'><span>{membership.userDetails.mobile}</span></p>

                                                </td>


                                                <td>{membership.membershipPrice.toFixed(2)}$</td>
                                                <td>_</td>
                                                <td>_</td>
                                                <td>_</td>
                                                <td>{membership.membershipPrice.toFixed(2)}$</td>
                                            </tr>
                                        ))}

                                    </>
                                )
                            }


                            {
                                (status === "giftcard" || status === "") && (
                                    <>
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
                                                    <td>{giftCard.offerValue}$</td>
                                                    <td>_</td>
                                                    <td>_</td>
                                                    <td>_</td>
                                                    <td>{giftCard.offerValue}$</td>
                                                </tr>
                                            ))
                                        ))}
                                    </>
                                )
                            }



                            <tr>
                                <td colSpan={4} style={{ textAlign: "right" }}><strong>Profit Calculation</strong></td>

                                <td colSpan={3} style={{ textAlign: "right" }} className='provDet'>
                                    <div className='sub'>
                                        {
                                            (status === "services" || status === "") && (
                                                <>
                                                    <p>Service Amount = {aggregatedValues.totalAdminAmount.toFixed(2)}$</p>
                                                    <p>- Tax(es) = {aggregatedValues.amount_tax.toFixed(2)}$</p>
                                                    <p>Gratuity = {aggregatedValues.totalTipAmount.toFixed(2)}$</p>
                                                    <p>- Provider Pay = {aggregatedValues.totalProviderAmount.toFixed(2)}$</p>
                                                </>


                                            )
                                        }

                                        {
                                            (status === "membership" || status === "") && (
                                                <p>Membership amount = {totalMembershipPrice.toFixed(2)}$</p>
                                            )
                                        }


                                        {
                                            (status === "giftcard" || status === "") && (
                                                <p>Giftcard amount = {totalGiftPrice?.toFixed(2)}$</p>
                                            )
                                        }


                                        <p>
                                            <p>
                                                <strong>
                                                    {
                                                        (status === "giftcard") && (
                                                            <p>Net Profit = {totalGiftPrice?.toFixed(2)}$</p>
                                                        )
                                                    }

                                                    {
                                                        (status === "membership") && (
                                                            <p> Net Profit = {totalMembershipPrice.toFixed(2)}$</p>
                                                        )
                                                    }
                                                    <p> Total Amount = {(aggregatedValues.totalAdminAmount + totalGiftPrice + totalMembershipPrice).toFixed(2)}$</p>
                                                    {
                                                        (status === "services" || status === "") && (
                                                            <p> Net Profit = {(aggregatedValues.totalAdminAmount + totalGiftPrice + totalMembershipPrice - aggregatedValues.amount_tax - aggregatedValues.totalProviderAmount).toFixed(2)}$</p>
                                                        )
                                                    }
                                                 
                                                </strong>
                                            </p>

                                        </p>


                                    </div>
                                </td>

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