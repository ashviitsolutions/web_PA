import React from "react";
import "./style.css"
import image13 from "../../../assets/img/goodbye.png"
import image14 from "../../../assets/img/laugh.png"
import image15 from "../../../assets/img/thinking-of-someone.png"
const FourForm = () => {
    return (
        <>
         

        <div id="sec_wiz_4" class="section">
     
        <div class="input_group" style={{textAlign: "center"}}>
          <label class="static" style={{fontSize:"17px"}} htmlFor=""><b>WHEN WOULD YOU LIKE IT ?</b></label>
       
          <div style={{display:"inline-block"}} id="datepicker" data-date="17/09/2022"></div>
          <input type="hidden" id="my_hidden_input"/>
    
          <select style={{width:"auto", display:"inline-block",padding:"0px 15px"}} class="input" name="">
            <option value=""> Select Time </option>
            <option value="">8:00 am</option>
            <option value="">9:00 am</option>
            <option value="">10:00 am</option>
            <option value="">11:00 am</option>
            <option value="">12:00 pm</option>
            <option value="">01:00 pm</option>
            <option value="">02:00 pm</option>
            <option value="">03:00 pm</option>
            <option value="">04:00 pm</option>
            <option value="">05:00 pm</option>
            <option value="">06:00 pm</option>
            <option value="">07:00 pm</option>
            <option value="">08:00 pm</option>
            <option value="">09:00 pm</option>
          </select>
       
       
          <button  class="button" type="button" name="button">next</button>
        </div>
      </div>

        </>
    )
}

export default FourForm