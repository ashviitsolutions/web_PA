import React,{useState , useEffect} from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';
import { IP } from "../../../Constant";
const AddressEdit = (props) => {
  const nav = useNavigate()

  const[address , setAddress]=useState("")
  const[apt_number , setApt_number]=useState("")
  const[postal_code , setPostal_code]=useState("")
  const[city , setCity]=useState("")
  const[state , setState]=useState("")
  const[country , setCountry]=useState("")

  let token = localStorage.getItem("providertoken")


  
  const handleUpdate=async(event)=>{
    event.preventDefault();
    let datas = {
     "address":address,
     "apt_number":apt_number,
     "postal_code":postal_code,
     "city":city,
     "state":state,
     "country":country,
    }
    
    try {
      const resp = await fetch(`${IP}/provider/mailing_address`, {
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


  useEffect(()=>{
    handleUpdate()
  },[handleUpdate])





  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Mailing Address
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleUpdate}>                                                              
        <Modal.Body>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Address Line</Form.Label>
            <Form.Control type="text" placeholder="Address Line" onChange={(e)=>setAddress(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>APT Number</Form.Label>
            <Form.Control type="text" placeholder="APT Number" onChange={(e)=>setApt_number(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="text" placeholder="Postal Code" onChange={(e)=>setPostal_code(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" onChange={(e)=>setCity(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" onChange={(e)=>setState(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Country" onChange={(e)=>setCountry(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddressEdit;