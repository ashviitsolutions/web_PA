import React from 'react'
import "./style.css"
import { Link } from "react-router-dom";

function Member() {
  return (
    <>
      <div id="member_cta">
        <div className="container-member">
          <div className="heading" >
            <h3>become a member now !</h3>
            <h2 style={{ fontSize: "18px" }}>get access to more professional services...</h2>
            <Link to="/become_member"><button className="button" >become member</button></Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default Member