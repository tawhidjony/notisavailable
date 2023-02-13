import { SxProps } from "@mui/system";

export const AnnualAssessmentStyle: SxProps = {
    ".assessmentContentField": {
        margin: "10px",
        boxShadow: "1px solid #000",
        height: "100%",
    },
    ".assessmentContent": {
        background: "#fafafa",
    },
    ".contentSingleItem": {
        // display: "flex",
        // alignItems: "center",
        // ".inputField2": {
        //     width: "100%"
        // },
    },
    ".assessmentContentBody": {
        padding: "10px",
        background: "#fff"
    },
    ".inputField": {
        width: "100%"
    },


    ".saveButton": {
        color: "#12965F",
        border: "1px solid #12965F",
        borderRadius: "20px",
        width: "100px",
        padding: "5px",
    },

    ".address": {
        margin: "10px 0px",
        width: "100%",
        display: "flex"
    },

    ".devider": {
        "&::before": {
            position: "absolute",
            width: "1px",
            left: "50%",
            transform: "translate(-50%, -20%)",
            top: "20%",
            height: "70%",
            backgroundColor: "#000",
            opacity: "0.25",
            content: `''`,
        }
    },
    ".studyYear": {
        width: "100%"
    },

    ".table": {
        height: "auto",
        maxHeight: "500px",
    },
    ".pageHeader": {
        padding: "20px 0px"
    },
    ".pageHeaderContent": {
        border: "1px solid #000",
        borderRadius: "5px",
        padding: "15px",
        textAlign: "left",
    },

    ".mullayonHead": {
        background: "#d0f4e1",
        width: "142px",
        padding: "4px",
        textAlign: "center",
        border: "1px solid #9ed9ba",
        fontWeight: "bold",
        verticalAlign: "top",
    },

}
