import baseAxios from "axios";

const axios = baseAxios.create({
  // baseURL: "https://api.alogistics.in",
  baseURL: "http://localhost:8001",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    sessionStorage.setItem("token", token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("token");
  }
};

export const getAuthToken = () => {
  return sessionStorage.getItem("token");
};


export default axios;
