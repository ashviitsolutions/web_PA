import { useState } from 'react';
import axios from 'axios';
import { IP } from '../../Constant';
import useToast from '../useToast';

const useUserRegistration = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [membershipLevel, setMembershipLevel] = useState(null);
  const [userGiftCards, setUserGiftCards] = useState(null);
  const { showSuccess, showError } = useToast();


  const registerUser = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${IP}/user/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      showSuccess("Registration successful!"); // Show success toast message
      return response;
    } catch (err) {
      setLoading(false);
      showError(err?.response?.data?.msg); // Show error toast message
      throw err;
    }
  };


  const loginUser = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${IP}/user/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const token = response.headers['authorization'];

      localStorage.setItem("token", token);
      localStorage.setItem("userid", response?.data?.user_info?._id);
      localStorage.setItem("first_name", response?.data?.user_info?.first_name);
      localStorage.setItem("last_name", response?.data?.user_info?.last_name);
      localStorage.setItem("user_email", response?.data?.user_info?.email);
      localStorage.setItem("mobile", response?.data?.user_info?.mobile);

      showSuccess("Logged in successfully");

      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      showError(err?.response?.data?.msg);
      throw err;
    }
  };






  const getUserMembership = async () => {


    try {
      const response = await axios.get(`${IP}/user/membership-details`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      const data = response.data;
      setMembershipLevel(data.membershipType);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };


  const getUserGiftCards = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${IP}/user/my-giftCards`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      const data = response.data;
      setUserGiftCards(data?.data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };


  return { registerUser, loginUser, loading, error, membershipLevel, getUserMembership, getUserGiftCards, user: userGiftCards };


};

export { useUserRegistration };
