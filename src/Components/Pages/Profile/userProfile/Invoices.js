import React from 'react';
import "./Profile.css";
import image1 from "../../../img/uploads/8.-sad-girls-facebook-profile-pictures.jpg"

function Invoices() {
  const username = localStorage.getItem("username")
  return (
    <div className='overview' id='invoices'>
      <div className='overview_container'>
        <div className='heading'>
          <h3>{username}</h3>
        </div>
        <div className='title'>
          <h3>INVOICES</h3>
        </div>
        <div className='overview_card'>
          <div className='overview_input'>
            <div className='image_text'>
              <img src={image1} width={150} height={130} alt='...' />
              <div className='text-item'>
                <h3>Appointment With John Doe</h3>
                <p>#Paid</p>
                <div id='dateofpara'>
                  <p>17-10-2022</p>
                  <p style={{ fontWeight: "700" }}>08:00 PM</p>
                </div>
                <p id='dateofaddresswc'>15480 Annapolis Rd #202, Bowie, Maryland</p>
              </div>
            </div>
            <div className='time_date'>
              <h3>$70</h3>
              <p>+$15 Tip</p>
              <h3>Total = $85</h3>
              <button>Downoad Invoices</button>
            </div>
          </div>
          <div className='overview_input'>
            <div className='image_text'>
              <img src={image1} width={150} height={130} alt='...' />
              <div className='text-item'>
                <h3>Appointment With John Doe</h3>
                <p>#Paid</p>
                <div id='dateofpara'>
                  <p>17-10-2022</p>
                  <p style={{ fontWeight: "700" }}>08:00 PM</p>
                </div>
                <p id='dateofaddresswc'>15480 Annapolis Rd #202, Bowie, Maryland</p>
              </div>
            </div>
            <div className='time_date'>
              <h3>$70</h3>
              <p>+$15 Tip</p>
              <h3>Total = $85</h3>
              <button>Downoad Invoices</button>
            </div>
          </div>
          <div className='overview_input'>
            <div className='image_text'>
              <img src={image1} width={150} height={130} alt='...' />
              <div className='text-item'>
                <h3>Appointment With John Doe</h3>
                <p>#Paid</p>
                <div id='dateofpara'>
                  <p>17-10-2022</p>
                  <p style={{ fontWeight: "700" }}>08:00 PM</p>
                </div>
                <p id='dateofaddresswc'>15480 Annapolis Rd #202, Bowie, Maryland</p>
              </div>
            </div>
            <div className='time_date'>
              <h3>$70</h3>
              <p>+$15 Tip</p>
              <h3>Total = $85</h3>
              <button>Downoad Invoices</button>
            </div>
          </div>
          <div className='overview_input'>
            <div className='image_text'>
              <img src={image1} width={150} height={130} alt='...' />
              <div className='text-item'>
                <h3>Appointment With John Doe</h3>
                <p>#Paid</p>
                <div id='dateofpara'>
                  <p>17-10-2022</p>
                  <p style={{ fontWeight: "700" }}>08:00 PM</p>
                </div>
                <p id='dateofaddresswc'>15480 Annapolis Rd #202, Bowie, Maryland</p>
              </div>
            </div>
            <div className='time_date'>
              <h3>$70</h3>
              <p>+$15 Tip</p>
              <h3>Total = $85</h3>
              <button>Downoad Invoices</button>
            </div>
          </div>
          <div className='overview_input'>
            <div className='image_text'>
              <img src={image1} width={150} height={130} alt='...' />
              <div className='text-item'>
                <h3>Appointment With John Doe</h3>
                <p>#Paid</p>
                <div id='dateofpara'>
                  <p>17-10-2022</p>
                  <p style={{ fontWeight: "700" }}>08:00 PM</p>
                </div>
                <p id='dateofaddresswc'>15480 Annapolis Rd #202, Bowie, Maryland</p>
              </div>
            </div>
            <div className='time_date'>
              <h3>$70</h3>
              <p>+$15 Tip</p>
              <h3>Total = $85</h3>
              <button>Downoad Invoices</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Invoices