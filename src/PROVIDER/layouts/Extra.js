// import React, { useState } from "react";
// import { Row, Button, Modal } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { IP } from "../../Constant";

// const MyVerticallyCenteredModal = (props) => {
//   const nav = useNavigate();
//   const { user_id, _id, date } = props;
//   // console.log("data console", user_id, _id, date)
//   const [hour, setHour] = useState('');
//   const [minute, setMinute] = useState('');
//   const [am, setAm] = useState(true);
//   const [pm, setPm] = useState(false);
//   const token = localStorage.getItem("providertoken");
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true)

//     try {
//       const timeValue = `${hour}:${minute} ${am ? 'AM' : 'PM'}`;
//       const formData = {
//         service: user_id,
//         id: _id,
//         date: date,
//         checkin: timeValue,
//       };

//       const res = await axios.put(`${IP}/provider/update/checkin`, formData, {
//         headers: {
//           'Authorization': token,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });

//       if (res.status === 200) {
//         // nav("/providers");

//         // Retrieve existing array or initialize an empty array
//         const removedChekincardArray = JSON.parse(localStorage.getItem('removedChekincard')) || [];

//         // Push the new _id to the array
//         removedChekincardArray.push(_id);

//         // Save the updated array in localStorage
//         localStorage.setItem('removedChekincard', JSON.stringify(removedChekincardArray));
//         props.onHide();
//         nav("/providers/events");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">Enter Time</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Row>
//           <div className="col-4" style={{ alignSelf: 'center' }}>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Hour"
//               onChange={(e) => setHour(e.target.value)}
//             />
//           </div>

//           <div className="col-4" style={{ alignSelf: 'center' }}>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Minutes"
//               onChange={(e) => setMinute(e.target.value)}
//             />
//           </div>

//           <div className="col-4">
//             <Button
//               className={`form-control btn-sm mb-1 ${am ? 'active' : ''}`}
//               onClick={() => { setAm(true); setPm(false); }}
//             >
//               A.M.
//             </Button>
//             <Button
//               className={`form-control btn-sm ${pm ? 'active' : ''}`}
//               onClick={() => { setAm(false); setPm(true); }}
//             >
//               P.M.
//             </Button>
//           </div>
//         </Row>
//       </Modal.Body>
//       <Modal.Footer style={{ justifyContent: "center" }}>

//         <Button onClick={onSubmit} disabled={loading}> {loading ? "Loading.." : "Done"}</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default MyVerticallyCenteredModal;




