import axios from "axios";
const Services = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : null
      }`,
  },
});

export default Services;
