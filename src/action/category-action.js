import { GET_CATEGORY_LIST, SET_SELECTED_CATEGORY, SET_CURRENT_CAROUSEL_IMAGE } from "../constants";
import { dispatchcall } from "../helpers/action-helper";
import axios from "axios";
import { getSelectedCateogry } from "../helpers/utils";

export const GetInitialData = () => dispatch => {
    axios.get("/getInitialData").then(resp => {
        if (resp.data.statusCode === "200") {
            dispatchcall(GET_CATEGORY_LIST, resp.data, dispatch);
        }
    })

}


export const nextCarouselImage = (currentImage, carouselLength) => dispatch => {

    if (currentImage === carouselLength - 1)
        dispatchcall(SET_CURRENT_CAROUSEL_IMAGE, 0, dispatch);
    else
        dispatchcall(SET_CURRENT_CAROUSEL_IMAGE, currentImage + 1, dispatch);

}


export const previousCarouselImage = (currentImage, carouselLength) => dispatch => {

    if (currentImage === 0)
        dispatchcall(SET_CURRENT_CAROUSEL_IMAGE, carouselLength - 1, dispatch);
    else
        dispatchcall(SET_CURRENT_CAROUSEL_IMAGE, currentImage - 1, dispatch);

}

export const setSelectedCategory = (CategoryId, CategoryList) => dispatch => {
    dispatchcall(SET_SELECTED_CATEGORY, getSelectedCateogry(CategoryId, CategoryList), dispatch);
}