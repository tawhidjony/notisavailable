import { SxProps } from "@mui/material"

export const loginStyle: SxProps = {
  ".bgImage": {
    display: "flex",
    // backgroundImage: `url(assets/login-bg.png)`,
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    opacity: ".9",
    "& .mainField": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "25px",
      "& .minar": {
        // width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      "& .loginBody": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        "& .logo": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "35px 45px",
          height: "400px",
          borderRadius: "10px 0px 0px 10px",
          display: "grid",
          placeItems: "center",
        },
        "& .loginBg": {
          display: "flex",
          background: "linear-gradient(to left, #a3c1c5 10%,  #b1d1cc 70%)",
          height: "400px",
          borderRadius: "0px 10px 10px 0px",
          marginRight: "50px",
          "& .iflogo": {
            padding: "0 13px",
            display: "grid",
            justifyItems: "center",
            alignContent: "center",
            textAlign: "center",
            "& .mosqueTitle": {
              fontFamily: "solaimanlipi",
              fontWeight: "bold",
              color: "#066E38",
              fontSize: "22px"
            },
          },
          "& .loginField": {
            maxWidth: "450px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            "& .designBy": {
              position: "absolute",
              bottom: "10px",
            },
          },
        },
      },
    },
  },

  "@media only screen and (max-width: 1366px)": {
    ".bgImage .mainField .loginBody .loginBg .iflogo": {
      padding: "13px",
    },
    ".bgImage .mainField .minar": {
      width: "330px"
    },
    ".bgImage .mainField .loginBody .loginBg .iflogo .mosqueTitle": {
      fontSize: "22px",
    },
    ".bgImage .mainField": {
      padding: "8px",
    }
  },
  "@media only screen and (max-width: 1024px)": {
    ".bgImage .mainField .minar": {
      display: "none",
    },
  },
  "@media only screen and (max-width: 768px)": {
    ".bgImage .mainField": {
      padding: "10px",
    },
    ".bgImage .mainField .minar": {
      display: "none",
    },
    ".bgImage .mainField .loginBody .logo": {
      borderRadius: "10px 10px 0px 0px",
    },
    ".bgImage .mainField .loginBody .loginBg .iflogo": {
      padding: "0px",
      width: "100%",
    },
    ".bgImage .mainField .loginBody": {
      display: "grid",
      width: "90%",
      "& .logo": {
        padding: "0px",
        height: "120px",
        width: "100%",
      }
    },
    ".bgImage .mainField .loginBody .loginBg .iflogo .mosqueTitle": {
      fontSize: "18px",
    },
    ".iflogo p": {
      color: "#066E38",
    },
    ".bgImage .mainField .loginBody .loginBg": {
      display: "grid",
      margin: "0",
      height: "100%",
      borderRadius: "0px 0px 10px 10px",
    },
    ".mainField": {
      padding: "10px",
      marginTop: "15px",
    },
    ".inputField": {
      width: "100%",
    },
    ".bgImage .mainField .loginBody .loginBg .loginField .designBy": {
      padding: "5px",
      position: "inherit",
      bottom: "10px",
      marginTop: "10px",
      textAlign: "center"
    },
    ".bgImage .mainField .loginBody .loginBg .loginField": {
      display: "grid"
    }
  },

}