import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { CategoryContext } from "../pages/Home.jsx";
import { createButton } from "../styling.js";
import { Box, Button, Tabs, Tab } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { Todo } from "./sub-components/Todo.jsx";
import { Note } from "./sub-components/Note.jsx";
import { Link } from "./sub-components/Link.jsx";
import { NoContent } from "./sub-components/NoContent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/slice/ProfileSlice.js";
import {
  addContentBasedOnTab,
  checkTodo,
  deleteLink,
  deleteNote,
  deleteTodo,
  sortTodo,
  updateLocalState,
} from "../redux/slice/CategorySlice.js";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { DeleteModel } from "./sub-components/DeleteModel.js";

export const MainContent = () => {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.category);
  const userProfile = useSelector((state) => state.profile);
  const navigate = useNavigate();
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

  // Sets the title and the subCategory data
  useEffect(() => {
    // console.log(categoryID, subCategoryID);
    if (categoryID && subCategoryID) {
      const currentCat = categoryData.find(
        (category) => category.id === categoryID
      );
      if (currentCat) {
        const currentSubCat = currentCat.subCategory.find(
          (subCat) => subCat.id === subCategoryID
        );
        if (currentSubCat) {
          setCurrentCategoryTitle(currentCat.title);
          setDisplaySubCategory(currentSubCat);
        }
      }
    }
  }, [categoryID, subCategoryID, categoryData]);

  // Re-renders if the category or sub-category got deleted.
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

  // Add the content based on the tab selected
  const handleAddEvent = useCallback(() => {
    dispatch(
      addContentBasedOnTab({
        mainContent,
        tab,
        subContent,
        categoryID,
        subCategoryID,
      })
    );
    dispatch(updateLocalState());

    setMainContent("");
    setSubContent("");
  }, [mainContent, subContent, tab, categoryID, subCategoryID]);

  // deleteTodoId
  useEffect(() => {
    if (deleteTodoId) {
      dispatch(deleteTodo({ subCategoryID, categoryID, deleteTodoId }));
      dispatch(updateLocalState());
      setDeleteTodoId(null);
    }
  }, [deleteTodoId, categoryID, subCategoryID]);

  // deleteNoteId
  useEffect(() => {
    if (deleteNoteId) {
      dispatch(deleteNote({ subCategoryID, categoryID, deleteNoteId }));
      dispatch(updateLocalState());
      setDeleteNoteId(null);
    }
  }, [deleteNoteId, categoryID, subCategoryID]);

  // deleteLinkId
  useEffect(() => {
    if (deleteLinkId) {
      dispatch(deleteLink({ subCategoryID, categoryID, deleteLinkId }));
      dispatch(updateLocalState());
      setDeleteLinkId(null);
    }
  }, [deleteLinkId, categoryID, subCategoryID]);

  // checkedTodoId
  useEffect(() => {
    if (checkedTodoId) {
      dispatch(checkTodo({ subCategoryID, categoryID, checkedTodoId }));
      dispatch(updateLocalState());
      setcheckedTodoId(null);
    }
  }, [checkedTodoId, categoryID, subCategoryID]);

  // sorting the checked items
  useEffect(() => {
    if (checkedTodoId) {
      dispatch(sortTodo({ subCategoryID, categoryID }));
      dispatch(updateLocalState());
      setcheckedTodoId(null);
    }
  }, [checkedTodoId, categoryID, subCategoryID]);

  /* This memoize the subCategory which to be displayed and this will re-calculate only when the subCategory is changed */
  const memoizedDisplaySubCategory = useMemo(
    () => displaySubCategory,
    [displaySubCategory]
  );

  const logOut = useCallback(() => {
    googleLogout();
    dispatch(setProfile(null));
    navigate("/");
  }, [userProfile]);

  const triggerLogout = useCallback(() => {
    DeleteModel(
      `Your request is to logout from ${userProfile.email}, Can I proceed on it?`,
      "",
      logOut
    );
  }, [userProfile]);

  const capitalizeUserName = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div style={boxStyle}>
      {userProfile && (
        <Box sx={boxStyle}>
          {/* Headers - Title */}
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={divStyle}>
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
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "fit-content",
                gap: "10px",
              }}
            >
              <img
                src={userProfile.picture}
                alt="user image"
                className="profileImg"
                style={{
                  width: "25%",
                  height: "fit-content",
                  borderRadius: "50%",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{}}>
                  {capitalizeUserName(userProfile.given_name)}
                </span>
                <button onClick={triggerLogout}>Log out</button>
              </div>
            </div>
          </header>

          {/* Tob view */}
          <Tabs value={tab} onChange={(event, value) => setTab(value)}>
            <Tab value="todos" label="Todos" sx={tabHeadingStyle} />
            <Tab value="notes" label="Notes" sx={tabHeadingStyle} />
            <Tab value="links" label="Links" sx={tabHeadingStyle} />
          </Tabs>

          <main style={mainStyle}>
            <section style={{ overflow: "auto" }}>
              {/* Renders no content */}
              {!dataExist && <NoContent />}

              {/* Renders todos data */}
              {dataExist &&
              tab === "todos" &&
              memoizedDisplaySubCategory[tab] ? (
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

              {/* Renders notes data */}
              {dataExist &&
              tab === "notes" &&
              memoizedDisplaySubCategory[tab] ? (
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

              {/* Renders links data */}
              {dataExist &&
              tab === "links" &&
              memoizedDisplaySubCategory[tab] ? (
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
          </main>

          <footer style={footerStyle}>
            {/* Input for todos */}
            {dataExist && tab === "todos" && (
              <input
                placeholder="Add new Todo"
                style={todoFooter}
                value={mainContent}
                onChange={(e) => setMainContent(e.target.value)}
              />
            )}

            {/* Input for notes */}
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

            {/* Input for links */}
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

            {/* Buttons */}
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
        </Box>
      )}
    </div>
  );
};

/** Stylings */

const notesLinksFooter = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const headingSpanStyle = { fontSize: "30px", fontWeight: 600 };

const boxStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

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
  paddingRight: "40px",
};

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  flexGrow: 1,
  overflowY: "auto",
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
