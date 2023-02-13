import { SxProps } from "@mui/system";


export const sideBarStyle: SxProps = {

  "& .sidebar-menu": {
    fontFamily: "solaimanlipi",
    height: "100vh",
    overflowY: "scroll",
  },

  // scroll bar
  ".sidebar-menu::-webkit-scrollbar": {
    width: "0px",
  },

  // "& .sidebarLogoStyle": {
  //   minHeight: "150px",
  //   maxHeight: "64px",
  //   alignItems: "center",
  //   display: "flex",
  //   fontWeight: 900,
  //   fontSize: "2rem",
  //   paddingLeft: "1rem",
  // },
  // "& .closeButtonWrapper": {
  //   display: "flex",
  //   justifyContent: "flex-end",
  //   padding: "10px",
  // },

  "& .closeButton": {
    cursor: "pointer",
    position: "absolute",
    right: 0,
    top: 0,
  },
  "& .closeButton svg": {
    color: "#fff",
    fontSize: "30px"
  },
  "& .iflogo": {
    display: "grid",
    justifyItems: "center",
    alignContent: "center",
  },

  "& .mosqueTitle": {
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "solaimanlipi",
    fontSize: "16px"
  },

  "@media (max-width: 1366px)": {
    "& .sidebar-menu": {
      fontFamily: "solaimanlipi",
      height: "78vh",
      overflowY: "scroll",
    },
  },
  "@media (max-width: 375px)": {

    "& .iflogo": {
      margin: "20px",
    },
    ".closeButton svg": {
      color: "#fff",
      fontSize: "30px",
      background: "#18463b",
      borderRadius: "2px 2px 2px 8px",
    }

  },


};