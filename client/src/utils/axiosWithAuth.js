import axios from "axios";

export const axiosWithAuth = () => {
  const token = sessionStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: "https://better-professor-feb20.herokuapp.com/api"
  });
};
