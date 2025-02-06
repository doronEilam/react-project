import React, { useState, useEffect } from "react";
import { Favorite, Info, Person, Home } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  Paper,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../services/authService";

export default function AppBottomNavigation() {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = authService.getUser();
    setUser(userData);

    const handleAuthChange = () => {
      const updatedUser = authService.getUser();
      setUser(updatedUser);
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/favorite") setValue(1);
    else if (path === "/about") setValue(2);
    else if (path === "/mycards") setValue(3);
    else setValue(0);
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/favorite");
        break;
      case 2:
        navigate("/about");
        break;
      case 3:
        navigate("/mycards");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      elevation={3}
    >
      <CssBaseline />
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{ borderTop: 1, borderColor: "divider" }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />

        {user && (
          <BottomNavigationAction label="Favorites" icon={<Favorite />} />
        )}

        <BottomNavigationAction label="About" icon={<Info />} />

        {user?.isBusiness && (
          <BottomNavigationAction label="My Cards" icon={<Person />} />
        )}
      </BottomNavigation>
      <CssBaseline />
    </Paper>
  );
}
