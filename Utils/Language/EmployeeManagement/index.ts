import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { SubModuleTypes } from "Utils/Language/Enums/SubModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForEmployee = {
    list: {
        name_en: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEEN}`
        },
        name_bn: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEBN}`
        },
        fathersNameEn: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.FATHERSNAMEEN}`
        },
        motherEn: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.MOTHEREN}`
        },
        nid: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NID}`
        },
        email: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.EMAIL}`
        },
        contact: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.CONTACT}`
        },
        address: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.ADDRESS}`
        },
        division: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.DIVISION}`
        },
        district: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.DISTRICT}`
        },
        upazila: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.UPAZILA}`
        },
        centerCode: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.CENTERCODE}`
        },
        centerName: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.CENTERNAME}`
        },
        studentRoll: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.STUDENTROLL}`
        },
        studentName: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.STUDENTNAME}`
        },
        gender: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.GENDER}`
        },
        male: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.MALE}`
        },
        female: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.FEMALE}`
        },
        other: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.OTHER}`
        },
        reset: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.RESET}`
        },
        search: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.SEARCH}`
        },
        employeeId: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.EMPLOYEEID}`
        },
        employeeType: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.OFFICERTYPE}`
        },
        office: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.OFFICE}`
        },
        employeeName: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.EMPLOYEENAME}`
        },
    },
    form: {
        add_employee_title: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        add_employee_button: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDEMPLOYEEBUTTON}`
        },
        officerId: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.OFFICERID}`
        },
        officerNameEn: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.OFFICERNAMEEN}`
        },
        officerNameBn: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.OFFICERNAMEBN}`
        },
        fathersName: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.FATHERSNAME}`
        },
        mothersName: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.MOTHERSNAME}`
        },
        nid: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.NID}`
        },
        officerType: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.OFFICERTYPE}`
        },
        office: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.OFFICE}`
        },
        designation: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.DESIGNATION}`
        },
        dateOfJoining: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.DATEOFJOINING}`
        },
        email: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.EMAIL}`
        },
        mobile: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.MOBILE}`
        },
        address: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDRESS}`
        },
        image: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.IMAGE}`
        },
        updateEmployee: {
            key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.UPDATEEMPLOYEE}`
        },



    }
};