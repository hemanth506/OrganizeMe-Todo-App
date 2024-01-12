import React, { useState, createContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { SideNav } from "./SideNav";
import { MainContent } from "./MainContent";

export const CategoryDataContext = createContext();
export const CategoryContext = createContext();

export const FileContainer = () => {
  const getDefaultData = JSON.parse(localStorage.getItem("categoryData")) || [];
  const categoryData = useState(getDefaultData);
  const activeCategory = useState([null, null]);

  return (
    <CategoryContext.Provider value={activeCategory}>
      <CategoryDataContext.Provider value={categoryData}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columnSpacing={gridColumnSpacing} columns={12}>
            <Grid item xs={3} md={3} sx={gridStyle}>
              <SideNav />
            </Grid>
            <Grid item xs={9} md={9} sx={gridStyle}>
              <MainContent />
            </Grid>
          </Grid>
        </Box>
      </CategoryDataContext.Provider>
    </CategoryContext.Provider>
  );
};

const gridColumnSpacing = { sm: 0.5, md: 0.5, lg: 0.5, xl: 2 };

const gridStyle = {
  borderLeft: 1,
  borderRadius: 0.5,
  borderColor: "lightgrey",
  height: "100vh",
};
