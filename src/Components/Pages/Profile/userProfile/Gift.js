import React from 'react';
import "./Profile.css";
import image1 from "../../../assets/img/gift-card-with-red-ribbon_23-2147510395 (1).webp"
import image2 from "../../../assets/img/gift-card-with-red-ribbon_23-2147510395 (1).webp"
function Gift() {
  const username = localStorage.getItem("username")
  return (
    <>
      <div id='gift'>
        <div className='overview_container'>
          <div className='heading'>
            <h3>{username}</h3>
          </div>
          <div className='title'>
            <h3>GIFT CARDS</h3>
          </div>

          <div className='gift_container'>
            <div className='gift_input'>
              <div className='gift_image'>
                <img src={image1} width={380} height={166} alt='...' />
                <div className='gift_button'>
                  <button className='Use_button'>Use</button>
                  <button className='Send_button'>Send</button>
                </div>
              </div>
            </div>
            <div className='gift_input'>
              <div className='gift_image'>
              <img src={image1} width={380} height={166} alt='...' />
                <div className='gift_button'>
                  <button className='Use_button'>Use</button>
                  <button className='Send_button'>Send</button>
                </div>
              </div>
            </div>
           
          </div>


        </div>
      </div>
    </>
  )
}

export default Gift