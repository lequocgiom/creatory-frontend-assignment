import axios from "axios";

const BASE_API = process.env.REACT_APP_BASE_API;
const authen = ({ username, password }) => {
  return axios.post(`/auth`, { username, password });
};

const getData = (limit = null, offset = null) => {
  const params = {
    ...(limit ? { limit } : {}),
    ...(offset ? { offset } : {}),
  };
  return axios.get(`/data`, { params });
};

export { authen, getData };
