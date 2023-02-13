import { ModuleTypes } from "Utils/Language/Enums/ModuleType";
import { SubModuleTypes } from "Utils/Language/Enums/SubModuleType";
import { TitleTypes } from "Utils/Language/Enums/TitleTypes";
import { fieldTypes } from "Utils/Language/FieldTypes";

export const LangSetUpForCenter = {
    list: {
        centerCode: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.CENTERCODE}`
        },
        centerName: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.CENTERNAME}`
        },
        centerLevel: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.CENTERLEVEL}`
        },
        centerCreatedAt: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.CENTERCREATEDAT}`
        },
        list: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.LIST}`
        },
        edit: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.EDIT}`
        },
        add: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[1].id.toUpperCase()}.${TitleTypes.ADD}`
        },
    },
    form: {
        add_education_center_title: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        add_resource_center_title: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.RESOURCE_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ADDTITLE}`
        },
        cityCorporation: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CITYCORPORATION}`
        },
        union: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.UNION}`
        },
        wardno: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.WARDNO}`
        },
        village: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.VILLAGE}`
        },
        center_description: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CENTERDESCRIPTION}`
        },
        start_class_time: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.STARTCLASSTIME}`
        },
        end_class_time: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.ENDCLASSTIME}`
        },
        center_city_type: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.TYPEOFCITYCORPORATION}`
        },
        center_location: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CENTERLOCATION}`
        },
        center_place: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CENTERPLACE}`
        },
        center_picture: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CENTERPICTURE}`
        },
        center_address: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.CENTERADDRESS}`
        },
        mosque_Center_name: {
            key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[2].id.toUpperCase()}.${TitleTypes.MOSQUECENTERNAME}`
        },
    }
};