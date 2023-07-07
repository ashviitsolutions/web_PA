import { useState ,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import {IP} from "../../../Constant"
// const data ={
    
//    "people" :[
//      {
//        "id":"1",
//        "massagetype":"Couple Deep Tissue Massage for Elias Acevedo1",
//        "amt":"55",
//      },
//      {
//        "id":"2",
//        "massagetype":"Couple Deep Tissue Massage for Elias Acevedo2",
//        "amt":"75",
//      },
//      {
//        "id":"3",
//        "massagetype":"Couple Deep Tissue Massage for Elias Acevedo3",
//        "amt":"65",
//      },
//      {
//        "id":"4",
//        "massagetype":"Couple Deep Tissue Massage for Elias Acevedo4",
//        "amt":"95",
//      },
     
//    ],

//  }




 
 

function DataTable() {
  const token = localStorage.getItem('providertoken')
  const [data , setData]=useState([])
  useEffect(() => {
    fetch(`${IP}/provider/events/completed`, {
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((result) => {
        setData(result.completed);
        console.log("copleted earning", result.completed);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <Table className='mt-2' striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Massage Title</th>
          <th>Amt</th>
        </tr>
      </thead>
      <tbody>



     


      {data.map((cur, index) => (
            <tr key={index}>
              <td>{index +1}</td>
              <td>{cur.service_id.title}</td>
              <td>{cur.amount_charged}</td>
            </tr>
          ))}
        
      </tbody>
    </Table>
  );
}

export default DataTable;