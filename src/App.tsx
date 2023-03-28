import { Box, ChakraProvider } from "@chakra-ui/react";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { queryClient } from "@services/queryClient";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Router } from "./router";
import { theme } from "./theme";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider theme={theme}>
        <Box minH="100vh" minW="100vw" h="full" w="full" bg="background.200">
          <Router />
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
