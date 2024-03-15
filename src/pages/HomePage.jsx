import React, { useState, createContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { SideNav } from "../components/SideNav";
import { MainContent } from "../components/MainContent";
import { setDefaultState } from "../redux/slice/CategorySlice";
import { useDispatch } from "react-redux";

export const CategoryContext = createContext();

export const FileContainer = () => {
  const activeCategory = useState([null, null]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDefaultState());
  }, []);

  return (
    <CategoryContext.Provider value={activeCategory}>
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