import React, { useState, useEffect } from "react";
import { FormGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { IP } from "../../Constant";
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
  const nav = useNavigate();
  const { user_id, paymentIntentId, _id } = props;
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [am, setAm] = useState(true);
  const [pm, setPm] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("providertoken");

  // console.log("paymentiod", props)

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const timeValue = `${hour}:${minute}`;
      const amOrPm = am ? 'am' : 'pm';
      const bodyFormData = new FormData();
      bodyFormData.append("service", user_id);
      bodyFormData.append("id", _id);
      bodyFormData.append("checkout", `${timeValue} ${amOrPm}`);
      const res = await axios.put(`${IP}/provider/update/checkout`, bodyFormData, {
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        // Remove _id from removedChekincard in localStorage
        const removedChekincardArray = JSON.parse(localStorage.getItem('removedChekincard')) || [];
        const updatedArray = removedChekincardArray.filter(itemId => itemId !== _id);
        localStorage.setItem('removedChekincard', JSON.stringify(updatedArray));

        // Run confirmAndCapturePayment after successful checkout submission
        confirmAndCapturePayment();

        // Redirect to providers page

        props.onHide();
        nav("/providers/earnings");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmAndCapturePayment = async () => {
    try {
      const response = await axios.post(`${IP}/payment/confirm`, {
        paymentIntentId: paymentIntentId
      });
      console.log('Payment confirmation:', response.data);
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  // useEffect(() => {

  //   onSubmit();
  // }, []);


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Enter Checkout Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <div className="col-4" style={{ alignSelf: 'center' }}>
            <input
              type="text"
              className="form-control"
              id="hr"
              placeholder="Hour"
              onChange={(e) => setHour(e.target.value)}
            />
          </div>
          <div className="col-4" style={{ alignSelf: 'center' }}>
            <input
              type="text"
              className="form-control"
              id="min"
              placeholder="Minutes"
              onChange={(e) => setMinute(e.target.value)}
            />
          </div>
          <div className="col-4">
            <Button className={`form-control btn-sm mb-1 ${am ? 'active' : ''}`} onClick={() => { setAm(true); setPm(false) }}>A.M.</Button>
            <Button className={`form-control btn-sm ${pm ? 'active' : ''}`} onClick={() => { setAm(false); setPm(true) }}>P.M.</Button>
          </div>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <Button onClick={onSubmit} disabled={loading}> {loading ? "Loading.." : "Done"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Checkout;































// import React from "react";
// import { useState, useEffect } from "react";
// import { FormGroup, Row } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import axios from "axios";
// import { IP } from "../../Constant"
// import { useNavigate } from "react-router-dom";

// const Checkout = (props) => {
//   const nav = useNavigate()
//   const { user_id } = props;
//   const { _id } = props;

//   const [hour, setHour] = useState('')
//   const [minute, setMinute] = useState('')
//   const [am, setAm] = useState('')
//   const [pm, setPm] = useState('')
//   const token = localStorage.getItem("providertoken")






//   const onSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const timeValue = `${hour}:${minute}`;
//       const amOrPm = am ? 'am' : 'pm';
//       const bodyFormData = new FormData();
//       bodyFormData.append("service", user_id);
//       bodyFormData.append("id", _id);
//       bodyFormData.append("checkout", `${timeValue} ${amOrPm}`);
//       const res = await axios.put(`${IP}/provider/update/checkout`, bodyFormData, {
//         headers: {
//           'Authorization': token,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },

//       });
//       // console.log(res);
//       if (res.status === 200) {
//         nav("/providers");
//         if (res.status === 200) {
//           // Remove _id from removedChekincard in localStorage
//           const removedChekincardArray = JSON.parse(localStorage.getItem('removedChekincard')) || [];
//           const updatedArray = removedChekincardArray.filter(itemId => itemId !== _id);
//           localStorage.setItem('removedChekincard', JSON.stringify(updatedArray));

//           nav("/providers");
//           props.onHide();
//         }

//       }

//     } catch (error) {
//       console.error(error);
//     }
//   };


//   useEffect(() => {
//     onSubmit()
//   }, [])



//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">Enter Checkout Time</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Row>
//           <div className="col-4" style={{ alignSelf: 'center' }}>
//             <input
//               type="text"
//               className="form-control"
//               id="hr"
//               placeholder="Hour"
//               onChange={(e) => setHour(e.target.value)}

//             />
//           </div>

//           <div className="col-4" style={{ alignSelf: 'center' }}>
//             <input
//               type="text"
//               class="form-control"
//               id="min"
//               placeholder="Minutes"
//               onChange={(e) => setMinute(e.target.value)}
//             />
//           </div>

//           <div className="col-4">
//             <Button className={`form-control btn-sm mb-1 ${am ? 'active' : ''}`} onClick={() => { setAm(true); setPm(false) }}>A.M.</Button>
//             <Button className={`form-control btn-sm ${pm ? 'active' : ''}`} onClick={() => { setAm(false); setPm(true) }}>P.M.</Button>
//           </div>

//         </Row>
//       </Modal.Body>
//       <Modal.Footer style={{ justifyContent: "center" }}>
//         <Button onClick={onSubmit}>Done</Button>
//       </Modal.Footer>

//     </Modal>
//   );
// };

// export default Checkout;

