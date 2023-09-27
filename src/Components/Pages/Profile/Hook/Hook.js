import axios from "axios";

const Post = {
  createPost: (formData) => {
    const token = localStorage.getItem("token");
    const url = "http://45.13.132.197:5000/api/user/service_book";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    return axios.post(url, formData, config);
  },
  getPost: () => {
    const token = localStorage.getItem("token");
    const url = `http://45.13.132.197:5000/api/user/my-bookings`;
    const config = {
      headers: {
        Authorization: token,
      },
    };

    return axios.get(url, config);
  },

  getProfile: () => {
    const token = localStorage.getItem("token");
    const url = `http://45.13.132.197:5000/api/user/my_profile`;
    const config = {
      headers: {
        Authorization: token,
      },
    };

    return axios.get(url, config);
  },
};

export default Post;
