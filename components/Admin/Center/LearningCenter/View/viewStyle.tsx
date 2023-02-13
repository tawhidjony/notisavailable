import { SxProps } from "@mui/material";

export const SingleViewStyle: SxProps = {
  ".singleDataField": {
    background: "#ffffff",
    margin: "5px",
    padding: "15px",
  },
  ".singleDataHead": {
    textAlign: "center",
    ".officeName": {
      fontSize: "18px",
      fontWeight: "bold"
    }
  },



  ".dataBodyContent, div": {
    fontSize: "16px",
    margin: "10px",
  },

  ".singleData": {
    display: "flex"
  },

  ".singleValueField ul": {
    listStyle: "none"
  },
  ".singleValueField ul li:first-child": {
    width: "250px",
  },
  ".singleValueField ul li:last-child": {
    width: "450px",
  },


  ".classTimeField ul li": {
    width: "250px",
  },
  ".classTimeField ul": {
    listStyle: "none"
  },
  ".classTime": {
    display: "flex"
  },
}