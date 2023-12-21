import React, { useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import { FaCheck } from "react-icons/fa6";
import { createButton } from "./styling.js";
import { Category } from "./Category.jsx";
import { CategoryContext } from "./FileContainer";

export const SideNav = () => {
  const [categoryList, setCategoryList] = useContext(CategoryContext);
  const [categoryName, setCategoryName] = useState("");

  const addCategory = () => {
    if(categoryName) {
      setCategoryList([
        ...categoryList,
        { id: Date.now(), title: categoryName, subCategory: [] },
      ]);
      setCategoryName("");
    }
  };

  return (
    <Box sx={{ ...mainStyle }}>
      <div style={{ ...divStyle }}>
        {categoryList.map((category) => (
          <Category key={category.id} category={category}/>
        ))}
      </div>
      <Box style={{ ...sectionFooterStyle }}>
        <input
          placeholder="Create new category"
          style={{ ...sectionInputStyle }}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ ...createButton }}
          onClick={addCategory}
        >
          <FaCheck style={{ color: "green" }} />
        </Button>
      </Box>
    </Box>
  );
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
