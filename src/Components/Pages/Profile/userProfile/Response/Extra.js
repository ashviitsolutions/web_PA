import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Response() {
  const { id } = useParams();
  const [portalSessionUrl, setPortalSessionUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiEndpoint = `http://localhost:5000/api/payment/create-portal-session`; // Replace with your actual API base URL

    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id: id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPortalSessionUrl(data.portalSessionUrl);
      })
      .catch((error) => {
        setError(error.message || 'An error occurred while fetching the API.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : portalSessionUrl ? (
        <a href={portalSessionUrl} target="_blank" rel="noopener noreferrer">
          Go to Billing Portal
        </a>
      ) : (
        <p>No portal session URL available.</p>
      )}
    </div>
  );
}

export default Response;



  // Helper function to get the renewal date dynamically
  const getRenewalDate = () => {
    const currentDate = new Date();

    // Example: Calculate renewal date as one year from the current date
    const oneYearLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // Format the date as needed (e.g., 'YYYY-MM-DD')
    const formattedDate = `${oneYearLater.getFullYear()}-${(oneYearLater.getMonth() + 1).toString().padStart(2, '0')}-${oneYearLater.getDate().toString().padStart(2, '0')}`;

    return formattedDate;
  };
