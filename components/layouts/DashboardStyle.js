import { makeStyles } from "@material-ui/core";

const drawerWidth = 280;
const dashboardStyle = makeStyles((theme) => ({
  menuButton: {
    root: {
      display: "flex",
    },
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },

  AppBar: {
    background: "url('/assets/headerBg.jpg')",
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  headTitle: {
    fontFamily: "solaimanlipi",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "25px",
  },
  langUl: {
    listStyle: "none",
    display: "flex",
    marginRight: "20px",
    backgroundColor: "#1F5C4D",
    color: "white",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    border: "1px solid #fff",
    padding: "0px",
    "& .langLi": {
      cursor: "pointer",
      padding: "5px 15px",
      borderColor: "white",
    },
    "& .langBg": {
      backgroundColor: "white",
      color: "#1F5C4D",
      padding: "5px 20px",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      borderBottomLeftRadius: "20px",
      borderBottomRightRadius: "20px",
    },
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    // maxHeight: "calc(100vh - 104px)",
    height: "calc(100vh)",
    width: "100%",
    overflowY: "hidden",
    margin: "0",
    padding: "0",
  },

  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    "& ::-webkit-scrollbar": {
      display: "none",
    },
    textAlign: "center",
    color: "#fff",
  },
  ".mosqueTitle": {
    color: "#fff",
  },
  TemporaryDrawer: {
    "& ::-webkit-scrollbar": {
      display: "none",
    },
  },

  drawerPaper: {
    width: drawerWidth,
  },

  "@media (min-width: 0px) and (max-width: 375px)": {
    langUl: {
      marginRight: "5px",
    },
  },
  "@media (min-width: 600px) and (max-width: 1024px)": {
    headerWrapper: {
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },

  toolbar: theme.mixins.toolbar,
}));

export default dashboardStyle;
