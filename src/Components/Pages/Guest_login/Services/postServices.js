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

  getPost: (userId) => {
    const token = localStorage.getItem("token");
    const url = `http://45.13.132.197:5000/api/user/booking-details/${userId}`;
    const config = {
      headers: {
        Authorization: token,
      },
    };

    return axios.get(url, config);
  },
};

export default Post;
