export const getSelectedCateogry = (categoryId, categoryList) => {

    return categoryList.filter(category =>
        category.categoryId === categoryId);


}