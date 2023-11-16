// import React, { useState, useEffect } from 'react';
// import "../Profile.css";
// import { IP } from '../../../../../Constant';
// import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



// function BuyCard() {

//     const [user, setUser] = useState([]);
//     const [images, setImageObjectURL] = useState([]);
//     const [clientSecret, setClientSecret] = useState(null);





//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await fetch(`${IP}/coupon/fetch`);
//                 const data = await res.json();
//                 setUser(data);
//                 // setOfferValue(data.offerValue)
//                 // setGiftCardId(data._id)
//                 console.log("gift data data", data);
//             } catch (error) {
//                 // Handle errors
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         const fetchImages = async () => {
//             const imagePromises = user.map((card) => {
//                 return fetch(`${IP}/file/${card.attachments}`)
//                     .then((res) => res.blob())
//                     .then((imageBlob) => URL.createObjectURL(imageBlob))
//                     .catch((error) => {
//                         console.error("Error loading image:", error);
//                         return null; // Return null for images that couldn't be loaded
//                     });
//             });

//             Promise.all(imagePromises).then((imageUrls) => {
//                 setImageObjectURL(imageUrls);
//             });
//         };

//         fetchImages();
//     }, [user]);


//     const handleSubmit = async (offerValue, giftCardId) => {
//         try {
//             const formData = {
//                 amount: offerValue,
//                 giftCardId: giftCardId,
//             };

//             const token = localStorage.getItem("token");
//             const url = `${IP}/payment/giftcard-payment-request`;
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: token,
//                 },
//             };

//             const res = await axios.post(url, formData, config);

//             console.log("api details redux", res);

//             if (res.status === 200) {
//                 setClientSecret(res.data.client_secret);
//                 toast.success("Your Application was successful!", {
//                     position: "top-right",
//                     autoClose: 3000,
//                     onClose: () => {
//                         // Handle navigation or other actions on success
//                     },
//                 });
//             } else {
//                 toast.error("An error occurred. Please try again.", {
//                     position: "top-right",
//                     autoClose: 3000,
//                 });
//             }

//             console.log("Response:", res);
//         } catch (error) {
//             console.error(error);
//             toast.error("An error occurred. Please try again.", {
//                 position: "top-right",
//                 autoClose: 3000,
//             });
//         }
//     };





//     const giftCards = user.filter(item => item.type === 'gift_card').map((card, index) => (
//         <div className='gift_input' id='buy_gift_card_input' key={index}>
//             <div className='gift_image' id='buy_gift_card_image'>
//                 {images[index] && <img src={images[index]} alt='...' />}
//                 <div className='gift_button'>
//                     <h3 className='title'>{card.title}</h3>
//                     <h3 className='title'>{card.offerValue} $ off</h3>
//                     <button className='Use_button' onClick={() => handleSubmit(card.offerValue, card._id)}>Buy Now</button>

//                 </div>
//             </div>
//         </div>
//     ));

//     return (
//         <>
//             <div id='gift'>
//                 <div className='overview_container'>

//                     <div className='gift_container' id="gift_vard_buy">
//                         {giftCards}
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </>
//     );
// }

// export default BuyCard;


import React, { useState, useEffect } from 'react';
import "../Profile.css";
import { IP } from '../../../../../Constant';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function BuyCard() {

    const [user, setUser] = useState([]);
    const [images, setImageObjectURL] = useState([]);
    const [clientSecret, setClientSecret] = useState(null);





    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/coupon/fetch`);
                const data = await res.json();
                setUser(data);
                // setOfferValue(data.offerValue)
                // setGiftCardId(data._id)
                console.log("gift data data", data);
            } catch (error) {
                // Handle errors
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = user.map((card) => {
                return fetch(`${IP}/file/${card.attachments}`)
                    .then((res) => res.blob())
                    .then((imageBlob) => URL.createObjectURL(imageBlob))
                    .catch((error) => {
                        console.error("Error loading image:", error);
                        return null; // Return null for images that couldn't be loaded
                    });
            });

            Promise.all(imagePromises).then((imageUrls) => {
                setImageObjectURL(imageUrls);
            });
        };

        fetchImages();
    }, [user]);


    const handleSubmit = async (offerValue, giftCardId) => {
        try {
            const formData = {
                amount: offerValue,
                giftCardId: giftCardId,
            };

            const token = localStorage.getItem("token");
            const url = `${IP}/payment/giftcard-payment-request`;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            };

            const res = await axios.post(url, formData, config);

            console.log("api details redux", res);

            if (res.status === 200) {
                setClientSecret(res.data.client_secret);
                toast.success("Your Application was successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        // Handle navigation or other actions on success
                    },
                });
            } else {
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }

            console.log("Response:", res);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };





    const giftCards = user.filter(item => item.type === 'gift_card').map((card, index) => (
        <div className='gift_input' id='buy_gift_card_input' key={index}>
            <div className='gift_image' id='buy_gift_card_image'>
                {images[index] && <img src={images[index]} alt='...' />}
                <div className='gift_button'>
                    <h3 className='title'>{card.title}</h3>
                    <h3 className='title'>{card.offerValue} $ off</h3>
                    <button className='Use_button' onClick={() => handleSubmit(card.offerValue, card._id)}>Buy Now</button>

                </div>
            </div>
        </div>
    ));

    return (
        <>
            <div id='gift'>
                <div className='overview_container'>

                    <div className='gift_container' id="gift_vard_buy">
                        {giftCards}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default BuyCard;


import React, { useState, useEffect } from 'react';
import "./Profile.css";
import Yourcard from './Giftcard/Yourcard';
import BuyCard from './Giftcard/BuyCard';
function Gift() {
  const username = localStorage.getItem("user_name");






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

          <Yourcard />

          <div className='title' id='buycard'>
            <h3>Buy GIFT CARDS</h3>
          </div>
          <BuyCard />
        </div>
      </div>
    </>
  );
}

export default Gift;


import React, { useState, useEffect } from 'react';
import "../Profile.css";
import { IP } from '../../../../../Constant';
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51MXmewLnVrUYOeK2PN2SexCsPAi8lsw8dIt7Pw04DUCsoCsv7a0VReRlGhbUuDOKYqbp1PEDWRWklwSvEsUD0NZ400sa7PXdfg");

function BuyCard() {
    const [user, setUser] = useState([]);
    const [images, setImageObjectURL] = useState([]);
    const [clientSecret, setClientSecret] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${IP}/coupon/fetch`);
                const data = await res.json();
                setUser(data);
                console.log("gift data data", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = user.map((card) => {
                return fetch(`${IP}/file/${card.attachments}`)
                    .then((res) => res.blob())
                    .then((imageBlob) => URL.createObjectURL(imageBlob))
                    .catch((error) => {
                        console.error("Error loading image:", error);
                        return null;
                    });
            });

            Promise.all(imagePromises).then((imageUrls) => {
                setImageObjectURL(imageUrls);
            });
        };

        fetchImages();
    }, [user]);

    const handleBuyNowClick = async (offerValue, giftCardId) => {
        if (elements == null || stripe == null) {
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            return;
        }

        const formData = {
            amount: offerValue,
            giftCardId: giftCardId,
        };

        const token = localStorage.getItem("token");
        const url = `${IP}/payment/giftcard-payment-request`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        };

        try {
            const res = await axios.post(url, formData, config);
            setClientSecret(res.data.client_secret);

            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret: res.data.client_secret,
                confirmParams: {
                    return_url: 'https://example.com/order/123/complete',
                },
            });

            if (error) {
                setErrorMessage(error.message);
            } else {
                // Handle successful payment
            }
        } catch (error) {
            console.error("Error handling payment:", error);
        }
    };

    const giftCards = user.filter(item => item.type === 'gift_card').map((card, index) => (
        <div className='gift_input' id='buy_gift_card_input' key={index}>
            <div className='gift_image' id='buy_gift_card_image'>
                {images[index] && <img src={images[index]} alt='...' />}
                <div className='gift_button'>
                    <h3 className='title'>{card.title}</h3>
                    <h3 className='title'>{card.offerValue} $ off</h3>
                    <button
                        type="submit"
                        className='Use_button'
                        disabled={!stripePromise}
                        onClick={() => handleBuyNowClick(card.offerValue, card._id)}
                    >
                        Buy Now
                    </button>
                    {errorMessage && <div>{errorMessage}</div>}
                </div>
            </div>
        </div>
    ));
    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        // Fully customizable with appearance API.
        appearance: {
          /*...*/
        },
      };
    return (
        <>
            <Elements stripe={stripePromise} options={options}>
                <div id='gift'>
                    <div className='overview_container'>

                        <div className='gift_container' id="gift_vard_buy">
                            {giftCards}
                        </div>
                    </div>
                </div>
            </Elements>

        </>
    );
}

export default BuyCard;
