import React, { useEffect, useState } from 'react';
import { IP } from '../../../../../Constant';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
          <div className='PaymentForm'>
            <h1>Membership status</h1>
            <p>Status: successful</p>
            <p>Transaction ID: </p>


          </div>

        </>
      )}
    </div>
  );
}

export default Response;
