import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IP } from "../../../Constant";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';




const PayoutInformationModal = (props) => {
  const nav = useNavigate()
  const formData = useSelector((state) => state?.counter?.formData);
  const user = formData.provider_profile && formData.provider_profile[0] ? formData.provider_profile[0] : "";

  const [routing_number, setRouting_number] = useState(user?.payout_info?.account_number || "")
  const [account_number, setAccount_number] = useState(user?.payout_info?.routing_number || "")
  let token = localStorage.getItem("providertoken")


  console.log("user profile" ,user)

  const handleUpdate = async (event) => {
    event.preventDefault()
    let datas = { "routing_number": routing_number, "account_number": account_number }

    try {
      const resp = await fetch(`${IP}/provider/update_payout`, {
        method: "PUT",
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(datas)
      })

      if (resp.status === 200) {
        nav("/providers");
      }

    } catch (error) {
      console.log("Error show", error)
    }
  }


  useEffect(() => {
    handleUpdate()
  }, [handleUpdate])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Payout Information
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleUpdate}>
        <Modal.Body>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Routing Number</Form.Label>
            <Form.Control type="text" placeholder="Routing Number" value={routing_number} onChange={(e) => setRouting_number(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Account Number</Form.Label>
            <Form.Control type="text" placeholder="Account Number" value={account_number} onChange={(e) => setAccount_number(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PayoutInformationModal;