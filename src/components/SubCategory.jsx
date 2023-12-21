import React, { useContext } from "react";
import { FaCircleMinus } from "react-icons/fa6";
import { CategoryContext } from "./FileContainer";

export const SubCategory = ({ subCategory, categoryID }) => {
  const [categoryData, setCategoryData] = useContext(CategoryContext);

  const handleDeleteSubCategory = () => {
    const currentCategoryData = categoryData.filter(
      (tempCatogery) => tempCatogery.id === categoryID
    );

    const updatedSubCategory = currentCategoryData[0].subCategory.filter(
      (tempSubCategory) => tempSubCategory.id !== subCategory.id
    );

    const updatedCategory = [];
    categoryData.forEach((element) => {
      if (currentCategoryData[0].id === element.id) {
        const obj = {
          ...element,
          subCategory: updatedSubCategory,
        };
        updatedCategory.push(obj);
      } else {
        updatedCategory.push(element);
      }
    });
    setCategoryData(updatedCategory);
  };
  return (
    <div style={{ ...divStyle }}>
      <span style={{ ...spanStyle }}>{subCategory.title}</span>
      <FaCircleMinus
        style={{ ...iconStyle }}
        onClick={handleDeleteSubCategory}
      />
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
  fontSize: "22px",
  cursor: "pointer",
  color: "red",
  backgroundcolor: "red",
};

/**
 * const iconStyle = {
  fontSize: "22px",
  cursor: "pointer",
  color: "#FF6347",
  backgroundcolor: "#FF6347",
};
 */
