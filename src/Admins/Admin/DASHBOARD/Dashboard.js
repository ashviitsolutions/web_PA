import React from 'react'
import image1 from "../../img/massage.png"
import image2 from "../../img/calendar (1).png"
import image3 from "../../img/clock.png"
import image4 from "../../img/pending.png"
import image5 from "../../img/rating.png"
import image6 from "../../img/customer-service.png"
import image7 from "../../img/no-data.png"

function Dashboard() {
    return (
        <>
            <div id='content'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="">
                            <div className="headings">
                                <h3>Dashboard</h3>
                                <span className="toggle_sidebar" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="gutter">
                                            <div className="card dash_card layer2">
                                                <div className="content">
                                                    <span className="head">Total Services</span>
                                                    <span className="value">100</span>
                                                </div>
                                                <span className="icon" style={{ backgroundImage: `url(${image1})` }}></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="gutter">
                                            <div className="card dash_card layer2">
                                                <div className="content">
                                                    <span className="head">scheduled orders</span>
                                                    <span className="value">10</span>
                                                </div>
                                                <span className="icon" style={{ backgroundImage: `url(${image2})` }}></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="gutter">
                                            <div className="card dash_card layer2">
                                                <div className="content">
                                                    <span className="head">order history</span>
                                                    <span className="value">500</span>
                                                </div>
                                                <span className="icon" style={{ backgroundImage: `url(${image3})` }}></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="gutter">
                                            <div className="card dash_card layer2">
                                                <div className="content">
                                                    <span className="head">pending payments</span>
                                                    <span className="value">$3879</span>
                                                </div>
                                                <span className="icon" style={{ backgroundImage: `url(${image4})` }}></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-5">
                            <div className="gutter">
                                <div className="card layer2">
                                    <table className="table-responsive ultra_responsive">
                                        <thead>
                                            <tr>
                                                <th>User Name</th>
                                                <th>Scheduled Time</th>
                                                <th>Contact Number</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>John Doe</td>
                                                <td>08 november 2022 12:45pm</td>
                                                <td>9876543210</td>
                                                <td>open</td>
                                            </tr>
                                            <tr>
                                                <td>Jane Doe</td>
                                                <td>08 november 2022 12:45pm</td>
                                                <td>9876543210</td>
                                                <td>open</td>
                                            </tr>
                                            <tr>
                                                <td>Miller</td>
                                                <td>08 november 2022 12:45pm</td>
                                                <td>9876543210</td>
                                                <td>open</td>
                                            </tr>
                                            <tr>
                                                <td>D. gunn</td>
                                                <td>08 november 2022 12:45pm</td>
                                                <td>9876543210</td>
                                                <td>open</td>
                                            </tr>
                                            <tr>
                                                <td>Alex Acevedo</td>
                                                <td>08 november 2022 12:45pm</td>
                                                <td>9876543210</td>
                                                <td>open</td>
                                            </tr>
                                            <tr>
                                                <td>K. Pauly</td>
                                                <td>08 november 2022 12:45pm</td>
                                                <td>9876543210</td>
                                                <td>open</td>
                                            </tr>
                                            <tr>
                                                <td>Bernice</td>
                                                <td>08 november 2022 12:45pm</td>
                                                <td>9876543210</td>
                                                <td>open</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="gutter">
                                            <div className="card layer2"><canvas id="myChart"></canvas></div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="gutter">
                                            <div className="card layer2"><canvas id="myChart2"></canvas></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="summary_collections">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image5})` }}></span>
                                                        <h3>560</h3>
                                                        <p>Total Clients</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image6})` }}></span>
                                                        <h3>23</h3>
                                                        <p>services today</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="gutter">
                                                    <div className="card layer2">
                                                        <span className="icon" style={{ backgroundImage: `url(${image7})` }}></span>
                                                        <h3>6</h3>
                                                        <p>service cancelled</p>
                                                    </div>
                                                </div>
                                            </div>
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

export default Dashboard