import React, { useEffect, useState } from 'react';
import { IP } from '../../../../../Constant';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';

function Response() {
  const nav = useNavigate()
  // Destructure the parameters from useParams
  const { userId, membershipType, renewalDate } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const membershipOptions = [
    {
      id: "price_1OAn62LnVrUYOeK2Y2M7l0Cj",
      name: "Silver",
    },
    {
      id: "price_1OMYiBLnVrUYOeK2LPEbMEvW",
      name: "Gold",
    },
  ];

  // Find the matching membership option based on the provided membershipType
  const selectedMembership = membershipOptions.find(option => option.id === membershipType);

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

        const response = await fetch(`${IP}/payment/add-membership-record`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            membershipType: selectedMembership.name,
            renewalDays,
            userId,
            status: "active",
            stripeCustomerId: "test",
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
  }, [nav]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='PaymentForm successful'>
              <h4 className='.head'><FontAwesomeIcon icon={faCheckCircle} /></h4>
              <h4 className='.head'>Membership Purchased</h4>
              <p><strong>Plan:</strong> Gold</p>
              <p><strong>Status:</strong> Active</p>
              <p><strong>Expiration:</strong> 02-02-2025</p>
              <p><strong>Price:</strong> 199$</p>
              <p><strong>Transaction Id:</strong> bdsvbvkbdsvkdbv44556</p>
              <p className='space'>Enjoy seemless booking on Productive Alliance at special price!</p>
            

          </div>
          <div className='PaymentForm failed'>
              <h4 className='.head'><FontAwesomeIcon icon={faBan} /></h4>
              <h4 className='head'>Membership Purchase Failed</h4>
              <p><strong>Plan:</strong> Gold</p>
              <p><strong>Status:</strong> Active</p>
              <p><strong>Expiration:</strong> 02-02-2025</p>
              <p><strong>Price:</strong> 199$</p>
              <p><strong>Transaction Id:</strong> bdsvbvkbdsvkdbv44556</p>
              <p className='space'>Your payment is declined or failed, please retry!</p>
            

          </div>

        </>
      )}
    </div>
  );
}

export default Response;
