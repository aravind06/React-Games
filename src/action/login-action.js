import axios from "axios";
import {
  AUTHENTICATE_USER, SET_USER_NAME, SET_USER_PASSWORD
} from "../constants";
import { dispatchcall } from "../helpers/action-helper";



export const userAuthentication = (user) => dispatch => {
  axios.defaults.baseURL = 'http://localhost:8081/e-shop';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  axios.post("/authenticate", user).then(response => {
    dispatchcall(AUTHENTICATE_USER, response.data, dispatch);
  })
}

export const setUserName = (username) => dispatch => {
  dispatchcall(SET_USER_NAME, username, dispatch);
}

export const setPassword = (password) => dispatch => {
  dispatchcall(SET_USER_PASSWORD, password, dispatch);
}
