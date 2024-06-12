import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import "./style.css"; // Assuming you have this file for styling
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import { IP } from '../../../Constant';


function ViewDetails() {
    const userid = localStorage.getItem("userid")
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
    const [finalAmounts, setFinalAmount] = useState(0)




    useEffect(() => {

        setStartDate(startDate);
        setEndDate(endDate);
    }, []);




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
        fetch(`${IP}/provider/get-all-service?userId=${userid}`)
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

                const isSearched = !searchText || event.userDetails.name.toLowerCase().includes(searchText.toLowerCase());

                return isWithinDateRange && isSearched;
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

    console.log("memberhsip data", filteredData)



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
        // let totalGiftPrice = 0;

        // filteredGiftData.forEach(cur => {
        //     cur.giftCards.forEach(card => {
        //         totalGiftPrice += card.totalOfferValueForUser;
        //     });
        // });

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









    return (
        <>
            <div className="col-sm-6 card-right" id="card-right">
                <div className="gutter">
                    <div id="about_user_card" className="card layer2">
                        <h3 className="inner_title">Service Details</h3>
                        <ul className="true">
                            <li><b>Service Booking:</b></li>
                            {memoizedUser.map((cur, index) => (
                                <tr key={index}>
                                    <p style={{ paddingLeft: "30px" }}>
                                        <td>
                                            {cur.services.map((service, index) => (
                                                <React.Fragment key={index}>
                                                    <p> {service.service_name}</p>

                                                </React.Fragment>
                                            ))}
                                        </td>

                                    </p>







                                </tr>


                            ))}


                            <li><b>Memberhsip Purchase:</b>
                                {filteredData.map((membership, index) => (
                                    <div key={`membership-${index}`}>
                                        <p className='title cursor2'>{membership.membershipType}</p>
                                    </div>
                                ))}
                            </li>
                            <li><b>Giftcard Purchase:</b></li>

                            {filteredGiftData.map((giftData, index) => (
                                giftData.giftCards.map((giftCard, cardIndex) => (
                                    <div key={`giftcard-${index}-${cardIndex}`}>


                                        <p style={{ paddingLeft: "30px" }}>{giftCard.offerValue}$</p>

                                    </div>
                                ))
                            ))}


                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewDetails;
