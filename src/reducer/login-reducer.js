import { AUTHENTICATE_USER, SET_USER_NAME, SET_USER_PASSWORD } from "../constants";

const initialState = {
    loginStatus: {
        statusCode: "",
        statusMessage: ""
    },
    userData: {
        userName: "",
        password: ""
    }
};

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, userData: { ...state.userData, userName: action.payload } }
        case SET_USER_PASSWORD:
            return { ...state, userData: { ...state.userData, password: action.payload } }
        case AUTHENTICATE_USER:
            return { ...state, loginStatus: action.payload };
        default:
            return state;
    }
}
