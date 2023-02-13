import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { LangSetUpForMenu } from "Utils/Language/Menu";
import { MenuListType } from "../interface/MenuLists";

export const MenuList: MenuListType[] = [
    {
        key: LangSetUpForMenu.dashboard.key,
        title: "ড্যাশবোর্ড",
        icon: <DashboardIcon color="secondary" fontSize="small" />,
        path: "/admin",
        items: [],
    },
    {
        key: LangSetUpForMenu.system_configuration.key,
        title: "কনফিগারেশন ব্যবস্থাপনা",
        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
        path: "#",
        items: [
            {
                key: LangSetUpForMenu.system_configuration.submodule.division.key,
                title: "Division",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/system-configuration/division"
            },
            {
                key: LangSetUpForMenu.system_configuration.submodule.district.key,
                title: "District",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/system-configuration/district",
            },
            {
                key: LangSetUpForMenu.system_configuration.submodule.upazila.key,
                title: "Upazila",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/system-configuration/upazila",
            },
            {
                key: LangSetUpForMenu.system_configuration.submodule.employeetype.key,
                title: "EmployeeType",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/system-configuration/employeetype",
            },
            {
                key: LangSetUpForMenu.system_configuration.submodule.designation.key,
                title: "Designation",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/system-configuration/designation",
            },
            {
                key: LangSetUpForMenu.system_configuration.submodule.office.key,
                title: "Office",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/system-configuration/office",
            },
            {
                key: LangSetUpForMenu.system_configuration.submodule.officetype.key,
                title: "OfficeType",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/system-configuration/officetype",
            },
            {
                key: LangSetUpForMenu.system_configuration.submodule.language.key,
                title: "Language",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/system-configuration/language",
            },
        ],
    },

    {
        key: LangSetUpForMenu.center_management.key,
        title: "কেন্দ্র ব্যবস্থাপনা",
        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
        path: "#",
        items: [
            {
                key: LangSetUpForMenu.center_management.submodule.education_center.key,
                title: "শিক্ষা কেন্দ্র",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "#",
                items: [
                    {
                        key: LangSetUpForMenu.center_management.submodule.education_center.subchildmodule.add_education_center.key,
                        title: "শিক্ষা কেন্দ্র যোগ করুন",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/center/learningcenter/add",
                    },
                    {
                        key: LangSetUpForMenu.center_management.submodule.education_center.subchildmodule.education_center_list.key,
                        title: "শিক্ষা কেন্দ্রের তালিকা",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/center/learningcenter",
                    }
                ]
            },
            {
                key: LangSetUpForMenu.center_management.submodule.resource_center.key,
                title: "রিসোর্স সেন্টার",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "#",
                items: [
                    {
                        key: LangSetUpForMenu.center_management.submodule.resource_center.subchildmodule.add_resource_center.key,
                        title: "রিসোর্স সেন্টার যোগ করুন",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/center/resourcecenter/add",
                    },
                    {
                        key: LangSetUpForMenu.center_management.submodule.resource_center.subchildmodule.resource_center_list.key,
                        title: "রিসোর্স সেন্টারতালিকা",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/center/resourcecenter",
                    }
                ]
            },
        ],
    },
    {
        key: LangSetUpForMenu.student_management.key,
        title: "শিক্ষার্থী ব্যবস্থাপনা",
        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
        path: "#",
        items: [
            {
                key: LangSetUpForMenu.student_management.submodule.student_add.key,
                title: "শিক্ষার্থী যুক্ত করুন",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/student-management/student-info/add",
            },
            {
                key: LangSetUpForMenu.student_management.submodule.student_list.key,
                title: "শিক্ষার্থীদের তালিকা",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/student-management/student-info",
            },
            {
                key: LangSetUpForMenu.student_management.submodule.assessment.key,
                title: "মূল্যায়ন",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "#",
                items: [
                    {
                        key: LangSetUpForMenu.student_management.submodule.assessment.subchildmodule.monthly_assessment.key,
                        title: "মাসিক মূল্যায়ন",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/student-management/assessment/monthly-assessment",
                    },
                    {
                        key: LangSetUpForMenu.student_management.submodule.assessment.subchildmodule.monthly_assessment_list.key,
                        title: "মাসিক মূল্যায়ন তালিকা",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/student-management/assessment/monthly-assessment-list",
                    },
                    {
                        key: LangSetUpForMenu.student_management.submodule.assessment.subchildmodule.yearly_assessment_list.key,
                        title: "বার্ষিক মূল্যায়ন তালিকা",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/student-management/assessment/annual-assessment-list",
                    },

                ]
            },
            {
                key: "hujhgj",
                title: "প্রাথমিক বিদ্যালয়ে ভর্তি",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "#",
                items: [
                    {
                        key: "werew",
                        title: "প্রাথমিক বিদ্যালয়ে ভর্তি",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/student-management/primary-school-admission/add",
                    },
                    {
                        key: "werew",
                        title: "প্রাথমিক বিদ্যালয়ে ভর্তির তালিকা",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/student-management/primary-school-admission",
                    },
                ]
            },

        ],
    },
    {
        key: LangSetUpForMenu.teacher_management.key,
        title: "শিক্ষক ব্যবস্থাপনা",
        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
        path: "#",
        items: [
            {
                key: LangSetUpForMenu.teacher_management.submodule.teacher_information.key,
                title: "Teacher Information",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "#",
                items: [
                    {
                        key: LangSetUpForMenu.teacher_management.submodule.teacher_add.key,
                        title: "শিক্ষক যুক্ত করুন",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/teacher-management/teacher-info/add",
                    },
                    {
                        key: LangSetUpForMenu.teacher_management.submodule.teacher_list.key,
                        title: "শিক্ষকগণের তালিকা",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/teacher-management/teacher-info",
                    },
                ],
            },
            {
                key: LangSetUpForMenu.teacher_management.submodule.teacher_evaluation.key,
                title: "Teacher Evaluation",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "#",
                items: [
                    {
                        key: LangSetUpForMenu.teacher_management.submodule.teacher_evaluation.key,
                        title: "শিক্ষক মূল্যায়ন",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/teacher-management/teacher-evaluation/add",
                    },
                    {
                        key: LangSetUpForMenu.teacher_management.submodule.evaluation_summary.key,
                        title: "মূল্যায়ন সারাংশ",
                        icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                        path: "/admin/teacher-management/teacher-evaluation-summary",
                    },
                ],
            }
        ],

    },

    {
        key: LangSetUpForMenu.employee_management.key,
        title: "কর্মকর্তা ব্যবস্থাপনা",
        icon: <DashboardIcon color="secondary" fontSize="small" />,
        path: "/admin",
        items: [
            {
                key: LangSetUpForMenu.employee_management.submodule.add_employee.key,
                title: " কর্মচারী যুক্ত করুন ",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/employee-management/add",
            },
            {
                key: LangSetUpForMenu.employee_management.submodule.employee_list.key,
                title: "কর্মচারী তালিকা",
                icon: <PeopleAltIcon color="secondary" fontSize="small" />,
                path: "/admin/employee-management",
            },
        ],
    }
];
