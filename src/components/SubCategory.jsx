import React, { useCallback, useContext } from "react";
import { CategoryDataContext, CategoryContext } from "./FileContainer";
import { Button } from "@mui/material";
import { createButton } from "../styling";
import { ImCross } from "react-icons/im";

export const SubCategory = ({ subCategory, categoryID }) => {
  const [categoryData, setCategoryData] = useContext(CategoryDataContext);
  const [, setActiveCategory] = useContext(CategoryContext);

  const handleActiveCategory = useCallback(() => {
    setActiveCategory([categoryID, subCategory.id]);
  }, [categoryID, subCategory]);

  const handleDeleteSubCategory = useCallback((e) => {
    e.stopPropagation();
    const currentCategoryData = categoryData.filter(
      (tempCatogery) => tempCatogery.id === categoryID
    );

    if (currentCategoryData.length > 0) {
      const updatedSubCategory = currentCategoryData[0].subCategory.filter(
        (tempSubCategory) => tempSubCategory.id !== subCategory.id
      );

      const updatedCategory = [];
      categoryData.forEach((element) => {
        if (currentCategoryData[0].id === element.id) {
          updatedCategory.push({
            ...element,
            subCategory: updatedSubCategory,
          });
        } else {
          updatedCategory.push(element);
        }
      });

      setCategoryData(updatedCategory);
    }
  }, [categoryData, categoryID]);

  return (
    <div style={divStyle} onClick={handleActiveCategory}>
      <span style={spanStyle}>{subCategory.title}</span>
      <Button
        variant="contained"
        style={iconStyle}
        onClick={handleDeleteSubCategory}
      >
        <ImCross style={{ color: "white" }} />
      </Button>
    </div>
  );
};

const spanStyle = {
  fontWeight: "500",
  fontFamily: "Poppins",
  fontSize: "18px",
};

const divStyle = {
  margin: "13px 0px 13px 0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
};

const iconStyle = {
  ...createButton(9, "8px", "25px", "OrangeRed"),
  height: "10px",
}
