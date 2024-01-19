import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { SubCategory } from "./SubCategory";
import { DeleteModel } from "./sub-components/DeleteModel";
import { useDispatch } from "react-redux";
import {
  addSubCategory,
  deleteCategory,
  updateLocalState,
} from "../redux/slice/CategorySlice";

export const Category = ({ category, categoryId }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [inputSyle, setInputStyle] = useState(disabledInputStyle);
  const [subCategoryName, setSubCategoryName] = useState("");

  const handleInput = useCallback(() => {
    setDisabled((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (!disabled) {
      inputRef.current.focus();
      setInputStyle(enabledInputField);
    } else {
      setInputStyle(disabledInputStyle);
    }
  }, [disabled]);

  useEffect(() => {}, [subCategoryName]);

  const onKeyDownEvent = useCallback(
    (event) => {
      if (event.key === "Enter") {
        dispatch(addSubCategory({ subCategoryName, categoryId }));
        dispatch(updateLocalState());
        setSubCategoryName("");
      }
    },
    [subCategoryName]
  );

  const handleDeleteCategory = useCallback(() => {
    dispatch(deleteCategory({ id: category.id }));
    dispatch(updateLocalState());
  }, []);

  const triggerDeleteModel = useCallback(() => {
    DeleteModel(
      "Do you want to delete these category?",
      "Please be aware that all the sub-categories will also be deleted!!",
      handleDeleteCategory
    );
  }, []);

  return (
    <Box sx={boxStyle}>
      <div style={titleDivStyle}>
        <span style={spanStyle}>{category.title}</span>
        <MdDelete
          style={deleteIconStyle}
          onClick={triggerDeleteModel}
          value={category.title}
        />
      </div>
      <div style={{ margin: "0px 15px 5px 30px" }}>
        {category?.subCategory?.map((subCategory) => (
          <SubCategory
            key={subCategory.id}
            categoryID={category.id}
            subCategory={subCategory}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <GrAdd onClick={handleInput} style={iconStyle} />
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

const spanStyle = {
  fontSize: "22px",
  fontWeight: "600",
  fontFamily: "Poppins",
};

const iconStyle = {
  border: "1px solid lightgrey",
  backgroundColor: "lightgrey",
  padding: "4px",
  fontSize: "13px",
  borderRadius: "5px",
  cursor: "pointer",
};

const boxStyle = {
  fontFamily: "Poppins",
  margin: "5% 5%",
  padding: "5px 15px 10px 10px",
};

const titleDivStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  width: "80%",
};

const deleteIconStyle = {
  fontSize: "25px",
  color: "Tomato",
  cursor: "pointer",
};

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
  borderRadius: "5px",
};
