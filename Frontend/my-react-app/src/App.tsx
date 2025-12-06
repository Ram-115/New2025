import './index.css'
import { ToastContainer } from 'react-toastify';
  import RoutesComponent from './Routes.tsx'
import { createTheme, ThemeProvider } from '@mui/material';
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0b4938",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#0b4938",
        contrastText: "#ffffff",
      },
      background: {
        default: "#f0f0f0",
      },
      text: {
        primary: "#000000",
        secondary: "#0b4938",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <RoutesComponent />
    </ThemeProvider>
  );
}

export default App;
