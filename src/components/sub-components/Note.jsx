import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { createButton } from "../../styling.js";
import { ImCross } from "react-icons/im";
import { DeleteModel } from "./DeleteModel.js";

export const Note = ({ note, setDeleteNoteId }) => {
  const deleteNote = useCallback(() => {
    setDeleteNoteId(note.id);
  }, [note.id]);

  const triggerDeleteNote = useCallback(() => {
    DeleteModel(
      "Are you sure to delete note?",
      `${note.title}`,
      deleteNote
    );
  }, [note.id]);

  return (
    <div style={divStyle}>
      <div style={innerDivStyle}>
        <span style={{ fontWeight: 700 }}>{note.title}</span>
        <Button variant="contained" style={buttonStyle} onClick={triggerDeleteNote}>
          <ImCross style={{ color: "red" }} />
        </Button>
      </div>
      <span style={{textWrap: "wrap"}}>{note.description}</span>
    </div>
  );
};

const buttonStyle = {
  ...createButton(9, "10px", "25px", "NavajoWhite"),
  height: "10px",
};

const innerDivStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: 700,
};

const divStyle = {
  height: "fit-content",
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  border: "1px solid",
  margin: "10px",
  padding: "10px",
  borderRadius: "8px",
  borderColor: "lightgray",
  gap: "10px",
  backgroundColor: "MintCream",
};
