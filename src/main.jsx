// main.jsx
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b', // cor principal
    },
    secondary: {
      main: '#f44336', // cor secundária
    },
    background: {
      default: '#f9f9f9'
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
