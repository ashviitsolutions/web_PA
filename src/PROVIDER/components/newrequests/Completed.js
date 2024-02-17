import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { faCalendar, faClock, faLocationDot, faCoins } from "@fortawesome/free-solid-svg-icons";



const Completed = (props) => {
    const {
        handleClose,
        user_id,
        _id,
        amount,
        title,
        date,
        location,
        time,
        instructions = props.instructions ? props.instructions : '',
    } = props;

    // console.log("card props",props)

    let badge = props.newclient ? <Badge pill bg="warning shadow-sm" style={{ width: '70px', position: 'absolute', top: '8px', right: '-12px', fontSize: '0.7rem' }}>New</Badge> : '';
    const [checkInShow, setCheckInShow] = useState(false);

    const [mainCardShow, setMainCardShow] = useState(true);



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



    return (
        <>
            {mainCardShow && (
                <div>
                    <Card className="mb-2 pointer" onClick={handleCheckInClick} >
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
                                    <div className="earn"><span><FontAwesomeIcon icon={faCoins} /></span> {props.amt}$</div>
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
