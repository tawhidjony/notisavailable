import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { SubModuleTypes } from "Utils/Language/Enums/SubModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForUpazila = {
    list: {
        name_en: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.UPAZILA}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEEN}`
        },
        name_bn: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.UPAZILA}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEBN}`
        },
        division: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.UPAZILA}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.DIVISION}`
        },
        district: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.UPAZILA}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.DISTRICT}`
        },
        upazila: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.UPAZILA}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.UPAZILA}`
        },

    },
    form: {
        add_upazila_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.UPAZILA}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        edit_upazila_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.UPAZILA}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.EDITTITLE}`
        },
        select_division_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.UPAZILA}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.SELECTDIVISION}`
        },
        select_district_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.UPAZILA}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.SELECTDISTRICT}`
        },
    }
};