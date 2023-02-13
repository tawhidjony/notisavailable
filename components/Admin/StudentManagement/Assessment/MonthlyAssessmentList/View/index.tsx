import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  Grid,
  Paper, Typography
} from "@mui/material";
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useGetCourseListQuery } from 'Api/Global/Course';
import { useExportToStudentMonthlyEvaluationStudentPDFMutation } from 'Api/StudentManagement/Evaluation';
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb";
import ReactTable from 'components/common/ReactTable';
import { globalFilterTableData } from 'components/common/ReactTable/utility/GlobalDataFilter';
import { useSkipper } from 'context/EditableTable';
import { defaultMonthlyAssessmentColumn } from 'context/MonthlyAssessmentTable';
import Link from "next/link";
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'Store';
import { ExcelIcon, PdfIcon, PrintIcon } from "Utils/CustomIcons";
import { EnumLangTypes } from 'Utils/Enums/LangType';
import { IndexSerial, translate } from 'Utils/Handler';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { monthlyAssessmentListStyle } from "./viewStyle";

const columnHelper = createColumnHelper();

const MonthlyAssessmentList = (props: any) => {
  const { studentList } = props;

  const { data: courseList } = useGetCourseListQuery();
  const [data, setData] = useState([]);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [courseColumns, setCourseColumns] = useState([]);
  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const [exportToPDF] = useExportToStudentMonthlyEvaluationStudentPDFMutation();

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

  // Course Columns Headers
  const coursesColumns = useMemo(() =>
    courseColumns?.map((course: any) => {
      return columnHelper.accessor((tableField, index) => IndexSerial(1, 100, index), {
        id: course?.key || course?.id,
        header: lang === EnumLangTypes.BANGLA ? course.name_bn : course.name_en,
        size: course.marks
      });
    }), [lang, courseColumns]);

  const handleExportToPdf = async () => {
    const headerColumns = coursesColumns.filter((column: any) => column.id !== "action").map(pdf => pdf.header);
    let paramString: string = `learning_center_id=${studentList?.[0]?.learning_center_id?.id}&sessionId=${studentList?.[0]?.session?.id}&month=${studentList?.[0]?.studentEvalution?.[0]?.month}`;

    const data = {
      headerColumns,
      totalColumns: headerColumns.length,
      panelSearch: paramString,
      lang
    };

    try {
      await exportToPDF(data);
    } catch (error) {
      console.error("PDF err ", error);
    }
  };


  const breadcumLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.student_management.key) || 'Student Management' },
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.student_management.submodule.assessment.key) || 'evaluation Assessment' },
    {
      href: '/admin/student-management/add', label: translate(langData, lang, LangSetUpForMenu.student_management.submodule.assessment.subchildmodule.monthly_assessment.key) || 'মাসিক মূল্যায়ন'
    }
  ];

  const table = useReactTable({
    data: studentList || [],
    columns: coursesColumns,
    defaultColumn: defaultMonthlyAssessmentColumn,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: globalFilterTableData,
    },
    meta: {
      updateData: (rowIndex: number, columnId: any, value: any) => {
        skipAutoResetPageIndex();
        const modifiedData = JSON.parse(JSON.stringify(studentList));
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


  return (
    <Box sx={{ ...monthlyAssessmentListStyle }}>
      <Paper className="paperBody">
        <Paper>
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcumLink} />
          </Box>
        </Paper>
        <Box className="backBtnWrapper">
          <Link href="/admin/student-management/assessment/monthly-assessment-list"><ArrowBackIcon /></Link>
          <Box>
            <ul className="exportList">
              <li className="iconWrapper">
                <Button type="button" ><PrintIcon /></Button>
              </li>
              <li className="iconWrapper">
                <Button type="button" > <ExcelIcon /></Button>
              </li>
              <li className="iconWrapper"><Button onClick={handleExportToPdf} type="button" ><PdfIcon /> </Button>
              </li>
            </ul>
          </Box>
        </Box>
        <Box className="tableField">
          <Box className="progressHeadField">
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
          </Box>
          <Box className="addressLine">
            <span>কেন্দ্রের নামঃ</span>
            <span className="colorText">{studentList?.[0]?.learning_center_id?.name_bn}</span>
            <span> কোড নম্বরঃ </span>
            <span className="colorText">{studentList?.[0]?.learning_center_id?.code}</span>
            <span> উপজেলাঃ </span>
            <span className="colorText">{studentList?.[0]?.upazilaId?.name_bn}</span>
            <span> জেলাঃ </span>
            <span className="colorText">{studentList?.[0]?.districtId?.name_bn}</span>
            <span> মাসিক মূল্যায়নের জন্য বরাদ্দকৃত মোট নম্বরঃ 100</span>
          </Box>
          <ReactTable dataSource={table} />
        </Box>
      </Paper>
    </Box>
  );
};

export default MonthlyAssessmentList;