import { ModuleTypes } from "../Enums/ModuleType";
import { SubChildModuleTypes } from "../Enums/SubChildModuleType";
import { SubModuleTypes } from "../Enums/SubModuleType";
import { TitleTypes } from "../Enums/TitleTypes";
import { fieldTypes } from "../FieldTypes";

export const LangSetUpForMenu = {
    dashboard: {
        key: `${ModuleTypes.DASHBOARD}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`
    },
    employee_management: {
        key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
        submodule: {
            add_employee: {
                key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.ADD_EMPLOYEE}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
            },
            employee_list: {
                key: `${ModuleTypes.EMPLOYEE_MANAGEMENT}.${SubModuleTypes.EMPLOYEE_LIST}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`
            }
        }
    },
    system_configuration: {
        key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
        submodule: {
            division: {
                key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DIVISION}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`
            },
            district: {
                key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DISTRICT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`
            },
            upazila: {
                key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.UPAZILA}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`
            },
            employeetype: {
                key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.EMPLOYEETYPE}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`
            },
            designation: {
                key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.DESIGNATION}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`
            },
            office: {
                key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.Office}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`
            },
            officetype: {
                key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.OFFICETYPE}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`
            },
            language: {
                key: `${ModuleTypes.SYSTEM_CONFIGURATION}.${SubModuleTypes.LANGUAGE}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`
            },
        }
    },
    center_management: {
        key: `${ModuleTypes.CENTER_MANAGEMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
        submodule: {
            education_center: {
                key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                subchildmodule: {
                    add_education_center: {
                        key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${SubChildModuleTypes.ADD_EDUCATION_CENTER}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                    },
                    education_center_list: {
                        key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.EDUCATION_CENTER}.${SubChildModuleTypes.EDUCATION_CENTER_LIST}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                    }
                }
            },
            resource_center: {
                key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.RESOURCE_CENTER}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                subchildmodule: {
                    add_resource_center: {
                        key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.RESOURCE_CENTER}.${SubChildModuleTypes.ADD_RESOURCE_CENTER}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                    },
                    resource_center_list: {
                        key: `${ModuleTypes.CENTER_MANAGEMENT}.${SubModuleTypes.RESOURCE_CENTER}.${SubChildModuleTypes.RESOURCE_CENTER_LIST}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                    }
                }
            },
        }
    },
    financial_management: {
        key: `${ModuleTypes.FINANCIAL_MANAGEMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
    },
    student_management: {
        key: `${ModuleTypes.STUDENT_MANAGEMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
        submodule: {
            student_add: {
                key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_ADD}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
            },
            student_list: {
                key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.STUDENT_LIST}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
            },
            assessment: {
                key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                subchildmodule: {
                    monthly_assessment: {
                        key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${SubChildModuleTypes.MONTHLY_ASSESSMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                    },
                    monthly_assessment_list: {
                        key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${SubChildModuleTypes.MONTHLY_ASSESSMENT_LIST}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                    },
                    assessment_summary: {
                        key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${SubChildModuleTypes.ASSESSMENT_SUMMARY}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                    },
                    yearly_assessment: {
                        key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${SubChildModuleTypes.YEARLY_ASSESSMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                    },
                    yearly_assessment_list: {
                        key: `${ModuleTypes.STUDENT_MANAGEMENT}.${SubModuleTypes.ASSMESSMENT}.${SubChildModuleTypes.YEARLY_ASSESSMENT_LIST}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
                    },
                }
            },

        }
    },
    teacher_management: {
        key: `${ModuleTypes.TEACHER_MANAGEMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
        submodule: {
            teacher_add: {
                key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_ADD}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
            },
            teacher_list: {
                key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_LIST}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
            },
            teacher_evaluation: {
                key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_EVALUATION}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
            },
            evaluation_summary: {
                key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.EVALUATION_SUMMARY}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
            },
            teacher_information: {
                key: `${ModuleTypes.TEACHER_MANAGEMENT}.${SubModuleTypes.TEACHER_INFO}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
            },
        }
    },
    inspection_management: {
        key: `${ModuleTypes.INSPECTION_MANAGEMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
    },
    user_management: {
        key: `${ModuleTypes.USER_MANAGEMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
    },
    monitoring_management: {
        key: `${ModuleTypes.MONITORING_MANAGEMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
    },
    assessment_management: {
        key: `${ModuleTypes.ASSESSMENT_MANAGEMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
    },
    report_management: {
        key: `${ModuleTypes.REPORT_MANAGEMENT}.${fieldTypes[0].id.toUpperCase()}.${TitleTypes.TITLE}`,
    },
};