import { SxProps } from "@mui/system";


export const HeadStyle: SxProps = {
  "& .langUl": {
    listStyle: "none",
    display: "flex",
    backgroundColor: "#1F5C4D",
    color: "white",
    marginRight: "10px",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    border: "1px solid #fff",
    padding: "0px",
    "& .langLi": {
      cursor: "pointer",
      padding: "5px 10px",
      borderColor: "white",

    },
    "& .langBg": {
      backgroundColor: "white",
      color: "#1F5C4D",
      padding: "5px 10px",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      borderBottomLeftRadius: "20px",
      borderBottomRightRadius: "20px",
    }
  },
  ".bnEnBtn": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& header": {
    position: "absolute",
    overflow: "hidden",
    backdropFilter: "none",
  },
  "& .dashboardBg": {
    backgroundImage: "url(/assets/headerBg.jpg)",
    width: "calc(100% - 16.5%)",
    position: "fixed",
    top: 0,
  },
  "& .headerField": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ".headTitle": {
    fontFamily: "solaimanlipi",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "25px",
    marginLeft: "20px",
  },
  "& .lenBtn": {
    marginTop: "15px",
    float: "left",
    // textAlign: 'right',
    "& Button": {
      border: "none",
      background: "white",
      "&:hover": {
        border: "none",
        background: "white",
      },
    },
  },

  ".messageIcon": {
    fontSize: "20px"
  },
  // toggle button bangla english start

  "& .switchBtnField, .knobs, .layer": {
    position: "absolute",
    borderRadius: "15px",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  "& .button": {
    position: "relative",
    top: "30%",
    left: "78%",
    width: "150px",
    height: "30px",
    overflow: "hidden",
    "&.b2 ": {
      borderRadius: "18px",
    },
  },
  "& .checkbox": {
    position: "relative",
    width: "100%",
    height: "100%",
    padding: "0",
    margin: "0",
    opacity: "0",
    cursor: "pointer",
    zIndex: "3",
  },
  "& .knobs": {
    zIndex: "2",
  },
  "& .layer": {
    width: "100%",
    // backgroundColor: "#ebf7fc",
    transition: "0.3s ease all",
    border: "1px solid #fff",
    zIndex: "1",
  },
  "& #button-10 .knobs:before, #button-10 .knobs:after, #button-10 .knobs span": {
    position: "absolute",
    top: "4px",
    width: "20px",
    height: "10px",
    fontSize: "10px",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "1",
    padding: "9px 4px",
    borderRadius: "2px",
    transition: "0.3s ease all",
  },
  "& #button-10": {
    "& .knobs": {
      "&:before": {
        content: `''`,
        left: "4px",
        backgroundColor: "#fff",
        width: "75px",
        borderRadius: "18px",
        height: "26px",
        margin: "0 auto",
        top: "2px",
      },
      "&:after": {
        content: `"বাংলা"`,
        color: "#fff",
        right: "37px",
        fontSize: "15px",
        top: "-1px",
      },
      "& span": {
        display: "inline-block",
        left: "10px",
        color: "#000",
        zIndex: 1,
        fontSize: "15px",
        top: "-2px",
      }
    },
    "& .checkbox": {
      "&:checked": {
        "& + .knobs": {
          "& span": {
            color: "#fff",
          },
          "&:before": {
            left: "82px",
            // backgroundColor: "#f44336",
            top: "2px",
            height: "26px",
            width: "65px",
          },
          "&:after": {
            color: "#000",
          }
        },
        "& ~ .layer": {
          // backgroundColor: "#fcebeb",
        }
      }
    }
  },
  // toggle button bangla english end
  // "@media (min-width: 0px) and (max-width: 375px)": {
  //   "& .headerField": {
  //     display: "grid !important",
  //     ".headTitle": {
  //       fontSize: "20px",
  //       marginLeft: "10px",
  //     }
  //   },
  //   "& .langUl": {
  //     margin: "5px",
  //     "& .langLi": {
  //       padding: "5px 12px",
  //     },
  //     "& .langBg": {
  //       padding: "5px 12px",
  //     }
  //   },
  // },

  // "@media (min-width: 768px) and (max-width: 1024px)": {
  //   "& .button": {
  //     left: "60%",
  //   },
  //   ".headerWrapper .headTitle": {
  //     marginLeft: "0px",
  //   }
  "@media (min-width: 415px) and (max-width: 1024px)": {
    "& .headerWrapper, & .headTitle": {
      marginLeft: "0px",
    }
  },
  // },
  // "@media (min-width: 1025px) and (max-width: 1366px)": {
  //   "& .button": {
  //     left: "60%",
  //   },
  // },

  // "@media (min-width: 1367px) and (max-width: 1800px)": {
  //   "& .button": {
  //     left: "70%",
  //   },
  // }




}