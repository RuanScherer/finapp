import { Box, ChakraProvider } from "@chakra-ui/react";
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { Router } from "./router";
import { theme } from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" minW="100vw" h="full" w="full" bg="background.200">
        <Router />
      </Box>
    </ChakraProvider>
  );
}

export default App;
