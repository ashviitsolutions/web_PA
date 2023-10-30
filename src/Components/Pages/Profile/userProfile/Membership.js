import React, { useEffect, useState } from 'react';
import Hook from '../Hook/Hook';
import './Profile.css';

function Membership() {


    const username = localStorage.getItem('user_name');





    return (
        <div className='overview' id='invoices'>
            <div className='overview_container'>
                <div className='heading'>
                    <h3>{username}</h3>
                </div>
                <div className='title'>
                    <h3>Membership</h3>
                </div>
                <div className='membership_container'>
                    <div className='membership_update'>
                        <div className='heading'>
                            <h3>Silver </h3>
                            <p>$119 / Month</p>
                        </div>
                        <div className='conetnt'>
                            <h3>5% saving off regular rate </h3>
                            <p>3 months commitment</p>
                        </div>
                        <div className='mebershi_update_button'>
                            <h3 className='membership_button'>Buy Now</h3>
                            <h3 className='memb'></h3>

                        </div>

                    </div>
                    <div className='membership_update'>
                        <div className='heading'>
                            <h3>Gold  </h3>
                            <p>$400 / Month</p>
                        </div>
                        <div className='conetnt'>
                            <h3>10% saving off regular rate </h3>
                            <p>12 months commitment</p>
                        </div>
                        <div className='mebershi_update_button'>
                            <h3 className='membership_button'>Buy Now</h3>
                            <h3 className='memb'></h3>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Membership;
