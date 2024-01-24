import React, { useState, useEffect } from "react";
import { FormCheck, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import DataTable from "../components/earnings/DataTable";
import EarningsCard from "../components/earnings/EarningsCard";
import FilterSection from "../components/earnings/FilterSection";
import Tags from "../components/earnings/Tags";
import MyPagination from "../components/MyPagination";
import { IP } from "../../Constant"
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
        <EarningsCard label="Net Income" amt={wallate?.total_withdrawn} />
        <EarningsCard label="Pending Clearance" amt={wallate?.available_amount} />

      </Row>
      <h4 className="mt-3">Withdraw</h4>
      <Row>
        <FormCheck
          style={{ width: "auto", marginLeft: "10px" }}
          type="radio"
          name="pymt"
          id="bank"
          label="Bank Transfer"
        />
        <FormCheck
          style={{ width: "auto" }}
          type="radio"
          name="pymt"
          id="paypal"
          label="PayPal"
        />
      </Row>
      <h5 className="mt-2">View Earning History</h5>
      <Row>
        <FilterSection />
        <Tags />
      </Row>
      <DataTable />

      <Row className="text-center">
        <MyPagination />
      </Row>
    </Container>
  );
};

export default Earnings;
