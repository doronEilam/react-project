import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Toolbar from "./components/AppToolbar";
import AppBottomNavigation from "./components/AppBottomNavigation";
import { Container } from "@mui/material";
import Register from "./pages/Register/Register";
import LogIn from "./pages/LogIn";
import CreatCard from "./pages/CreatCard";
import Favorite from "./pages/Favorite";
import MyCards from "./pages/MyCards";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { SearchProvider } from "./contexts/SearchContext";

function App() {
  return (
    <ThemeContextProvider>
      <SearchProvider>
        <div
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Toolbar />
          <Container sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/LogIn" element={<LogIn />} />
              <Route path="/CreatCard" element={<CreatCard />} />
              <Route path="/Favorite" element={<Favorite />} />
              <Route path="/MyCards" element={<MyCards />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
          <AppBottomNavigation />
        </div>
      </SearchProvider>
    </ThemeContextProvider>
  );
}

export default App;
