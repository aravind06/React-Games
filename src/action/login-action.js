import axios from "axios";
import { AUTHENTICATE_USER } from "../constants";
import { dispatchcall } from "../helpers/action-helper";



export const userAuthentication = (user) => dispatch => {
  axios.defaults.baseURL = 'http://localhost:8081/e-shop';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  axios.post("/authenticate", user).then(response => {
      dispatchcall(AUTHENTICATE_USER, response.data, dispatch);
  })
}