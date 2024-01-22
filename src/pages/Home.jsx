import React, { useState, createContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { SideNav } from "../components/SideNav";
import { MainContent } from "../components/MainContent";
import { setDefaultState } from "../redux/slice/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CategoryContext = createContext();

export const Home = () => {
  const activeCategory = useState([null, null]);
  const userProfile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile === null) {
      // setTimeout(() => {
      // }, 2 * 1000);
      navigate("/");
    }
    dispatch(setDefaultState());
  }, [navigate, dispatch, userProfile]);

  useEffect(() => {}, [userProfile]);

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
