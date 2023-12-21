import React, { useState, createContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { SideNav } from "./SideNav";
import { MainContent } from "./MainContent";

export const CategoryContext = createContext();

export const FileContainer = () => {
  const categoryData = useState([
    {
      id: Date.now() + 1,
      title: "Personal",
      subCategory: [
        { id: "1", title: "Shopping" },
        { id: "2", title: "Health" },
        { id: "3", title: "Entertainment" },
      ],
    },
    {
      id: Date.now(),
      title: "Learning",
      subCategory: [
        { id: "1", title: "Data Structures" },
        { id: "2", title: "React" },
        { id: "3", title: "Docket" },
      ],
    },
  ]);

  return (
    <CategoryContext.Provider value={categoryData}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          columnSpacing={{ sm: 0.5, md: 0.5, lg: 0.5, xl: 2 }}
          columns={12}
        >
          <Grid item xs={3} md={3} sx={{ ...gridStyle }}>
            <SideNav />
          </Grid>
          <Grid item xs={9} md={9} sx={{ ...gridStyle }}>
            <MainContent />
          </Grid>
        </Grid>
      </Box>
    </CategoryContext.Provider>
  );
};

const gridStyle = {
  border: 1,
  borderRadius: 0.5,
  borderColor: "lightgrey",
  height: "100vh",
};
