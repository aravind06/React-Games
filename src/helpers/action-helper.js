export const dispatchcall = (typeConstant, value, dispatch) => {
    dispatch ({
        type: typeConstant,
        payload: value
    });
};