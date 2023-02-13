import { ExpandLess, ExpandMore } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Collapse, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useGetSessionListQuery } from 'Api/Global/Session';
import { useDeleteDesignationMutation } from 'Api/SystemConfiguration/Designation';
import { useGetDistrictListQuery } from 'Api/SystemConfiguration/District';
import { useGetDivisionListQuery } from 'Api/SystemConfiguration/Division';
import { useGetUpazilaListQuery } from 'Api/SystemConfiguration/Upazila';
import { useExportToTeacherEvaluationExcelMutation, useExportToTeacherEvaluationPDFMutation, useGetTeacherEvaluationQuery } from "Api/TeacherManagement/TeacherEvaluation";
import AlertDialog from 'components/common/DeleteModal';
import FormAutocomplete from 'components/common/FormItem/FormAutocomplete';
import { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';
import PaginationComponent from 'components/common/Pagination';
import ReactPrint from "components/common/ReactPrint";
import ReactTable from "components/common/ReactTable";
import { globalFilterTableData } from 'components/common/ReactTable/utility/GlobalDataFilter';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useReactToPrint } from "react-to-print";
import { RootState } from 'Store';
import { useDebounce } from 'use-debounce';
import { AddIcon, DeleteIcon, ExcelIcon, PdfIcon, PrintIcon, ViewIcon } from "Utils/CustomIcons";
import { EnumPaginationType } from 'Utils/Enums/PaginationType';
import { IndexSerial, listArrayModify, translate } from 'Utils/Handler';
import { LangSetUpForForm } from 'Utils/Language/MasterData/Form';
import { LangSetUpForList } from 'Utils/Language/MasterData/List';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { LangSetUpForTeacherEvaluation } from 'Utils/Language/TeacherManagement/TeacherEvaluation';



const columnHelper = createColumnHelper<any>();

