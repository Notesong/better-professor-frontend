import { axiosWithAuth } from "./axiosWithAuth";

export const logout = e => {
  sessionStorage.clear();

  axiosWithAuth()
    .delete()
    .then(res => {})
    .catch(err => {});
};
