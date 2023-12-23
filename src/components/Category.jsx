import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { Box } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { SubCategory } from "./SubCategory";
import { CategoryDataContext } from "./FileContainer";

export const Category = ({ category }) => {
  const [categoryData, setCategoryData] = useContext(CategoryDataContext);
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
        const subObj = {
          id: Date.now().toString(),
          title: subCategoryName,
          todos: [],
          links: [],
          notes: [],
        };
        category.subCategory = [...category.subCategory, subObj];
        setSubCategoryName("");
      }
    },
    [subCategoryName]
  );

  const handleDeleteCategory = useCallback(() => {
    const updatedCategoryData = categoryData.filter(
      (tempCatogery) => tempCatogery.id !== category.id
    );
    setCategoryData(updatedCategoryData);
  }, [categoryData]);

  return (
    <Box sx={boxStyle}>
      <div style={titleDivStyle}>
        <span style={spanStyle}>{category.title}</span>
        <MdDelete
          style={deleteIconStyle}
          onClick={handleDeleteCategory}
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
