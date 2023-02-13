import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { SubModuleTypes } from "Utils/Language/Enums/SubModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForOfficeType = {
    list: {
        name_en: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.OFFICETYPE}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEEN}`
        },
        name_bn: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.OFFICETYPE}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEBN}`
        }
    },
    form: {
        add_office_type_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.OFFICETYPE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        edit_office_type_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.OFFICETYPE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.EDITTITLE}`
        }
    }
};