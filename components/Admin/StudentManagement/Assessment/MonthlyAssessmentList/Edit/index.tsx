import {
    Box,
    Button, Grid, Paper, Typography
} from "@mui/material";
import {
    createColumnHelper, getCoreRowModel, useReactTable
} from '@tanstack/react-table';
import { useGetCourseListQuery } from "Api/Global/Course";
import { useCreateStudentMonthlyEvaluationMutation } from "Api/StudentManagement/Evaluation";
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb";
import ReactTable from 'components/common/ReactTable';
import { globalFilterTableData } from "components/common/ReactTable/utility/GlobalDataFilter";
import { defaultEditableColumn, useSkipper } from "context/EditableTable";
import { useHotNotification } from "context/HotNotificationProvider";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "Store";
import { EnumLangTypes } from "Utils/Enums/LangType";
import { IndexSerial, translate } from 'Utils/Handler';
import { LangSetUpForForm } from "Utils/Language/MasterData/Form";
import { LangSetUpForMenu } from "Utils/Language/Menu";

const columnHelper = createColumnHelper();

const EditMonthlyAssessment = (props: any) => {
    const { studentList } = props;
    const [studentParams, setStudentParams] = useState("");
    const { data: courseList } = useGetCourseListQuery();
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
    const { lang, langData } = useSelector((state: RootState) => state.lang);
    const [data, setData] = useState([]);
    const [resetEvaluationStatus, setResetEvaluationStatus] = useState(false);
    const [courseColumns, setCourseColumns] = useState([]);
    const [creteStudentEvaluation] = useCreateStudentMonthlyEvaluationMutation()
    const { setVisible, setNotification } = useHotNotification();

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

    useEffect(() => {
        setData(studentList);
    }, [studentList]);


    // Course Columns Headers
    const coursesColumns = useMemo(() =>
        courseColumns?.map((course: any) => {
            return columnHelper.accessor((tableField, index) => IndexSerial(1, 100, index), {
                id: course?.key || course?.id,
                header: lang === EnumLangTypes.BANGLA ? course.name_bn : course.name_en,
                size: course.marks
            });
        }), [lang, courseColumns]);


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
        const month = studentList?.[0]?.studentEvalution?.[0]?.month;
        const sessionId = studentList?.[0]?.studentEvalution?.[0]?.sessionId;

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
                        url: '/admin/student-management/assessment/monthly-assessment-list',
                        title: translate(langData, lang, LangSetUpForForm.update_message.key) || 'Updated Successfully!!',
                        autoClose: true,
                    })
                })
                .catch((err: any) => {
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
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="stretch"
                        textAlign="center"
                    >
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                            <Box className="shikkhaBorsho">
                                <Typography>
                                    <span>শিক্ষার্বষঃ</span>
                                    <span className="colorText">{studentList?.[0]?.session?.name_bn}</span> <span>মাসঃ</span>
                                    <span className="colorText">{studentList?.[0]?.studentEvalution?.[0]?.month}</span>
                                </Typography>
                                <Typography>
                                    <span>শিক্ষাঃ</span>
                                    <span className="colorText">
                                        {studentList?.[0]?.learning_center_id?.centertypeId?.name_bn}
                                    </span>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                            <Box>
                                <Typography>মসজিদভিত্তিক ও গণশিক্ষা কার্যক্রম</Typography>
                                <Typography className="officeName">
                                    ইসলামিক ফাউন্ডেশন
                                </Typography>
                                <Typography>
                                    মাসিক শিক্ষার্থী মূল্যায়ন ও অগ্রগতি ফর্ম
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                            <Box className="gradeField">
                                <Typography className="markTitle">
                                    সার্বিক গ্রেডিং মানঃ
                                </Typography>
                                <Typography>৯০% এর উপরে হলে খুব ভালো (A)</Typography>
                                <Typography>৮০%-৮৯% পর্যন্ত ভালো (B)</Typography>
                                <Typography>
                                    ৬০%-৭৯% পর্যন্ত মোটামুটি ভালো (C) ৬০%
                                </Typography>
                                <Typography>এর নিচে হলে পিছিয়ে পড়া (D)</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box className="contentField">
                        {/* table area start */}
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
                                        <Button type="submit" className="searchBtn" onClick={() => saveStudentEvaluation(true)}>
                                            {translate(langData, lang, LangSetUpForForm.update.key) || "Save"}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Box>
                        </Paper>

                        {/* table area end */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default EditMonthlyAssessment;