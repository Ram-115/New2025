import './index.css'
import { ToastContainer } from 'react-toastify';
  import RoutesComponent from './Routes.tsx'
import { createTheme, ThemeProvider } from '@mui/material';
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        // main: "#0C5A96",
        main:'#0C5A96',
        contrastText: "#ffffff",
      },
      secondary: {
        // main: "#0C5A96",
      main:'#78B1EC',
        contrastText: "#ffffff",
      },
      background: {
        default: "#f0f0f0",
      },
      text: {
        primary: "#000000",
        secondary: "#0C5A96",
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
