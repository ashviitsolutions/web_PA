import React from 'react'

function Booking() {
  return (
    <>
    <div id="content">
    <div className="container-fluid">
    <div className="row">
        <div className="">
            <div className="headings">
                <h3>Bookings</h3>
                <span className="toggle_sidebar" ></span>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="gutter">
            <div className="card layer1 filters">
                <div className="input_group">
                    <select name="" id="" className="input">
                        <option value="">select event type</option>
                        <option value="">private events</option>
                        <option value="">corporate events</option>
                    </select>
                    <span className="highlight"></span>
                </div>
                <div className="input_group">
                    <select name="" id="" className="input">
                        <option value="">service</option>
                        <option value="">service a</option>
                        <option value="">service b</option>
                        <option value="">service c</option>
                        <option value="">service d</option>
                        <option value="">service e</option>
                    </select>
                    <span className="highlight"></span>
                </div>
                <div className="input_group pull-right" style={{maxWidth: "20%"}}>
                    <input type="text" className="input" placeholder="search here.."/>
                    <span className="highlight"></span>
                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="gutter">
            <div className="bookings">
                <div className="item_wrapper">
                    <div className="item card layer2">
                        <div className="first_half">
                            <h3>couple deep tissue massage for elias</h3>
                            <span className="address">jersey city NJ 07305</span>
                            <span className="time">Sun, 08 november 2022</span>
                            <span className="tag"> <b>Parking Type</b> Parking lot</span>
                            <span className="tag"> <b>Instruction</b> free parking</span>
                        </div>
                        <div className="second_half">
                            <span>$70</span>
                            <span>+15 pre-tip</span>
                            <span className="colored">Total = $85</span>
                        </div>
                    </div>
                </div>
                <div className="item_wrapper">
                    <div className="item card layer2">
                        <div className="first_half">
                            <h3>couple deep tissue massage for elias</h3>
                            <span className="address">jersey city NJ 07305</span>
                            <span className="time">Sun, 08 november 2022</span>
                            <span className="tag"> <b>Parking Type</b> Parking lot</span>
                            <span className="tag"> <b>Instruction</b> free parking</span>
                        </div>
                        <div className="second_half">
                            <span>$70</span>
                            <span>+15 pre-tip</span>
                            <span className="colored">Total = $85</span>
                        </div>
                    </div>
                </div>
                <div className="item_wrapper">
                    <div className="item card layer2">
                        <div className="first_half">
                            <h3>couple deep tissue massage for elias</h3>
                            <span className="address">jersey city NJ 07305</span>
                            <span className="time">Sun, 08 november 2022</span>
                            <span className="tag"> <b>Parking Type</b> Parking lot</span>
                            <span className="tag"> <b>Instruction</b> free parking</span>
                        </div>
                        <div className="second_half">
                            <span>$70</span>
                            <span>+15 pre-tip</span>
                            <span className="colored">Total = $85</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    </>
  )
}

export default Booking