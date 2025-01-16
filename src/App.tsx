import Header from "./components/header";
import Content from "./components/content";
import Footer from "./components/footer";

import { CssBaseline, Box } from "@mui/material";

import { FruitApiContext } from "./contexts";
import { fruitApi } from "./contexts/fruit-api-context";

function App() {
  return (
    <>
      <CssBaseline />

      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <FruitApiContext.Provider value={fruitApi}>
          <Header />

          <Content />

          <Footer />
        </FruitApiContext.Provider>
      </Box>
    </>
  );
}

export default App;
