import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { CategoryDataContext, CategoryContext } from "./FileContainer";
import { createButton } from "../styling.js";
import { Box, Button, Tabs, Tab } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { Todo } from "./sub-components/Todo.jsx";
import { Note } from "./sub-components/Note.jsx";
import { Link } from "./sub-components/Link.jsx";

export const MainContent = () => {
  const [categoryData, setCategoryData] = useContext(CategoryDataContext);
  localStorage.setItem("categoryData", JSON.stringify(categoryData));
  const [activeCategory] = useContext(CategoryContext);
  const [categoryID, subCategoryID] = activeCategory;
  const [displaySubCategory, setDisplaySubCategory] = useState({});
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState("");
  const [tab, setTab] = useState("todos");
  const [mainContent, setMainContent] = useState("");
  const [subContent, setSubContent] = useState("");
  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [deleteLinkId, setDeleteLinkId] = useState(null);
  const [dataExist, setDataExist] = useState(false);
  const [checkedTodoId, setcheckedTodoId] = useState(null);

  useEffect(() => {
    if (categoryID && subCategoryID) {
      const currentCat = categoryData.filter(
        (category) => category.id === categoryID
      );
      if (currentCat.length > 0) {
        const currentSubCat = currentCat[0].subCategory.filter(
          (subCat) => subCat.id === subCategoryID
        );

        if (currentSubCat && currentSubCat.length > 0) {
          setCurrentCategoryTitle(currentCat[0].title);
          setDisplaySubCategory(currentSubCat[0]);
        }
      }
    }
  }, [categoryID, subCategoryID, categoryData]);

  useEffect(() => {
    const currentCategory = categoryData.find(
      (category) => category.id === categoryID
    );
    if (currentCategory) {
      const currentSubCategory = currentCategory.subCategory.find(
        (subCat) => subCat.id === subCategoryID
      );

      if (currentSubCategory) {
        setDataExist(true);
      } else {
        setDataExist(false);
      }
    } else {
      setDataExist(false);
    }
  }, [categoryData, categoryID, subCategoryID]);

  const handleAddEvent = useCallback(() => {
    const defaultContent = {
      id: Date.now().toString(),
      title: mainContent,
    };

    let updatedContent;
    if (tab === "todos") {
      updatedContent = { ...defaultContent, isCompleted: false };
    } else if (tab === "notes" || tab === "links") {
      if (subContent === "") {
        return;
      }
      if (tab === "notes") {
        updatedContent = { ...defaultContent, description: subContent };
      } else if (tab === "links") {
        updatedContent = { ...defaultContent, contentURL: subContent };
      }
    }

    setCategoryData((prevCategoryData) => {
      const newCategoryData = [...prevCategoryData];
      const currentCategory = newCategoryData.find(
        (category) => category.id === categoryID
      );

      if (currentCategory) {
        const currentSubCategory = currentCategory.subCategory.find(
          (subCat) => subCat.id === subCategoryID
        );

        if (currentSubCategory) {
          // Updating the new todo after the unchecked todos and then the checked values.
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
            currentSubCategory[tab] = [
              ...currentSubCategory[tab],
              updatedContent,
            ];
          }
        }
      }

      return newCategoryData;
    });

    setMainContent("");
    setSubContent("");
  }, [
    mainContent,
    subContent,
    tab,
    categoryID,
    subCategoryID,
    setCategoryData,
  ]);

  // deleteTodoId
  useEffect(() => {
    if (deleteTodoId) {
      setCategoryData((prevCategoryData) => {
        const newCategoryData = prevCategoryData.map((category) => {
          if (category.id === categoryID) {
            const newSubCategory = category.subCategory.map((subCat) => {
              if (subCat.id === subCategoryID) {
                subCat.todos = subCat.todos.filter(
                  (tempTodo) => tempTodo.id !== deleteTodoId
                );
              }
              return subCat;
            });

            return { ...category, subCategory: newSubCategory };
          }
          return category;
        });

        return newCategoryData;
      });
      setDeleteTodoId(null);
    }
  }, [deleteTodoId, categoryID, subCategoryID, setCategoryData]);

  // deleteNoteId
  useEffect(() => {
    if (deleteNoteId) {
      setCategoryData((prevCategoryData) => {
        const newCategoryData = prevCategoryData.map((category) => {
          if (category.id === categoryID) {
            const newSubCategory = category.subCategory.map((subCat) => {
              if (subCat.id === subCategoryID) {
                subCat.notes = subCat.notes.filter(
                  (tempNote) => tempNote.id !== deleteNoteId
                );
              }
              return subCat;
            });
            return { ...category, subCategory: newSubCategory };
          }
          return category;
        });

        return newCategoryData;
      });
    }
  }, [deleteNoteId, categoryID, subCategoryID, setCategoryData]);

  // deleteLinkId
  useEffect(() => {
    if (deleteLinkId) {
      setCategoryData((prevCategoryData) => {
        const newCategoryData = prevCategoryData.map((category) => {
          if (category.id === categoryID) {
            const newSubCategory = category.subCategory.map((subCat) => {
              if (subCat.id === subCategoryID) {
                subCat.links = subCat.links.filter(
                  (tempLink) => tempLink.id !== deleteLinkId
                );
              }
              return subCat;
            });
            return { ...category, subCategory: newSubCategory };
          }
          return category;
        });

        return newCategoryData;
      });
    }
  }, [deleteLinkId, categoryID, subCategoryID, setCategoryData]);

  // checkedTodoId
  useEffect(() => {
    if (checkedTodoId) {
      setCategoryData((prevCategoryData) => {
        const newCategoryData = prevCategoryData.map((category) => {
          if (category.id === categoryID) {
            const newSubCategory = category.subCategory.map((subCat) => {
              if (subCat.id === subCategoryID) {
                const newTodos = subCat.todos.map((tempTodo) => {
                  if (tempTodo.id === checkedTodoId) {
                    tempTodo.isCompleted = !tempTodo.isCompleted;
                  }
                  return tempTodo;
                });
                return { ...subCat, todos: newTodos };
              }
              return subCat;
            });

            return { ...category, subCategory: newSubCategory };
          }
          return category;
        });

        return newCategoryData;
      });
      setcheckedTodoId(null);
    }
  }, [checkedTodoId, categoryData, categoryID, subCategoryID, setCategoryData]);

  // sorting the checked items
  useEffect(() => {
    if (checkedTodoId) {
      setCategoryData((prevCategoryData) => {
        const newCategoryData = prevCategoryData.map((category) => {
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
      });
    }
  }, [checkedTodoId, categoryID, subCategoryID, setCategoryData]);

  const memoizedDisplaySubCategory = useMemo(
    () => displaySubCategory,
    [displaySubCategory]
  );

  return (
    <Box sx={boxStyle}>
      <header style={divStyle}>
        {dataExist && memoizedDisplaySubCategory ? (
          <span style={headingSpanStyle}>
            {memoizedDisplaySubCategory.title}
          </span>
        ) : (
          <span></span>
        )}

        {dataExist && currentCategoryTitle ? (
          <span>{currentCategoryTitle}</span>
        ) : (
          <span></span>
        )}
      </header>

      <Tabs value={tab} onChange={(event, value) => setTab(value)}>
        <Tab value="todos" label="Todos" sx={tabHeadingStyle} />
        <Tab value="notes" label="Notes" sx={tabHeadingStyle} />
        <Tab value="links" label="Links" sx={tabHeadingStyle} />
      </Tabs>

      <main style={mainStyle}>
        <section style={{ overflow: "auto" }}>
          {dataExist && tab === "todos" && memoizedDisplaySubCategory[tab] ? (
            <div style={todoDivStyle}>
              {memoizedDisplaySubCategory[tab].map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  setDeleteTodoId={setDeleteTodoId}
                  setcheckedTodoId={setcheckedTodoId}
                />
              ))}
            </div>
          ) : null}

          {dataExist && tab === "notes" && memoizedDisplaySubCategory[tab] ? (
            <div style={notesDivStyle}>
              {memoizedDisplaySubCategory[tab].map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  setDeleteNoteId={setDeleteNoteId}
                />
              ))}
            </div>
          ) : null}

          {dataExist && tab === "links" && memoizedDisplaySubCategory[tab] ? (
            <div style={linksDivStyle}>
              {memoizedDisplaySubCategory[tab].map((link) => (
                <Link
                  key={link.id}
                  link={link}
                  setDeleteLinkId={setDeleteLinkId}
                />
              ))}
            </div>
          ) : null}
        </section>

        <footer style={footerStyle}>
          {dataExist && tab === "todos" && (
            <input
              placeholder="Add new Todo"
              style={todoFooter}
              value={mainContent}
              onChange={(e) => setMainContent(e.target.value)}
            />
          )}

          {dataExist && tab === "notes" && (
            <div style={notesLinksFooter}>
              <input
                placeholder="Add note title"
                style={inputFooter}
                value={mainContent}
                onChange={(e) => setMainContent(e.target.value)}
              />
              <textarea
                placeholder="Add note content"
                style={noteTextAreaFooter}
                value={subContent}
                onChange={(e) => setSubContent(e.target.value)}
              />
            </div>
          )}

          {dataExist && tab === "links" && (
            <div style={notesLinksFooter}>
              <input
                placeholder="Enter link title"
                style={inputFooter}
                value={mainContent}
                onChange={(e) => setMainContent(e.target.value)}
              />
              <input
                placeholder="Enter link. Eg: www.example.com"
                style={inputFooter}
                type="url"
                value={subContent}
                onChange={(e) => setSubContent(e.target.value)}
              />
            </div>
          )}

          {dataExist && (
            <Button
              variant="contained"
              style={createButton(12, "17px", "50px", "skyblue")}
              onClick={handleAddEvent}
            >
              <FaPlus style={{ color: "blue" }} />
            </Button>
          )}
        </footer>
      </main>
    </Box>
  );
};

