import React, { useEffect, useState } from 'react';
import { IP } from '../../../../../Constant';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

function Response() {
  const navigate = useNavigate();


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Access query parameters
  const session_id = searchParams.get('session_id');
  const userId = searchParams.get('userId');
  const membershipId = searchParams.get('membershipId');
  const renewalDate = searchParams.get('renewalDate');

  console.log("session_id", session_id, userId, membershipId, renewalDate)

  const [isLoading, setIsLoading] = useState(false);

  const membershipOptions = [
    {
      id: "price_1OAn62LnVrUYOeK2Y2M7l0Cj",
      name: "Silver",
      price: "99"
    },
    {
      id: "price_1OMYiBLnVrUYOeK2LPEbMEvW",
      name: "Gold",
      price: "199"
    },
  ];

  // Find the matching membership option based on the provided membershipType
  const selectedMembership = membershipOptions.find(option => option.id === membershipId);

  useEffect(() => {
    const handleAddMembership = async () => {
      setIsLoading(true);

      try {
        if (!selectedMembership) {
          throw new Error("Selected membership not found");
        }

        let renewalDays = 0;

        // Set different renewalDays based on membership name
        switch (selectedMembership.name.toLowerCase()) {
          case "silver":
            renewalDays = 90;
            break;
          case "gold":
            renewalDays = 365;
            break;
          default:
            throw new Error("Invalid membership type");
        }

        const response = await fetch(`${IP}/payment/add-membership-record?session_id=${session_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            membershipType: selectedMembership.name,
            renewalDays,
            userId,
            status: "active",
            stripeCustomerId: session_id,
            lastRenewalPaymentDate: renewalDate,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add membership: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Membership added successfully:', data);
      } catch (error) {
        console.error('Error adding membership:', error.message);
      } finally {
        setIsLoading(false);
      }
    };


    // Call the handleAddMembership function
    handleAddMembership();
  }, [session_id, userId, membershipId, renewalDate]);



  useEffect(() => {
    setTimeout(() => {
      navigate("/userProfile")
    }, 3000)

  }, [])








  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='PaymentForm successful'>
            <h4 className='.head'><FontAwesomeIcon icon={faCheckCircle} /></h4>
            <h4 className='.head'>Membership Purchased</h4>
            <p><strong>Plan:</strong> {selectedMembership?.name || 'N/A'}</p>
            <p><strong>Status:</strong> Active</p>
            <p><strong>Expiration:</strong>   {renewalDate || 'N/A'}</p>
            <p><strong>Price:</strong> {selectedMembership?.price || 'N/A'}$</p>
            <p><strong>Transaction Id:</strong> {session_id || 'N/A'}</p>
            <p className='space'>Enjoy seemless booking on Productive Alliance at special price!</p>


          </div>


        </>
      )}
    </div>
  );
}

export default Response;
