import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { SubModuleTypes } from "Utils/Language/Enums/SubModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForStudent = {
    list: {
        centerCode: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.CENTERCODE}`
        },
        centerName: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.CENTERNAME}`
        },
        studentRoll: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.STUDENTROLL}`
        },
        studentName: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.STUDENTNAME}`
        },
        centerLevel: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.CENTERLEVEL}`
        },

    },
    form: {
        add_student_title: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        add_student_button: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.ADDSTUDENTBUTTON}`
        },
        dateOfBirth: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.DATEOFBIRTH}`
        },
        age: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.AGE}`
        },
        birthRegNumber: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.BIRTHREGNUMBER}`
        },
        educationYear: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.EDUCATIONYEAR}`
        },
        union: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.UNION}`
        },
        wardno: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.WARDNO}`
        },
        village: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.VILLAGE}`
        },
        institutionName: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.INSTITUTIONNAME}`
        },
        studentOccupation: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.STUDENTOCCUPATION}`
        },
        fatherName: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.FATHERNAME}`
        },
        occupation: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.OCCUPATION}`
        },
        mobile: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.MOBILE}`
        },
        mother: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.MOTHER}`
        },
        guardianName: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.GUARDIANNAME}`
        },
        absenceOfFather: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ABSENCEOFFATHER}`
        },
        centerType: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CENTERTYPE}`
        },
        admissionDate: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADMISSIONDATE}`
        },
        isAdmitted: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ISADMITTED}`
        },
        bloodGroup: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.BLOODGROUP}`
        },
        gender: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.GENDER}`
        },
        fatherNID: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.FATHERNID}`
        },
        motherNID: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.MOTHERNID}`
        },
        guardianNID: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.GUARDIANNID}`
        },
        updateStudent: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.UPDATESTUDENT}`
        },
        month: {
            key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.MONTH}`
        }
    }
};