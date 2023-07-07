import React,{useState , useEffect} from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';
import { IP } from "../../../Constant";
const ProfileEdit = (props) => {
  const nav = useNavigate()

  const[first_name , setFirst_name]=useState("")
  const[last_name , setLast_name]=useState("")
  const[email , setEmail]=useState("")
  const[phone , setPhone]=useState("")


  let token = localStorage.getItem("providertoken")


  
  const handleUpdate=async(event)=>{
    event.preventDefault();
    let datas = {
     "first_name":first_name,
     "last_name":last_name,
     "email":email,
     "phone":phone,
   
    }
    
    try {
      const resp = await fetch(`${IP}/provider/update_profile`, {
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
          Profile Edit
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleUpdate}>                                                              
        <Modal.Body>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" onChange={(e)=>setFirst_name(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" placeholder="Last name" onChange={(e)=>setLast_name(e.target.value)}/>
        </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="phone" onChange={(e)=>setPhone(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button type="submit">Update</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProfileEdit;