import { faRemove } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Modal() {
  return (
    <div className='modalBody'>
      <div className='container'>
        <div className='row'>
          <div className='modalCard col-md-12 col-sm-10'>
            <div className='modalClose' id='modalClose'> <FontAwesomeIcon icon={faRemove} style={{ width: 40 }} /></div>
              <h3>bvkfvbfvhj</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal