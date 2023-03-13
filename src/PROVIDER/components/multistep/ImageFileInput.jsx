import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Form } from 'react-bootstrap'

const ImageFileInput = (props) => {
   const fileHandler = (event) => {
      console.log(event);
    };
  return (
   <Form.Group className="mb-3 mt-3">
   <Form.Control className='mb-2' type="file" onChange={fileHandler} multiple accept=".jpg,.jpeg,.png"/>

   <div
     className="Card mb-3 text-center"
     style={{
       width: "100%",
       borderRadius: "8px",
       boxShadow: "2px 2px 5px grey",
     }}
   >
     {" "}
     
     <img src="https://img.icons8.com/clouds/100/1A1A1A/pdf.png"/>
     <div className="card-title p-2"><strong> <FontAwesomeIcon icon={faFile} /> {props.title}</strong></div>
     <div className="card-body p-1">
       <p>Your can Select Multiple</p>
       <p>Image Items only</p>
     </div>
   </div>
 </Form.Group>
  )
}

export default ImageFileInput