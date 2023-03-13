import Table from 'react-bootstrap/Table';
const data ={
    
   "people" :[
     {
       "id":"1",
       "massagetype":"Couple Deep Tissue Massage for Elias Acevedo1",
       "amt":"55",
     },
     {
       "id":"2",
       "massagetype":"Couple Deep Tissue Massage for Elias Acevedo2",
       "amt":"75",
     },
     {
       "id":"3",
       "massagetype":"Couple Deep Tissue Massage for Elias Acevedo3",
       "amt":"65",
     },
     {
       "id":"4",
       "massagetype":"Couple Deep Tissue Massage for Elias Acevedo4",
       "amt":"95",
     },
     
   ],

 }

function DataTable() {
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

      {data.people.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.massagetype}</td>
              <td>{item.amt}</td>
            </tr>
          ))}
        
      </tbody>
    </Table>
  );
}

export default DataTable;