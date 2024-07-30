// src/components/ScheduledBookings.js

import React from 'react';
import { FallingLines } from 'react-loader-spinner';
import { IP } from '../../../../Constant';

const ScheduledBookings = ({ scheduledAppointments, isLoading, handleToggle, isEventOpen }) => {
  return (
    <div className="row mt-3" id="overview_page_container">
      <div className="status_booking">
        <h3>Scheduled Booking</h3>
      </div>
      {isLoading ? (
        <FallingLines color="#03a9f4" width="150" visible={true} ariaLabel="falling-circles-loading" />
      ) : scheduledAppointments.length === 0 ? (
        <h3 style={{ color: '#162b3c', fontSize: '15px' }}>No Scheduled bookings found.</h3>
      ) : (
        scheduledAppointments.map((post, index) => (
          <div className="col-sm-5" key={index}>
            <div className="gutter">
              <div className="appointment card" onClick={() => handleToggle(`app${index + 1}`)}>
                <span className="ripple"></span>
                <div className="relative_time float_wrapper">
                  <h3 className="pull-left">{post.scheduled_timing}</h3>
                  <h4 className="pull-right">{post.scheduled_date}</h4>
                </div>
                <div className="profile">
                  <span className="avatar">
                    <img src={`${IP}/file/${post?.attachments}`} width={60} height={60} alt="Avatar" />
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="text">
                      <h3>{post?.service_name}</h3>
                      <p>{post.service_time}</p>
                    </div>
                    <div className="text">
                      <h3>Add-ons:</h3>
                      {post.add_ons_details.map((addon, index) => (
                        <p key={index} style={{ margin: '4px 0' }}>{addon.title}</p>
                      ))}
                    </div>
                  </div>
                </div>
                {isEventOpen(`app${index + 1}`) && (
                  <div className="more_detail">
                    <div className="address float_wrap">
                      <p>{post.address}</p>
                      {post.location_type === 'provider' && (
                        <button className="button_direction">Get Directions</button>
                      )}
                    </div>
                    <hr />
                    <div className="host">
                      <div className="avatar"></div>
                      {post.service_status === 'pending' ? (
                        <p>Your request is being reviewed by our service providers, once accepted we will notify you!</p>
                      ) : (
                        <p>Appointment with <b>{post?.providerInfo[0]?.first_name} {post?.providerInfo[0]?.last_name}</b></p>
                      )}
                    </div>
                    <div className="billing float_wrapper">
                      <p className="pull-left">$ {post?.user_amount_calculation?.totalAmountWithTax?.toFixed(2)}</p>
                      <p className="paid pull-right">{post.service_status}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ScheduledBookings;
