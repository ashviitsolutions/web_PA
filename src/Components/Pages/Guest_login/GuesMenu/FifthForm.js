import React, { useState, useEffect } from "react";
import "./style.css";
import postServices from "../Services/postServices";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from "../../../../Constant";
import StripeCheckout from 'react-stripe-checkout';



const FifthForm = ({ step, nextStep }) => {

  const [clientSecret, setClientSecret] = useState(null);
  // const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [tip, setTip] = useState(0);



  const { provider_id } = useParams();

  console.log("all data provider_id", provider_id);

  const formData = useSelector((state) => state.counter.formData);
  console.log("all data dispatch", formData);
  const useremail = localStorage.getItem("user_email")
  const username = localStorage.getItem("user_name")
  const userid = localStorage.getItem("userid")
  const token = localStorage.getItem("token")

  // Check if the necessary form data exists before accessing its properties    
  const addon_id = formData.addon_id && formData.addon_id[0] ? formData.addon_id[0] : "";
  const location = formData.locationForm && formData.locationForm[0] ? formData.locationForm[0] : null;
  // Check if location is defined before trying to access its properties
  const locationName = location ? location.location : null;


  const location_type = formData.location && formData.location[0] ? formData.location[0].location_type : "";
  const gender = formData.secondform && formData.secondform[0] ? formData.secondform[0].gender : "";
  const totalPrice = formData.secondform && formData.secondform[0] ? formData.secondform[0].totalPrice : "";
  const service_id = formData.secondform && formData.secondform[0] ? formData.secondform[0].service_ids : "";
  const service_time = formData.secondform && formData.secondform[0] ? formData.secondform[0].service_time : "";
  const areas_of_concern = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].areas_of_concern : "";
  const health_conditions = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].health_conditions : "";
  const massage_body_part = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].massage_body_part : "";
  const massage_pressure = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].massage_pressure : "";
  const special_considerations = formData.thirdform && formData.thirdform[0] ? formData.thirdform[0].special_considerations : "";
  const scheduled_date = formData.fourthform && formData.fourthform[0] ? formData.fourthform[0].date : "";
  const scheduled_timing = formData.fourthform && formData.fourthform[0] ? formData.fourthform[0].time : "";
  const massage_for = formData?.firstForm?.[0];


  const adressuser = formData.locationForm?.[0]?.address || "";
  console.log("location", adressuser)





  const nav = useNavigate();
  const [bookingId, setBookingId] = useState()
  const [TransactionId, setTransectionId] = useState()
  const [address, setAddress] = useState(adressuser);
  const [email, setEmail] = useState(useremail);
  const [arrivalInstructions, setArrivalInstructions] = useState("");
  const [name, setName] = useState(username)
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false)



  console.log("userid", userid)







  const makePayment = async () => {
    try {
      const response = await axios.post(
        `${IP}/payment/pay`,
        {
          amount: totalAmount * 100, // Convert to cents
          booking_id: bookingId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      setClientSecret(response.data.client_secret);
    } catch (error) {
      setError(
        error.response?.data?.msg ||
        "An error occurred during payment initiation."
      );
    }
  };



  useEffect(() => {
    makePayment()
  }, [bookingId])


  console.log("secret key", clientSecret)




  useEffect(() => {
    const tip = 31.5;
    const taxRate = 0.06625;
    const calculatedTax = (totalPrice * 100 * taxRate) / 100;
    const totalAmount = (totalPrice * 100 + tip * 100 + calculatedTax * 100) / 100;

    setTax(calculatedTax);
    setTip(tip);
    setTotalAmount(totalAmount);
  }, [totalPrice]);












  const handleSubmit = async (stripeToken) => {
    console.log("stripeToken", stripeToken.id)
    setTransectionId(stripeToken?.id)
    if (password !== confirmpassword) {
      setError(true);
    } else {
      try {
        const formData = {
          ...(userid
            ? {
              user: userid,
              customer_email: email,
            }
            : {
              email: email,
              password: password,
              confirm_password: confirmpassword,
            }),
          location: locationName,
          location_type: location_type,
          massage_for: massage_for,
          service_id: service_id,
          gender: gender,
          provider_id: provider_id,
          service_time: service_time,
          health_conditions: health_conditions,
          areas_of_concern: areas_of_concern,
          special_considerations: special_considerations,
          massage_body_part: massage_body_part,
          massage_pressure: massage_pressure,
          scheduled_date: scheduled_date,
          scheduled_timing: scheduled_timing,
          address: address,
          instructions: "bring material",
          add_ons: addon_id,
          stripe_token: stripeToken.id,
        };

        const token = localStorage.getItem("token");
        const url = `${IP}/user/service_book`;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,

          },
        };

        const res = await axios.post(url, formData, config);

        console.log("api details redux", res);
        const generatedToken = res.data.ref;
        setBookingId(generatedToken)

        if (res.status === 200) {
          // Navigate to the success page with the generated token
          toast.success("Information received, moving to checkout now!", {
            position: "top-right",
            autoClose: 3000,
            onClose: () => {
              nav(`/userProfile/payment/success/${stripeToken.id}`);
            },
          });
        } else {
          // Show error notification if the API response is not successful
          toast.error("An error occurred. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            onClose: () => {
              nav(`/userProfile/payment/failed/${stripeToken.id}`);
            },
          });
        }

        // Navigate to the next page with the extracted ID
        console.log("Response:", res);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          onClose: () => {
            nav(`/userProfile/payment/failed/${stripeToken.id}`);
          },
        });
      }
    }
  };













  return (
    <>
      <div className="review_page">
        <div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hotelName">  Apt / Suite / Hotel Name &amp; room:</label>
            <input
              type="text"
              name="hotelName"

            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Arrival instructions for service provider:</label>
            <textarea
              name="bio"
              rows="4"
              value={arrivalInstructions}
              onChange={(e) => setArrivalInstructions(e.target.value)}
            />
          </div>
          {
            !token && (
              <>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <p style={{ color: "red" }}>Passwords do not match.</p>
                )}
              </>
            )
          }

          <div>
            <span className="title">Appointments</span>
            <span className="value">[Massage title here] <small>{service_time}</small> </span>
            <div className="price" style={{ display: 'block', lineHeight: '10px' }}>
              <p className="prices" style={{ fontSize: '17px' }}>
                Amount: ${totalPrice}
              </p>
              <p className="prices" style={{ fontSize: '17px' }}>
                18% Tip: ${tip}
              </p>
              <p className="prices" style={{ fontSize: '17px' }}>
                6.625% Taxes: ${tax.toFixed(2)}
              </p>
              <p className="prices" style={{ fontSize: '17px' }}>
                Total: ${totalAmount.toFixed(2)}
              </p>
            </div>

          </div>

          <StripeCheckout
            amount={totalAmount * 100}
            clientSecret={clientSecret}
            token={handleSubmit}
            currency="USD"

            stripeKey="pk_test_51MXmewLnVrUYOeK2PN2SexCsPAi8lsw8dIt7Pw04DUCsoCsv7a0VReRlGhbUuDOKYqbp1PEDWRWklwSvEsUD0NZ400sa7PXdfg"
          >
            <div style={{ textAlign: 'center' }}>
              <button className="button">Proceed to Pay</button>
            </div>
          </StripeCheckout>





          <p style={{ float: "right" }}>Total Price: ${totalAmount}</p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default FifthForm;
