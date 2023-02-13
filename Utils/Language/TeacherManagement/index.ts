import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { SubModuleTypes } from "Utils/Language/Enums/SubModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForTeacher = {
    list: {
        addteacherButton: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        teacherName: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.TEACHERNAME}`
        },
        nid: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NID}`
        },
        mobile: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.MOBILE}`
        },
        status: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.STATUS}`
        },
        photo: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.PHOTO}`
        },
        center: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.CENTER}`
        },
        academicQualification: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.ACADEMICQUALIFICATION}`
        },
        instituteName: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_LIST}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.INSTITUTENAME}`
        },

    },
    form: {
        name_en: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.NAMEEN}`
        },
        name_bn: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.NAMEBN}`
        },
        teacherId: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.TEACHERID}`
        },
        gender: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.GENDER}`
        },
        constitutionDate: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CONSTITUTIONDATE}`
        },
        fatherNameBn: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.FATHERSNAMEBN}`
        },
        mother_bn: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.MOTHERBN}`
        },
        dateOfBirth: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.DATEOFBIRTH}`
        },
        courseName: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.COURSENAME}`
        },
        joinDate: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.DATEOFJOINING}`
        },
        session: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.SESSION}`
        },
        district: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.DISTRICT}`
        },
        upazila: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.UPAZILA}`
        },
        bankName: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.BANKNAME}`
        },
        branchName: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.BRANCHNAME}`
        },
        accountNumber: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ACCOUNTNUMBER}`
        },
        educationQualification: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.EDUCATIONQUALIFICATION}`
        },
        teachersType: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.TEACHERSTYPE}`
        },
        trainingInstitute: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.TRAININGINSTITUTE}`
        },
        imam: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.IMAM}`
        },
        certificate: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CERTIFICATE}`
        },
        centerNameCode: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CENTERNAMEANDCODE}`
        },
        area: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.AREA}`
        },
        routing: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ROUTING}`
        },
        nature: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.NATURE}`
        },
        training: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.TRAINING}`
        },
        nameOfDegree: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.NAMEOFDEGREE}`
        },
        department: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.DEPARTMENT}`
        },
        boardUniversity: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.BOARDUNIVERSITY}`
        },
        passingYear: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.PASSINGYEAR}`
        },
        cgpaGrade: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CGPAGRADE}`
        },
        addTeacherDegree: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTEACHERDEGREE}`
        },
        learningCenterId: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.LEARNINGCENTERID}`
        },
        startTime: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.STARTTIME}`
        },
        endTime: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ENDTIME}`
        },
        editTeacher: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.EDITTEACHER}`
        },
        courseId: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.COURSEID}`
        },


    }
};