import React, { useState, useEffect } from 'react';
import "../Profile.css";

import image1 from "../../../../assets/img/gift-card-with-red-ribbon_23-2147510395 (1).webp"

function Yourcard() {




    return (
        <>
            <div id='gift'>
                <div className='overview_container'>
                    <div className='gift_container'>
                        <div className='gift_input'>
                            <div className='gift_image'>
                                <img src={image1} width={380} height={166} alt='...' />
                                <div className='gift_button'>
                                    <button className='Use_button'>Use</button>
                                    <button className='Send_button'>Send</button>
                                </div>
                            </div>
                        </div>
                        <div className='gift_input'>
                            <div className='gift_image'>
                                <img src={image1} width={380} height={166} alt='...' />
                                <div className='gift_button'>
                                    <button className='Use_button'>Use</button>
                                    <button className='Send_button'>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}

export default Yourcard;
