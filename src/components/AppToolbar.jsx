import * as React from "react";
import { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
} from "@mui/material";
import { DarkMode, LightMode, Search, Logout } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { ColorModeContext } from "../contexts/ThemeContext";
import { useSearch } from "../contexts/SearchContext";

export default function AppToolbar() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  React.useEffect(() => {
    // Initial user check
    const userData = authService.getUser();
    setUser(userData);

    // Listen to storage changes
    const handleStorageChange = () => {
      const updatedUser = authService.getUser();
      setUser(updatedUser);
    };

    // Listen to custom event for immediate updates
    window.addEventListener("auth-change", handleStorageChange);

    // Listen to localStorage changes (for cross-tab synchronization)
    window.addEventListener("storage", (e) => {
      if (e.key === "token" || e.key === "user") {
        handleStorageChange();
      }
    });

    return () => {
      window.removeEventListener("auth-change", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    handleClose();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h4"
                component="div"
                sx={{ flexGrow: 1, fontWeight: "bold", mr: 2 }}
              >
                BCard
              </Typography>
            </Link>

            <Link
              to="/about"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">ABOUT</Button>
            </Link>

            {user && (
              <>
                <Link
                  to="/favorite"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button color="inherit">FAV CARDS</Button>
                </Link>

                {user.isBusiness && (
                  <>
                    <Link
                      to="/creatcard"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <Button color="inherit">CREATE CARD</Button>
                    </Link>
                    <Link
                      to="/mycards"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <Button color="inherit">MY CARDS</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <TextField
              size="small"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgb(228,242,253)",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === "dark" ? (
                <LightMode sx={{ color: "rgba(255,255,255,0.7)" }} />
              ) : (
                <DarkMode sx={{ color: "rgba(255,255,255,0.7)" }} />
              )}
            </IconButton>

            {user ? (
              <>
                <IconButton onClick={handleMenu} color="inherit">
                  <Avatar
                    sx={{ width: 32, height: 32, bgcolor: "primary.dark" }}
                  >
                    {user.name?.first?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem disabled>
                    <Typography variant="body2">
                      {user.name?.first} {user.name?.last}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout fontSize="small" sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  component={Link}
                  to="/register"
                  color="inherit"
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  SIGNUP
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  LOGIN
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
