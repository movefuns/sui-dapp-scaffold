import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ColorModeContext } from './utils/context';
import { BrowserRouter } from "react-router-dom";
import { getLocalTheme, setLocalTheme } from "./utils/localHelper";
import { createTheme, ThemeProvider } from "@mui/material";
import './utils/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<Index />);

function Index() {
  const localTheme = getLocalTheme();
  const [mode, setMode] = React.useState<'light' | 'dark'>(localTheme && localTheme === 'light' ? 'light' : 'dark');
  const colorMode = React.useMemo(
      () => ({
          toggleColorMode: () => {
              setMode((prevMode) => {
                  const mode = prevMode === 'light' ? 'dark' : 'light';
                  setLocalTheme(mode);
                  return mode;
              });
          },
      }),
      [],
  );

  const theme = React.useMemo(
      () =>
          createTheme({
              palette: {
                  mode,
              },

          }),
      [mode],
  );

  return <React.StrictMode>
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                  <App />
            </ThemeProvider>
        </ColorModeContext.Provider>
    </React.StrictMode>
}

reportWebVitals();