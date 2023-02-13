import { ExpandLess, ExpandMore } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ExcelIcon, PdfIcon, PrintIcon } from "Utils/CustomIcons";

import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button, Collapse, Grid,
  List, Paper, Typography
} from "@mui/material";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useGetLearningCenterListQuery } from "Api/Center/LearningCenter";
import { useGetCourseListQuery } from "Api/Global/Course";
import { useGetSessionListQuery } from "Api/Global/Session";
import { useExportToStudentYearlyEvaluationPDFMutation, useGetStudentYearlyEvaluationQuery } from "Api/StudentManagement/Evaluation";
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District";
import { useGetUpazilaListQuery } from "Api/SystemConfiguration/Upazila";
import FormAutocomplete from "components/common/FormItem/FormAutocomplete";
import { FormInputLabel } from "components/common/FormItem/FormInputBootstrap";
import BreadCrumb from "components/common/PageBreadCrumb/BreadCrumb";
import PaginationComponent from "components/common/Pagination";
import ReactPrint from "components/common/ReactPrint";
import { globalFilterTableData } from "components/common/ReactTable/utility/GlobalDataFilter";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { RootState } from "Store";
import { useDebounce } from "use-debounce";
import { EnumLangTypes } from "Utils/Enums/LangType";
import { EnumPaginationType } from "Utils/Enums/PaginationType";
import { getGrade, IndexSerial, listArrayModify, listArrayModifyCenterCode, translate } from "Utils/Handler";
import { LangSetUpForForm } from "Utils/Language/MasterData/Form";
import { LangSetUpForList } from "Utils/Language/MasterData/List";
import { LangSetUpForMenu } from "Utils/Language/Menu";
import { LangSetUpForStudent } from "Utils/Language/StudentManagement";
import { TypeOf } from "yup";
import { panelSearchSchema } from "./Schema";

const ReactTable = dynamic(() => import('components/common/ReactTable'), { suspense: true })

const columnHelper = createColumnHelper<any>();

