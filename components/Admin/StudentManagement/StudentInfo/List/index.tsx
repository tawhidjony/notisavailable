import { yupResolver } from '@hookform/resolvers/yup';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Collapse, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useGetLearningCenterListQuery } from 'Api/Center/LearningCenter';
import { useGetLearningcentertypeAllListQuery } from 'Api/Center/LearningCenterType';
import { useDeleteStudentInfoMutation, useExportToStudentExcelMutation, useExportToStudentListPDFMutation, useGetStudentInfoQuery } from 'Api/StudentManagement/StudentInfo';
import { useGetDistrictListQuery } from "Api/SystemConfiguration/District";
import { useGetDivisionListQuery } from 'Api/SystemConfiguration/Division';
import { useGetUpazilaListQuery } from 'Api/SystemConfiguration/Upazila';
import AlertDialog from 'components/common/DeleteModal';
import FormAutocomplete from 'components/common/FormItem/FormAutocomplete';
import FormInputBootstrap, { FormInputLabel } from 'components/common/FormItem/FormInputBootstrap';
import FormSelect from 'components/common/FormItem/FormSelect';
import PaginationComponent from 'components/common/Pagination';
import ReactPrint from "components/common/ReactPrint";
import ReactTable from "components/common/ReactTable";
import { LangSetUpForStudent } from "Utils/Language/StudentManagement";

import BreadCrumb from 'components/common/PageBreadCrumb/BreadCrumb';
import { globalFilterTableData } from 'components/common/ReactTable/utility/GlobalDataFilter';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useReactToPrint } from "react-to-print";
import { RootState } from 'Store';
import { useDebounce } from 'use-debounce';
import { AddIcon, DeleteIcon, EditIcon, ExcelIcon, PdfIcon, PrintIcon, ViewIcon } from "Utils/CustomIcons";
import { EnumPaginationType } from 'Utils/Enums/PaginationType';
import { IndexSerial, listArrayModify, listArrayModifyCenterCode, translate } from 'Utils/Handler';
import { LangSetUpForForm } from 'Utils/Language/MasterData/Form';
import { LangSetUpForList } from 'Utils/Language/MasterData/List';
import { LangSetUpForMenu } from 'Utils/Language/Menu';
import { LangSetUpForTeacher } from 'Utils/Language/TeacherManagement';
import { TypeOf } from 'yup';
import { StudentManagementList } from '../Model';
import { panelSearchSchema } from '../Schema';


const columnHelper = createColumnHelper<StudentManagementList>();

