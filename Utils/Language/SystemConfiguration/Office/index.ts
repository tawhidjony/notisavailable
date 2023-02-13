import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { SubModuleTypes } from "Utils/Language/Enums/SubModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForOffice = {
    list: {
        name_en: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.Office}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEEN}`
        },
        name_bn: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.Office}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEBN}`
        },
        address: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.Office}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.ADDRESS}`
        },
        officeName: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.Office}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.OFFICENAME}`
        },

    },
    form: {
        add_office_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.Office}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        edit_office_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.Office}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.EDITTITLE}`
        },
        select_division_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.Office}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.SELECTDIVISION}`
        },
        select_district_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.Office}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.SELECTDISTRICT}`
        },
        select_upazila_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.Office}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.SELECTUPAZILA}`
        },
        select_office_type_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.Office}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.SELECTOFFICETYPE}`
        },
    }
};