import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForList = {
    sl: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.SL}`
    },
    status: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.STATUS}`
    },
    action: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.ACTION}`
    },
    export_to_pdf: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.EXPORTTOPDF}`
    },
    export_to_excel: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.EXPORTTOEXCEL}`
    },
    print: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.PRINT}`
    },
    search: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.SEARCH}`
    },
    typeHere: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.TYPEHERE}`
    },
};