const notesLinksFooter = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const headingSpanStyle = { fontSize: "30px", fontWeight: 600 };

const boxStyle = { width: "100%", height: "100%" };

const footerStyle = {
  display: "flex",
  gap: "6px",
  margin: "2vh 1vw",
};

const todoDivStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  paddingTop: "5px",
};

const linksDivStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  paddingTop: "5px",
};

const notesDivStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "10px",
};

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "78.7%",
  flexGrow: 1,
};

const todoFooter = {
  width: "50vw",
  borderRadius: "7px",
  borderColor: "lightgrey",
  outline: "none",
  fontSize: "15px",
  fontFamily: "Poppins",
};

const noteTextAreaFooter = {
  minWidth: "40vw",
  maxWidth: "45vw",
  minHeight: "10vh",
  maxHeight: "15vh",
  borderRadius: "7px",
  borderColor: "lightgrey",
  outline: "none",
  fontSize: "13px",
  fontFamily: "Poppins",
};

const inputFooter = {
  width: "30vw",
  borderRadius: "7px",
  borderColor: "lightgrey",
  outline: "none",
  fontSize: "15px",
  fontFamily: "Poppins",
};

const divStyle = {
  height: "80px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  fontFamily: "Poppins",
  paddingLeft: "12px",
};

const tabHeadingStyle = { fontSize: "16px", fontWeight: 600 };
