import { yupResolver } from "@hookform/resolvers/yup";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
    Box,
    Button, Grid, Paper
} from "@mui/material";
import {
    createColumnHelper, getCoreRowModel, useReactTable
} from '@tanstack/react-table';
import { useGetLearningCenterListQuery } from "Api/Center/LearningCenter";
import { useGetLearningcentertypeAllListQuery } from 'Api/Center/LearningCenterType';
import { useGetCourseListQuery } from "Api/Global/Course";
import { useGetSessionListQuery } from "Api/Global/Session";
import { useCreateStudentMonthlyEvaluationMutation } from "Api/StudentManagement/Evaluation";
import { useGetStudentListQuery } from "Api/StudentManagement/StudentInfo";
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District";
import { useGetUpazilaListQuery } from "Api/SystemConfiguration/Upazila";
import FormAutocomplete from 'components/common/FormItem/FormAutocomplete';
import { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb";
import ReactTable from 'components/common/ReactTable';
import { globalFilterTableData } from "components/common/ReactTable/utility/GlobalDataFilter";
import { defaultEditableColumn, useSkipper } from "context/EditableTable";
import { useHotNotification } from "context/HotNotificationProvider";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "Store";
import { months } from "Utils/commonJson";
import { EnumLangTypes } from "Utils/Enums/LangType";
import { IndexSerial, listArrayModify, listArrayModifyCenterCode, translate } from 'Utils/Handler';
import { LangSetUpForCenter } from "Utils/Language/CenterManagement";
import { LangSetUpForForm } from "Utils/Language/MasterData/Form";
import { LangSetUpForList } from "Utils/Language/MasterData/List";
import { LangSetUpForMenu } from "Utils/Language/Menu";
import { LangSetUpForStudent } from "Utils/Language/StudentManagement";
import { TypeOf } from "yup";
import { panelSearchSchema } from "../Schema";

const columnHelper = createColumnHelper();

const AddMonthlyAssessment = () => {
    type IPanelSearchSchemaProp = TypeOf<typeof panelSearchSchema>;
    const methods = useForm<IPanelSearchSchemaProp>({
        mode: 'onChange',
        resolver: yupResolver(panelSearchSchema),
        defaultValues: {
            session: { label: "", value: "" },
            month: { label: "", value: "" },
            district: { label: "", value: "" },
            upazilla: { label: "", value: "" },
            centerType: { label: "", value: "" },
            centerName: { label: "", value: "" },
            centerCode: { label: "", value: "" }
        },
    });
    const { watch, reset, setValue } = methods;

    const [params, setParams] = useState("");
    const [studentParams, setStudentParams] = useState("");
    const { data: session } = useGetSessionListQuery();
    const { data: district } = useGetDistrictListQuery("");
    const { data: upazila } = useGetUpazilaListQuery({ districtId: watch().district?.value })
    const { data: learningcenterList, refetch } = useGetLearningCenterListQuery("");
    const { data: centerTypeList } = useGetLearningcentertypeAllListQuery();
    const [centerNames, setCenterNames] = useState([]);
    const [centerCodes, setCenterCodes] = useState([]);
    const [submitStatus, setSubmitStatus] = useState<Boolean>(false);
    const { data: courseList } = useGetCourseListQuery();
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
    const { lang, langData } = useSelector((state: RootState) => state.lang);
    const { data: studentList, refetch: refetchStudent } = useGetStudentListQuery(studentParams);
    const [data, setData] = useState([]);
    const [resetEvaluationStatus, setResetEvaluationStatus] = useState(false);
    const [courseColumns, setCourseColumns] = useState([]);
    const [creteStudentEvaluation] = useCreateStudentMonthlyEvaluationMutation()
    const { setVisible, setNotification } = useHotNotification();


    useEffect(() => {
        const month = watch("month")?.value;
        let newData = [];
        if (studentList?.data) {
            const allData = JSON.parse(JSON.stringify(studentList?.data));
            if (allData?.length) {
                newData = allData?.map((std: any) => {
                    const allEvaluations = std?.studentEvalution?.filter((evaluation: any) => evaluation.month === month);
                    std.studentEvalution = allEvaluations;
                    return std;
                });
            }
        }
        setData(newData || []);
    }, [studentList, resetEvaluationStatus, watch("month")?.value]);

    useEffect(() => {
        if (session?.data?.length) {
            const currentSession = session?.data?.find((sessionInfo: any) => sessionInfo.name_en == new Date().getFullYear());
            if (currentSession) {
                setValue("session", { label: currentSession.name_en, value: currentSession.id });
                setValue("month", { label: months[new Date().getMonth()].label, value: months[new Date().getMonth()].value });
            }
        }
    }, [session]);

    // Set Course Columns
    useEffect(() => {
        let allCourses = [];
        if (courseList?.data?.length) {
            allCourses = JSON.parse(JSON.stringify(courseList?.data));
            allCourses.unshift({
                id: 2,
                name_en: "Students Name",
                name_bn: "শিক্ষার্থীর নাম",
                key: "name_en"
            });
            allCourses.unshift({
                id: 1,
                name_en: "SL",
                name_bn: "ক্রমিক",
                key: "sl"
            });
        }
        setCourseColumns(allCourses);
    }, [courseList]);

    // Center Type Search
    // useEffect(() => {
    //     const centerTypeId = watch("centerType")?.value;
    //     const selectCenters = learningcenterList?.data?.filter((center: any) => center?.centertypeId?.id == centerTypeId);
    //     setCenterNames(selectCenters);
    //     setCenterCodes(selectCenters);
    // }, [learningcenterList, watch("centerType")]);


    const panelSearchOnSubmit: SubmitHandler<IPanelSearchSchemaProp> = (items: IPanelSearchSchemaProp) => {
        setSubmitStatus(true);
        let sessionId = items?.session?.value;
        let districtId = items?.district?.value;
        let upazilaId = items?.upazilla?.value;
        let centertypeId = items?.centerType?.value;
        let centerId = items?.centerName?.value;
        let code = items?.centerCode?.value;
        setStudentParams(`sessionId=${sessionId || ""}&districtId=${districtId || ""}&centertypeId=${centertypeId || ""}&upazilaId=${upazilaId || ""}&learning_center_id=${centerId || ""}&code=${code || ""}`)
    }

    // Reset Search
    const resetSearch = () => {
        setSubmitStatus(false);
        reset();
    };

    useEffect(() => {
        if (submitStatus) {
            refetchStudent();
        }
    }, [submitStatus]);


    // useEffect(() => {
    //     const centerTypeId = watch("centerType")?.value;
    //     const districtId = watch("district")?.value;
    //     const upazilaId = watch("upazilla")?.value;
    //     setParams(`districtId=${districtId || ""}&upazilaId=${upazilaId || ""}&centertypeId=${centerTypeId || ""}`)
    //     refetch();
    //     setValue("centerName", { label: "", value: "" });
    //     setValue("centerCode", { label: "", value: "" });
    // }, [watch("centerType"), watch("district"), watch("upazilla")]);

    useEffect(() => {
        setCenterNames(learningcenterList?.data);
        setCenterCodes(learningcenterList?.data);
    }, [learningcenterList]);

    // Center Name Search
    useEffect(() => {
        const centerId = watch("centerName")?.value;
        if (centerId) {
            const selectCenters = learningcenterList?.data?.filter((center: any) => center?.id == centerId);
            setCenterCodes(selectCenters);
        } else {
            setCenterCodes(learningcenterList?.data);
        }
    }, [watch("centerName")]);

    // Center Code Search
    useEffect(() => {
        const centerId = watch("centerCode")?.value;
        if (centerId) {
            const selectCenters = learningcenterList?.data?.filter((center: any) => center?.id == centerId);
            setCenterNames(selectCenters);
        } else {
            setCenterNames(learningcenterList?.data);
        }
    }, [watch("centerCode")]);

    // Course Columns Headers
    const coursesColumns = useMemo(() =>
        courseColumns?.map((course: any) => {
            return columnHelper.accessor((tableField, index) => IndexSerial(1, 100, index), {
                id: course?.key || course?.id,
                header: lang === EnumLangTypes.BANGLA ? course.name_bn : course.name_en,
                size: course.marks
            });
        }), [lang, courseColumns]);

    // Reset Evaluation
    const resetEvaluation = () => {
        refetchStudent();
        setResetEvaluationStatus(!resetEvaluationStatus);
    };

    const table = useReactTable({
        data: data || [],
        columns: coursesColumns,
        defaultColumn: defaultEditableColumn,
        getCoreRowModel: getCoreRowModel(),
        filterFns: {
            fuzzy: globalFilterTableData,
        },
        meta: {
            updateData: (rowIndex: number, columnId: any, value: any) => {
                skipAutoResetPageIndex();
                const modifiedData = JSON.parse(JSON.stringify(data));
                const student = modifiedData?.find((std: any) => std.id === rowIndex);
                const course = courseList?.data?.find((course: any) => course.key === columnId);
                if (student?.studentEvalution?.length) {
                    const evalutionFindIndex = student.studentEvalution?.findIndex((evalution: any) => evalution.courseInfo.key === columnId);
                    if (evalutionFindIndex !== -1 && columnId) {
                        student.studentEvalution[evalutionFindIndex].totalmark = value;
                    } else {
                        student.studentEvalution.push({
                            id: rowIndex,
                            studentId: rowIndex,
                            totalmark: value,
                            courseId: course?.id,
                            [columnId]: value,
                            courseInfo: {
                                key: columnId
                            }
                        });
                    }
                } else {
                    student.studentEvalution.push({
                        id: rowIndex,
                        studentId: rowIndex,
                        totalmark: value,
                        courseId: course?.id,
                        [columnId]: value,
                        courseInfo: {
                            key: columnId
                        }
                    });
                }

                const newData = modifiedData?.map((std: any) => {
                    if (std.id === student.id) {
                        std.studentEvalution = student.studentEvalution;
                    }
                    return std;
                });
                setData(newData);
            },
        },
    });

    const saveStudentEvaluation = async (status: Boolean) => {
        const allEvaluations: any[] = [];
        const month = watch("month")?.value;
        const sessionId = watch("session")?.value;

        if (!month) {
            alert("Month is required!");
            return;
        }

        data.map((student: any) => {
            student?.studentEvalution?.map((evaluation: any) => {
                allEvaluations.push({
                    ...evaluation,
                    status: Number(status),
                    month: month,
                    sessionId: sessionId
                });
                return evaluation;
            });
        });

        try {
            await creteStudentEvaluation(allEvaluations).unwrap()
                .then((res: any) => {
                    setVisible(true)
                    setNotification({
                        url: '',
                        title: translate(langData, lang, LangSetUpForForm.create_message.key) || 'Created Successfully!!',
                        autoClose: true,
                    })
                })
                .catch((err: any) => {
                    return err?.errors?.forEach((value: any) => {
                        return methods.setError(value?.field, { type: "required", message: value?.message })
                    })
                })
        } catch (error) {
        }
    };

    const breadcrumbList = [
        {
            href: "#",
            label: translate(langData, lang, LangSetUpForMenu.student_management.key) || "শিক্ষার্থী ব্যবস্থাপনা",
        },
        {
            href: "/admin/student-management/assessment/monthly-assessment-list",
            label: translate(langData, lang, LangSetUpForMenu.student_management.submodule.assessment.key) || "এসেসমেন্ট",
        },
        {
            href: "/admin/student-management/assessment/monthly-assessment",
            label: translate(langData, lang, LangSetUpForMenu.student_management.submodule.assessment.subchildmodule.monthly_assessment.key) || "মাসিক মূল্যায়ন",
        },
    ];

    return (
        <Box>
            <Box className="table-page">
                <Box className="contentMainField">
                    <Paper>
                        <Box className="breadCrumbBg">
                            <BreadCrumb listItems={breadcrumbList} />
                        </Box>
                    </Paper>
                    <Box className="contentField">
                        <Paper className="paperBody">
                            <Box className="searchContent">
                                <FormProvider {...methods}>
                                    <Box className="" component="form" onSubmit={methods.handleSubmit(panelSearchOnSubmit)}>
                                        <Paper className="paperBody" sx={{ padding: 2, marginTop: 5 }}>
                                            <Box className="searchContent">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={3}>
                                                        <FormInputLabel required={true}>{translate(langData, lang, LangSetUpForStudent.form.educationYear.key) || "শিক্ষাবর্ষঃ"}</FormInputLabel>
                                                        <FormAutocomplete name='session' dataSource={listArrayModify(session?.data, lang)} required />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <FormInputLabel required={true}>{translate(langData, lang, LangSetUpForStudent.form.month.key) || "মাস"}</FormInputLabel>
                                                        <FormAutocomplete name='month' dataSource={months} required />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <FormInputLabel>{translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "জেলাঃ"}</FormInputLabel>
                                                        <FormAutocomplete name='district' dataSource={listArrayModify(district?.data)} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <FormInputLabel>{translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "উপজেলাঃ"}</FormInputLabel>
                                                        <FormAutocomplete name='upazilla' dataSource={listArrayModify(upazila?.data)} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormInputLabel>{translate(langData, lang, LangSetUpForCenter.list.centerLevel.key) || "শিক্ষাস্তরঃ"}</FormInputLabel>
                                                        <FormAutocomplete name='centerType' dataSource={listArrayModify(centerTypeList?.data)} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <FormInputLabel required={true}>{translate(langData, lang, LangSetUpForCenter.list.centerName.key) || "কেন্দ্রের নাম"}</FormInputLabel>
                                                        <FormAutocomplete name='centerName' dataSource={listArrayModify(centerNames)} required />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <FormInputLabel required={true}>{translate(langData, lang, LangSetUpForCenter.list.centerCode.key) || "কোড নম্বরঃ"}</FormInputLabel>
                                                        <FormAutocomplete name='centerCode' dataSource={listArrayModifyCenterCode(centerCodes)} required />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12 / 2}
                                            xl={12 / 2}
                                        >
                                            <Box display="flex" justifyContent="flex-end">
                                                <Button type="button" className="resetBtn" onClick={resetSearch}>
                                                    <RestartAltIcon />
                                                    {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"}
                                                </Button>
                                                <Button type="submit" className="searchBtn">
                                                    {translate(langData, lang, LangSetUpForList.search.key) || "Search"}
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Box>
                                </FormProvider>
                            </Box>
                        </Paper>
                        {/* table area start */}
                        {submitStatus &&
                            <Paper className="paperBody">
                                <Box>
                                    <ReactTable dataSource={table} />
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12 / 2}
                                        xl={12 / 2}
                                    >
                                        <Box display="flex" justifyContent="flex-end">
                                            <Button type="button" className="resetBtn" onClick={resetEvaluation}>
                                                {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"}
                                            </Button>
                                            <Button type="button" className="searchBtn" onClick={() => saveStudentEvaluation(false)}>
                                                {translate(langData, lang, LangSetUpForForm.save_draft.key) || "Save as draft"}
                                            </Button>
                                            <Button type="submit" className="searchBtn" onClick={() => saveStudentEvaluation(true)}>
                                                {translate(langData, lang, LangSetUpForForm.submit.key) || "Save"}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Box>
                            </Paper>
                        }
                        {/* table area end */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default AddMonthlyAssessment;