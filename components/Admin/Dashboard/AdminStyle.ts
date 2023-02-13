import { SxProps } from "@mui/material";

export const AdminStyle: SxProps = {
  "& .dashboardBg": {
    padding: "25px",
    background: "#ededed",
    maxHeight: "calc(100vh - 101px)",
    overflowY: "scroll",
  },
  ".dashboardBg::-webkit-scrollbar": {
    width: "0px",
  },
  "& .infoContent": {
    background: "#ffffff",
    padding: "10px",
    borderRadius: "5px",
  },
  "& .studentInfo": {
    width: "100%",
    padding: "20px",
    margin: "30px 0px",
    background: "#ffffff",
    borderRadius: "5px",
  },
  "& .visite": {
    width: "100%",
    padding: "20px",
    margin: "30px 0px",
    background: "#ffffff",
    borderRadius: "5px",
  },
  "& .fieldTitle": {
    margin: "0",
    "& h4": {
      fontSize: "22px",
      fontWeight: "bold",
      fontFamily: "solaimanlipi",
      position: "relative",
      display: "inline-block",
      marginBottom: "10px",
      "&::before": {
        content: "''",
        textDecoration: "underline",
        background: "none repeat scroll 0 0 transparent",
        bottom: 0,
        display: "block",
        height: "2px",
        left: "50%",
        position: "absolute",
        backgroundColor: "#599B8A",
        transition: "width 0.3s ease 0s, left 0.3s ease 0s",
        width: 0,
      },
      "&:hover": {
        "&::before": {
          width: "100%",
          left: 0,
          content: "''",
        },
      },
    },
  },

  "& .lavelTitle": {
    paddingRight: "5px",
    marginRight: "5px",
    display: "inline-block",
    "&:nth-of-type(1)": {
      display: "grid",
      borderRight: "1px solid #000",
      width: "35%",
    },
  },
  "& .count": {
    // display: "block",
    borderRight: "none",
    fontSize: "18px",
    fontFamily: "SolaimanLipi",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "20px",
    color: "#066E38",
    display: "inline-block",
  },
  "& .lavelContent": {
    maxWidth: "170px",
  },

  "& .infoBar": {
    background: "#ffffff",
    height: "100%",
    width: "100%",
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "5px",
  },
  "& .admitInfo": {
    background: "#ffffff",
    fontFamily: "solaimanlipi"
  },
  "& .todayVisit": {
    background: "#ffffff",
  },
  "& .roundChart": {
    width: "100%",
    padding: "20px",
    margin: "0px",
    background: "#ffffff",
    borderRadius: "5px",
  },
  "& .lineChart": {
    width: "100%",
    padding: "20px",
    // margin:"20px 0px",
    background: "#ffffff",
    borderRadius: "5px",
  },
  "& .boxField": {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  "& .teachingInfoField": {
    width: "100%",
    marginTop: "10px",
    "& p": {
      fontFamily: "solaimanlipi",
      fontSize: "18px"
    }
  },
  "& .teachingInfo": {
    // width:"100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    background: "#e1f5f0",
    padding: "5px",
    margin: "5px",
    borderRadius: "5px",
    "& .leaving": {
      width: "170px",
      padding: "5px",
      textAlign: "center",
      margin: "5px",
      fontSize: "18px",
      fontFamily: "SolaimanLipi",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "20px",
      color: "#066E38",
    },
  },


  "& .admissionInfo": {
    background: "#e1f5f0",
    padding: "5px",
    margin: "5px",
    borderRadius: "5px",
  },
  "& .totalInfo": {
    background: "#e1f5f0",
    padding: "10px",
    margin: "5px",
    borderRadius: "5px",
    "& p": {
      "& strong": {
        color: "green",
      },
    },
  },
  "& .visiteHead": {
    display: "flex",
    justifyContent: "space-between",
  },
  "& .todayVisitHead": {
    marginBottom: "5px",
    padding: "5px",
    "& Button": {
      background: "#35836F",
      color: "#fff",
      fontWeight: "bold",
      fontFamily: "solaimanlipi",
      borderRadius: "15px",
      width: "90px",
      height: "30px",
    },
  },

  "table, th, td": {
    border: "1px solid #000",
    borderCollapse: "collapse",
  },
  "th": {
    backgroundColor: "#D0F4E1",
  },
  "& .slNo": {
    padding: "0",
    textAlign: "center",
  },

  "& #skills": {
    position: "relative",
    width: "250px",
    height: "250px",
    textAlign: "center",
    margin: "10px auto ",
    // display:"flex",
    // alignItems:"center",
    // justifyContent:"center",

    "& h2": {
      position: "absolute",
      top: "30px",
      left: "240px",
      fontSize: "35px",
      color: "#d65454",
    },
    ".circle": {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      position: "absolute",

      "& p": {
        textAlign: "center",
        zIndex: "1",
        position: "absolute",
        top: "100px",
        left: "100px",
      },
    },

    "& .animate": {
      webkitTransition: "0.2s cubic-bezier(.74,1.13,.83,1.2)",
      mozTransition: "0.2s cubic-bezier(.74,1.13,.83,1.2)",
      oTransition: "0.2s cubic-bezier(.74,1.13,.83,1.2)",
      transition: "0.2s cubic-bezier(.74,1.13,.83,1.2)",
      "&:hover": {
        transform: "scale(1.1)",
        transformOrigin: "center center",
      },
    },
    "& #part1": {
      background:
        "radial-gradient(102.47% 60.77% at 0% 59.3%, #DEA9A9 20%, #D54242 100%)",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      webkitClipPath: "polygon(50% 0, 50% 50%, 100% 41.2%, 100% 0)",
      clipPath: "polygon(50% 0, 50% 50%, 100% 72.2%, 100% 0)",
      "& h3": {
        color: "#fff",
        padding: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "95px",
        position: "relative",
        top: "67px",
        left: "135px",
        fontFamily: "solaimanlipi",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "21.23px"
      },
      // "& h2": {
      //   position: "absolute",
      //   top: "30px",
      //   left: "272px",
      // },
    },

    "& #part2": {
      background:
        "radial-gradient(59.33% 100% at 56.84% 0%, #F99B61 20%, #FF7723 100%)",
      webkitClipPath: "polygon(50% 50%, 100% 41.2%, 100% 100%, 63.4% 100%)",
      clipPath: "polygon(50% 50%, 100% 71.2%, 100% 100%, -32.6% 100%)",
      "& h3": {
        color: "#fff",
        padding: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "131px",
        position: "relative",
        top: "170px",
        left: "67px",
        fontFamily: "solaimanlipi",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "21.23px"
      },
    },

    "& #part3": {
      // backgroundColor: "#22a5ad",
      background:
        "radial-gradient(100% 75% at 115.16% 65.47%, #8FE9EF 30%, #1CA1AA 100%)",
      webkitClipPath: "polygon(50% 50%, 0 36.6%, 0 0, 50% 0)",
      clipPath: "polygon(50% 50%, 0 80.6%, 0 0, 50% 0)",
      "& h3": {
        color: "#fff",
        padding: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100px",
        position: "relative",
        top: "67px",
        left: "20px",
        fontFamily: "solaimanlipi",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "21.23px"
      },
    },
  },



  "@media (min-width: 0px) and (max-width: 375px)": {
    "& .dashboardBg": {
      padding: "5px",
    },
    "& .infoContent": {
      padding: "10px",
    },

    ".boxField": {
      display: "grid",
      alignItems: "center",
      justifyContent: "normal",
    },

    ".teachingInfo": {
      margin: "0px"
    },

    ".totalInfo": {
      margin: "0px"
    },

  },
  "@media (min-width: 376px) and (max-width: 414px)": {
    ".boxField": {
      display: "grid",
      alignItems: "center",
      justifyContent: "normal",
    },
  },
  "@media (min-width: 415px) and (max-width: 768px)": {
    ".boxField": {
      display: "grid",
      alignItems: "center",
      justifyContent: "normal",
    },
  },
  // "@media (min-width: 768px) and (max-width: 1024px)": {
  //   ".boxField": {
  //     display: "grid",
  //     alignItems: "center",
  //     justifyContent: "normal",
  //   },
  // },
};
