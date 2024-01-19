import React, { useCallback, useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import { FaCheck } from "react-icons/fa6";
import { createButton } from "../styling.js";
import { Category } from "./Category.jsx";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, updateLocalState } from "../redux/slice/CategorySlice.js";

export const SideNav = () => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category);

  const addCategoryData = useCallback(() => {
    if (categoryName) {
      dispatch(addCategory({ categoryName }));
      dispatch(updateLocalState());
      setCategoryName("");
    }
  }, [categoryName, categoryList]);

  return (
    <Box sx={mainStyle}>
      {
        <div style={divStyle}>
          {categoryList.length > 0 ? (
            <div>
              {categoryList.map((category) => (
                <Category
                  key={category.id}
                  category={category}
                  categoryId={category.id}
                />
              ))}
            </div>
          ) : (
            <div style={noCategoryStyle}>No Available Category</div>
          )}
        </div>
      }

      <Box style={sectionFooterStyle}>
        <input
          placeholder="Create new category"
          style={sectionInputStyle}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button
          variant="contained"
          style={createButton(12, "17px", "50px", "lightgreen")}
          onClick={addCategoryData}
        >
          <FaCheck style={{ color: "green" }} />
        </Button>
      </Box>
    </Box>
  );
};

const noCategoryStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const sectionFooterStyle = {
  display: "flex",
  gap: "6px",
  height: "36px",
  margin: "2vh 1vw",
};

const sectionInputStyle = {
  borderRadius: "8px",
  borderColor: "lightgrey",
  outline: "none",
  fontSize: "15px",
  width: "19vw",
  fontFamily: "Poppins",
};

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
};

const divStyle = {
  marginTop: "50px",
  overflow: "auto",
  width: "100%",
};
