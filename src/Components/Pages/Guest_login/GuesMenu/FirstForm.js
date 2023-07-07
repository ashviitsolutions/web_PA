import React from "react";
import "./style.css"
import image13 from "../../../assets/img/goodbye.png"
import image14 from "../../../assets/img/laugh.png"
import image15 from "../../../assets/img/thinking-of-someone.png"
const FirstForm = () => {
    return (
        <>
         

            <div id="sec_wiz_1" className="section">
                <div id="employees" style={{ textAlign: "center" }}>
                    <label  className="as_title" htmlFor="">
                        Who Is it For ?
                    </label>
                    <ul className="review option" style={{ display: "flex" }} id="review_option">
                        <li>
                            <span
                                className="icon"
                                style={{
                                    backgroundImage: `url(${image13})`,
                                }}
                            ></span>
                            just me
                        </li>
                        <li>
                            <span
                                className="icon"
                                style={{
                                    backgroundImage: `url(${image14})`,
                                }}
                            ></span>
                            Duo
                        </li>
                        <li>
                            <span
                                className="icon"
                                style={{
                                    backgroundImage: `url(${image15})`,
                                }}
                            ></span>
                            Something Else
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default FirstForm