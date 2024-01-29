// import { faRemove } from '@fortawesome/free-solid-svg-icons';
// import React, { useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// function Modal({ user }) {
//   const [isVisible, setIsVisible] = useState(true);

//   console.log("data model", user)

//   const onClose = () => {
//     setIsVisible(false);
//   }

//   return (
//     <>
//       {isVisible && (
//         <div className='modalBody'>
//           <div className='container'>
//             <div className='row'>
//               <div className='modalCard col-md-12 col-sm-10'>
//                 <div className='modalClose' id='modalClose' onClick={onClose}>
//                   <FontAwesomeIcon icon={faRemove} style={{ width: 40 }} />
//                 </div>
//                 {user.map((item, index) => (
//                   <div key={index}>
//                     <h3>address:{item.address}</h3>
//                     <p>customer_email:{item.customer_email}</p>
//                     <p>gender:{item.gender[0]}</p>
//                     <p>service Time:{item.service_time}</p>
//                     <p>scheduled Date: {item.scheduled_date}</p>
//                     <p>scheduled Timing: {item.scheduled_timing}</p>
//                     <p>special Considerations: {item.special_considerations[0]}</p>
//                     <p>location Type: {item.location_type}</p>
//                   </div>
//                 ))}

//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Modal;

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Modall() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modall;