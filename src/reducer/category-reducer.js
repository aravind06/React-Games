import { GET_CATEGORY_LIST, SET_SELECTED_CATEGORY, SET_CURRENT_CAROUSEL_IMAGE } from "../constants";

const initialState = {
    currentImage: 0,
    category: [],
    carousel: [],
    selectedCategory: {}
};

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_LIST:
            return {
                ...state,
                category: action.payload.categoryList,
                carousel: action.payload.carouselList
            }
        case SET_CURRENT_CAROUSEL_IMAGE:
            return {
                ...state,
                currentImage: action.payload
            }
        case SET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            }
        default:
            return state;
    }
}