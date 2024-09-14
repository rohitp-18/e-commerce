import axios from "axios";

const instance = axios.create({
  baseURL: `${window.location.origin}/api/v1`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
