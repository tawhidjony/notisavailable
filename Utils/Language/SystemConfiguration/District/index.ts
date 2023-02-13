import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { SubModuleTypes } from "Utils/Language/Enums/SubModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForDistrict = {
    list: {
        name_en: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DISTRICT}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEEN}`
        },
        name_bn: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DISTRICT}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEBN}`
        },
        division: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DISTRICT}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.DIVISION}`
        },
        districtEn: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DISTRICT}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.DISTRICTEN}`
        },
        districtBn: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DISTRICT}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.DISTRICTBN}`
        },

    },
    form: {
        add_district_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DISTRICT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        edit_district_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DISTRICT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.EDITTITLE}`
        },
        select_division_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DISTRICT}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.SELECTDIVISION}`
        }
    }
};