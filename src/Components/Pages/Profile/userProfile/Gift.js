import React from 'react';
import "./Profile.css";
import image1 from "../../../assets/img/gift-card-with-red-ribbon_23-2147510395 (1).webp"
import image2 from "../../../assets/img/gift-card-with-red-ribbon_23-2147510395 (1).webp"
function Gift() {
  const username = localStorage.getItem("user_name")
  return (
    <>
      <div id='gift'>
        <div className='overview_container'>
          <div className='heading'>
            <h3>{username}</h3>
          </div>
          <div className='title'>
            <h3>Your GIFT CARDS</h3>
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


          <div className='title' id='buycard'>
            <h3>Buy GIFT CARDS</h3>
          </div>
          <div className='gift_container' id="gift_vard_buy">

            <div className='gift_input' id='buy_gift_card_input'>
              <div className='gift_image' id='buy_gift_card_image'>
                <img src={image1} alt='...' />
                <div className='gift_button'>
                  <h3 className='title'>Silver gift card</h3>
                  <button className='Use_button'>Buy Now</button>
                </div>
              </div>
            </div>
            <div className='gift_input' id='buy_gift_card_input'>
              <div className='gift_image' id='buy_gift_card_image'>
                <img src={image1} alt='...' />
                <div className='gift_button'>
                  <h3 className='title'>Silver gift card</h3>
                  <button className='Use_button'>Buy Now</button>
                </div>
              </div>
            </div>
            <div className='gift_input' id='buy_gift_card_input'>
              <div className='gift_image' id='buy_gift_card_image'>
                <img src={image1} alt='...' />
                <div className='gift_button'>
                  <h3 className='title'>Silver gift card</h3>
                  <button className='Use_button'>Buy Now</button>
                </div>
              </div>
            </div>
            <div className='gift_input' id='buy_gift_card_input'>
              <div className='gift_image' id='buy_gift_card_image'>
                <img src={image1} alt='...' />
                <div className='gift_button'>
                  <h3 className='title'>Silver gift card</h3>
                  <button className='Use_button'>Buy Now</button>
                </div>
              </div>
            </div>
            <div className='gift_input' id='buy_gift_card_input'>
              <div className='gift_image' id='buy_gift_card_image'>
                <img src={image1} alt='...' />
                <div className='gift_button'>
                  <h3 className='title'>Silver gift card</h3>
                  <button className='Use_button'>Buy Now</button>
                </div>
              </div>
            </div>
            <div className='gift_input' id='buy_gift_card_input'>
              <div className='gift_image' id='buy_gift_card_image'>
                <img src={image1} alt='...' />
                <div className='gift_button'>
                  <h3 className='title'>Silver gift card</h3>
                  <button className='Use_button'>Buy Now</button>
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