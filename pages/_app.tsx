import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { blueGrey, grey, pink } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HotNotificationProvider } from "context/HotNotificationProvider";
import DayJsInstance from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "Store";
import "style/globalStyle.css";
const WithAuth = dynamic(() => import("components/layouts/WithAuth"));
DayJsInstance.extend(advancedFormat);

const emotionCache = createCache({ key: "css", prepend: true });

type ComponentWithLayoutProps = AppProps & {
  Component: AppProps["Component"] & {
    PageLayouts?: React.ComponentType;
  };
};

const MyApp = ({ Component, pageProps }: ComponentWithLayoutProps) => {
  const [showMore, setShowMore] = useState(false)
  const Layout = Component.PageLayouts || WithAuth;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMore(true)
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#198F51",
        light: "#198F51",
        contrastText: "#FFF",
      },
      secondary: {
        main: blueGrey["A200"],
      },
      warning: {
        main: pink[900],
      },
      action: {
        hover: grey[200]
      }
    },

  });

  return (
    <CacheProvider value={emotionCache}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateLibInstance={DayJsInstance}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            {showMore && <Layout>
              <HotNotificationProvider>
                <SnackbarProvider>
                  <Component {...pageProps} />
                </SnackbarProvider>
              </HotNotificationProvider>

            </Layout>}

          </Provider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default MyApp;
