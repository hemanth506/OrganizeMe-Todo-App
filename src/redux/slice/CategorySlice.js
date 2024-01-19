import { createSlice } from "@reduxjs/toolkit";

const catagorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      const { categoryName } = action.payload;
      const newCategory = {
        id: Date.now(),
        title: categoryName,
        subCategory: [],
      };
      state.push(newCategory);
      localStorage.setItem("categoryData", JSON.stringify(state));
      return state;
    },
    deleteCategory: (state, action) => {
      const updatedCategoryData = state.filter(
        (catogery) => catogery.id !== action.payload.id
      );
      return [...updatedCategoryData];
    },
    addSubCategory: (state, action) => {
      const { subCategoryName, categoryId } = action.payload;
      const updatedState = state.map((category) =>
        category.id === categoryId
          ? {
            ...category,
            subCategory: [
              ...category.subCategory,
              {
                id: Date.now().toString(),
                title: subCategoryName,
                todos: [],
                links: [],
                notes: [],
              },
            ],
          }
          : category
      );
      return updatedState;
    },
    deleteSubCategory: (state, action) => {
      const { subCategoryId, categoryID } = action.payload;
      console.log(action.payload);
      const updatedState = state.map((category) => category.id === categoryID
        ? {
          ...category,
          subCategory: category.subCategory.filter(
            (tempSubCategory) => tempSubCategory.id !== subCategoryId
          ),
        }
        : category
      );
      console.log(updatedState);
      return updatedState;
    },
    sortTodo: (state) => { },
    addTodo: (state, action) => { },
    deleteTodo: (state, action) => { },
    addNote: (state, action) => { },
    deleteNote: (state, action) => { },
    addLink: (state, action) => { },
    deleteLink: (state, action) => { },
    updateLocalState: (state) => {
      localStorage.setItem("categoryData", JSON.stringify(state));
    },
  },
});

export const {
  addCategory,
  deleteCategory,
  addSubCategory,
  deleteSubCategory,
  sortTodo,
  updateLocalState,
} = catagorySlice.actions;
export default catagorySlice.reducer;