const AnnualAssessment = () => {

  type IPanelSearchSchemaProp = TypeOf<typeof panelSearchSchema>;

  const methods = useForm<IPanelSearchSchemaProp>({
    mode: 'onChange',
    resolver: yupResolver(panelSearchSchema),
    defaultValues: {
      districtId: { label: "", value: "" },
      upazilaId: { label: "", value: "" },
      centerName: { label: "", value: "" },
      centerCode: { label: "", value: "" },
      session: { label: "", value: "" }
    },
  })

  const { watch, setValue, reset } = methods;

  const componentRef = useRef(null);
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [expand, setExpand] = useState(true)
  const [searchValue, setSearchValue] = useState("");
  const [globalFilter] = useDebounce(searchValue, 1000);
  const [params, setParams] = useState<any>({
    page: EnumPaginationType.PAGE,
    limit: EnumPaginationType.PER_PAGE_SIZE,
    districtId: "",
    upazilaId: "",
    learning_center_id: "",
    sessionId: ""
  })
  const { data: districtList } = useGetDistrictListQuery("")
  const { data: upazilaList } = useGetUpazilaListQuery({ districtId: watch().districtId?.value })
  const { data: learningcenterList } = useGetLearningCenterListQuery("")
  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const { data: session } = useGetSessionListQuery();
  const [evaluations, setEvaluations] = useState<any>([]);
  const { data: courseList } = useGetCourseListQuery();
  const [courseColumns, setCourseColumns] = useState([]);
  const [searchData, setSearchData] = useState(false);
  const { data: studentList, isLoading } = useGetStudentYearlyEvaluationQuery(params, { skip: !searchData });
  const [centerNames, setCenterNames] = useState([]);
  const [centerCodes, setCenterCodes] = useState([]);
  const [exportToPDF] = useExportToStudentYearlyEvaluationPDFMutation();

  const panelSearchOnSubmit: SubmitHandler<IPanelSearchSchemaProp> = (items: IPanelSearchSchemaProp) => {
    let districtId = items?.districtId?.value;
    let upazilaId = items?.upazilaId?.value;
    let sessionId = items?.session?.value;
    let learning_center_id = items?.centerCode?.value;

    setParams((params: any) => ({
      ...params,
      sessionId,
      districtId,
      upazilaId,
      learning_center_id,
    }))
    setSearchData(true);
  }

  // Yearly evaluation mark
  useEffect(() => {
    if (studentList?.data?.length) {
      const studentEvaluations = studentList?.data?.map((student: any) => {
        let newStudent: any = {};
        newStudent.total = 0;

        student?.studentEvalution?.map((evaluation: any) => {
          const key = evaluation?.courseInfo?.key?.toString();
          if (!newStudent[key]) {
            const courseMark = student?.studentEvalution?.filter(((std: any) => std.courseInfo.id === evaluation.courseInfo.id)).reduce((sum: number, stdEvaluation: { totalmark: number; }) => sum + stdEvaluation.totalmark, 0)
            newStudent[key] = Math.ceil(courseMark / 12);
            newStudent.total += newStudent[key];
          }
        });
        newStudent.id = student.id;
        newStudent.name_en = student.name_en;
        newStudent.name_bn = student.name_bn;
        newStudent.grade = getGrade(newStudent.total);
        return newStudent;
      });
      setEvaluations(studentEvaluations);
    } else {
      setEvaluations([]);
    }
  }, [studentList]);

  const onChangePagination = useCallback((page: any) => {
    setParams((params: any) => ({ ...params, ...page }))
  }, [params])

  const handleClickToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "React Print Islamic Foundation",
    onAfterPrint: () => console.log("Print Success")
  })
  const handleExpandClick = () => setExpand(!expand)

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
      if (course.id === 1) {
        return columnHelper.accessor((tableField, index) => IndexSerial(params.page, params.limit, index), {
          id: 'sl',
          header: translate(langData, lang, LangSetUpForList.sl.key),
        })
      }
      return columnHelper.accessor((tableField) => tableField[course.key], {
        id: course.key,
        header: lang === EnumLangTypes.ENGLISH ? course.name_en : course.name_bn,
      })
    }), [lang, courseColumns]);



  const table = useReactTable({
    data: evaluations || [].length === 0,
    columns: coursesColumns,
    filterFns: {
      fuzzy: globalFilterTableData,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setSearchValue,
    globalFilterFn: globalFilterTableData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const resetSearch = () => {
    reset();
    setParams((params: any) => ({
      ...params,
      districtId: { label: "", value: "" },
      upazilaId: { label: "", value: "" },
      centerName: { label: "", value: "" },
      centerCode: { label: "", value: "" },
      session: { label: "", value: "" }
    }));
    setSearchData(false);
  };

  // useEffect(() => {
  //   const districtId = watch("districtId")?.value;
  //   const upazilaId = watch("upazilaId")?.value;
  //   if (learningCenterList?.data) {
  //     const filteredCenters = learningCenterList?.data?.filter((center: any) => center?.districtId?.id === districtId && center?.upazilaId?.id === upazilaId);
  //     setCenterNames(filteredCenters);
  //     setCenterCodes(filteredCenters);
  //     if (filteredCenters?.length === 0) {
  //       setValue("centerName", { label: "", value: "" });
  //       setValue("centerCode", { label: "", value: "" });
  //     }
  //   }
  // }, [watch("districtId"), watch("upazilaId")]);

  useEffect(() => {
    if (session?.data?.length) {
      const currentSession = session?.data?.find((sessionInfo: any) => sessionInfo.name_en == new Date().getFullYear());
      if (currentSession) {
        setValue("session", { label: currentSession.name_en, value: currentSession.id });
      }
    }
  }, [session]);

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



  const breadcrumbLink = [
    { href: '#', label: 'Student Management' },
    { href: '/admin', label: "Annual Assessment" }
  ];

  const handleExportToPdf = async () => {
    const headerColumns = courseColumns?.filter((column: any) => column.id !== "action")?.map((pdf: any) => lang === EnumLangTypes.ENGLISH ? pdf?.name_en : pdf?.name_bn);
    const paramString = Object.keys(params).map(key => {
      if (key !== "page" && key !== "limit") {
        return `${key}=${encodeURIComponent(params[key])}`;
      }
    }).join('&');

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


  return (
    <Box className="table-page">
      <Box className="contentMainField">
        <Paper>
          <Box className="breadCrumbBg">
            <BreadCrumb listItems={breadcrumbLink} />
          </Box>
        </Paper>

        <Box className="contentField">
          <Paper className="paperBody">
            <List className="collapsField"
              sx={{ padding: 0, bgcolor: 'background.paper' }}
              component="nav">
              <Box className="dropToggle">
                <Typography>
                  {/* {methods.watch().division?.value && (<><span>
                    {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}
                  </span> <span className="textColor">{methods.watch().division?.label},</span></>)} */}
                  {methods.watch().districtId?.value && (<><span>
                    {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                  </span><span className="textColor"> {methods.watch().districtId?.label},</span></>)}
                  {methods.watch().upazilaId?.value && (<><span>
                    {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                  </span> <span className="textColor"> {methods.watch().upazilaId?.label},</span></>)}
                </Typography>

                <Box onClick={handleExpandClick} className="collapseIcon">
                  {expand ? <ExpandLess fontSize='large' /> : <ExpandMore fontSize='large' />}
                </Box>
              </Box>
              <Collapse in={expand} timeout="auto" unmountOnExit>
                <FormProvider {...methods}>
                  <Box className="searchContent" component="form" onSubmit={methods.handleSubmit(panelSearchOnSubmit)} >
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justifyContent="space-around"
                    >
                      <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                        </FormInputLabel>
                        <FormAutocomplete name='districtId' dataSource={listArrayModify(districtList?.data)} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                        </FormInputLabel>
                        <FormAutocomplete name='upazilaId' dataSource={listArrayModify(upazilaList?.data)} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                        <FormInputLabel required>
                          {translate(langData, lang, LangSetUpForStudent.list.centerName.key) || "Center Name"}
                        </FormInputLabel>
                        <FormAutocomplete name='centerName' dataSource={listArrayModify(centerNames)} required />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                        <FormInputLabel required>
                          {translate(langData, lang, LangSetUpForStudent.list.centerCode.key) || "Center Code"}
                        </FormInputLabel>
                        <FormAutocomplete name='centerCode' dataSource={listArrayModifyCenterCode(centerCodes)} required />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                        <FormInputLabel required>{translate(langData, lang, LangSetUpForStudent.form.educationYear.key) || "শিক্ষাবর্ষঃ"}</FormInputLabel>
                        <FormAutocomplete name='session' dataSource={listArrayModify(session?.data)} required />
                      </Grid>
                    </Grid>

                    <Box className="search2ndField">
                      <Box className="search2ndFieldContent">
                        <Grid
                          container
                          spacing={4}
                          direction="row"
                          justifyContent="space-around"
                        >
                          <Grid item xs={12} sm={12} md={5} lg={3} xl={3}>
                            <Box className="resetBtnField">
                              <Button onClick={() => {
                                setSearchData(false);
                                methods.reset();
                                setParams((params: any) => ({ ...params, divisionId: "", districtId: "", upazilaId: "", centerName: "", centerCode: "", session: "", month: "" }))
                              }} type="button" className="resetBtn">
                                <RestartAltIcon />
                                {translate(langData, lang, LangSetUpForForm.reset.key) || "Reset"}
                              </Button>
                              <Button type="submit" className="searchBtn">
                                {translate(langData, lang, LangSetUpForList.search.key) || "Search"}
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>

                  </Box>
                </FormProvider>
              </Collapse>
            </List>


          </Paper>
          {searchData &&
            <Paper className="paperBody">
              <Box className="tableField tableSpacing">
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <Box className="searchField">
                      <Typography>
                        {translate(langData, lang, LangSetUpForList.search.key) || "Search"}
                      </Typography>
                      <Box component={'form'} >
                        <SearchIcon />
                        <input type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder={translate(langData, lang, LangSetUpForList.typeHere.key) || "Type Here..."} name="search" />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                    <Box className="downloadField">
                      <ul className="exportSec">
                        <li>
                          <Button onClick={handleClickToPrint} type="button" startIcon={<PrintIcon />}>
                            {translate(langData, lang, LangSetUpForList.print.key) || "Print"}
                          </Button>
                        </li>
                        <li>
                          <Button type="button" startIcon={<ExcelIcon />}>
                            {translate(langData, lang, LangSetUpForList.export_to_excel.key) || "Export to Excel"}
                          </Button>
                        </li>
                        <li><Button onClick={handleExportToPdf} type="button" startIcon={<PdfIcon />}>
                          {translate(langData, lang, LangSetUpForList.export_to_pdf.key) || "Export to Pdf"}
                        </Button></li>
                      </ul>
                    </Box>
                  </Grid>
                  {/* table search bar area end  */}
                </Grid>
                <ReactTable dataSource={table} />
              </Box>
              {/* pagination start */}
              {searchData &&
                <PaginationComponent
                  paginationData={evaluations?.metaData}
                  getPageNumber={(page: number) => onChangePagination({ page })}
                  getJumpPageNumber={(page: number) => onChangePagination({ page })}
                  getPageLimit={(limit: number) => onChangePagination({ limit })}
                />
              }
              {/* pagination end */}
            </Paper>
          }
        </Box>
      </Box>
      <Box sx={{ display: 'none' }}>
        <ReactPrint dataSource={table} dataRef={componentRef} />
      </Box>
    </Box>
  );
};

export default AnnualAssessment;