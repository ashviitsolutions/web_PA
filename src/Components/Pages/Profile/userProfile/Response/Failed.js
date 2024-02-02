import React, { useEffect, useState } from 'react';
import { IP } from '../../../../../Constant';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from '@fortawesome/free-solid-svg-icons';

function Failed() {
    const nav = useNavigate()




    return (



        <div className='PaymentForm failed'>
            <h4 className='.head'><FontAwesomeIcon icon={faBan} /></h4>
            <h4 className='head'>Membership Purchase Failed</h4>
            <p><strong>Plan:</strong> Gold</p>
            <p><strong>Status:</strong> Active</p>
            <p><strong>Expiration:</strong> 02-02-2025</p>
            <p><strong>Price:</strong> 199$</p>
            <p><strong>Transaction Id:</strong> bdsvbvkbdsvkdbv44556</p>
            <p className='space'>Your payment is declined or failed, please retry!</p>


        </div>

    );
}

export default Failed;
