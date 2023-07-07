import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./style.css"

function SelectLocation() {
    const [Input , setinput]=useState("")
  return (
    <>
    <div id="over_banner">
    <div class="container">
      <div class="row">
        <form class="location card layer1" >
          <h3>Where would you like our provider to  meet you.</h3>
          <div class="input_group">
            <input class="input" type="text" onChange={(e)=>setinput(e.target.value)} value={Input} placeholder="Search for an address here..."/>
          </div>
          <div class="input_group">
            <Link to="/guest_login"><button class="button" style={{paddingTop:"11px"}} type="button">continue</button></Link>
          </div>
        </form>
      </div>
    </div>
  </div>
    </>
  )
}

export default SelectLocation