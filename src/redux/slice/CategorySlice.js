import { createSlice } from "@reduxjs/toolkit";

const checkIfContentPresentBasedOnTabs = (tab, mainContent, subContent) => {
  if (tab === "todos") {
    if(!mainContent) { return false; }
  } else if (tab === "notes" || tab === "links") {
    if(!mainContent || !subContent) { return false; }
  }
  return true;
}

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
      const updatedState = state.map((category) =>
        category.id === categoryID
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
    sortTodo: (state, action) => {
      const { subCategoryID, categoryID } = action.payload;
      const newCategoryData = state.map((category) => {
        if (category.id === categoryID) {
          const newSubCategory = category.subCategory.map((subCat) => {
            if (subCat.id === subCategoryID) {
              const sortedSubCategory = [...subCat.todos].sort((a, b) =>
                a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1
              );
              return { ...subCat, todos: sortedSubCategory };
            }
            return subCat;
          });

          return { ...category, subCategory: newSubCategory };
        }
        return category;
      });

      return newCategoryData;
    },
    deleteTodo: (state, action) => {
      const { subCategoryID, categoryID, deleteTodoId } = action.payload;

      const currentCategory = state.find((category) => category.id === categoryID);
      if (currentCategory) {
        const currentSubCategory = currentCategory.subCategory.find((subCat) => subCat.id === subCategoryID);
        if (currentSubCategory) {
          const newTodos = currentSubCategory.todos.filter((tempTodo) => tempTodo.id !== deleteTodoId);
          currentSubCategory.todos = [...newTodos];
        }
      }

      return state;
    },
    checkTodo: (state, action) => {
      const { subCategoryID, categoryID, checkedTodoId } = action.payload;
      const currentCategory = state.find((category) => category.id === categoryID);

      if (currentCategory) {
        const currentSubCategory = currentCategory.subCategory.find((subCat) => subCat.id === subCategoryID);
        if (currentSubCategory) {
          const newTodos = currentSubCategory.todos.map((tempTodo) => {
            if (tempTodo.id === checkedTodoId) {
              tempTodo.isCompleted = !tempTodo.isCompleted;
            }
            return tempTodo;
          });
          currentSubCategory.todos = [...newTodos];
        }
      }
      return state;
    },
    deleteNote: (state, action) => {
      const { subCategoryID, categoryID, deleteNoteId } = action.payload;

      const currentCategory = state.find((category) => category.id === categoryID);
      if (currentCategory) {
        const currentSubCategory = currentCategory.subCategory.find((subCat) => subCat.id === subCategoryID);
        if (currentSubCategory) {
          const newNotes = currentSubCategory.notes.filter((tempNote) => tempNote.id !== deleteNoteId);
          currentSubCategory.notes = [...newNotes];
        }
      }

      return state;
    },
    deleteLink: (state, action) => {
      const { subCategoryID, categoryID, deleteLinkId } = action.payload;

      const currentCategory = state.find((category) => category.id === categoryID);
      if (currentCategory) {
        const currentSubCategory = currentCategory.subCategory.find((subCat) => subCat.id === subCategoryID);
        if (currentSubCategory) {
          const newLinks = currentSubCategory.links.filter((tempLink) => tempLink.id !== deleteLinkId);
          currentSubCategory.links = [...newLinks];
        }
      }

      return state;
    },
    updateLocalState: (state) => {
      localStorage.setItem("categoryData", JSON.stringify(state));
    },
    addContentBasedOnTab: (state, action) => {
      const { mainContent, tab, subContent, categoryID, subCategoryID } = action.payload;
      console.log("mainContent: " + mainContent + " subContent" + subContent);
      console.log("action.payload", action.payload);

      if (tab !== "todos" && tab !== "notes" && tab !== "links") {
        return state;
      }

      const defaultContent = {
        id: Date.now().toString(),
        title: mainContent,
      };

      let updatedContent;
      if(checkIfContentPresentBasedOnTabs(tab, mainContent, subContent)) {
        if (tab === "todos") {
          updatedContent = { ...defaultContent, isCompleted: false };
        } else if (tab === "notes") {
          updatedContent = { ...defaultContent, description: subContent };
        } else if (tab === "links") {
          updatedContent = { ...defaultContent, contentURL: subContent };
        }
      } else {
        return state;
      }

      console.log("updatedContent", updatedContent);

      const currentCategory = state.find((category) => category.id === categoryID);

      if (currentCategory) {
        const currentSubCategory = currentCategory.subCategory.find((subCat) => subCat.id === subCategoryID);

        if (currentSubCategory) {
          if (tab === "todos") {
            const trueArrValue = [];
            const falseArrValue = [];
            let k = 0;

            for (; k < currentSubCategory[tab].length; k++) {
              if (currentSubCategory[tab][k].isCompleted) {
                break;
              }
              trueArrValue.push(currentSubCategory[tab][k]);
            }

            trueArrValue.push(updatedContent);

            for (let j = k; j < currentSubCategory[tab].length; j++) {
              falseArrValue.push(currentSubCategory[tab][j]);
            }

            currentSubCategory[tab] = [...trueArrValue, ...falseArrValue];
          } else {
            currentSubCategory[tab] = [...currentSubCategory[tab], updatedContent];
          }
        }
      }

      return state;
    },
    setDefaultState: (state) => {
      return JSON.parse(localStorage.getItem("categoryData")) || [];
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
  deleteTodo,
  deleteNote,
  deleteLink,
  checkTodo,
  addContentBasedOnTab,
  setDefaultState,
} = catagorySlice.actions;
export default catagorySlice.reducer;
