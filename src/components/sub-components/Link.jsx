import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { createButton } from "../styling.js";
import { ImCross } from "react-icons/im";

export const Link = ({ link, setDeleteLinkId }) => {
  const deleteLink = useCallback(() => {
    setDeleteLinkId(link.id);
  }, []);

  return (
    <div style={divStyle}>
      <a
        style={anchorStyle}
        href={"https://" + link.contentURL}
        target="_blank"
      >
        {link.title}
      </a>
      <Button variant="contained" style={buttonStyle} onClick={deleteLink}>
        <ImCross style={{ color: "red" }} />
      </Button>
    </div>
  );
};

const buttonStyle = {
  ...createButton(9, "10px", "25px", "NavajoWhite"),
  height: "10px",
};

const anchorStyle = { textDecoration: "none", color: "blue" };

const divStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid lightgrey",
  width: "50%",
  borderRadius: "8px",
  backgroundColor: "MintCream",
  margin: "3px 3px 3px 10px",
  padding: "5px 12px",
  display: "flex",
};
