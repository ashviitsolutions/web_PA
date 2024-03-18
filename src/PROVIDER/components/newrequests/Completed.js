import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { faCalendar, faClock, faLocationDot, faCoins } from "@fortawesome/free-solid-svg-icons";



const Completed = (props) => {
    const {
        handleClose,
        user_id,
        amount_calculation,
        _id,
        amount,
        title,
        date,
        serviceTime,
        gendercheck,
        add_ons_details,
        add_ons,
        time,
        instructions = props.instructions ? props.instructions : '',
    } = props;

    // console.log("card props",props)

    let badge = props.newclient ? <Badge pill bg="warning shadow-sm" style={{ width: '70px', position: 'absolute', top: '8px', right: '-12px', fontSize: '0.7rem' }}>New</Badge> : '';
    const [checkInShow, setCheckInShow] = useState(false);

    const [mainCardShow, setMainCardShow] = useState(true);

    const [totalPrice, setTotalPrice] = useState(0);

    const [isLoading, setIsLoading] = useState(true);


    const removedChekincardArray = JSON.parse(localStorage.getItem('removedChekincard')) || [];
    const showCheckInButton = !removedChekincardArray.includes(_id);

    const formattedDate = new Date().toLocaleDateString();
    const formattedScheduledDate = new Date(date).toLocaleDateString();
    const isDisabled = formattedDate !== formattedScheduledDate;


    const handleCloseModal = () => {
        console.log("Modal closed!");
        setIsLoading(false);
        handleClose();
    };

    const handleCheckInClick = () => {
        setCheckInShow(true);
        setMainCardShow(false);
    };



    const handleCheckInModalClose = () => {
        setCheckInShow(false);
        setMainCardShow(true);
    };


    useEffect(() => {
        let tax = amount_calculation?.amount_tip;
        let addonsprice = amount_calculation?.amount_addon;
        const time_status = props.serviceTime;
        let basePrice = 70; // Initial base price

        // Adjust base price based on service time
        if (time_status === "90 minutes") {
            basePrice += 35;
        } else if (time_status === "120 minutes") {
            basePrice += 70;
        }

        // Double the base price if gender is 'partner'
        if (gendercheck === "partner") {
            basePrice *= 2;
        }

        // Add 14% of total add-ons price to totalPrice
        let totalPriceAddons = addonsprice;

        const calculateaadon = totalPriceAddons * 0.14;

        //total value after adding adsonprice
        let totalPriceWithAddons = basePrice + calculateaadon;

        // Add tax amount to totalPrice
        totalPriceWithAddons += tax;

        setTotalPrice(totalPriceWithAddons);
    }, [serviceTime, gendercheck, add_ons_details, amount_calculation?.amount_tip]);



    return (
        <>
            {mainCardShow && (
                <div>
                    <Card className="mb-2 pointer"  >
                        {badge}
                        <Card.Title
                            className="px-3"
                        >
                            {props.title}
                        </Card.Title>
                        <Card.Body>
                            <Row>
                                <div className="col-md-8 cardLeft" >
                                    <div>
                                        <FontAwesomeIcon icon={faLocationDot} style={{ width: 20 }} />{" "}
                                        {props.location}
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faClock} style={{ width: 20 }} /> {props.time}
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faCalendar} style={{ width: 20 }} /> {props.date}
                                    </div>
                                    <div>
                                        {instructions !== '' ? <><strong className="mt-1">Instructions : </strong> {instructions} </> : ''}
                                    </div>
                                </div>
                                <div className="col-md-4 tip">
                                    <p>you'll earn</p>
                                    {/* <div>${props.amt}</div>
              <div>+${tip} pre-tip</div>
              <div className="text-warning">Total = ${total}</div> */}
                                    <div className="earn"><span><FontAwesomeIcon icon={faCoins} /></span> {amount_calculation?.total_amount?.toFixed(2)}$</div>
                                </div>
                            </Row>
                        </Card.Body>
                        <Card.Footer>

                        </Card.Footer>
                    </Card>
                </div>
            )}




        </>
    );
};

export default Completed;
