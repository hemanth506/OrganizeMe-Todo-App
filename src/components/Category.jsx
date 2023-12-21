import React, { useState, useRef, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { SubCategory } from "./SubCategory";
import { CategoryContext } from "./FileContainer";

const BORDER_RADIUS = "5px";

export const Category = ({ category }) => {
  const [categoryData, setCategoryData] = useContext(CategoryContext);
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [inputSyle, setInputStyle] = useState(disabledInputStyle);
  const [subCategoryName, setSubCategoryName] = useState("");

  const handleInput = () => {
    setDisabled((prevState) => !prevState);
  };

  useEffect(() => {
    if (disabled === false) {
      inputRef.current.focus();
      setInputStyle(enabledInputField);
    } else {
      setInputStyle(disabledInputStyle);
    }
  }, [disabled]);

  const onKeyDownEvent = (event) => {
    if (event.key === "Enter") {
      const subObj = { id: Date.now().toString(), title: subCategoryName };
      category.subCategory = [...category.subCategory, subObj];
      setSubCategoryName("");
    }
  };

  const handleDeleteCategory = () => {
    const updatedCategoryData = categoryData.filter(
      (tempCatogery) => tempCatogery.id !== category.id
    );
    setCategoryData(updatedCategoryData);
  };

  return (
    <Box sx={{ ...boxStyle }}>
      <div style={{ ...titleDivStyle }}>
        <span
          style={{ fontSize: "22px", fontWeight: "600", fontFamily: "Poppins" }}
        >
          {category.title}
        </span>
        <MdDelete
          style={{ ...deleteIconStyle }}
          onClick={handleDeleteCategory}
          value={category.title}
        />
      </div>
      <div style={{ margin: "0px 15px 5px 30px" }}>
        {category.subCategory.map((subCategory) => (
          <SubCategory key={subCategory.id} categoryID={category.id} subCategory={subCategory} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <GrAdd onClick={handleInput} style={{ ...iconStyle }} />
        <input
          ref={inputRef}
          placeholder="Create sub category"
          disabled={disabled}
          style={inputSyle}
          onChange={(e) => setSubCategoryName(e.target.value)}
          value={subCategoryName}
          onKeyDown={onKeyDownEvent}
        />
      </div>
    </Box>
  );
};

const iconStyle = {
  border: "1px solid lightgrey",
  backgroundColor: "lightgrey",
  padding: "4px",
  fontSize: "13px",
  borderRadius: BORDER_RADIUS,
  cursor: "pointer",
};

const boxStyle = {
  fontFamily: "Poppins",
  margin: "5% 5%",
  // border: "1px solid lightgrey",
  padding: "5px 15px 10px 10px",
  // borderRadius: BORDER_RADIUS,
};

const titleDivStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  width: "80%",
};

const deleteIconStyle = { fontSize: "25px", color: "red", cursor: "pointer" };

const disabledInputStyle = {
  outline: "none",
  border: "none",
  backgroundColor: "white",
  fontFamily: "Poppins",
  fontSize: "14px",
  width: "100%",
};

const enabledInputField = {
  outline: "none",
  backgroundColor: "white",
  fontFamily: "Poppins",
  width: "100%",
  fontSize: "14px",
  borderColor: "lightgray",
  borderRadius: BORDER_RADIUS,
};
