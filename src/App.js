import { useEffect, useState } from "react";
import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { setProfile } from "./redux/slice/ProfileSlice.js";
import { useDispatch } from "react-redux";

const USER_INFO_API = process.env.REACT_APP_USERINFO_API;

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      console.log("user = ", user);
      axios
        .get(`${USER_INFO_API}?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          console.log("🚀 ~ .then ~ res:", res);
          localStorage.setItem("currentProfile", JSON.stringify(res.data));
          dispatch(setProfile(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
