import { AUTHENTICATE_USER } from "../constants";

const initialState = {
    loginStatus: {
        statusCode :"",
        statusMessage :""
    }
};

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return { ...state, loginStatus: action.payload };
        default:
            return state;
    }
}
