import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { SubModuleTypes } from "Utils/Language/Enums/SubModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForEmployeeType = {
    list: {
        name_en: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.EMPLOYEETYPE}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEEN}`
        },
        name_bn: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.EMPLOYEETYPE}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.NAMEBN}`
        }
    },
    form: {
        add_employee_type_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.EMPLOYEETYPE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        edit_employee_type_title: {
            key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.EMPLOYEETYPE}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.EDITTITLE}`
        }
    }
};