import React, { useEffect, useState } from 'react';
import { IP } from '../../../Constant';
function Payments() {

    const [data, setData] = useState(0);
    const [count, setCount] = useState(0);
    const [user, setUser] = useState([]);

    const token = localStorage.getItem("tokenadmin");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/contractor/get`, {
                    method: 'GET',
                    headers: {
                        Authorization: token
                    }
                });
                const data = await res.json();
                setUser(data);
                console.log("data", data)
                setCount(data.length);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div id="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="">
                            <div class="headings">
                                <h3>Payments</h3>
                                <span class="toggle_sidebar" ></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="gutter">
                            <div class="card layer1 filters">
                                <div class="input_group">
                                    <input type="date" class="input" placeholder="Start Date" />
                                    <span class="highlight"></span>
                                </div>
                                <div class="input_group">
                                    <input type="date" class="input" placeholder="End Date" />
                                    <span class="highlight"></span>
                                </div>
                                <div class="input_group">
                                    <select name="" id="" class="input">
                                        <option value="">status</option>
                                        <option value="">pending</option>
                                        <option value="">completed</option>
                                    </select>
                                    <span class="highlight"></span>
                                </div>
                                <div class="input_group">
                                    <select name="" id="" class="input">
                                        <option value="">select event type</option>
                                        <option value="">private events</option>
                                        <option value="">corporate events</option>
                                    </select>
                                    <span class="highlight"></span>
                                </div>
                                <div class="input_group">
                                    <select name="" id="" class="input">
                                        <option value="">service</option>
                                        <option value="">service a</option>
                                        <option value="">service b</option>
                                        <option value="">service c</option>
                                        <option value="">service d</option>
                                        <option value="">service e</option>
                                    </select>
                                    <span class="highlight"></span>
                                </div>
                                <div class="input_group pull-right" style={{ maxWidth: "20%" }}>
                                    <input type="text" class="input" placeholder="search here.." />
                                    <span class="highlight"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="gutter">
                            <div class="card" style={{ padding: "25px 15px" }}>
                                <h3 class="pull-right" style={{ margin: "0", fontSize: "17px" }}>Pending : $800</h3>
                                <h3 class="pull-right" style={{ margin: "0", fontSize: "17px", marginLight: "20px" }}>Total Earning : $450</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="gutter">
                            <div className="bookings">
                                <div className="item_wrapper">
                                    {user.map((payment, index) => (
                                        <div className="item card layer1" key={index}>
                                            <div className="first_half">
                                                <h3>{payment.title}</h3>
                                                <span className="address">{payment.address}</span>
                                                <span className="time">{payment.date}</span>
                                                <span className="tag"><b>Parking Type</b> {payment.parkingType}</span>
                                                <span className="tag"><b>Instruction</b> {payment.instructions}</span>
                                            </div>
                                            <div className="second_half">
                                                <span>${payment.price}</span>
                                                <span>+{payment.preTip} pre-tip</span>
                                                <span className="colored">Total = ${payment.total}</span>
                                                {payment.buttonLabel && (
                                                    <button className={`button ${payment.buttonType} square`}>{payment.buttonLabel}</button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payments





// <div class="row">
// <div class="gutter">
//   <div class="bookings">
//     <div class="item_wrapper">
//       <div class="item card layer1">
//         <div class="first_half">
//           <h3>couple deep tissue massage for elias</h3>
//           <span class="address">jersey city NJ 07305</span>
//           <span class="time">Sun, 08 november 2022</span>
//           <span class="tag"> <b>Parking Type</b> Parking lot</span>
//           <span class="tag"> <b>Instruction</b> free parking</span>
//         </div>
//         <div class="second_half">
//           <span>$70</span>
//           <span>+15 pre-tip</span>
//           <span class="colored">Total = $85</span>
//           <button class="button primary square">Release Payment</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