const StudentManagementList = () => {

  const componentRef = useRef(null);
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [expand, setExpand] = useState(false)
  const [itemId, setItemIsd] = useState<string>('')

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
    roll_number: "",
    name_en: "",
    name_bn: "",
    status: ""
  })



  const [deleteItem] = useDeleteStudentInfoMutation()

  type IPanelSearchSchemaProp = TypeOf<typeof panelSearchSchema>;
  const methods = useForm<IPanelSearchSchemaProp>({
    mode: 'onChange',
    resolver: yupResolver(panelSearchSchema),
    defaultValues: {
      division_search: { label: '', value: '' },
      district_search: { label: '', value: '' },
      upazila_search: { label: '', value: '' },
      center_type_search: { label: '', value: '' },
      center_code_search: { label: '', value: '' },
      center_name_search: { label: '', value: '' },
      name_bn_search: "",
      name_en_search: "",
      roll_number_search: "",
      status: ""
    },
  })

  const { data: studentMangementListShow, refetch } = useGetStudentInfoQuery(params)
  const { data: divisionList } = useGetDivisionListQuery()
  const { data: districtList } = useGetDistrictListQuery({ divisionId: methods.watch()?.division_search?.value })
  const { data: upazila } = useGetUpazilaListQuery({ districtId: methods.watch()?.district_search?.value })
  const { data: learningcentertype } = useGetLearningcentertypeAllListQuery()
  const { data: learningcenterList } = useGetLearningCenterListQuery("")
  const [exportToPDF] = useExportToStudentListPDFMutation();
  const [exportToExcel] = useExportToStudentExcelMutation();


  const panelSearchOnSubmit: SubmitHandler<IPanelSearchSchemaProp> = (items: IPanelSearchSchemaProp) => {
    let divisionId = items?.division_search?.value;
    let districtId = items?.district_search?.value;
    let upazilaId = items?.upazila_search?.value;
    let centertypeId = items?.center_type_search?.value;
    let code = items?.center_code_search?.value;
    let learning_center_id = items?.center_name_search?.value;
    let status = items?.status !== "" ? Number(items.status) : "";
    let name_en = items?.name_en_search;
    let name_bn = items?.name_bn_search;
    let roll_number = items?.roll_number_search;
    setParams((params: any) => ({ ...params, name_en, name_bn, status, divisionId, districtId, roll_number, upazilaId, centertypeId, code, learning_center_id }))
    refetch()
  }

  const columns = useMemo(() => [
    columnHelper.accessor((tableField, index) => IndexSerial(params.page, params.limit, index), {
      id: 'SL',
      header: translate(langData, lang, LangSetUpForList.sl.key) || "SL",
    }),
    columnHelper.accessor((tableField) => tableField?.learning_center_id?.code, {
      id: 'code',
      header: translate(langData, lang, LangSetUpForStudent.list.centerCode.key) || "Center Code"
    }),
    columnHelper.accessor((tableField) => tableField?.learning_center_id?.name_en, {
      id: 'center_name_en',
      header: translate(langData, lang, LangSetUpForStudent.list.centerName.key) || "Center Name"
    }),
    columnHelper.accessor((tableField) => tableField?.name_en, {
      id: 'name_en',
      header: translate(langData, lang, LangSetUpForStudent.list.studentName.key) + translate(langData, lang, LangSetUpForForm.english.key) || "Student Name En"
    }),
    columnHelper.accessor((tableField) => tableField?.name_bn, {
      id: 'name_bn',
      header: translate(langData, lang, LangSetUpForStudent.list.studentName.key) + translate(langData, lang, LangSetUpForForm.bangla.key) || "Student Name Bn"
    }),
    columnHelper.accessor((tableField) => tableField?.roll_number, {
      id: 'roll_number',
      header: translate(langData, lang, LangSetUpForStudent.list.studentRoll.key) || "Roll No"
    }),
    columnHelper.accessor((tableField) => tableField.learning_center_id?.centertypeId?.name_en, {
      id: 'division',
      header: translate(langData, lang, LangSetUpForStudent.list.centerLevel.key) || "Center Level"
    }),

    columnHelper.accessor((tableField) => tableField.status, {
      id: 'Status',
      header: translate(langData, lang, LangSetUpForTeacher.list.status.key) || "Status",
      cell: (status) => {
        return (<Typography color={status.row.original.status === 1 ? "primary" : "error"} >{status.row.original.status === 1 ? "Active" : "Inactive"} </Typography>)
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
              href={`/admin/student-management/student-info/${data.row.original.id}/view`}
            />
            <Button
              type="button"
              startIcon={<EditIcon />}
              LinkComponent={Link}
              href={`/admin/student-management/student-info/${data.row.original.id}/edit`}
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
  ], [lang, langData, params])

  const table = useReactTable({
    data: studentMangementListShow?.data || [].length === 0,
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

  const handleExpandClick = () => setExpand(!expand);

  const breadcumLink = [
    { href: '#', label: translate(langData, lang, LangSetUpForMenu.student_management.key) || 'Student Management' },
    {
      href: '/admin/student-management/add', label: translate(langData, lang, LangSetUpForMenu.student_management.submodule.student_list
        .key) || 'Student List'
    }
  ]

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
  //Excel
  const handleExportToExcel = async () => {
    const paramString = Object.keys(params).map(key => {
      if (key !== "page" && key !== "limit") {
        return `${key}=${encodeURIComponent(params[key])}`;
      }
    }).join('&');

    const headerColumns = [
      translate(langData, lang, LangSetUpForList.sl.key) || "ক্র/নং",
      translate(langData, lang, LangSetUpForStudent.list.centerCode.key) || "Center Code",
      translate(langData, lang, LangSetUpForStudent.list.centerName.key) || "Center Name",
      translate(langData, lang, LangSetUpForStudent.list.studentName.key) + translate(langData, lang, LangSetUpForForm.english.key) || "Student Name En",
      translate(langData, lang, LangSetUpForStudent.list.studentName.key) + translate(langData, lang, LangSetUpForForm.bangla.key) || "Student Name Bn",
      translate(langData, lang, LangSetUpForStudent.list.studentRoll.key) || "Roll No",
      translate(langData, lang, LangSetUpForStudent.list.centerLevel.key) || "Center Level",
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
    <>
      <Box className="table-page">
        <Box className="contentMainField">
          <Paper>
            <Box className="breadCrumbBg">
              <BreadCrumb listItems={breadcumLink} />
            </Box>
          </Paper>

          <Box className="contentField">
            <Paper className="paperBody">
              <List className="collapsField"
                sx={{ padding: 0, bgcolor: 'background.paper' }}
                component="nav">
                <Box className="dropToggle">
                  <Typography>
                    {methods.watch().division_search?.value && (<><span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}
                    </span> <span className="textColor">{methods.watch().division_search?.label},</span></>)}
                    {methods.watch().district_search?.value && (<><span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                    </span><span className="textColor"> {methods.watch().district_search?.label},</span></>)}
                    {methods.watch().upazila_search?.value && (<><span>
                      {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                    </span> <span className="textColor"> {methods.watch().upazila_search?.label},</span></>)}
                    {methods.watch().status !== "" ? (<><span>
                      {translate(langData, lang, LangSetUpForList.status.key) || "Status"}
                    </span> <span className="textColor"> {methods.watch().status?.toString() === '1' ? 'Active' : 'Inactive'},</span></>) : ""}
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
                        alignItems="stretch"
                      >
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.division.key) || "Division"}
                          </FormInputLabel>
                          <FormAutocomplete name='division_search' dataSource={listArrayModify(divisionList?.data)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.district.key) || "District"}
                          </FormInputLabel>
                          <FormAutocomplete name='district_search' dataSource={listArrayModify(districtList?.data)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForMenu.system_configuration.submodule.upazila.key) || "Upazila"}
                          </FormInputLabel>
                          <FormAutocomplete name='upazila_search' dataSource={listArrayModify(upazila?.data)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForStudent.form.centerType.key) || "Center Type"}
                          </FormInputLabel>
                          <FormAutocomplete name='center_type_search' dataSource={listArrayModify(learningcentertype?.data)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForStudent.list.centerCode.key) || "Center Code"}
                          </FormInputLabel>
                          <FormAutocomplete name='center_code_search' dataSource={listArrayModifyCenterCode(learningcenterList?.data)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForStudent.list.centerName.key) || "Center Name"}
                          </FormInputLabel>
                          <FormAutocomplete name='center_name_search' dataSource={listArrayModify(learningcenterList?.data)} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForStudent.list.studentName.key) + translate(langData, lang, LangSetUpForForm.english.key) || "Student Name En"}
                          </FormInputLabel>
                          <FormInputBootstrap name='name_en_search' />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForStudent.list.studentName.key) + translate(langData, lang, LangSetUpForForm.bangla.key) || "Student Name Bn"}
                          </FormInputLabel>
                          <FormInputBootstrap name='name_bn_search' />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForStudent.list.studentRoll.key) || "Roll No"}
                          </FormInputLabel>
                          <FormInputBootstrap name='roll_number_search' />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} >
                          <FormInputLabel>
                            {translate(langData, lang, LangSetUpForTeacher.list.status.key) || "Status"}
                          </FormInputLabel>
                          <FormSelect name='status' dataSource={[{ id: 0, name: "Inactive" }, { id: 1, name: "Active" }]} />
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
                                <Button onClick={() => {
                                  methods.reset();
                                  setParams((params: any) => ({ ...params, divisionId: "", districtId: "", upazilaId: "", centertypeId: "", code: "", learning_center_id: "", name_en: "", name_bn: "", roll_number: "", status: "", }))
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
                        <li><Button onClick={handleExportToPdf} type="button" startIcon={<PdfIcon />}>
                          {translate(langData, lang, LangSetUpForList.export_to_pdf.key) || "Export to Pdf"}
                        </Button></li>
                        <li>
                          <Button type="button" onClick={() => router.push('/admin/student-management/student-info/add')} startIcon={<AddIcon />}>
                            {translate(langData, lang, LangSetUpForStudent.form.add_student_button.key) || "Add Student"}
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
                paginationData={studentMangementListShow?.metaData}
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

export default StudentManagementList