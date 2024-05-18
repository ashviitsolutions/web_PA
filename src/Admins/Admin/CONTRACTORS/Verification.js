import React, { useState } from 'react';
import axios from 'axios';
import { IP } from '../../../Constant'
import { useNavigate } from "react-router-dom";
function Verification(props) {
  const { _id } = props;
  const nav = useNavigate()
  const [isVerified, setIsVerified] = useState(false);
  let tokenadmin = localStorage.getItem("tokenadmin");
  const handleVerification = (event) => {
    setIsVerified(event.target.value === 'yes');
  }

  const handleProceed = async (e) => {
    e.preventDefault()

    try {

      const bodyFormData = new FormData();
      bodyFormData.append("response", isVerified);
      bodyFormData.append("id", _id);
      const res = await axios.put(`${IP}/contractor/update-verification`, bodyFormData, {
        headers: {
          Authorization: tokenadmin,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

      });
      console.log(res);
      if (res.status === 200) {
        nav("/admin/contractors");
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Are you sure you want to proceed?</h2>
      <label className="mx-2">
        <input type="radio" value="yes" checked={isVerified} onChange={handleVerification} className="my-2" />
        Yes
      </label>
      <label className="mx-2">
        <input type="radio" value="no" checked={!isVerified} onChange={handleVerification} className="my-2" />
        No
      </label>

      <button onClick={handleProceed} className="mx-2 btn-sm btn btn-primary">Proceed</button>
      <p>Please verify before proceeding.</p>
    </div>
  );
}

export default Verification;
