import React from "react";
import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { IP } from '../../../Constant'
import { useEffect } from "react";

const SecondForm = (props) => {
  const [status, setStatus] = useState(false)
  const token = localStorage.getItem("providertoken")

  useEffect(() => {

    fetch(`${IP}/provider/call-status`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      if (result.call_status === "approved") {
        setStatus(true)
        console.log('status', result)

      }
    }).catch(err => {
      console.log(err)
    })
  }, [])


  let saveAndContinue = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  let previousStep = (e) => {
    e.preventDefault();
    props.previousStep();
  };








  return (
    <div>
      <Form className="col-md-8 mx-auto" >
        <div className="content" style={{
          height: "70vh", display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <h2 className="text-center">Get Ready for Call Interview</h2>
          {
            status ? <h2 className="text-center">Congratulations! Your application is Approved</h2>
              :
              ""
            // <h2 className="text-center">Sorry, unfortunately your application is rejected by our team</h2> 
          }

        </div>

        <Row style={{ justifyContent: "space-between", padding: '10px' }}>

          {
            status ? <Button

              className="button small"
              variant="primary"
              onClick={saveAndContinue}
              type="submit"
            >
              Next
            </Button> : ""
          }

        </Row>
      </Form>
    </div>
  );
};

export default SecondForm;
