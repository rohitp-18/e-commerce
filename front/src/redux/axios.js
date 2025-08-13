import Axios from "axios";

const axios = Axios.create({
  baseURL: `http://localhost:5000/api/v1`, // for development
  // baseURL: `${window.location.origin}/api/v1`, // for deployment
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export default axios;
