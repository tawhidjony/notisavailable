import { SxProps } from "@mui/system";

export const navItemStyle: SxProps = {
  "& .sidebar-menu": {},

  ".navItemSingleIcon p": {
    color: "green"
  },

  "& .navItemContent": {
    borderBottom: "2px solid #133b3f",
    borderRadius: "10px",
    color: "#fff",
    "span": {
      fontSize: "16px",
      fontWeight: "400",
      fontFamily: 'solaimanlipi',
    },
  },

  "& .navItemContent:hover": {
    color: "#1f5c4d",
    backgroundColor: "#c2dcd1",
    svg: {
      color: "#1f5c4d",
    },
  },

  ".dropdownItemIcon": {
    minWidth: "27px",
  },
  ".dropdownItemIcon svg": {
    color: "#b0bec5"
  },
  // "& .menuListA": {
  //   fontSize: "16px",
  //   fontWeight: "bold",
  //   color: "#fff",
  //   "& :hover": {
  //     color: "#1f5c4d"
  //   },
  //   "& span": {
  //     fontFamily: "solaimanlipi",
  //     fontSize: "16px",
  //     fontWeight: "400",
  //   },
  //   "& :Focus": {
  //     color: "#1f5c4d",
  //     fontWeight: "bold",
  //     backgroundColor: "#c2dcd1",
  //     borderRadius: "10px 0px 0px 10px",
  //     "& svg": {
  //       color: "#1f5c4d",
  //     },
  //   },
  // },
  // "& .menuSingleItem:hover": {
  //   color: "#1f5c4d",
  //   backgroundColor: "#c2dcd1",
  //   svg: {
  //     color: "#1f5c4d",
  //   },
  // },
  // "& .navAnchor": {
  //   // color:"#000",
  //   "& :hover": {
  //     color: "#1f5c4d",
  //     backgroundColor: "#c2dcd1",
  //   }
  // },
  // "& .subMenuItem": {
  //   color: "#fff",
  //   svg: {
  //     color: "#1f5c4d",
  //   },
  //   "& span": {
  //     fontSize: "16px",
  //     fontWeight: "400",
  //   },
  //   "& :Focus": {
  //     color: "#1f5c4d",
  //     backgroundColor: "#c2dcd1",
  //     borderRadius: "10px 0px 0px 10px",
  //     "& svg": {
  //       color: "#1f5c4d",
  //     },
  //   },
  // },


  // subdropdown
  ".subMenuDropdown": {
    marginLeft: "15px",
  },

  ".navItemSingleIcon svg": {
    color: "#b0bec5"
  },

  "& .subMenuDropdown a": {
    width: "100%",
    borderRadius: "15px 0px 0px 15px",
    "& p": {
      fontSize: "16px",
    }
  },
  "& .subMenuDropdown a:hover": {
    backgroundColor: "#c2dcd1",
    color: "#1f5c4d",
    "& svg": {
      color: "#1f5c4d"
    }
  },

  ".navItemSingleIcon": {
    minWidth: "27px",
    padding: "8px",
  },
}