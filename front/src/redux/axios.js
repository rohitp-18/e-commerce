import axios from "axios";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
