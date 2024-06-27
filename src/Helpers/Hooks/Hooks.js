import { useState } from 'react';
import axios from 'axios';
import { IP } from '../../Constant';
import useToast from '../useToast';

const useUserRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      setError(err.response?.data?.message || "An error occurred");
      showError(err.response?.data?.message || "An error occurred"); // Show error toast message
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
      const result = response.data;
      const fullName = `${result?.user_info?.first_name} ${result?.user_info?.last_name}`;
      localStorage.setItem("user_name", fullName);
      localStorage.setItem('users', JSON.stringify(result));
      localStorage.setItem('userid', result?.user_info?._id);
      localStorage.setItem('user_name', result?.user_info?.name);
      localStorage.setItem('user_email', result?.user_info?.email);
      localStorage.setItem('mobile', result?.user_info?.mobile);
      localStorage.setItem("first_name", result?.user_info?.first_name);
      localStorage.setItem("last_name", result?.user_info?.last_name);
      localStorage.setItem("token", token);

      showSuccess("Logged in successfully");

      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "An error occurred");
      showError(err.response?.data?.message || "An error occurred");
      throw err;
    }
  };

  return { registerUser, loginUser, loading, error };
};

export { useUserRegistration };
