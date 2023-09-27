import axios from "axios";
import { BaseUrl } from "../utils/BaseUrl";
export const postAPI = (path, data) => {
  
    return axios.post(BaseUrl + path, data, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  };

  export const getAPI = (path) => {
    return axios.get(BaseUrl + path, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  };