import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Level1 from "./components/Level1";
import Level2 from "./components/Level2";
import Level3 from "./components/Level3";
import Header from "./components/Header";
import { CssBaseline, Container, Box } from "@mui/material";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container>
        <Box mt={4}>
          <Routes>
            <Route path="/" element={<Level1 />} />
            <Route path="/level2" element={<Level2 />} />
            <Route path="/level3" element={<Level3 />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
