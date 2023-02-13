import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { SubModuleTypes } from "Utils/Language/Enums/SubModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForTeacherEvaluation = {
    list: {

        addResourceCenterButton: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.EVALUATION_SUMMARY}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        educationMaterials: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.EDUCATIONMATERIAL}`
        },
        educationMaterialsHover: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.EDUCATIONMATERIAL}`
        },

    },
    form: {
        addTeacherEvaluation: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTEACHEREVALUATION}`
        },
        teacherNameBn: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.TEACHERNAME}`
        },
        teacherNameEn: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.TEACHERNAME}`
        },
        fatherNameBn: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.FATHERNAME}`
        },
        fatherNameEn: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.FATHERNAME}`
        },
        motherNameBn: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.MOTHERBN}`
        },
        motherNameEn: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.MOTHEREN}`
        },
        district: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.DISTRICT}`
        },
        upazila: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.UPAZILA}`
        },
        centerCode: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CENTERCODE}`
        },
        centerName: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CENTERNAME}`
        },
        year: {
            key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.YEAR}`
        },

    }
};