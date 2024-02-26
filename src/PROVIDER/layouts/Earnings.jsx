import React, { useState, useEffect } from "react";
import { FormCheck, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import EarningsCard from "../components/earnings/EarningsCard";
import { IP } from "../../Constant"
import EarningCard from "./EarningCard";


const Earnings = () => {


  const token = localStorage.getItem('providertoken')


  const [wallate, setWallate] = useState();



  useEffect(() => {
    fetch(`${IP}/provider/getProviderWallet`, {
      headers: {
        'Authorization': token
      }
    }).then(resp => {
      return resp.json()
    }).then(result => {
      setWallate(result.wallet)

    }).catch(err => {
      console.log(err)
    })



  }, [])














  return (
    <Container className="schudulecard">
      <h2 className="text-center mt-2" id="schudule-title">Earnings</h2>
      <Row>
        <EarningsCard label="Net Income" amt={wallate?.total_withdrawn.toFixed(2)} />
        <EarningsCard label="Pending Clearance" amt={wallate?.available_amount.toFixed(2)} />

      </Row>


      <h5 className="mt-2">View Earning History</h5>

      <EarningCard />


    </Container>
  );
};

export default Earnings;
