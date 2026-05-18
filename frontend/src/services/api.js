import axios from "axios";

const API = axios.create({
  baseURL: "https://ese-ai01.onrender.com/api",
});


// ADD JWT TOKEN AUTOMATICALLY
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;