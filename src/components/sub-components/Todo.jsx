import React, { useState, useContext, useCallback, useEffect } from "react";
import { Checkbox, Button } from "@mui/material";
import { createButton } from "../styling.js";
import { ImCross } from "react-icons/im";

export const Todo = ({ todo, setDeleteTodoId }) => {
  const [isChecked, setIsChecked] = useState(todo.isCompleted);

  const handleCheckEvent = useCallback(() => {
    setIsChecked((prev) => !prev);
  }, []);

  const deleteTodo = useCallback(() => {
    setDeleteTodoId(todo.id);
  }, []);

  return (
    <div style={divStyle}>
      <Checkbox
        inputProps={{ "aria-label": "controlled" }}
        color="success"
        value={isChecked}
        onClick={handleCheckEvent}
      />
      <div
        style={{
          ...innerDiv,
          textDecoration: isChecked ? "line-through" : null,
        }}
      >
        <span>{todo.title}</span>
        <Button variant="contained" style={buttonStyle} onClick={deleteTodo}>
          <ImCross style={{ color: "red" }} />
        </Button>
      </div>
    </div>
  );
};

const buttonStyle = {
  ...createButton(9, "10px", "25px", "NavajoWhite"),
  height: "10px",
};

const innerDiv = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "0px 15px 0px 0px",
};

const divStyle = {
  border: "1px solid lightgrey",
  width: "70%",
  borderRadius: "8px",
  backgroundColor: "MintCream",
  margin: "3px 3px 3px 10px",
  display: "flex",
  alignItems: "center",
};