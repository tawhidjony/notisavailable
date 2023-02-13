import { yupResolver } from '@hookform/resolvers/yup';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Collapse, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useGetLearningCenterListQuery } from 'Api/Center/LearningCenter';
import { useGetLearningcentertypeAllListQuery } from 'Api/Center/LearningCenterType';
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District";
import { useGetDivisionListQuery } from 'Api/SystemConfiguration/Division';
import { useGetUpazilaListQuery } from 'Api/SystemConfiguration/Upazila';
import AlertDialog from 'components/common/DeleteModal';
import FormAutocomplete from 'components/common/FormItem/FormAutocomplete';
import { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
import PaginationComponent from 'components/common/Pagination';
import ReactPrint from "components/common/ReactPrint";
import ReactTable from "components/common/ReactTable";
import { LangSetUpForStudent } from "Utils/Language/StudentManagement";

import { useGetSessionListQuery } from 'Api/Global/Session';
import { useExportToStudentMonthlyEvaluationCenterPDFMutation, useGetStudentMonthlyEvaluationQuery } from 'Api/StudentManagement/Evaluation';
import { useDeletePrimaryAdmissionInfoMutation } from 'Api/StudentManagement/PrimaryAdmission';
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';
import { globalFilterTableData } from 'components/common/ReactTable/utility/GlobalDataFilter';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useReactToPrint } from "react-to-print";
import { RootState } from 'Store';
import { useDebounce } from 'use-debounce';
import { months } from 'Utils/commonJson';
import { AddIcon, EditIcon, ExcelIcon, PdfIcon, PrintIcon, ViewIcon } from "Utils/CustomIcons";
import { EnumPaginationType } from 'Utils/Enums/PaginationType';
import { IndexSerial, listArrayModify, listArrayModifyCenterCode, translate } from 'Utils/Handler';
import { LangSetUpForForm } from 'Utils/Language/MasterData/Form';
import { LangSetUpForList } from 'Utils/Language/MasterData/List';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { TypeOf } from 'yup';
import { StudentManagementList } from '../Model';
import { panelSearchSchema } from '../Schema';


const columnHelper = createColumnHelper<StudentManagementList>();

