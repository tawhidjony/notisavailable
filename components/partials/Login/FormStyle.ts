import { SxProps } from "@mui/material"

export const formStyle: SxProps = {
  "& .mainField": {
    padding: "10px",
    "& .forgot": {
      textAlign: "right",
      "& a": {
        color: "#333333",
      },
    },
    "& .loginBtn": {
      textAlign: "right",
      "& Button": {
        backgroundColor: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 15%)",
        color: "#066E38",
      },
    },
  },


  "& .passwordWrapper": {
    width: "100%",
    position: "relative",
    "& svg": {
      width: "20px",
      position: "absolute",
      top: "25%",
      right: "4%",
      cursor: "pointer",
      zIndex: "1",
    },
  },
}

// "& .lenBtn": {
//   display: "block",
//   textAlign: "right",
//   "& Button": {
//     border: "none",
//     background: "white",
//     "&:hover": {
//       border: "none",
//       background: "white",
//     },
//   },
// },

// "& .forgot": {
//   display: "grid",
//   placeItems: "end",
// },
// forgot: {
//   color: "black",
// },
// designBy: {
//   marginTop: "30px",
//   textAlign: "right",
// },
// loginBtn: {
//   textAlign: "right",
// },

// "@media (max-width: 414px)": {
//   "& .mainField": {
//     paddingTop: "0px",
//   },
// },
// "@media (max-width: 375px)": {
//   "& .mainField": {
//     display: "grid",
//     justifyItems: "center",
//     alignContent: "center",
//   },
//   "& .rememberField": {
//     marginRight: "30px",
//   },
//   "& .loginBtn": {
//     marginRight: "30px",
//   },
//   designBy: {
//     textAlign: "center",
//   },
// },
