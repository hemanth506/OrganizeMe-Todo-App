import React, { useCallback, useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import { FaCheck } from "react-icons/fa6";
import { createButton } from "../styling.js";
import { Category } from "./Category.jsx";
import { CategoryDataContext } from "./FileContainer";

export const SideNav = () => {
  const [categoryList, setCategoryList] = useContext(CategoryDataContext);
  localStorage.setItem("categoryData", JSON.stringify(categoryList));
  const [categoryName, setCategoryName] = useState("");

  const addCategory = useCallback(() => {
    if (categoryName) {
      setCategoryList([
        ...categoryList,
        { id: Date.now(), title: categoryName, subCategory: [] },
      ]);
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
                <Category key={category.id} category={category} />
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
          onClick={addCategory}
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