const TeacherEvaluationList = () => {


  const componentRef = useRef(null);
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [expand, setExpand] = useState(true)
  const [page, setPage] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)
  const [itemId, setItemIsd] = useState<string>('')
  const [searchValue, setSearchValue] = useState("");
  const [globalFilter] = useDebounce(searchValue, 1000);

  const [params, setParams] = useState<any>({
    page: EnumPaginationType.PAGE,
    limit: EnumPaginationType.PER_PAGE_SIZE,
    teacherId: "",
    learning_center_id: "",
    divisionId: "",
    districtId: "",
    upazilaId: "",
    status: ""
  })

  const { data: teacherEvaluationSummery } = useGetTeacherEvaluationQuery(params)
  const { data: sessionList } = useGetSessionListQuery()
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery("")
  const { data: upazilaList } = useGetUpazilaListQuery("")
  const [deleteItem] = useDeleteDesignationMutation()
  const [exportToPDF] = useExportToTeacherEvaluationPDFMutation();
  const [exportToExcel] = useExportToTeacherEvaluationExcelMutation();
  const { lang, langData } = useSelector((state: RootState) => state.lang);

  const columns = useMemo(() => [

    columnHelper.accessor((tableField, index) => IndexSerial(page, limitPerPage, index), {
      id: 'SL',
      header: translate(langData, lang, LangSetUpForList.sl.key) || "SL"
    }),

    columnHelper.accessor((tableField) => tableField?.sessionInfo?.name_en, {
      id: 'Year',
      header: translate(langData, lang, LangSetUpForTeacherEvaluation.form.year.key) || "Year"
    }),
    columnHelper.accessor((tableField) => tableField?.teacherInfo?.divisionId?.name_en, {
      id: 'Division',
      header: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"
    }),
    columnHelper.accessor((tableField) => tableField?.teacherInfo?.districtId?.name_en, {
      id: 'District',
      header: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District",
    }),
    columnHelper.accessor((tableField) => tableField?.teacherInfo?.upazilaId?.name_en, {
      id: 'Upazila',
      header: translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila",
    }),

    columnHelper.accessor((tableField) => tableField.status, {
      id: 'Status',
      header: translate(langData, lang, LangSetUpForList.status.key) || "Status",
      cell: (status) => {
        return (<Typography color={status.row.original.status === 1 ? "primary" : "error"} >{status.row.original.status === 1 ? "Active" : "Inactive"} </Typography>)
      }
    }),
    columnHelper.accessor(() => "", {
      id: 'action',
      header: translate(langData, lang, LangSetUpForList.action.key) || "Action",
      cell: (data) => {
        const viewIds = data?.row?.original?.teacherInfo
        return (
          <Box className="actionField">
            <Button
              type="button"
              startIcon={<ViewIcon />}
              LinkComponent={Link}
              href={`/admin/teacher-management/teacher-evaluation-summary/${data.row.original.sessionId}/${viewIds?.divisionId.id}/${viewIds?.districtId.id}/${viewIds?.upazilaId.id}`}
            />
            <Button
              type="button"
              startIcon={<DeleteIcon />}
              onClick={() => onDeleteAlert(data.row.original.id)}
            />
          </Box>
        )
      }
    }),
  ], [lang, langData, page, limitPerPage])

  const table = useReactTable({
    data: teacherEvaluationSummery?.data || [].length === 0,
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

  const methods = useForm()

  const panelSearchOnSubmit = (items: any) => {
    let sessionId = items?.sessionId?.value;
    let teacherId = items?.teacherId?.value;
    let learning_center_id = items?.learning_center_id?.value;
    let districtId = items?.districtId?.value;
    let divisionId = items?.divisionId?.value;
    let upazilaId = items?.upazilaId?.value;
    // let status = (items?.status !== "") ? Number(items.status) : "";
    let status = 1;

    setParams((params: any) => ({
      ...params,
      sessionId,
      teacherId,
      learning_center_id,
      divisionId,
      districtId,
      upazilaId,
      status,
    }))
  };

  const paginationChange = (page: number) => setPage(page);

  const onDeleteAlert = (id: string) => {
    setItemIsd(id);
    setOpen(true)
  }
  const onDeleteSubmit = async () => {
    await deleteItem(itemId).unwrap().then((res) => setOpen(false))
  }

  const handleClickToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "React Print Islamic Foundation",
    onAfterPrint: () => console.log("Print Success")
  })
  const breadcrumbLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.teacher_management.key) || 'Teachers' },
    {
      href: '/admin/teacher-management/teacher-evaluation/add', label: translate(langData, lang, LangSetUpForMenu.teacher_management.submodule.evaluation_summary
        .key) || 'Evaluation Summary'
    }
  ]

  const handleExpandClick = () => setExpand(!expand);

  const handleExportToPdf = async () => {
    const headerColumns = columns.filter(column => column.id !== "action").map(pdf => pdf.header);
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

  //Excel
  const handleExportToExcel = async () => {
    console.log('Object.keys', Object.keys(params))
    const paramString = Object.keys(params).map(key => {
      if (key !== "page" && key !== "limit") {
        return `${key}=${encodeURIComponent(params[key])}`;
      }
    }).join('&');
    console.log(paramString);

    const headerColumns = [
      translate(langData, lang, LangSetUpForList.sl.key) || "ক্র/নং",
      translate(langData, lang, LangSetUpForTeacherEvaluation.form.year.key) || "Year",
      translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division",
      translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District",
      translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila",
      translate(langData, lang, LangSetUpForList.status.key) || "স্ট্যাটাসঃ",
    ];
    const data = {
      headerColumns,
      totalColumns: headerColumns.length,
      panelSearch: paramString,
      lang
    };
    try {
      await exportToExcel(data);
    } catch (error) {
      console.error("Excel err ", error);
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
                <Typography></Typography>
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
                      alignItems="stretch"
                    >
                      <Grid item xs={12} lg={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForTeacherEvaluation.form.year.key) || "Year"}
                        </FormInputLabel>
                        <FormAutocomplete name='sessionId' dataSource={listArrayModify(sessionList?.data)} />
                      </Grid>
                      <Grid item xs={12} lg={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}
                        </FormInputLabel>
                        <FormAutocomplete name='divisionId' dataSource={listArrayModify(divisionList?.data)} />
                      </Grid>
                      <Grid item xs={12} lg={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                        </FormInputLabel>
                        <FormAutocomplete name='districtId' dataSource={listArrayModify(districtList?.data)} />
                      </Grid>
                      <Grid item xs={12} lg={3} >
                        <FormInputLabel>
                          {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                        </FormInputLabel>
                        <FormAutocomplete name='upazilaId' dataSource={listArrayModify(upazilaList?.data)} />
                      </Grid>

                    </Grid>

                    <Box className="search2ndField">
                      <Box className="search2ndFieldContent">
                        <Grid
                          container
                          spacing={4}
                          direction="row"
                          justifyContent="space-around"
                          alignItems="stretch"
                        >
                          <Grid item xs={12} sm={12} md={5} lg={3} xl={3}>
                            <Box className="resetBtnField">
                              <Button
                                onClick={() => {
                                  methods.reset();
                                  setParams((params: any) => ({
                                    ...params,
                                    sessionId: "",
                                    teacherId: "",
                                    learning_center_id: "",
                                    divisionId: "",
                                    districtId: "",
                                    upazilaId: "",
                                    status: undefined,
                                  }))
                                }}
                                type="button" className="resetBtn">
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
              {/* table search bar area start  */}
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Box className="searchField">
                    <Typography>
                      {translate(langData, lang, LangSetUpForList.search.key) || "Search"}
                    </Typography>
                    <Box component={'form'} >
                      <SearchIcon />
                      <input
                        type="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder={translate(langData, lang, LangSetUpForList.typeHere.key) || "Type Here..."}
                        name="search"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }} xs={12} sm={12} md={12} lg={8} xl={8}>
                  <Box className="downloadField">
                    <ul className="exportSec">
                      <li>
                        <Button onClick={handleClickToPrint} type="button" startIcon={<PrintIcon />}>
                          {translate(langData, lang, LangSetUpForList.print.key) || "Print"}
                        </Button>
                      </li>
                      <li>
                        <Button type="button" onClick={handleExportToExcel} startIcon={<ExcelIcon />}>
                          {translate(langData, lang, LangSetUpForList.export_to_excel.key) || "Export to Excel"}
                        </Button>
                      </li>
                      <li>
                        <Button type="button" onClick={handleExportToPdf} startIcon={<PdfIcon />}>
                          {translate(langData, lang, LangSetUpForList.export_to_pdf.key) || "Export to Pdf"}
                        </Button>
                      </li>

                      <li>
                        <Button type="button" onClick={() => router.push('/admin/teacher-management/teacher-evaluation/add')} startIcon={<AddIcon />}>
                          {translate(langData, lang, LangSetUpForTeacherEvaluation.form.addTeacherEvaluation.key) || "Add Teacher Evaluation"}
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
              paginationData={teacherEvaluationSummery?.metaData}
              getPageNumber={paginationChange}
              getjumpPageNumber={(pageNumber: number) => setPage(pageNumber)}
              getPageLimit={(limitNumber: number) => setLimitPerPage(limitNumber)}
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
    </Box>
  )
}

export default TeacherEvaluationList