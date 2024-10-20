import axios from "axios";
import { IP } from "../../../../Constant";

const Post = {
  createPost: (formData) => {
    const token = localStorage.getItem("token");
    const url = `${IP}/user/service_book`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    return axios.post(url, formData, config);
  },

  createCalculation: (calculationdata) => {
    const token = localStorage.getItem("token");
    const url = `${IP}/user/service_book_calculation`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    return axios.post(url, calculationdata, config);
  },
  getPost: () => {
    const token = localStorage.getItem("token");
    const url = `${IP}/user/my-bookings?page=1&limit=50`;
    const config = {
      headers: {
        Authorization: token,
      },
    };

    return axios.get(url, config);
  },

  getProfile: () => {
    const token = localStorage.getItem("token");
    const url = `${IP}/user/my_profile`;
    const config = {
      headers: {
        Authorization: token,
      },
    };

    return axios.get(url, config);
  },
};

export default Post;
