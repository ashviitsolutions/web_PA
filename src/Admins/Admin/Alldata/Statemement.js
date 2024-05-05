import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IP } from '../../../Constant';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import moment from "moment";







function Statemement() {
    const navigate = useNavigate()

    const [count, setCount] = useState(0);
    const [data, setData] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    // const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
    // const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));


    const [startDate, setStartDate] = useState(moment().subtract(7, 'day').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));



    const [loading, setLoading] = useState(null);
    const [totalTip, setTotalTip] = useState(0);
    const [user, setUser] = useState([]);
    const [status, setStatus] = useState("services");
    const [alldata, setAlladata] = useState("services");

    const [membershipDetails, setMembershipDetails] = useState([]);
    const [giftcarddetails, setGiftcarddetails] = useState([]);






    useEffect(() => {
        const today = moment().format('YYYY-MM-DD');
        setStartDate(moment(today).subtract(7, 'day').format('YYYY-MM-DD'));
        setEndDate(today);
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


                    {
                        status == "services" && (
                            <>
                                <table className="payments-table">
                                    <thead>
                                        <tr>
                                            <th>Date/Time</th>
                                            <th>Provider</th>
                                            <th>Services count</th>
                                            <th>Services value</th>
                                            <th>Addon sales</th>

                                            <th>Addon Value</th>
                                            <th>Gratuity</th>
                                            <th>Total Charge</th>
                                            <th>Total commission</th>
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




                                                <td>{cur.total_services}</td>
                                                <td>{cur?.total_service_price?.toFixed(2)}$</td>
                                                <td>{cur.total_add_ons}</td>
                                                <td>{cur?.total_tip_amount?.toFixed(2)}$</td>
                                                <td>{totalTip.toFixed(2)}$</td>
                                                <td>{cur?.total_admin_amount?.toFixed(2)}$</td>


                                                <td>{cur?.total_provider_amount?.toFixed(2)}$</td>



                                            </tr>
                                        ))}



                                        <tr>
                                            <td colSpan={4} style={{ textAlign: "right" }}><strong>Profit Calculation</strong></td>

                                            <td colSpan={3} style={{ textAlign: "right" }} className='provDet'>
                                                <div className='sub'>
                                                    <p>Gross amount = {aggregatedValues.totalAdminAmount}$</p>
                                                    <p>- Tax(es) = {aggregatedValues.amount_tax}$</p>
                                                    <p>- Provider Pay = {aggregatedValues.totalProviderAmount}$</p>
                                                    <p>
                                                        <strong>
                                                            Net Profit = {Math.max(aggregatedValues.totalAdminAmount - aggregatedValues.amount_tax - aggregatedValues.totalProviderAmount, 0).toFixed(2)}$
                                                        </strong>
                                                    </p>
                                                </div>
                                            </td>



                                        </tr>
                                    </tbody>



                                </table>
                            </>
                        )
                    }










                    {
                        status == "membership" && (
                            <>
                                <table className="payments-table">
                                    <thead>
                                        <tr>
                                            <th>Date/Time</th>
                                            <th>Customer</th>
                                            <th>membershipType</th>
                                            <th>Amount</th>
                                            <th>status</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length === 0 && (
                                            <tr>
                                                <td colSpan="11">No data found</td>
                                            </tr>
                                        )}
                                        {filteredData.map((cur, index) => (
                                            <tr key={index}>
                                                <td className='sub ' >
                                                    <span>{moment(cur.createdAt).format("MMMM Do YYYY")}</span>
                                                    <p><span>{moment(cur.createdAt).format("LT")}</span></p>
                                                </td>
                                                <td className="provDet">
                                                    <p className='title cursor2' title='click on provider to view details'><span>{`${cur?.userDetails?.name}`}</span></p>
                                                    <span className='sub'>{cur?.userDetails?.name?.address}</span>
                                                    <p className='sub'>email: <span>{cur?.userDetails?.email}</span></p>

                                                </td>
                                                <td>{cur.membershipType}</td>

                                                <td>{cur?.membershipPrice?.toFixed(2)}$</td>
                                                <td>{cur?.status}</td>





                                            </tr>


                                        ))}

                                        <tr>
                                            <p>
                                                <strong>
                                                    Memberhsip Price = {totalMembershipPrice}$
                                                </strong>
                                            </p>
                                            <td>{totalMembershipPrice}</td>
                                            <td colSpan={4} style={{ textAlign: "right" }}><strong>Total Memberhsip Amount:- {alldata.totalMembershipPrice.toFixed(2)}$</strong></td>





                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        )
                    }







                    {
                        status === "giftcard" && (
                            <table className="payments-table">
                                <thead>
                                    <tr>
                                        <th>Date/Time</th>
                                        <th>Customer</th>
                                        <th>Type</th>
                                        <th>Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredGiftData.length === 0 ? (
                                        <tr>
                                            <td colSpan="5">No data found</td>
                                        </tr>
                                    ) : (
                                        filteredGiftData.map((user, userIndex) => (
                                            user.giftCards.map((gift, giftIndex) => (
                                                <tr key={userIndex + "-" + giftIndex}>
                                                    <td className='sub'>
                                                        <span>{moment(gift.createdAt).format("MMMM Do YYYY")}</span>
                                                        <p><span>{moment(gift.createdAt).format("LT")}</span></p>
                                                    </td>
                                                    <td className="provDet">
                                                        <p className='title cursor2' title='click on provider to view details'><span>{`${user.name}`}</span></p>
                                                        <span className='sub'>{user?.email}</span>
                                                    </td>
                                                    <td>{gift.type}</td> {/* Assuming 'membershipType' is a property of the user */}
                                                    <td>{gift.offerCurrentValue.toFixed(2)}$</td>

                                                </tr>
                                            ))
                                        ))
                                    )}


                                    <tr>
                                        <p>
                                            <strong>
                                                Memberhsip Price = {totalGiftPrice}$
                                            </strong>
                                        </p>
                                        <td>{totalGiftPrice}</td>
                                        <td colSpan={4} style={{ textAlign: "right" }}><strong>Total Memberhsip Amount:- {alldata.totalOfferValue.toFixed(2)}$</strong></td>





                                    </tr>
                                </tbody>
                            </table>
                        )
                    }








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