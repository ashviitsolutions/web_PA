import { faEnvelopeSquare, faPhoneSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import userEvent from '@testing-library/user-event'
import React from 'react'

const Contacts = (props) => {
   let user = {phone:props.mobile,email:props.email}
  return (
    <>
    <div className="card shadow-sm mb-2" style={{padding: '4px 10px'}}>
      <div className="card-title">
         <strong>Contacts</strong>
      </div>
      <div>
         <FontAwesomeIcon className='phone' icon={faPhoneSquare} style={{fontSize:'20px'}}/> {user.phone}
      </div>
      <div>
         <FontAwesomeIcon className='phone' icon={faEnvelopeSquare} style={{fontSize:'20px'}}/> {user.email}
      </div>
    </div>
    </>
  )
}

export default Contacts