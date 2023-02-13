import { SxProps } from "@mui/system";


export const HomeStyle: SxProps = {
  ".containerMainField": {
    position: "relative",
    background: "#fff",
    width: "960px",
    margin: "0 auto",
    padding: "0px 12px",
  },
  ".carousel img": {
    objectFit: "contain",
    width: "100%",
  },



  "nav ul": {
    padding: "0",
    margin: "0",
    listStyle: "none",
    position: "relative",

  },

  "nav ul li": {
    display: "inline-block",
    width: "auto",
    padding: "0",
  },

  "nav a": {
    display: "block",
    padding: "0 10px",
    color: "#000",
    fontSize: "20px",
    lineHeight: "60px",
    textDecoration: "none",
    background: "#fafafa"
  },

  "nav a:hover": {
    backgroundColor: "#5f5c5c",
  },
  "nav a.col1:hover": {
    backgroundColor: "#FF6600",
  },



  "nav ul ul": {
    display: "none",
    position: "absolute",
    top: "60px",

  },

  "nav ul li:hover > ul": {
    display: "inherit",
  },

  "nav ul ul li": {
    width: "170px",
    float: "none",
    display: "list-item",
    position: "relative",
    zIndex: "9999999",
  },

  "nav ul ul ul li": {
    position: "relative",
    top: "-60px",
    left: "170px",
  },



  // menu css start

  ".dropdown": {
    position: "relative",
    display: "inline-block",
    width: "100%"
  },
  ".dropdown ul": {
    margin: "0",
    padding: "0",
    display: "flex",
  },
  ".dropdown ul li": {
    listStyle: "none",
  },
  ".dropbtn": {
    color: "#FF6600",
    padding: "14px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer"
  },


  ".dropdown-content": {
    width: "40%",
    fontSize: "14px",
    display: "none",
    position: "absolute",
    backgroundColor: "#f1f1f1",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    zIndex: "1",
    borderTop: "8px solid #FF6600",
  },
  ".under-content": {
    display: "inline-block",
    width: "50%"
  },

  ".dropdown-content h6": {
    color: "#FF6600",
    fontWeight: "bold",
    fontSize: "14px",
    margin: "0",
    padding: "5px 8px",
  },
  ".dropdown-content h6 > .cel-2": {
    color: "green",
  },
  ".dropdown-content ul": {
    margin: "0",
    padding: "0",
    display: "block",
  },
  ".dropdown-content ul li": {
    listStyle: "none",
  },

  ".dropdown-content a": {
    color: "black",
    padding: "5px 8px",
    textDecoration: "none",
    display: "block",
    lineHeight: "20px",
    borderBottom: "1px dotted #e1e1e1",
  },

  ".dropdown-content a:hover, .dropdown-content1 a:hover": {
    backgroundColor: "#ddd",
  },
  ".col0:hover .dropdown-content": {
    display: "flex",
  },
  ".dropdown ul li .dropbtn:hover": {
    background: "#FF6600",
    color: "#fff",
    fontWeight: "bold"
  },

  /* content1 */
  ".dropbtn2": {
    color: "#C40A2A",
    fontWeight: "bold",
    padding: "14px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer"
  },
  ".dropdown-content1": {
    width: "35%",
    display: "none",
    position: "absolute",
    backgroundColor: "#f1f1f1",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    zIndex: "1",
    borderTop: "8px solid #C40A2A",
    justifyContent: "space-between",
  },

  ".dropdown-content1 ul": {
    margin: "0",
    padding: "0",
    display: "block",
  },
  ".dropdown-content1 a": {
    color: "black",
    padding: "5px 8px",
    textDecoration: "none",
    display: "block",
    lineHeight: "20px",
    borderBottom: "1px dotted #e1e1e1",
  },
  ".dropdown-content1 h6": {
    color: "#C40A2A",
    fontWeight: "bold",
    fontSize: "14px",
    margin: "0",
    padding: "5px 8px",
  },
  ".dropdown ul li .dropbtn2:hover": {
    background: "#C40A2A",
    color: "#fff"
  },
  ".col1:hover .dropdown-content1": {
    display: "flex",
  },

  // menu item 3 
  ".dropbtn3": {
    color: "#84154D",
    fontWeight: "700",
    padding: "14px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
  },

  ".dropdown ul li .dropbtn3:hover": {
    backgroundColor: "#84154D",
    color: "#fff",
  },
  ".dropdown-content2": {
    width: "35%",
    display: "none",
    position: "absolute",
    backgroundColor: "#f1f1f1",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    zIndex: "1",
    borderTop: "8px solid #84154D",
    justifyContent: "space-between",
  },
  ".col2:hover .dropdown-content2": {
    display: "flex",
  },
  ".dropdown-content2 ul": {
    margin: "0",
    padding: "0",
    display: "block",
  },

  ".dropdown-content2 a": {
    color: "black",
    padding: "5px 8px",
    textDecoration: "none",
    display: "block",
    lineHeight: "20px",
    borderBottom: "1px dotted #e1e1e1",
  },
  ".dropdown-content2 h6": {
    color: "#C40A2A",
    fontWeight: "bold",
    fontSize: "14px",
    margin: "0",
    padding: "5px 8px",
  },
  ".dropdown-content a:hover, .dropdown-content2 a:hover": {
    backgroundColor: "#ddd",
  },


  // menu css end







  // ".noticeBoard": {
  //   background: "green"
  // },

  ".noticeBoard": {
    background: "#efefef",
    backgroundImage: `url("http://www.islamicfoundation.gov.bd/themes/responsive_npf/images/bg_notice_board.png")`,
    backgroundRepeat: "no-repeat",
    padding: "10px 0 20px 120px",
    border: "1px solid #dddddd",
  },
  ".allNoticeBtn ": {
    backgroundImage: "linear-gradient(to bottom, #666, #a6a6a6)",
    backgroundRepeat: "repeat-x",
    borderColor: "rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) #a2a2a2",
    padding: "2px 5px",
    color: "#fff",
    backgroundColor: "#a6a6a6",
  },

  "#notice-board-ticker ul li": {
    listStyle: "none",
  },
  "#left-content ul li": {
    marginLeft: "20px",
  },
  "#notice-board-ticker li": {
    marginBottom: "5px",
    padding: "0px",
    background: `url("/assets/icons/bullet_arrow.png") no-repeat center left`,
  },

  "#notice-board-ticker ul a": {
    fontSize: "14px",
    textDecoration: "none",
    marginLeft: "20px",
    borderBottom: "1px dotted #666",

  },


  // news headline css start
  ".newsHeadLine": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EFEFEF",
    border: "1px solid #CCCCCC",
    margin: "20px 0px",
    padding: "10px",
  },
  ".newsHeadLine a": {
    marginLeft: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  ".allNewsBtn": {
    backgroundImage: "linear-gradient(to bottom, #666, #a6a6a6)",
    backgroundRepeat: "repeat-x",
    borderColor: "rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) #a2a2a2",
    padding: "2px 5px",
    color: "#fff",
    backgroundColor: "#a6a6a6",
  },
  ".newsHeadLine:before": {
    content: `""`,
    display: "block",
    overflow: "hidden",
    visibility: "hidden",
    width: "0",
    height: "0",
  },
  ".h5": {
    float: "left",
    margin: "-3px 5px 0 0",
    fontWeight: "bold",
    fontSize: ".9em",
  },
  // news headLine css end


  // single news css start
  ".homeSingleContent": {
    background: "#f5f5f5",
    border: "1px solid #dddddd",
    padding: "10px"
  },
  ".imageText": {
    display: "flex",
  },
  ".imageText img": {
    width: "100px",
    height: "100%"
  },
  ".imageText ul li": {
    margin: "2px 0 0 13px",
    fontSize: "1.2em",
    padding: "0px",
    display: "flex",
    alignItems: "center"
  },
  ".imageText ul li:before": {
    content: `url("/assets/icons/bullet_arrow.png")`,
    position: "relative",
    left: "-10px"
  },

  ".imageText ul li a": {
    fontSize: "14px",
    textDecoration: "none",
    display: "block",
  },
  // single news css end
  ".employeeField": {
  },
  ".protimontri": {
    margin: "10px 0px"
  },
  ".protimontri h4, .mohaporichalok h4, .innovation h4, .video h4": {
    background: "#609513",
    padding: "8px",
    color: "#fff"
  },
  ".protimontriContent, .mohaporichalokContent": {
    width: "100%",
    display: "grid",
    alignItems: "center",
    justifyItems: "center"
  },
  ".protimontriContent img, .mohaporichalokContent img": {
    width: "50%",
  },
  ".protimontriContent h3": {
    margin: "5px 0px"
  },

  ".nameDesignation": {
    margin: "5px 0",
    textAlign: "center"
  },
  ".innovation": {
    margin: "5px 0"
  },
  ".innovationContent": {
    margin: "15px 0px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid transparent",
    borderImage: "linear-gradient(to right,#683091 0%, #8bc643 100%)",
    borderImageSlice: "1",
  },
  ".innovationContent a": {
    marginLeft: "8px",
    fontSize: "18px",
  },
  ".videoContent": {
    margin: "10px 0px"
  },


  ".eService": {
    margin: "5px 0",
  },
  ".eService h4": {
    width: "100%",

    padding: "8px",
    color: "#fff"
  },
  ".eServiceLogo a": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#609513",
  },
  ".eServiceLogo img": {
    width: "20%"
  },

  ".eServiceContent": {
    margin: "15px 0px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid transparent",
    borderImage: "linear-gradient(to right,#683091 0%, #8bc643 100%)",
    borderImageSlice: "1",
  },
  ".eServiceContent a": {
    fontSize: "18px",
    marginLeft: "10px"
  },

  ".allEserviceBtn": {
    background: "#808080",
    textDecoration: "none",
    padding: "5px",
    width: "100%",
    display: "grid",
    textAlign: "center",
    color: "#fff",
  },

  ".consideration h4, .hotLine h4": {
    background: "#609513",
    padding: "8px",
    color: "#fff",
    marginBottom: "5px"
  },

  ".consideration a": {
    fontSize: "18px"
  },
  ".hotLineContent p": {
    fontSize: "18px",
    textAlign: "center",
  },
  ".hotLineNumber": {
    color: "red",
    fontWeight: "bold"
  },

  ".centerEService h4, .importentLinkHead h4, .googleMapHead h4, .themeSongHead h4, .emergincyHotLine h4, .easyService h4, .socialMedia h4": {
    background: "#609513",
    padding: "8px",
    color: "#fff",
    margin: "5px 0px",
  },
  ".importentLinkContent": {
    margin: "5px 0px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid transparent",
    borderImage: "linear-gradient(to right,#683091 0%, #8bc643 100%)",
    borderImageSlice: "1",
  },
  ".importentLinkContent a": {
    marginLeft: "10px",
    fontSize: "18px",
  },

  ".themeSongAudio audio": {
    width: "100%"
  },
  ".offer img": {
    width: "100%"
  },
  ".emergincyHotLine img": {
    width: "100%"
  },
  ".socialMedia img": {
    width: "30px",
    padding: "2px",
  },
  ".footerTopBg": {
    // width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ".footerTopBg img": {
    width: "1020px"
  },
  ".layoutFooter": {
    backgroundColor: "#ededed",
  },
  ".containerMainField, .layoutFooter": {
    // padding: "0",
  },

  ".allOfficeLogo": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ".simecLogo img": {
    width: "50%"
  },
  ".islamicFoundationLogo img": {
    width: "25%"
  },

  "@media (max-width: 1366px)": {
    ".footerTopBg img": {
      width: "960px"
    },
  }

}