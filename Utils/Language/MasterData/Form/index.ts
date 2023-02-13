import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForForm = {
    reset: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.RESET}`
    },
    submit: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.SUBMIT}`
    },
    moreSubmit: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.MORESUBMIT}`
    },
    update: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.UPDATE}`
    },
    create_message: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CREATEMESSAGE}`
    },
    update_message: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.UPDATEMESSAGE}`
    },
    bangla: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.BANGLA}`
    },
    english: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ENGLISH}`
    },
    back: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.BACK}`
    },
    save_draft: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.SAVEDRAFT}`
    }
};