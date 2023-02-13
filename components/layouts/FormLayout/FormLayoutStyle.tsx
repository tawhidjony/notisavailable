import { SxProps } from "@mui/system";

export const FormLayoutStyle: SxProps = {
  ".studentAddField": {
    margin: "10px",
    background: "#F4F5F5",
    // border: "1px solid #a5a6a6"
    boxShadow: "0px 4px 15px -3px rgba(0,0,0,0.2)",
    position: "relative",

    "& .studentMainContentField": {
      background: "#F4F5F5",
      margin: "10px",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
    },
    ".paperField": {
      borderRadius: "0px",
      padding: "10px",
      textAlign: "center",
    },
    "& .defaultInnerForm": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(0,0,0,.8)",
      height: "100%",
      width: "100%",
      zIndex: 9,
      "& .defaultLoading": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }
    }

  },
  ".studentContentField": {
    padding: "5px 70px",
    height: "100vh",
    maxHeight: "calc(100vh - 220px)",
    overflowY: "scroll",
    gridArea: "body-scrollable",
    overflow: "auto",
    paddingBottom: "55px !important",
  },

  /* form scroll bar start*/
  /* width */
  ".studentContentField::-webkit-scrollbar": {
    width: "7px",
  },

  /* Track */
  ".studentContentField::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 5px grey",
    borderRadius: "10px",
  },

  /* Handle */
  ".studentContentField::-webkit-scrollbar-thumb": {
    background: "#B2B2B2",
    borderRadius: "10px",
  },

  /* Handle on hover */
  ".studentContentField::-webkit-scrollbar-thumb:hover": {
    background: "#215d4e",
  },
  /* form scroll bar end */

  ".studentBottomField": {
    borderRadius: "0px",
    padding: "8px",
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    left: 0
  },
  ".studentFieldHead": {
    borderRadius: "5px",
    "& p": {
      fontWeight: "bold",
      color: "green"
    }
  },
  ".dateField": {
    display: 'flex',
    flexWrap: 'wrap',
  },
  ".textField": {
    // marginLeft: "theme.spacing.unit",
    // marginRight: "theme.spacing.unit",
    width: "100%",
  },

  ".studentInput": {
    margin: "5px",
    "& fieldset": {
    },
    "& .MuiInputBase-input:hover + fieldset": {
      border: `1px solid #646464`,
    },
    "& .MuiInputBase-input:focus + fieldset": {
      border: `1px solid #646464`,
    },
  },

  "& .studentFieldBottom": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

  },

  ".clearBtn Button": {
    color: "#F09223",
    border: "1px solid #F09223",
    borderRadius: "20px",
    width: "100px",
    padding: "5px",
  },
  "& .addBtn Button, & .moreAddBtn Button": {
    color: "#fff",
    background: "#1D8FA8",
    borderRadius: "20px",
    width: "130px",
    padding: "5px",
    margin: "5px",
    fontWeight: "bold"
  },
  ".parents": {

  },
  ".parentsCheckBox": {
    textAlign: "left"
  },

  ".clearBtnField": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 20px"
  },
  // ".stuLeftBtn": {
  //   textAlign: "start",
  //   width: "100%",
  // },
  // ".stuRightBtn": {
  //   display: "flex",
  //   justifyContent: "flex-end",
  //   width: "100%",
  // },
  ".fatherField, .motherField, .otherParentsField": {
    width: "100%",
    margin: "5px 0px",
    background: "#fff",
    borderRadius: "5px",
  },

  "@media (max-width: 900px)": {
    ".fatherField, .motherField, .otherParentsField": {
      padding: "10px 2px",
    },
    ".studentContentField": {
      padding: "5px 20px",
    }
  },


}