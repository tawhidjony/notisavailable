import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { SubModuleTypes } from "Utils/Language/Enums/SubModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForDesignation = {
    list: {
        name_en: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DESIGNATION}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEEN}`
        },
        name_bn: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DESIGNATION}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEBN}`
        }
    },
    form: {
        priority: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DESIGNATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.PRIORITY}`
        },
        add_designation_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DESIGNATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        edit_designation_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DESIGNATION}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.EDITTITLE}`
        }
    }
};