const MonthlyAssessmentList = () => {

  const componentRef = useRef(null);
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [expand, setExpand] = useState(false)
  const [itemIds, setItemIds] = useState({
    centerId: "",
    sessionId: ""
  })

  const [searchValue, setSearchValue] = useState("");
  const [globalFilter] = useDebounce(searchValue, 1000);

  const [districtNames, setDistrictNames] = useState([]);
  const [upazilaNames, setUpazilaNames] = useState([]);

  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const [params, setParams] = useState<any>({
    page: EnumPaginationType.PAGE,
    limit: EnumPaginationType.PER_PAGE_SIZE,
    divisionId: "",
    districtId: "",
    upazilaId: "",
    sessionId: "",
    learningcenterId: ""
  })

  const [exportToPDF] = useExportToStudentMonthlyEvaluationCenterPDFMutation();

  const [deleteItem] = useDeletePrimaryAdmissionInfoMutation()

  type IPanelSearchSchemaProp = TypeOf<typeof panelSearchSchema>;
  const methods = useForm<IPanelSearchSchemaProp>({
    mode: 'onChange',
    resolver: yupResolver(panelSearchSchema),
    defaultValues: {
      division: { label: '', value: '' },
      district: { label: '', value: '' },
      upazila: { label: '', value: '' },
      center_code: { label: '', value: '' },
      center_name: { label: '', value: '' },
      session: { label: '', value: '' },
      month: { label: '', value: '' }
    },
  })

  const { setValue, watch } = methods;

  const { data: monthlyEvaluationList, refetch } = useGetStudentMonthlyEvaluationQuery(params)
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery({ divisionId: methods.watch()?.division?.value })
  const { data: upazila } = useGetUpazilaListQuery({ districtId: methods.watch()?.district?.value })
  const { data: learningcentertype } = useGetLearningcentertypeAllListQuery()
  const { data: learningcenterList } = useGetLearningCenterListQuery("")
  const { data: session } = useGetSessionListQuery();
  const [centerNames, setCenterNames] = useState([]);
  const [centerCodes, setCenterCodes] = useState([]);


  const panelSearchOnSubmit: SubmitHandler<IPanelSearchSchemaProp> = (items: IPanelSearchSchemaProp) => {
    let divisionId = items?.division?.value;
    let districtId = items?.district?.value;
    let upazilaId = items?.upazila?.value;
    let learningcenterId = items?.center_name?.value;
    let sessionId = items?.session?.value;
    let month = items?.month?.value;
    setParams((params: any) => ({ ...params, divisionId, districtId, learningcenterId, upazilaId, sessionId, month }))
    refetch()
  }

  const columns = useMemo(() => [
    columnHelper.accessor((tableField, index) => IndexSerial(params.page, params.limit, index), {
      id: 'SL',
      header: translate(langData, lang, LangSetUpForList.sl.key) || "SL",
    }),
    columnHelper.accessor((tableField) => tableField?.studentInfo?.learning_center_id?.code, {
      id: 'code',
      header: translate(langData, lang, LangSetUpForStudent.list.centerCode.key) || "Center Code"
    }),
    columnHelper.accessor((tableField) => tableField?.studentInfo?.learning_center_id?.name_bn, {
      id: 'name_en',
      header: translate(langData, lang, LangSetUpForStudent.list.centerName.key) || "Center Name"
    }),
    columnHelper.accessor((tableField) => tableField?.studentInfo?.learning_center_id?.centertypeId?.name_bn, {
      id: 'center_type',
      header: translate(langData, lang, LangSetUpForStudent.form.centerType.key) || "Center Type"
    }),
    columnHelper.accessor((tableField) => tableField?.sessionInfo?.name_bn, {
      id: 'session',
      header: translate(langData, lang, LangSetUpForStudent.form.educationYear.key) || "শিক্ষাবর্ষঃ"
    }),
    columnHelper.accessor((tableField) => tableField?.month, {
      id: 'month',
      header: translate(langData, lang, LangSetUpForStudent.form.month.key) || "Month"
    }),
    columnHelper.accessor((tableField) => tableField.status, {
      id: 'status',
      header: translate(langData, lang, LangSetUpForList.status.key) || "Status",
      cell: (status) => {
        return (<Typography color={status.row.original.status === 1 ? "primary" : "error"} >{status.row.original.status === 1 ? "Submitted" : "Draft"} </Typography>)
      }
    }),

    columnHelper.accessor(() => "", {
      id: 'action',
      header: translate(langData, lang, LangSetUpForList.action.key) || "Action",
      cell: (data) => {
        return (
          <Box className="actionField">
            <Button
              type="button"
              startIcon={<ViewIcon />}
              LinkComponent={Link}
              href={`/admin/student-management/assessment/monthly-assessment/${data?.row?.original?.studentInfo?.learning_center_id?.id}/${data?.row?.original?.sessionInfo?.id}/${data.row?.original?.month}/view`}
            />
            <Button
              type="button"
              startIcon={<EditIcon />}
              LinkComponent={Link}
              href={`/admin/student-management/assessment/monthly-assessment/${data?.row?.original?.studentInfo?.learning_center_id?.id}/${data?.row?.original?.sessionInfo?.id}/${data.row?.original?.month}/edit`}
            />
            {/* <Button
              type="button"
              startIcon={<EditIcon />}
              LinkComponent={Link}
            />
            <Button
              type="button"
              startIcon={<DeleteIcon />}
            /> */}
          </Box>
        )
      }
    }),
  ], [lang, langData, params])

  useEffect(() => {
    if (session?.data?.length) {
      const currentSession = session?.data?.find((sessionInfo: any) => sessionInfo.name_en == new Date().getFullYear());
      if (currentSession) {
        setValue("session", { label: currentSession.name_en, value: currentSession.id });
        setValue("month", { label: months[new Date().getMonth()].label, value: months[new Date().getMonth()].value });
      }
    }
  }, [session]);

  const table = useReactTable({
    data: monthlyEvaluationList?.data || [].length === 0,
    columns,
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

  const onChangePagination = useCallback((page: any) => {
    setParams((params: any) => ({ ...params, page }))
  }, [params])


  useEffect(() => {
    setCenterNames(learningcenterList?.data);
    setCenterCodes(learningcenterList?.data);
  }, [learningcenterList]);

  // Center Name Search
  useEffect(() => {
    const centerId = watch("center_name")?.value;
    if (centerId) {
      const selectCenters = learningcenterList?.data?.filter((center: any) => center?.id == centerId);
      setCenterCodes(selectCenters);
    } else {
      setCenterCodes(learningcenterList?.data);
    }
  }, [watch("center_name")]);

  // Center Code Search
  useEffect(() => {
    const centerId = watch("center_code")?.value;
    if (centerId) {
      const selectCenters = learningcenterList?.data?.filter((center: any) => center?.id == centerId);
      setCenterNames(selectCenters);
    } else {
      setCenterNames(learningcenterList?.data);
    }
  }, [watch("center_code")]);

  const onDeleteSubmit = async () => {
    await deleteItem({
      centerId: itemIds.centerId,
      sessionId: itemIds.sessionId
    }).unwrap().then((res: any) => setOpen(false))
  }

  const handleClickToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "React Print Islamic Foundation",
    onAfterPrint: () => console.log("Print Success")
  })

  const handleExpandClick = () => setExpand(!expand);

  const handleExportToPdf = async () => {
    const headerColumns = columns.filter(column => column.id !== "action").map(pdf => pdf.header);
    let paramString: any = [];
    Object.keys(params).map(key => {
      if (key !== "page" && key !== "limit") {
        paramString.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
      }
    });

    const data = {
      headerColumns,
      totalColumns: headerColumns.length,
      panelSearch: paramString.join("&"),
      lang
    };
    try {
      await exportToPDF(data);
    } catch (error) {
      console.error("PDF err ", error);
    }
  };

  const breadcumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.student_management.key) || 'Student Management' },
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.student_management.submodule.assessment.key) || 'evaluation Assessment' },
    {
      href: '/admin/student-management/add', label: translate(langData, lang, LangSetUpForMenu.student_management.submodule.assessment.subchildmodule.monthly_assessment.key) || 'মাসিক মূল্যায়ন'
    }
  ]

  return (
    <>
      <Box className="table-page">
        <Box className="contentMainField">
          <Paper>
            <Box className="breadCrumbBg">
              <BreadCrumb listItems={breadcumbLink} />
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
                    {methods.watch().district?.value && (<><span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                    </span><span className="textColor"> {methods.watch().district?.label},</span></>)}
                    {methods.watch().upazila?.value && (<><span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                    </span> <span className="textColor"> {methods.watch().upazila?.label},</span></>)}
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
                        {/* <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}
                          </FormInputLabel>
                          <FormAutocomplete name='division' dataSource={listArrayModify(divisionList?.data)} />
                        </Grid> */}
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                          </FormInputLabel>
                          <FormAutocomplete name='district' dataSource={listArrayModify(districtList?.data)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                          </FormInputLabel>
                          <FormAutocomplete name='upazila' dataSource={listArrayModify(upazila?.data)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForStudent.list.centerCode.key) || "Center Code"}
                          </FormInputLabel>
                          <FormAutocomplete name='center_code' dataSource={listArrayModifyCenterCode(centerCodes)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5}>
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForStudent.list.centerName.key) || "Center Name"}
                          </FormInputLabel>
                          <FormAutocomplete name='center_name' dataSource={listArrayModify(centerNames)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>{translate(langData, lang, LangSetUpForStudent.form.educationYear.key) || "শিক্ষাবর্ষঃ"}</FormInputLabel>
                          <FormAutocomplete name='session' dataSource={listArrayModify(session?.data)} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormInputLabel>{translate(langData, lang, LangSetUpForStudent.form.month.key) || "মাস"}</FormInputLabel>
                          <FormAutocomplete name='month' dataSource={months} />
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
                                  methods.reset();
                                  setParams((params: any) => ({ ...params, divisionId: "", districtId: "", upazilaId: "", learningcenterId: "", sessionId: "", month: "" }))
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
                        <li>
                          <Button type="button" onClick={() => router.push('/admin/student-management/assessment/monthly-assessment')} startIcon={<AddIcon />}>
                            মাসিক মূল্যায়ন যুক্ত করুন
                          </Button>
                        </li>
                      </ul>
                    </Box>
                  </Grid>
                  {/* table search bar area end  */}
                </Grid>

                {/* table area start  */}
                <ReactTable dataSource={table} />
                {/* table area end  */}

              </Box>
              {/* pagination start */}
              <PaginationComponent
                paginationData={monthlyEvaluationList?.metaData}
                getPageNumber={(page: number) => onChangePagination({ page })}
                getJumpPageNumber={(page: number) => onChangePagination({ page })}
                getPageLimit={(limit: number) => onChangePagination({ limit })}
              />
              {/* pagination end */}
            </Paper>
          </Box>

          {/* Notification Modal start */}
          {open === true && <AlertDialog
            open={open}
            closeDialog={() => setOpen(false)}
            modeType={"delete"}
            actionFunction={onDeleteSubmit}
          />}
          {/* Notification Modal End */}
        </Box>
        <Box sx={{ display: 'none' }}>
          <ReactPrint dataSource={table} dataRef={componentRef} />
        </Box>
      </Box></>
  )
}

export default MonthlyAssessmentList